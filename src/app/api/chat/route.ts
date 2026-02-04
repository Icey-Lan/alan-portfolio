import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { message } = await request.json();

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        // 扣子 API 配置
        const COZE_API_URL = process.env.COZE_API_URL || "https://api.coze.cn/v3/chat";
        const COZE_BOT_ID = process.env.COZE_BOT_ID;
        const COZE_API_TOKEN = process.env.COZE_API_TOKEN;

        // 如果没有配置，返回后备状态
        if (!COZE_BOT_ID || !COZE_API_TOKEN) {
            const mockReplies: Record<string, string> = {
                "你好": "你好！我是阿兰的 AI 分身，很高兴见到你！有什么想了解的吗？",
                "你是谁": "我是阿兰的 AI 数字分身，由扣子(Coze)驱动。我可以回答关于阿兰的项目、技能和经历的问题。",
                "项目": "阿兰目前有两个主要项目：\n1. **JobBuff** - AI 求职助手，帮助分析岗位和优化简历\n2. **JobHunter** - 职位信息采集工具\n\n想了解哪个项目的详情？",
                "技能": "阿兰的技能包括：\n- 产品管理：ToB 数据产品经验\n- AI 编程：Vibe Coding、Claude Code\n- 技术栈：Next.js、React、Python\n\n还想了解什么？",
            };
            let reply = "感谢你的提问！我正在学习中，请稍后再试或换个问题问我。";
            for (const [keyword, response] of Object.entries(mockReplies)) {
                if (message.includes(keyword)) {
                    reply = response;
                    break;
                }
            }
            return NextResponse.json({ reply });
        }

        // 调用 v3 API (使用流式 stream: true 拿数据)
        const response = await fetch(COZE_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${COZE_API_TOKEN}`,
            },
            body: JSON.stringify({
                bot_id: COZE_BOT_ID,
                user_id: "web_user_" + Date.now(),
                stream: true,
                auto_save_history: true,
                additional_messages: [
                    {
                        role: "user",
                        content: message,
                        content_type: "text",
                    },
                ],
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Coze API Error:", errorText);
            throw new Error(`API error (${response.status}): ${errorText}`);
        }

        if (!response.body) {
            throw new Error("No response body");
        }

        // 手动解析流 (带缓冲处理 + 标准 SSE 解析)
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullReply = "";
        let buffer = "";
        let currentEvent = ""; // 记录当前事件类型

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            buffer += chunk;

            const lines = buffer.split('\n');
            buffer = lines.pop() || "";

            for (const line of lines) {
                const trimmedLine = line.trim();

                // 1. 捕捉 event 行
                if (trimmedLine.startsWith('event:')) {
                    currentEvent = trimmedLine.substring(6).trim();
                }

                // 2. 捕捉 data 行
                else if (trimmedLine.startsWith('data:')) {
                    try {
                        const dataStr = trimmedLine.substring(5).trim();
                        if (!dataStr) continue;
                        const data = JSON.parse(dataStr);

                        // 匹配逻辑：根据 capture 到的 event 来判断
                        if (currentEvent === 'conversation.message.delta' && data.type === 'answer') {
                            fullReply += data.content;
                        }

                        // 兜底：complete 事件
                        if (currentEvent === 'conversation.message.completed' && data.type === 'answer') {
                            if (!fullReply && data.content) {
                                fullReply = data.content;
                            }
                        }
                    } catch (e: any) {
                        console.error(`Parse error: ${e.message}`);
                    }
                }
            }
        }

        // 处理缓冲区剩余内容
        if (buffer.trim().startsWith('data:')) {
            try {
                const dataStr = buffer.trim().substring(5).trim();
                const data = JSON.parse(dataStr);
                if (currentEvent === 'conversation.message.delta' && data.type === 'answer') {
                    fullReply += data.content;
                }
            } catch (e) { }
        }

        if (!fullReply) {
            fullReply = "抱歉，我暂时无法回答这个问题。";
        }

        return NextResponse.json({ reply: fullReply });

    } catch (error: any) {
        console.error("Chat API error:", error);
        return NextResponse.json(
            {
                error: "Failed to process message",
                reply: "抱歉，发生了错误，请稍后再试。",
                details: error.message || String(error)
            },
            { status: 500 }
        );
    }
}

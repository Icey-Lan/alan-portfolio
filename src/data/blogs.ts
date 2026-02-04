export interface BlogPost {
    id: string;
    title: string;
    description: string;
    cover: string;
    coverImage?: string;
    tag: string;
    tagColor: string;
    link: string;
    date: string;
    aiSummary?: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: "1",
        title: "JobBuff 开发全纪录",
        description: "从 PRD 到部署上线，记录职场外挂项目的完整开发历程，含 Supabase 配置和 Vibe Coding 实践",
        cover: "🎮",
        coverImage: "/images/blog-jobbuff.png",
        tag: "产品思考",
        tagColor: "from-[#6EC5FF] to-[#4DA8FF]",
        link: "https://my.feishu.cn/wiki/SDawwNFQAid7W7kplR1clpGOnic",
        date: "2026-01-20",
        aiSummary: "这篇文章详细记录了「职场外挂 JobBuff」产品的全链路开发过程，展示了如何通过 PRD 撰写、Supabase 部署与 API 接入构建一款游戏化的 AI 求职辅助工具。文章深入解析了该产品如何利用 AI 实现「情报侦察、装备锻造、试炼挑战」的任务体系，并总结了在 AI 辅助开发背景下高效产出高质量产品文档的实战经验。",
    },
    {
        id: "2",
        title: "打造你的 Agent Skills",
        description: "从入门到实战，解释 Skills、MCP、Subagent 之间的关系，含 4 步创建工作流程",
        cover: "🛠️",
        coverImage: "/images/blogs/agent-skills-cover.png",
        tag: "Skills",
        tagColor: "from-[#FFB3D9] to-[#FF8AC4]",
        link: "https://my.feishu.cn/wiki/LEhowkil0iOerqklo54cEZnanKg",
        date: "2026-01-25",
        aiSummary: "这篇文章详细介绍了如何将个人的行业经验和工作流 SOP 封装成 AI 可调用的 Agent Skills，并将其比喻为给 AI 的「新员工入职手册」。作者通过「Boss直聘岗位一键采集」和「JobBuff」项目实战，展示了从方法论探索、IDE辅助开发到 Few-shot 迭代优化的完整 Skill 创建全过程。",
    },
    {
        id: "3",
        title: "Vercel 部署心得",
        description: "JobBuff 从本地开发到 Vercel 部署的完整复盘，含踩坑指南和版本迭代历程",
        cover: "🚀",
        coverImage: "/images/blog-vercel.png",
        tag: "项目实战",
        tagColor: "from-[#6EC5FF] to-[#4DA8FF]",
        link: "https://my.feishu.cn/wiki/BcSTwBsbhi77pHk0aXLc6g88nxh",
        date: "2026-01-28",
        aiSummary: "本文复盘了 AI 求职助手 JobBuff 的开发与部署全过程，详细记录了在 Vibe Coding 训练营中从零构建 Web 应用的技术细节。文章重点分享了 Vercel 部署过程中遇到的常见坑点及解决方案，并提供了实用的部署前检查清单，是 AI 辅助编程与云端部署的实战指南。",
    },
];

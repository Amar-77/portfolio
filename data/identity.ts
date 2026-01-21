export const IDENTITY = {
    name: "A K Amarjith",
    roles: [
        "AI Engineer",
        "Full Stack Developer",
        "Creative Technologist",
        "Freelance Video Editor",
        "Flutter Developer"
    ],
    nav: [
        { label: "Home", href: "#home" },
        { label: "Projects", href: "#projects" },
        { label: "Skills", href: "#skills" },
        { label: "Journey", href: "#journey" },
        { label: "Contact", href: "#contact" },
        { label: "Resume", href: "#resume" },
    ],
    sections: {
        hero: {
            title: "Hi, I'm Amar",
        },
        projects: {
            title: "Selected Works",
        },
        skills: {
            title: "Capabilities",
        },
        journey: {
            title: "My Journey",
        },
        videoEditing: {
            title: "Freelance Video Editing",
            cta: "See More Work",
        },
        contact: {
            title: "Let's Connect",
            cta: "Get in Touch",
            email: "akamarjithajith@gmail.com",
            socials: {
                linkedin: "https://www.linkedin.com/in/amar07/",
                github: "https://github.com/Amar-77",
                instagram: "https://www.instagram.com/__amarr.___/",
            }
        },
    },
    content: {
        projects: [
            {
                id: 1,
                title: "SpeakEase 2.0",
                description: "AI-powered speech assessment app for children bridging the gap between classroom instruction and individual learning.",
                tags: ["Flutter", "FastAPI", "PyTorch", "Hugging Face"],
                image: "/projects/speakease.png",
                link: "https://github.com/Amar-77/SpeakEase_2.0"
            },
            {
                id: 2,
                title: "Emo-Detect",
                description: "Emotion recognition tool utilizing DistilBERT and NLP pipelines to analyze text and predict underlying emotions.",
                tags: ["Python", "PyTorch", "Transformers", "FastAPI"],
                image: "/projects/emo-detect.png",
                link: "https://github.com/Amar-77/Emotion_predictor"
            },
            {
                id: 3,
                title: "PulmoGuard",
                description: "CNN-based pneumonia detection system classifying chest X-rays with high accuracy using deep learning.",
                tags: ["TensorFlow", "Flask", "Flutter", "CNN"],
                image: "/projects/pulmoguard.png",
                link: "https://github.com/Amar-77/pneumonia_detector1"
            },
            {
                id: 4,
                title: "Ecom RecSys",
                description: "Real-time recommendation system simulation for e-commerce platforms.",
                tags: ["Python", "Machine Learning", "Recommendation Systems"],
                image: "/projects/rec_system.jpeg",
                link: "https://github.com/Amar-77/ecommerce-recsys-simulation"
            },
        ],
        skills: [
            { category: "Languages", items: ["Python", "Java", "C", "Dart"] },
            { category: "AI & ML", items: ["PyTorch", "TensorFlow", "Scikit-learn", "Hugging Face", "Pandas"] },
            { category: "Development", items: ["Flutter", "FastAPI", "Flask", "React", "Next.js"] },
            { category: "Tools", items: ["Git", "Docker", "Figma", "MySQL"] },
        ],
        journey: [
            { year: "2026", title: "CSE Undergrad", company: "Currently Pursuing" },
            { year: "2022", title: "Completed 12th", company: "Higher Secondary" },
            { year: "2020", title: "Completed 10th", company: "High School" },
        ],
        videos: [
            {
                id: 1,
                title: "2025 Recap",
                description: "2025 recap video edit (personal edit)",
                src: "/videos/2025_recap.mp4",
            },
            {
                id: 2,
                title: "Freelance work",
                description: "Concept, capture, edit",
                src: "/videos/fino.mp4",
            },
            {
                id: 3,
                title: "Freelance work",
                description: "Concept, capture, edit",
                src: "/videos/ashley.mp4",
            },
            {
                id: 4,
                title: "Tejaswi 2024",
                description: "Freelance work done for Marian Engineering College",
                src: "/videos/tejaswi_2024.mp4",
            },
            {
                id: 5,
                title: "Freelance work",
                description: "Concept, capture, edit",
                src: "/videos/arjun.mp4",
            },
            {
                id: 6,
                title: "Freelance work",
                description: "Concept, capture, edit",
                src: "/videos/madhav.mp4",
            },
            {
                id: 7,
                title: "Freelance work",
                description: "Concept, capture, edit",
                src: "/videos/reel1.mp4",
            },
            {
                id: 8,
                title: "Freelance work",
                description: "Concept, capture, edit",
                src: "/videos/reel2.mp4",
            },
            {
                id: 9,
                title: "Freelance work",
                description: "Concept, capture, edit",
                src: "/videos/reel3.mp4",
            },
        ]
    }
};

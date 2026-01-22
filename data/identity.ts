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
        about: {
            title: "About Me",
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
        about: {
            headline: "Computer Science Engineering Undergraduate (2026)",
            quote: "Turning ideas into intelligent, visually expressive systems that connect technology with people.",
            bullets: [
                "Building Data-Driven, Human-Centered Systems",
                "Passionate about Machine Learning, AI, and building real-world applications.",
                "Currently learning Data Science and exploring model deployment with FastAPI.",
                "Strong interest in UI/UX, visual storytelling, and intelligent design.",
                "Previously built SpeakEase, an award-winning assistive AI app.",
                "Started as a video editor — now I train models that understand emotion."
            ]
        },
        projects: [
            {
                id: 1,
                title: "SpeakEase 2.0",
                description: "AI-powered speech assessment app for children bridging the gap between classroom instruction and individual learning.",
                tags: ["Flutter", "FastAPI", "PyTorch", "Hugging Face"],
                image: "/portfolio/projects/speakease.png",
                link: "https://github.com/Amar-77/SpeakEase_2.0"
            },
            {
                id: 2,
                title: "Emo-Detect",
                description: "Emotion recognition tool utilizing DistilBERT and NLP pipelines to analyze text and predict underlying emotions.",
                tags: ["Python", "PyTorch", "Transformers", "FastAPI"],
                image: "/portfolio/projects/emo-detect.png",
                link: "https://github.com/Amar-77/Emotion_predictor"
            },
            {
                id: 3,
                title: "PulmoGuard",
                description: "CNN-based pneumonia detection system classifying chest X-rays with high accuracy using deep learning.",
                tags: ["TensorFlow", "Flask", "Flutter", "CNN"],
                image: "/portfolio/projects/pulmoguard.png",
                link: "https://github.com/Amar-77/pneumonia_detector1"
            },
            {
                id: 4,
                title: "Ecom RecSys",
                description: "Real-time recommendation system simulation for e-commerce platforms.",
                tags: ["Python", "Machine Learning", "Recommendation Systems"],
                image: "/portfolio/projects/rec_system.jpeg",
                link: "https://github.com/Amar-77/ecommerce-recsys-simulation"
            },
            {
                id: 5,
                title: "CubeSat Cloud Filter",
                description: "An Edge AI flight software simulation that saves satellite bandwidth by filtering cloudy imagery in real-time. Uses a quantized U-Net model (<2MB) to distinguish clouds from snow via Near-Infrared physics before downlink.",
                tags: ["Python", "TensorFlow Lite", "OpenCV", "NumPy", "Edge AI", "Multispectral Imaging"],
                image: "/portfolio/projects/cubesat.png",
                link: "https://github.com/Amar-77/CubeSat-Cloud-Filter"
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
                src: "/portfolio/videos/2025_recap.mp4",
            },
            {
                id: 2,
                title: "Freelance work",
                description: "Concept, capture, edit",
                src: "/portfolio/videos/fino.mp4",
            },
            {
                id: 3,
                title: "Freelance work",
                description: "Concept, capture, edit",
                src: "/portfolio/videos/ashley.mp4",
            },
            {
                id: 4,
                title: "Tejaswi 2024",
                description: "Freelance work done for Marian Engineering College",
                src: "/portfolio/videos/tejaswi_2024.mp4",
            },
            {
                id: 5,
                title: "Freelance work",
                description: "Concept, capture, edit",
                src: "/portfolio/videos/arjun.mp4",
            },
            {
                id: 6,
                title: "Freelance work",
                description: "Concept, capture, edit",
                src: "/portfolio/videos/madhav.mp4",
            },
            {
                id: 7,
                title: "Freelance work",
                description: "Concept, capture, edit",
                src: "/portfolio/videos/reel1.mp4",
            },
            {
                id: 8,
                title: "Freelance work",
                description: "Concept, capture, edit",
                src: "/portfolio/videos/reel2.mp4",
            },
            {
                id: 9,
                title: "Freelance work",
                description: "Concept, capture, edit",
                src: "/portfolio/videos/reel3.mp4",
            },
        ]
    }
};

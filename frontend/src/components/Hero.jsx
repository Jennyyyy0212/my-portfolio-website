import React from 'react';
import '../static/styles/hero.css'; // Optional: your custom styles
import { CometCard } from "./ui/comet-card.tsx";


const Hero = ({ aboutInfo, heroInfo }) => {
    if (!heroInfo) return null;
    const fileName = aboutInfo.photo_url.replace(/^\/+/, "");
    console.log("Current Public URL: ", process.env.PUBLIC_URL);

    const skills = [
        { name: "Linux", filename: "icons/Linux.png" },
        { name: "Docker", filename: "icons/Docker.png" },
        { name: "Python", filename: "icons/Python.png" },
        { name: "React", filename: "icons/React.png" },
        { name: "JavaScript", filename: "icons/JavaScript.png" },
        { name: "Java", filename: "icons/Java.png" },
        { name: "MongoDB", filename: "icons/MongoDB.png" },
        { name: "Markdown", filename: "icons/Markdown.png" },
        { name: "Flutter", filename: "icons/Flutter.png" },
        { name: "FastAPI", filename: "icons/FastAPI.png" },
        { name: "Flask", filename: "icons/Flask.png" },
        { name: "GitHub", filename: "icons/GitHub.png" },
        { name: "Git", filename: "icons/Git.png" },
        { name: "Firebase", filename: "icons/Firebase.png" },
        { name: "Dart", filename: "icons/Dart.png" },
        { name: "Azure", filename: "icons/Azure.png" },
        { name: "Android", filename: "icons/Android.png" },
    ];
    return (
        <section id="home" className="section-hero">

            <div className="about-me-row">
                <div className="about-me-image">
                    <CometCard>
                        <div
                            className="w-full h-full overflow-hidden"
                            style={{ transformStyle: "preserve-3d", borderRadius: "16px" }}
                        >
                            <img
                                src={`${process.env.PUBLIC_URL}/${fileName}`}
                                alt="Profile Picture"
                                className="h-full w-full object-cover contrast-75"
                                style={{ borderRadius: "16px", transform: "scale(1.5) translate(-10px, -10px)", filter: "none", transition: "transform 0.3s ease" }} // ✅ Force square shape
                            />
                        </div>
                    </CometCard>
                </div>
                <div className="hero-container">
                    <h1 className="hero-heading">Hi, I'm {heroInfo.name}</h1>
                    <p className="hero-subheading">{heroInfo.intro} You can reach me on{" "}
                        <a href={heroInfo.linkedin} target="_blank" rel="noopener noreferrer" className="underline">
                            LinkedIn
                        </a>{" "}
                        or at{" "}
                        <a href={`mailto:${heroInfo.email}`} className="underline">
                            {heroInfo.email}
                        </a>
                        .
                    </p>

                    <div className="hero-cta">
                        <a
                            href="https://www.linkedin.com/in/an-chieh-cheng"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                        >
                            Get In Touch
                        </a>
                        <a href="#projects" className="btn-secondary">View My Work</a>
                    </div>
                </div>

            </div>

            <div className="marquee-wrapper">
                <div className="marquee-track">
                    {[...skills, ...skills, ...skills].map((icon, index) => (
                        <div
                            key={index}
                            className="group flex flex-col items-center transition-all duration-150"
                        >
                            <img
                                src={`${process.env.PUBLIC_URL}/${icon.filename}`}
                                alt={icon.name}
                                className="themable-icon h-8 w-8 object-contain group-hover:grayscale-0 transition duration-200"
                            />
                            <span className="mt-1 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                {icon.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
};

export default Hero;
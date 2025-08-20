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

            <div className="block md:hidden w-full">
                <div
                    className="relative h-[90vh] w-full"
                    style={{
                        backgroundImage: `url(${process.env.PUBLIC_URL}/${fileName})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {/* optional gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* overlay card (bottom half) */}
                <div
                    className="
                        w-full
                        bg-white/80 dark:bg-black/60
                        backdrop-blur-md
                        rounded-t-3xl
                        shadow-lg
                        -mt-10        /* slight overlap for style (optional) */
                        p-6
                        flex flex-col items-center text-center
                        pb-10
                    "
                >
                    <h1 className="text-2xl font-bold text-gray-600 dark:text-white/80 self-start text-left mt-4 mb-2 pl-2">
                        Hi, I’m
                    </h1>
                    <h1 className="text-5xl font-bold text-gray-900 dark:text-white self-start text-left mb-4 pl-2">
                        {heroInfo.name}
                    </h1>
                    <p className="mt-3 text-base text-gray-700 dark:text-gray-300 self-start text-left pl-2 pr-2">
                        {heroInfo.intro} You can reach me on{" "}
                        <a
                            href={heroInfo.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                        >
                            LinkedIn
                        </a>{" "}
                        or at{" "}
                        <a href={`mailto:${heroInfo.email}`} className="underline">
                            {heroInfo.email}
                        </a>
                        .
                    </p>

                    {/* CTA buttons */}
                    <div className="mt-8 flex flex-col gap-4 w-full">
                        <a
                            href="#projects"
                            className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900  px-4 py-2 rounded-full font-semibold shadow-md"
                        >
                            View My Work
                        </a>
                        <a
                            href="https://www.linkedin.com/in/an-chieh-cheng"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-white/80 dark:bg-black/70 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2 rounded-full font-semibold shadow-sm"
                        >
                            Get In Touch
                        </a>
                    </div>
                </div>
            </div>
            <div className="hidden md:!block hero-desktop">
                <div className="about-me-row">
                    {/* Profile image */}
                    <div className="shrink-0 md:mr-10 mt-8 mb-8 md:mt-0 md:mb-0">
                        <CometCard>
                            <div className="w-80 h-80  md:w-60 md:h-80 rounded-xl overflow-hidden">

                                <img
                                    src={`${process.env.PUBLIC_URL}/${fileName}`}
                                    alt="Profile"
                                    class="h-full w-full object-cover contrast-75 rounded-xl transform scale-[1.5] -translate-x-[10px] -translate-y-[10px]  transition-transform duration-300 filter-none contrast-75 hover:scale-[1.6]"
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
            </div>

        </section>
    );
};

export default Hero;
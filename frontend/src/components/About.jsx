import React from "react";
import '../static/styles/about.css'; // Optional: your original styles


const About = ({ aboutInfo }) => {
    if (!aboutInfo) return null;
    return (
        <section id="about" className="about-section py-16 bg-white dark:bg-black">
            <div className="container mx-auto px-4 max-w-6xl">


                <div className="about-me-row">
                    <div className="about-me-image">
                        <img
                            src={aboutInfo.photo_url}
                            alt="Profile Picture"
                            className="object-cover w-full h-full"
                        />
                    </div>

                    <div className="about-me-content text-center md:text-left max-w-xl">
                        <div className="about-header text-center mb-10">
                            <h2 className="section-title">About Me</h2>
                            <p className="section-subtitle text-gray-500 dark:text-gray-400">
                                A quick intro about who I am
                            </p>
                        </div>

                        <p className="about-location mt-2 text-sm text-gray-500 dark:text-gray-400">
                            📍 {aboutInfo.location}
                        </p>

                        <p className="about-bio mt-4 text-gray-700 dark:text-gray-300">
                            {aboutInfo.bio}
                        </p>

                        <div className="interests mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                            {aboutInfo.interests.map((interest, idx) => (
                                <span
                                    key={idx}
                                    className="interest-tag bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm dark:bg-indigo-800 dark:text-white"
                                >
                                    {interest}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

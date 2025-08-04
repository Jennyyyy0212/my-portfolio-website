import React from "react";
import '../static/styles/projects.css'; // Optional: your original styles

const Projects = ({ projects }) => {
  return (
    <section className="section-projects">
      <div className="container">
        <div className="title-wrapper">
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle text-gray-500 dark:text-gray-400">
            My professional journey in technology
          </p>
        </div>


        <div className="project-scroller overflow-x-auto mt-6">
          <div className="project-track flex gap-6 w-max">
            {projects.map((project, index) => (
              <div
                key={index}
                className="project-card-wrapper animate-in"
                style={{ "--index": index }}
              >
                <div className="project-card group relative overflow-hidden rounded-xl shadow-lg w-[250px] md:w-[430px] h-[250px] cursor-pointer">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="project-image h-full w-full object-cover transition duration-300 ease-in-out group-hover:blur-sm group-hover:opacity-50"
                  />

                  <div className="project-overlay absolute inset-0 flex items-center justify-center bg-white bg-opacity-0 group-hover:bg-opacity-50 dark:bg-black dark:bg-opacity-0 group-hover:opacity-100 transition duration-300">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-icon-link absolute top-2 right-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        className="h-8 w-8 text-black dark:text-white"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>

                    <div className="project-info px-4 text-white text-left opacity-0 group-hover:opacity-100 transition duration-300">
                      <h2 className="project-title font-bold text-lg mb-1">
                        {project.title}
                      </h2>
                      <p className="project-desc text-sm">{project.description}</p>
                      <div className="project-tags flex flex-wrap gap-2 mt-2">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="project-tag bg-stone-800/80 text-white text-xs px-2 py-1 rounded-lg"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="project-caption mt-2 text-center text-sm">
                  <h2 className="inline font-bold">{project.title}</h2>
                  <span className="mx-1">—</span>
                  <span>{project.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

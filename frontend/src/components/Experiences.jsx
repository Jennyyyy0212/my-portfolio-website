import React from 'react';
import '../static/styles/experiences.css'; // Optional: your custom styles
import { useState, useEffect, useRef } from "react";
import { FiChevronRight } from "react-icons/fi";



const Experience = ({ experiences }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(null);
  const modalRef = useRef(null);


  const openModal = (index) => {
    setActiveIdx(index);
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
    setActiveIdx(null);
  };

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleExpanded = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const active = activeIdx != null ? experiences[activeIdx] : null;

  return (
    <section id="experience" className="experiences-section">
      <div className="block md:hidden w-full">
        <div className="title-wrapper ">
          <h2
            className="
              inline-block                /* shrink to content */
              dark: text-white text-gray-600      /* label background + text color */
              text-base font-bold        /* smaller, label-style text */
              px-3 py-1                    /* padding inside label */
              rounded-full                 /* pill/label shape */
              tracking-wide uppercase      /* optional: uppercase style */
              ml-4
            "
          >
            Experience
          </h2>
        </div>

        <ol className="relative mr-4 ml-4">
          {experiences.map((job, i) => {
            const fileName = String(job.company_logo || "").replace(/^\/+/, "");
            const isPresent =
              (job.date || "").toLowerCase().includes("present") ||
              (job.date || "").toLowerCase().includes("current");

            return (
              <li key={i} className="mb-4">

                {/* Row (concise) */}
                <button
                  onClick={() => openModal(i)}
                  className="w-full h-auto text-left rounded-xl border border-gray-200 dark:border-gray-700 
                  hover:border-violet-400/60 hover:shadow-md transition p-4 
                  bg-white/80 dark:bg-white/10 backdrop-blur-md"
                  aria-controls="exp-modal"
                >

                  <FiChevronRight
                    className="absolute top-4 right-3 text-gray-400 group-hover:text-gray-600"
                    size={22}
                  />
                  {isPresent && (
                    <span className="mb-2 inline-flex items-center rounded-full bg-violet-600/10 text-violet-700 dark:text-violet-300 px-2 py-0.5 text-xs font-medium">
                      Present
                    </span>
                  )}
                  <div className="flex items-start gap-3">
                    {/* Logo */}
                    <a
                      href={job.company_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/${fileName}`}
                        alt={job.company_name}
                        class="w-12 h-12 bg-white rounded-lg flex items-center justify-center" />
                    </a>

                    {/* Main content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col space-y-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {job.job_title}
                        </h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {job.company_name}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {job.date}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {job.company_location}
                        </p>
                      </div>



                      {/* Tech stack chips (concise) */}
                      {Array.isArray(job.tech_stack) && job.tech_stack.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {job.tech_stack.slice(0, 4).map((t, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 px-2 py-1 rounded-full text-gray-700 dark:text-gray-300"
                            >
                              {t}
                            </span>
                          ))}
                          {job.tech_stack.length > 4 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              +{job.tech_stack.length - 4} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                  </div>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Modal (details) */}
        {open && active && (
          <div
            id="exp-modal"
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={closeModal}
            />

            {/* Card */}
            <div
              ref={modalRef}
              className="relative z-10 w-auto h-auto overflow-hidden rounded-2xl bg-white/80 dark:bg-zinc-900 backdrop-blur-md shadow-2xl border border-gray-200 dark:border-gray-700 m-4 sm:mx-0"
            >
              {/* Header */}
              <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-start gap-3">
                  <img
                    src={`${process.env.PUBLIC_URL}/${String(active.company_logo || "").replace(/^\/+/, "")}`}
                    alt={active.company_name}
                    class="w-14 h-14 bg-white rounded-lg flex items-center justify-center" />
                  <div className="min-w-0">
                    <h3 className="sm:text-lg font-semibold text-gray-900 dark:text-white">
                      {active.job_title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {active.company_name}
                    </p>
                    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {active.location} • {active.date}
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="ml-auto h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-gray-300"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>
                {Array.isArray(active.tech_stack) && active.tech_stack.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {active.tech_stack.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 px-2 py-1 rounded-full text-gray-700 dark:text-gray-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Body (scrollable) */}
              <div className="p-4 sm:p-6 overflow-y-auto max-h-[50vh] space-y-4">
                
                {active.description && (
                  <p className="text-gray-700 dark:text-gray-300">{active.description}</p>
                )}

                {active.details?.bullets?.length > 0 && (
                  <ul className="list-disc pl-5 space-y-2 text-gray-800 dark:text-gray-200">
                    {active.details.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}

                {active.details?.images?.length > 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    {active.details.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`Screenshot ${i + 1}`}
                        className="rounded-lg border border-gray-200 dark:border-gray-700 object-cover w-full h-28 sm:h-36"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 sm:p-6 border-t border-gray-100 dark:border-gray-800 flex justify-end items-center">
                <a
                  href={active.company_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-auto text-sm font-medium text-violet-700 dark:text-violet-300"
                  onClick={closeModal}
                >
                  Visit company site
                </a>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 rounded-full bg-gray-900 text-white dark:bg-white dark:text-black font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      <div className="hidden md:!block experiences-desktop">
        <div className="container">
          <div className="title-wrapper">
            <h2 className="section-title">Experiences</h2>
            <p className="section-subtitle text-gray-500 dark:text-gray-400">
              My professional journey in technology
            </p>
          </div>
          <div className="experiences-list-wrapper">

            <div className="experiences-list">
              {experiences.map((job, index) => {
                const fileName = String(job.company_logo || "").replace(/^\/+/, "");
                return (
                  <div
                    className="experience-item"
                    key={index}
                    onClick={() => toggleExpanded(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    {job.date.toLowerCase().includes("present") && (
                      <div className="present-label">Present</div>
                    )}
                    <div className="experience-body">
                      <div className="experience-logo">
                        <a href={job.company_link} target="_blank" rel="noopener noreferrer">
                          <img src={`${process.env.PUBLIC_URL}/${fileName}`} alt={job.company_name} />
                        </a>
                      </div>
                      <div className="experience-content">
                        <div className="experience-header">
                          <div className="experience-header-left">
                            <div className="experience-company">
                              <h3>{job.job_title}</h3>
                              <p className="company-name">{job.company_name}</p>
                              <div className="tech-stack">
                                {job.tech_stack.map((tech, i) => (
                                  <span className="tech-tag" key={i}>{tech}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="experience-right-wrapper">
                            <div className="experience-header-right">
                              <p className="company-location"> {job.location}</p>
                              <div className="experience-date">
                                <span>{job.date}</span>
                              </div>
                            </div>
                            <div
                              className={`expand-icon ${expandedIndex === index ? 'expanded' : ''}`}
                            >
                              ▼
                            </div>
                          </div>
                        </div>
                      </div>


                      {/* Expanded content */}
                      {expandedIndex === index && job.details && (
                        <div className="experience-details">
                          <div className="experience-description">
                            <p>{job.description}</p>
                          </div>
                          <ul className="details-bullets">
                            {job.details.bullets?.map((point, i) => (
                              <li key={i}>{point}</li>
                            ))}
                          </ul>

                          {job.details.images?.length > 0 && (
                            <div className="details-images">
                              {job.details.images.map((img, i) => (
                                <img key={i} src={img} alt={`Detail ${i}`} className="detail-img" />
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
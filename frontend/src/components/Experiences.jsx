import React from 'react';
import '../static/styles/experiences.css'; // Optional: your custom styles
import { useState } from 'react';


const Experience = ({ experiences }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpanded = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  return (
    <section id="experience" className="experiences-section">
      <div className="container">
        <div className="title-wrapper">
          <h2 className="section-title">Experiences</h2>
          <p className="section-subtitle text-gray-500 dark:text-gray-400">
            My professional journey in technology
          </p>
        </div>
        <div className="experiences-list-wrapper">

          <div className="experiences-list">
            {experiences.map((job, index) => (
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
                      <img src={job.company_logo} alt={job.company_name} />
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
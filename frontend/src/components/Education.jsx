import React from 'react';
import '../static/styles/experiences.css'; // Optional: your custom styles
import { useState } from 'react';



const Education = ({ education }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpanded = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  return (
    <div id="education" className="experiences-section">
      <div className="container">
        <div className="title-wrapper">
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle text-gray-500 dark:text-gray-400">
            My academic background
          </p>
        </div>

        <div className="experiences-list-wrapper">

          <div className="experiences-list">
            {education.map((edu, index) => (
              <div
                className="experience-item"
                key={index}
                onClick={() => toggleExpanded(index)}
                style={{ cursor: 'pointer', flexDirection: 'column' }}
              >
                {edu.date.toLowerCase().includes("present") && (
                  <div className="present-label">Present</div>
                )}
                <div className="experience-body">
                  <div className="experience-logo">
                    <a href={edu.institution_link} target="_blank" rel="noopener noreferrer">
                      <img src={edu.institution_logo} alt={edu.institution_name} />
                    </a>
                  </div>
                  <div className="experience-content">
                    <div className="experience-header">
                      <div className="experience-header-left">
                        <div className="experience-company">
                          <h3>{edu.degree}</h3>
                          <p className="company-name">{edu.institution_name}</p>
                        </div>
                      </div>
                      <div className="experience-right-wrapper">
                        <div className="experience-header-right">
                          <p className="company-location"> {edu.location}</p>
                          <div className="experience-date">
                            <span>{edu.date}</span>
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
                  {expandedIndex === index && edu.description && (
                    <div className="experience-details">
                      <div className="experience-description">
                        <p>{edu.description}</p>
                      </div>
                      <ul className="details-bullets">
                        {edu.details?.bullets?.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>

                      {Array.isArray(edu.details?.images) && edu.details.images.length > 0 && (
                        <div className="details-images">
                          {edu.details.images.map((img, i) => (
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
    </div>
  );
};

export default Education;

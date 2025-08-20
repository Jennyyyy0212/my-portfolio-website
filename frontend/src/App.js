import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experiences';
import Education from './components/Education';
import Location from './components/Location';
import Footer from './components/Footer';
import './static/styles/main.css';
// ...import other styles as needed

function App() {
  const [hero, setHero] = useState(null);
  const [about, setAbout] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [projects, setProjects] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [skills, setSkills] = useState([]);
  const [map, setMap] = useState(null); // or set to {} if preferred

  useEffect(() => {
    fetch("https://my-portfolio-website-vdiy.onrender.com/api/data")
      .then((res) => res.json())
      .then((data) => {
        setHero(data.hero);
        setAbout(data.about);
        setExperiences(data.experiences);
        setEducation(data.education);
        setProjects(data.projects);
        setHobbies(data.hobbies);
        setSkills(data.skills);
        setMap({
          token: data.map.mapbox_token,
          locations: data.map.locations,
        });
        console.log(data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <>
      <Navbar />
      <Hero aboutInfo={about} heroInfo={hero} />
        <Projects projects={projects} />
        <Experience experiences={experiences} />
        <Education education={education} />
        <Location map={map} />
      <Footer />
    </>
  );
}

export default App;
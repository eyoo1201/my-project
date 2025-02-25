import React, { useState, useEffect, useRef } from "react";
import "./hero.css";
import PIC from "/src/assets/pic.jpg";

const Hero = () => {
  const texts = [
    "HELLO!",
    "I'M ",
    "LEO TULABING",
    "A Web Developer.",
    "I'm a passionate developer creating amazing things.",
  ];

  const [displayedTexts, setDisplayedTexts] = useState(["", "", "", "", ""]);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Refs for smooth scroll behavior
  const homeSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const worksSectionRef = useRef(null);
  const contactSectionRef = useRef(null);
  const navbarRef = useRef(null);

  // State for active link
  const [activeLink, setActiveLink] = useState("home");

  useEffect(() => {
    let currentIndex = 0;

    const typeText = (index) => {
      if (index >= texts.length) {
        setIsTypingComplete(true); // All text has been typed, unhide the button
        return;
      }

      let currentTextIndex = 0;
      const interval = setInterval(() => {
        setDisplayedTexts((prev) => {
          const newDisplayed = [...prev];
          newDisplayed[index] = texts[index].slice(0, currentTextIndex + 1);
          return newDisplayed;
        });

        currentTextIndex++;
        if (currentTextIndex === texts[index].length) {
          clearInterval(interval);
          typeText(index + 1); // Start typing the next line
        }
      }, 50); // Typing speed per letter
    };

    typeText(0); // Start typing the first line

    // Scroll handling for sticky navbar and active link
    const handleScroll = () => {
      const sections = [
        { id: "home", ref: homeSectionRef },
        { id: "about", ref: aboutSectionRef },
        { id: "works", ref: worksSectionRef },
        { id: "contact", ref: contactSectionRef },
      ];

      let foundActive = false;

      sections.forEach((section) => {
        const sectionRef = section.ref.current;
        if (window.scrollY >= sectionRef.offsetTop - 100) {
          setActiveLink(section.id);
          foundActive = true;
        }
      });

      if (!foundActive) {
        setActiveLink("home");
      }

      if (window.scrollY > 100) {
        navbarRef.current.classList.add("sticky");
      } else {
        navbarRef.current.classList.remove("sticky");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to sections
  const handleScrollToHome = () => {
    homeSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToAbout = () => {
    aboutSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToWorks = () => {
    worksSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToContact = () => {
    contactSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={homeSectionRef}>
      <div className="hero-wrapper">
        <div className="hero-image-container">
          <img src={PIC} alt="Profile" className="hero-image" />
        </div>

        <div className="hero-container">
          {/* Navbar */}
          <nav className="navbar" ref={navbarRef}>
            <ul>
              <li>
                <a
                  href="#home"
                  className={activeLink === "home" ? "active" : ""}
                  onClick={handleScrollToHome}
                >
                  HOME
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className={activeLink === "about" ? "active" : ""}
                  onClick={handleScrollToAbout}
                >
                  ABOUT
                </a>
              </li>
              <li>
                <a
                  href="#works"
                  className={activeLink === "works" ? "active" : ""}
                  onClick={handleScrollToWorks}
                >
                  WORKS
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className={activeLink === "contact" ? "active" : ""}
                  onClick={handleScrollToContact}
                >
                  CONTACT
                </a>
              </li>
            </ul>
          </nav>

          <div className="hero-text-container">
            <h1 style={{ minHeight: "1em" }}>{displayedTexts[0]}</h1>
            <h1 style={{ minHeight: "1em" }}>
              {displayedTexts[1]}
              <span style={{ color: "#373B41" }}>{displayedTexts[2]}</span>
            </h1>

            <h3 style={{ color: "WHITE" }}>{displayedTexts[3]}</h3>
            <h3 style={{ color: "WHITE" }}>{displayedTexts[4]}</h3>
          </div>

          <div className="hero-button-container">
            {isTypingComplete && (
              <button className="hire-me-button" onClick={handleScrollToContact}>
                Contact Me
              </button>
            )}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="about-section" ref={aboutSectionRef}>
  <div className="about-text-container">
    <div className="h2-c"><h2>What I Do</h2></div>
    <p className="about-me">
      Hello, I'm Leo – a dedicated web developer committed to crafting visually stunning and highly functional websites. 
      With expertise in both front-end and back-end development, I thrive on transforming ideas into seamless digital experiences 
      through precise and efficient coding.
    </p>

    <div className="skills-wrapper">
      <div className="skills-left">
        <h3>Programming/Library Skills</h3>
        <ul className="skills-list">
          <li className="skill-item">
            <h4>React.js</h4>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: "40%" }}>
                <span className="progress-text">40%</span>
              </div>
            </div>
          </li>
          <li className="skill-item">
            <h4>HTML</h4>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: "70%" }}>
                <span className="progress-text">70%</span>
              </div>
            </div>
          </li>
          <li className="skill-item">
            <h4>CSS</h4>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: "70%" }}>
                <span className="progress-text">70%</span>
              </div>
            </div>
          </li>
          <li className="skill-item">
            <h4>JavaScript</h4>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: "60%" }}>
                <span className="progress-text">60%</span>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div className="skills-right">
        <h3>Other Skills</h3>
        <ul className="skills-list">
          <li className="skill-item">
            <h4>Networking</h4>
            <p>I am experienced in network troubleshooting and optimization, focusing on improving reliability, performance, and security. 
              My expertise ensures that networks are robust, scalable, and meet modern operational requirements.</p>
          </li>
          <li className="skill-item">
            <h4>Software Troubleshooting</h4>
            <p>My expertise ensures seamless system performance and the timely resolution of software-related challenges, maintaining high levels of productivity.</p>
          </li>
          <li className="skill-item">
            <h4>Hardware Troubleshooting</h4>
            <p>I have strong expertise in diagnosing and resolving hardware issues, including system upgrades, component replacements, 
              and troubleshooting faulty hardware. My skills allow me to efficiently identify and fix hardware malfunctions, ensuring minimal downtime and optimal system performance.</p>
          </li>
          <li className="skill-item">
            <h4>Computer Maintenance</h4>
            <p>I possess extensive experience in computer maintenance, including regular system cleaning, software updates, and disk optimization. 
              I ensure that systems run efficiently by performing routine checks, addressing performance issues, and maintaining overall system health.</p>
          </li>
        </ul>
      </div>
    </div>

    <div className="personal-touch-container">
      <h3>Personal Touch</h3>
      <p>
        When I'm not coding, you can find me playing video games, exploring new places, or simply enjoying the beauty of nature.
      </p>
      
      <div className="personal-interests">
        <div className="interest">
          <h4>Hobbies</h4>
          <ul>
            
            <p>Photography</p>
            <p>Gaming</p>
            <p>Traveling</p>
          </ul>
        </div>
        <div className="interest">
          <h4>Favorite Online Games</h4>
          <p>Dota 2</p>
          <p>CS:GO</p>
          <p>Valorant</p>
        </div>
      </div>
    </div>
  </div>
</div>


      {/* Works Section */}
      <div className="works-section" ref={worksSectionRef}>
        <div className="works-text-container">
          <h2>My Works</h2>
          <p>Check out some of the awesome projects I've worked on...</p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="contact-section" ref={contactSectionRef}>
        <div className="contact-text-container">
          <h2>Contact Me</h2>
          <p>If you'd like to work together, feel free to reach out!</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;

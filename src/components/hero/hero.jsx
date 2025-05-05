import React, { useState, useEffect, useRef } from "react";
import "./hero.css";
import sad from "/src/assets/sad.jfif";
import cert2 from "/src/assets/cert2.jfif";
import cert3 from "/src/assets/cert3.jfif";
import cert4 from "/src/assets/cert4.jfif";
import cert5 from "/src/assets/cert5.jfif";
import cert6 from "/src/assets/cert6.jfif";
import cert7 from "/src/assets/cert7.jfif";
import cert8 from "/src/assets/cert8.jfif";
import cert9 from "/src/assets/cert9.jfif";
import cert10 from "/src/assets/cert10.jfif";
import cert11 from "/src/assets/cert11.jfif";
import cert12 from "/src/assets/cert12.jfif";
import cert13 from "/src/assets/cert13.jfif";
import PIC from "/src/assets/pic.jpg";

const Hero = () => {
  const texts = [
    "HELLO!",
    "I'M ",
    "LEO TULABING",
    "I'm a passionate developer creating amazing things.",
  ];

  const rotatingTitles = ["LEO TULABING", "A Web Dev", "A Front-End Dev", "A Developer"];

  const [displayedTexts, setDisplayedTexts] = useState(["", "", "", "", ""]);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [rotationIndex, setRotationIndex] = useState(0);

  // Refs for smooth scroll behavior
  const homeSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const worksSectionRef = useRef(null);
  const contactSectionRef = useRef(null);
  const navbarRef = useRef(null);
  

  // State for active link
  const [activeLink, setActiveLink] = useState("home");

  useEffect(() => {
    const typeText = (index) => {
      if (index >= texts.length) {
        setIsTypingComplete(true); // All text has been typed, now start rotating title
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
          typeText(index + 1);
        }
      }, 50);
    };

    typeText(0);

    // Scroll handling
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
        navbarRef.current?.classList.add("sticky");
      } else {
        navbarRef.current?.classList.remove("sticky");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Rotating text effect after typing is complete
  useEffect(() => {
    if (!isTypingComplete) return;
  
    const titles = rotatingTitles;
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimeout;
  
    const typeAndDelete = () => {
      const currentTitle = titles[titleIndex];
      const isEnd = !isDeleting && charIndex === currentTitle.length;
      const isStart = isDeleting && charIndex === 0;
  
      setDisplayedTexts((prev) => {
        const updated = [...prev];
        updated[2] = currentTitle.slice(0, charIndex);
        return updated;
      });
  
      if (isEnd) {
        // Pause after typing
        typingTimeout = setTimeout(() => {
          isDeleting = true;
          typeAndDelete();
        }, 1000); // 1 second pause after typing
      } else if (isStart) {
        // Pause before typing next word
        titleIndex = (titleIndex + 1) % titles.length;
        isDeleting = false;
        typingTimeout = setTimeout(() => {
          typeAndDelete();
        }, 800); // 0.8 second pause before typing
      } else {
        // Continue typing or deleting
        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
        typingTimeout = setTimeout(typeAndDelete, isDeleting ? 50 : 100); // Speeds
      }
    };
  
    typeAndDelete();
  
    return () => clearTimeout(typingTimeout);
  }, [isTypingComplete]);
  
  


  // Scroll to section functions
  const handleScrollToHome = () => homeSectionRef.current.scrollIntoView({ behavior: "smooth" });
  const handleScrollToAbout = () => aboutSectionRef.current.scrollIntoView({ behavior: "smooth" });
  const handleScrollToWorks = () => worksSectionRef.current.scrollIntoView({ behavior: "smooth" });
  const handleScrollToContact = () => contactSectionRef.current.scrollIntoView({ behavior: "smooth" });

  const scrollLeft = () => {
    const carousel = document.getElementById("carousel");
    if (carousel) {
      carousel.scrollBy({ left: -220, behavior: "smooth" });
    }
  };
  
  const scrollRight = () => {
    const carousel = document.getElementById("carousel");
    if (carousel) {
      carousel.scrollBy({ left: 220, behavior: "smooth" });
    }
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
    href="https://eyoblog.netlify.app/" // Replace with your actual blog URL
    target="_blank"
    rel="noopener noreferrer"
  >
    BLOG
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
    <p className="about-me fade-up-scroll">
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
              <div className="progress-bar" style={{ width: "30%" }}>
                <span className="progress-text">30%</span>
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
    <p>Explore a few of the projects I've built recently, blending design and development.</p>

    <div className="project-grid">
      <div className="project-box">
        <div className="box-text">
          <h3>E-commerce</h3>
          <p>An eCommerce website designed for fast food lovers, this platform allows users to browse a wide selection of meals from various restaurants and place orders quickly and easily. With a user-friendly interface, customers can explore menus, customize their orders, and pay securely online.</p>
        </div>
        <div className="box-image">
          <img src="/images/" alt="" />
        </div>
      </div>

      <div className="project-box">
        <div className="box-text">
          <h3>Registrar Archiving System</h3>
          <p>A Registrar Archiving System is a digital platform designed to store, manage, and retrieve academic and administrative records efficiently. It helps educational institutions maintain secure, organized archives of student records, enrollment data, transcripts, certificates, and other important documents.</p>
        </div>
        <div className="box-image">
          <img src="/images/" alt="" />
        </div>
      </div>

      <div className="project-box">
        <div className="box-text">
          <h3>Kayawan Booking System</h3>
          <p>Kayawan Booking System is an online platform designed to manage resort reservations with ease and efficiency. It allows customers to browse available accommodations, check rates, select preferred dates, and make secure bookings online.</p>
        </div>
        <div className="box-image">
          <img src="/images/" alt="" />
        </div>
      </div>
    </div>
  </div>
</div>

<div className="certificates-section">
  <h2>My Certificates</h2>
  <div className="carousel-container">
    <div className="carousel" id="carousel">
      <div className="certificate-slide">
      <img src={sad} alt="Certificate" />
      </div>
      <div className="certificate-slide">
      <img src={cert2} alt="Certificate" />
      </div>
      <div className="certificate-slide">
      <img src={cert3} alt="Certificate" />
      </div>
      <div className="certificate-slide">
      <img src={cert4} alt="Certificate" />
      </div>
      <div className="certificate-slide">
      <img src={cert5} alt="Certificate" />
      </div>
      <div className="certificate-slide">
      <img src={cert6} alt="Certificate" />
      </div>
      <div className="certificate-slide">
      <img src={cert7} alt="Certificate" />
      </div>
      <div className="certificate-slide">
      <img src={cert8} alt="Certificate" />
      </div>
      <div className="certificate-slide">
      <img src={cert9} alt="Certificate" />
      </div>
      <div className="certificate-slide">
      <img src={cert10} alt="Certificate" />
      </div>
      <div className="certificate-slide">
      <img src={cert11} alt="Certificate" />
      </div>
      <div className="certificate-slide">
      <img src={cert12} alt="Certificate" />
      </div>
      <div className="certificate-slide">
      <img src={cert13} alt="Certificate" />
      </div>
      {/* Add more slides as needed */}
    </div>
    <button className="carousel-btn prev" onClick={scrollLeft}>&lt;</button>
    <button className="carousel-btn next" onClick={scrollRight}>&gt;</button>
  </div>
</div>



      {/* Contact Section */}
      <div className="contact-section" ref={contactSectionRef}>
        <div className="contact-text-container">
          <h2>Contact Me</h2>
          <p>If you'd like to work together, feel free to reach out!</p>
<div class="card">
  <a href="#" class="socialContainer containerOne">
    <svg class="socialSvg instagramSvg" viewBox="0 0 16 16"> <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path> </svg>
  </a>
  
  <a href="#" class="socialContainer containerTwo">
    <svg class="socialSvg twitterSvg" viewBox="0 0 16 16"> <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path> </svg>              </a>
    
  <a href="#" class="socialContainer containerThree">
    <svg class="socialSvg linkdinSvg" viewBox="0 0 448 512"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg>
  </a>
  
  <a href="#" class="socialContainer containerFour">
    <svg class="socialSvg whatsappSvg" viewBox="0 0 16 16"> <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"></path> </svg>
  </a>
</div>             


        </div>
        
      </div>
    </div>
  );
};

export default Hero;

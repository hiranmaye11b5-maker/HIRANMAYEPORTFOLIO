/* ===============================
   CANVAS ANIMATION CONFIGURATION
================================ */
const frameCount = 200;

// Path to your image sequence - UPDATE THIS PATH TO MATCH YOUR IMAGES FOLDER
const imagePath = index =>
  `images/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;

const canvas = document.getElementById("scroll-canvas");
const ctx = canvas.getContext("2d");

const images = [];
let imagesLoaded = 0;
let currentFrame = 0;

/* ===============================
   RETINA CANVAS SETUP
================================ */
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener("resize", resizeCanvas);

/* ===============================
   IMAGE PRELOAD
================================ */
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = imagePath(i);

  img.onload = () => {
    imagesLoaded++;

    // Start animation ONLY after all images load
    if (imagesLoaded === frameCount) {
      resizeCanvas();
      drawImage(images[0]);
      requestAnimationFrame(animate);
    }
  };

  img.onerror = () => {
    console.error(`Failed to load image: ${imagePath(i)}`);
  };

  images.push(img);
}

/* ===============================
   DRAW IMAGE ON CANVAS
================================ */
function drawImage(img) {
  if (!img.complete) return;
  
  const dpr = window.devicePixelRatio || 1;
  const canvasWidth = canvas.width / dpr;
  const canvasHeight = canvas.height / dpr;

  const imgRatio = img.width / img.height;
  const canvasRatio = canvasWidth / canvasHeight;

  let drawWidth, drawHeight;

  if (imgRatio > canvasRatio) {
    drawHeight = canvasHeight;
    drawWidth = imgRatio * drawHeight;
  } else {
    drawWidth = canvasWidth;
    drawHeight = drawWidth / imgRatio;
  }

  const x = (canvasWidth - drawWidth) / 2;
  const y = (canvasHeight - drawHeight) / 2;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(img, x, y, drawWidth, drawHeight);
}

/* ===============================
   SCROLL PROGRESS CALCULATION
================================ */
function getScrollProgress() {
  const section = document.querySelector(".hero-section");
  const scrollTop = window.scrollY;
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight - window.innerHeight;

  return Math.min(
    Math.max((scrollTop - sectionTop) / sectionHeight, 0),
    1
  );
}

/* ===============================
   ANIMATION LOOP
================================ */
function animate() {
  const scrollProgress = getScrollProgress();
  const frameIndex = Math.floor(scrollProgress * (frameCount - 1));

  if (frameIndex !== currentFrame && images[frameIndex]) {
    currentFrame = frameIndex;
    drawImage(images[currentFrame]);
  }

  requestAnimationFrame(animate);
}

/* ===============================
   NAVIGATION FUNCTIONALITY
================================ */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('activescrolled');
  }
});

/* ===============================
   SCROLL REVEAL ANIMATIONS
================================ */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
  });
});

/* ===============================
   SMOOTH SCROLL ENHANCEMENTS
================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = target.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

/* ===============================
   CARD HOVER EFFECTS
================================ */
document.querySelectorAll('.skill-card, .project-card, .cert-card, .education-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

/* ===============================
   PERFORMANCE OPTIMIZATION
================================ */
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      ticking = false;
    });
    ticking = true;
  }
});

/* ===============================
   LOADING INDICATOR
================================ */
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  console.log('Portfolio website loaded successfully! 🚀');
  console.log(`Canvas animation with ${frameCount} frames`);
  console.log(`Images loaded: ${imagesLoaded}/${frameCount}`);
});

/* ===============================
   GEMINI CHATBOT LOGIC
================================ */
// Using a dynamic import to ensure it works within your existing script
import("https://esm.run/@google/generative-ai").then(module => {
    const { GoogleGenerativeAI } = module;

    const API_KEY = "AIzaSyCbNTdSqv5h8Go8gmvAXoijwtsxkwIbBkY"; 
    const genAI = new GoogleGenerativeAI(API_KEY);

    // Add your system prompt here
const systemPrompt = `
Personal Information

Name: Hiranmaye P

Career Objective

Aspiring civil engineer with demonstrated leadership and project management skills. Highly organized with proven ability to manage resources and schedules while maintaining strong attention to detail. Motivated and detail-oriented Civil Engineering undergraduate seeking an entry-level opportunity to apply technical knowledge in structural, geotechnical, and construction engineering while contributing to organizational growth and gaining hands-on industry experience.

Educational Qualifications
Degree	Institution	University / Board	Year	Percentage
B.E. Civil Engineering	Thanthai Periyar Government Institution of Technology	Anna University	2022–2026	77.10% (up to 6th semester)
HSC	St. Joseph Anglo Indian Higher Secondary School	State Board	2022	74.33%
SSLC	St. Joseph Anglo Indian Higher Secondary School	State Board	2020	82%
Technical Skills

AutoCAD

Revit

BIM

MS Office

Academic Project (Ongoing)

Title: Development of an Iron Carbonate Binder Using Industrial By-Products

Study of alternative sustainable binders for soil stabilization

Conducting UCS, compaction, and carbon curing tests

Analysis of strength improvement and carbon sequestration potential

Certifications

Advanced Contracts and Tendering (NPTEL)

Revit

BIM

Personal Skills

Strong communication skills

Teamwork and coordination

Leadership qualities

Time management

Fast learner

Problem-solving ability

Adaptability

Work ethics and discipline

Ability to handle pressure

Planning and organizing skills

Language Proficiency

English: Proficient

Tamil: Proficient / Native

French: Basic
`;

    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: systemPrompt,
    });

    const chatSession = model.startChat({ history: [] });

    // UI Elements
    const chatToggle = document.getElementById('chat-toggle');
    const chatContainer = document.getElementById('chat-container');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');

    // Toggle Window Logic - Fixed
    if (chatToggle && chatContainer) {
        chatToggle.addEventListener('click', (e) => {
            e.preventDefault();
            chatContainer.classList.toggle('chat-hidden');
            console.log("Chat toggled"); // Debug check
        });
    }

    if (closeChat) {
        closeChat.addEventListener('click', () => {
            chatContainer.classList.add('chat-hidden');
        });
    }

    async function handleChat() {
        const text = chatInput.value.trim();
        if (!text) return;

        appendMessage(text, true);
        chatInput.value = '';

        try {
            const result = await chatSession.sendMessage(text);
            const response = await result.response;
            appendMessage(response.text(), false);
        } catch (err) {
            appendMessage("I'm having trouble connecting.", false);
            console.error("Gemini Error:", err);
        }
    }

    function appendMessage(text, isUser) {
        const msg = document.createElement('div');
        msg.classList.add('message', isUser ? 'user-msg' : 'bot-msg');
        msg.innerText = text;
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    chatSend.addEventListener('click', handleChat);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChat();
    });
    
}).catch(err => console.error("Failed to load Gemini SDK:", err));
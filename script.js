document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.getElementById('preloader');

    function hidePreloader() {
        if (preloader) preloader.style.display = 'none';
    }

    window.addEventListener('load', hidePreloader);
    // Fallback: hide preloader after 5 seconds even if 'load' doesn't fire
    setTimeout(hidePreloader, 5000);

    // GSAP and ScrollTrigger registration
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // Hamburger Menu
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));

    // Hero Section Animations
    gsap.from(".hero-content .fade-in", {
        duration: 1,
        opacity: 0,
        y: 50,
        stagger: 0.2,
        ease: "power3.out"
    });

    // Scroll-based Animations
    const sections = gsap.utils.toArray('.content-section');
    sections.forEach(section => {
        gsap.from(section.querySelectorAll(".section-title, p, .project-card, .skill-category, .timeline-item, .card"), {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out"
        });
    });

    // Particles.js
    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#8A2BE2"
        },
        "shape": {
          "type": "circle",
        },
        "opacity": {
          "value": 0.5,
          "random": false,
        },
        "size": {
          "value": 3,
          "random": true,
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#8A2BE2",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 4,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "repulse"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "repulse": {
            "distance": 100,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          }
        }
      },
      "retina_detect": true
    });
});

const toggleButton = document.getElementById("themeToggle");
const toggleCheckbox = document.getElementById("t");
const toggle = toggleButton || toggleCheckbox;
const body = document.body;

function setTheme(mode) {
  if (mode === "dark") {
    body.classList.add("theme-dark");
    body.classList.remove("theme-light");
    document.documentElement.setAttribute('data-theme', 'dark');
    if (toggleButton) toggleButton.setAttribute("aria-pressed", "true");
    if (toggleCheckbox) toggleCheckbox.checked = true;
  } else {
    body.classList.add("theme-light");
    body.classList.remove("theme-dark");
    document.documentElement.setAttribute('data-theme', 'light');
    if (toggleButton) toggleButton.setAttribute("aria-pressed", "false");
    if (toggleCheckbox) toggleCheckbox.checked = false;
  }
  localStorage.setItem("theme-mode", mode);
}

function initTheme() {
  const stored = localStorage.getItem("theme-mode");
  if (stored === "dark" || stored === "light") {
    setTheme(stored);
    return;
  }
  const prefersDark = window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(prefersDark ? "dark" : "light");
}

if (toggleButton) {
  toggleButton.addEventListener("click", () => {
    const isDark = body.classList.contains("theme-dark");
    setTheme(isDark ? "light" : "dark");
  });

  toggleButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleButton.click();
    }
  });
}

if (toggleCheckbox) {
  toggleCheckbox.addEventListener("change", () => {
    setTheme(toggleCheckbox.checked ? "dark" : "light");
  });
}

initTheme();

// Guru chatbot with RAG backend support + local fallback
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotPanel = document.getElementById('chatbot-panel');
const chatbotMaximize = document.getElementById('chatbot-maximize');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotForm = document.getElementById('chatbot-form');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSuggestions = document.getElementById('chatbot-suggestions');
const chatbotHelp = document.getElementById('chatbot-help');

const suggestionPool = [
    "Introduce yourself",
    "What are your projects?",
    "Tell me about your skills",
    "Where are you from?",
    "Are you ready to relocate?",
    "What is your family background?",
    "What are your hobbies?",
    "Explain Visio-Voice project",
    "Explain Crowd Monitoring project",
    "Explain eKart project",
    "Explain Heart Disease project",
    "What are your career goals?",
    "What was your GPA?",
    "List your certifications",
    "Do you have any IEEE publications?",
    "How can I contact you?"
];

const projectDetailed = {
    visio: "**Visio-Voice** is an innovative, end-to-end accessibility pipeline specifically designed to assist visually impaired individuals by seamlessly converting visual information into audio descriptions. This project leverages advanced data augmentation techniques and model optimizations to significantly improve the accuracy and robustness of real-time caption generation workflows. At the core of the system, a Convolutional Neural Network (CNN) is utilized to perform deep image feature extraction, accurately identifying key objects and spatial contexts within a captured scene.\n\nFollowing the visual feature extraction, the system employs a Long Short-Term Memory (LSTM) network to generate coherent and human-like contextual text descriptions based on the analyzed features. This sequenced semantic data is then seamlessly passed through to the Google Text-to-Speech (gTTS) API, which synthesizes a clear and natural vocal output for the user. By combining deep learning paradigms with natural language processing, this application addresses critical daily challenges for the visually impaired, delivering a highly responsive, real-time auditory interface for situational awareness.\n\n - For more Detailed information - [github](https://github.com/guru3697/Visio-Voice)",
    crowd: "**The Crowd Monitoring project** is a sophisticated deep learning application built to proactively enhance public safety through the automated analysis of crowd behavior in real-time camera feeds. This system employs a highly optimized YOLO-style (You Only Look Once) architecture for rapid and accurate object detection, allowing it to reliably track multiple individuals simultaneously even in densely populated or cluttered environments. Key functionalities such as fight and event classification were fine-tuned using custom datasets to recognize anomalous movements indicative of an altercation or panic.\n\nIn addition to intelligent behavior classification, the pipeline incorporates a robust set of automated alerting rules that trigger immediate notifications when abnormal motion or high-risk safety events occur. By processing video frames efficiently, the system is designed to integrate into existing surveillance networks, providing security personnel with vital, rapid-response alarms. This significantly reduces human monitoring fatigue while substantially increasing the reliability of safety protocols in public spaces.\n\n - For more Detailed information - [github](https://github.com/guru3697/Crowd-Monitoring)",
    ekart: "**eKart** is a comprehensive, cloud-based e-commerce platform that demonstrates a robust full-stack architecture designed for modern online marketplaces. The application features a dynamic product listing catalog, an intuitive shopping cart interface, secure user authentication systems, and a complete end-to-end order processing flow. Furthermore, it incorporates a comprehensive administrative dashboard that enables real-time inventory tracking and dynamic user management, ensuring a seamless experience for both buyers and administrators.\n\nThe entire backend and database architecture is securely deployed on Amazon Web Services (AWS), utilizing scalable cloud components to easily handle fluctuating traffic loads without compromising performance. To ensure consistent uptime and reliability, a continuous integration and deployment pipeline was implemented. This allows for rapid iteration, reliable version control, and instant deployment of new features, showcasing a strong understanding of modern DevOps principles and cloud scalability.\n\n - For more Detailed information - [github](https://github.com/guru3697/eKart)",
    heart: "**The Heart Disease Prediction project** revolves around a supervised machine learning pipeline engineered to accurately assess and predict cardiovascular risks based on critical clinical data. The model was trained using a diverse dataset consisting of vital patient features such as age, resting blood pressure, cholesterol levels, and ECG results. A significant portion of the workflow involved meticulous feature engineering and data preprocessing to handle missing values, normalize scales, and highlight the most predictive variables for early heart disease detection.\n\nMultiple classification algorithms were evaluated and tuned to maximize precision and recall, ensuring that the model could minimize false negatives when assessing high-risk patients. Furthermore, explainability metrics and rigorous model evaluation techniques were employed so that healthcare professionals could clearly interpret the driving factors behind specific predictions. This project strongly emphasizes the intersection of healthcare and data science, utilizing predictive analytics as a powerful decision-support tool for medical diagnostics.\n\n - For more Detailed information - [github](https://github.com/guru3697/Heart-Disease-Prediction)",
    maze: "**The Maze Solving project** is a fascinating exploration into computer vision and classical image processing techniques designed to automatically compute the optimal route within a visual maze. The core of the algorithm relies heavily on morphological operations, specifically utilizing erosion and dilation techniques to clean up structural noise, segment the pathway from the walls, and accurately extract the topological map of the maze image.\n\nAfter refining the image and isolating the viable pathways, advanced contour detection and graph-based pathfinding algorithms are recursively applied to trace the shortest and most efficient route from the start point to the destination. This project demonstrates a deep understanding of algorithmic spatial analysis, matrix transformations, and how fundamental computer vision techniques can be practically applied to abstract problem-solving scenarios without relying on heavier neural network models.\n\n - For more Detailed information - [github](https://github.com/guru3697/Maze-Solving-Using-Morphological-Operations)",
    course: "**The University Course Re-registration System** is a specialized web application developed using the Django framework and a relational SQL database to streamline student enrollment workflows. The platform provides a dynamic user interface where students can browse available courses, check real-time seat availability, and manage their schedules. The backend logic is specifically tailored to handle complex schedule validation, ensuring that users are unable to register for overlapping classes or courses where fundamental prerequisites have not been met.\n\nBeyond managing student interactions, the system includes robust conflict checks, comprehensive audit logs, and automated notifications to further simplify the administrative process. By digitizing and automating the re-registration workflow, the application greatly reduces manual administrative overhead, cuts down on human error, and provides a much more transparent and user-friendly scheduling experience for the academic community."
};

const CHATBOT_DEBUG = false;
const RAG_SOURCE_FILES = [
    'assets/bot-data/about.txt',
    'assets/bot-data/education.txt',
    'assets/bot-data/projects.txt',
    'assets/bot-data/skills.txt',
    'assets/bot-data/contact.txt'
];
let ragContent = [];

function addMessage(text, sender) {
    if (!chatbotMessages) return;
    const msgEl = document.createElement('div');
    msgEl.className = `chatbot-message ${sender}`;
    
    // Escape HTML, then convert URLs and mailto/tel to clickable links
    let safeText = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    // Parse Markdown links [text](url) first
    safeText = safeText.replace(/\[([^\]]+)\]\((https?:\/\/[^\s<)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: var(--primary-color); text-decoration: underline;">$1</a>');
    
    // Ensure urlRegex ignores URLs already inside 'href="...' by using a negative lookbehind
    const urlRegex = /((?:^|\n|\s+)(?:[\-\*]\s+|\d+\.\s*)?)(.*?)\s*(?:-|–|—|:)\s*(?<!href=['"])(https?:\/\/[^\s<"]+|mailto:[^\s<"]+|tel:[^\s<"]+)|(?<!href=['"])(https?:\/\/[^\s<"]+|mailto:[^\s<"]+|tel:[^\s<"]+)/gi;
    
    safeText = safeText.replace(urlRegex, function(match, prefix, label, url1, url2) {
        let url = url1 || url2;
        let targetAttr = url.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : '';
        
        if (label && label.trim().length > 0) {
            return `${prefix}<a href="${url}"${targetAttr} style="color: var(--primary-color); text-decoration: underline;">${label.trim()}</a>`;
        } else {
            let displayUrl = url.replace(/^(mailto|tel):/i, '');
            return `<a href="${url}"${targetAttr} style="color: var(--primary-color); text-decoration: underline;">${displayUrl}</a>`;
        }
    });

    // Parse Markdown bold
    safeText = safeText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
    msgEl.innerHTML = safeText;
    
    chatbotMessages.appendChild(msgEl);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function addImageMessage(src, alt) {
    if (!chatbotMessages) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'chatbot-message bot chatbot-avatar';
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt || 'chatbot image';
    img.style.width = '80px';
    img.style.height = '80px';
    img.style.objectFit = 'contain';
    img.style.display = 'block';
    img.style.margin = '0 auto 0.5rem';
    wrapper.appendChild(img);
    chatbotMessages.appendChild(wrapper);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function initialBotPrompt() {
    addImageMessage('assets/chatbot.png', 'Chatbot');
    addMessage("Hi, I'm Guru. Ask me anything about myself.", 'bot');
}

function bestMatchFromRAG(question) {
    const q = question.trim().toLowerCase();
    if (!q) return null;

    let best = {score: 0, text: ''};
    ragContent.forEach(item => {
        const text = item.text.toLowerCase();
        let score = 0;
        q.split(/\s+/).forEach(tok => {
            if (tok.length < 3) return;
            if (text.includes(tok)) score += 1;
        });
        if (score > best.score) {
            best.score = score;
            best.text = item.text;
        }
    });

    return best.score > 0 ? best.text : null;
}

function decodeText(raw) {
    if (!raw || typeof raw !== 'string') return raw;
    // Convert escaped newline sequences to real newlines and trim.
    return raw.replace(/\\n/g, '\n').trim();
}

function isCategoryQuestion(question) {
    // project/skills/education categories are list-friendly, 'about' is narrative
    return /\b(projects?|education|skills?|tools|frameworks?)\b/i.test(question);
}

function personalAnswer(phrase) {
    if (!phrase || typeof phrase !== 'string') return phrase;
    return phrase
        .replace(/\bGuru\b/g, 'I')
        .replace(/\bGurunadh Kothuru\b/gi, 'I')
        .replace(/\byour portfolio assistant\b/gi, '')
        .trim();
}

function extractShortParagraph(text, sentenceCount = 3) {
    if (!text || typeof text !== 'string') return '';
    const normalized = decodeText(text).replace(/\n+/g, ' ');
    const sentences = normalized.split(/(?<=[.?!])\s+/).map(s => s.trim()).filter(Boolean);
    return sentences.slice(0, sentenceCount).join(' ').trim();
}

function truncateLongAnswer(answer) {
    if (!answer || typeof answer !== 'string') return answer;

    const words = answer.trim().split(/\s+/);
    if (words.length <= 90) return answer.trim();

    // Prefer first 3 bullet lines when possible
    const lines = answer.trim().split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    if (lines.length >= 3) {
        return lines.slice(0, 3).join('\n');
    }

    // fallback to first 3 sentences
    const sentences = answer.trim().split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(Boolean);
    return sentences.slice(0, 3).join(' ');
}

function formatAsBulletList(text) {
    if (!text || typeof text !== 'string') return text;
    let decoded = decodeText(text);

    // Remove common section headers for cleaner numbered list output.
    decoded = decoded.replace(/^\s*(Education|Skills|Contact|Projects|About|Certifications|Achievements)\s*:\s*/i, '');

    // Normalize pipeline separators to newline first.
    decoded = decoded.replace(/\s*\|\s*/g, '\n').replace(/;\s*/g, '\n');

    let items = decoded.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

    if (items.length === 1) {
        // Numeric list style in a single line: "1. A 2. B 3. C"
        const numericSplit = decoded.split(/\d+\.\s*/).map(l => l.trim()).filter(Boolean);
        if (numericSplit.length > 1) {
            items = numericSplit;
        } else {
            // Try sentence-based splitting if the string is one long paragraph.
            if (decoded.includes('. ') && !decoded.includes('\n')) {
                const sentenceSplit = decoded.split(/\.\s+/).map(l => l.trim()).filter(Boolean);
                if (sentenceSplit.length > 1) items = sentenceSplit;
            }
            // Further split comma-delimited lists.
            if (items.length === 1 && decoded.includes(',') && !decoded.match(/\d\./)) {
                const commaItems = decoded.split(/,\s*/).map(l => l.replace(/^[\-•\*]\s*/, '').trim()).filter(Boolean);
                if (commaItems.length > 1) items = commaItems;
            }
        }
    }

    const normalized = items.map(item => item.replace(/^[\-•\*]\s*/, '').replace(/^\d+\.\s*/, '').trim()).filter(Boolean);
    if (normalized.length < 2) {
        return decoded;
    }

    return normalized.map((item, index) => `${index + 1}. ${item}`).join('\n');
}

function formatResponse(question, rawAnswer) {
    const answer = decodeText(rawAnswer || '').trim();
    if (!answer) return '';

    const preferList = isCategoryQuestion(question) || /\b(list|all|items|points|steps|things|show me|details|tell me)\b/i.test(question);
    if (preferList) {
        const list = formatAsBulletList(answer);
        return truncateLongAnswer(list || answer);
    }

    return truncateLongAnswer(answer);
}

function formatRagAnswer(rawAnswer, question) {
    const answer = decodeText(rawAnswer);
    const isListIntent = /\b(list|all|items|points|steps|things|show me|details|tell me)\b/i.test(question);
    const isCategoryIntent = /\b(projects|skills|education|contact|experience|about|achievements|certifications)\b/i.test(question);

    if (isListIntent || isCategoryIntent) {
        return formatAsBulletList(answer);
    }

    return answer;
}

function extractAnswerSnippet(question, text) {
    const normalizedQ = question.toLowerCase();
    const queryTokens = normalizedQ.match(/[a-z0-9]{4,}/g) || [];

    if (/(visio.*voice|visio-voice)/i.test(normalizedQ)) {
        return "Visio-Voice is an image-to-audio accessibility solution for visually impaired users. It uses CNN-based image feature extraction, LSTM sequence generation, and text-to-speech (gTTS) to describe images verbally.";
    }

    if (/(crowd monitoring|fight detection)/i.test(normalizedQ)) {
        return "Crowd Monitoring project uses deep learning (YOLO-style approach) to detect abnormal crowd behavior and improve public safety with real-time alerts.";
    }

    if (/(eKart|e-commerce)/i.test(normalizedQ)) {
        return "eKart is a cloud-based e-commerce platform with product listing, user interaction, and AWS deployment for scalable online shopping.";
    }

    if (/(heart disease)/i.test(normalizedQ)) {
        return "Heart Disease Prediction model uses supervised ML on health features (age, blood pressure, cholesterol) to predict risk.";
    }

    if (/(maze solving)/i.test(normalizedQ)) {
        return "Maze Solving uses image processing morphological operations (erosion/dilation) to determine paths in maze images.";
    }

    if (!text || !queryTokens.length) {
        return null;
    }

    const sentences = text.split(/[\.\n]/).map(s => s.trim()).filter(Boolean);
    for (const sentence of sentences) {
        const lowerSent = sentence.toLowerCase();
        if (queryTokens.some(tok => lowerSent.includes(tok))) {
            return sentence;
        }
    }

    return null;
}

async function loadRagData() {
    // Prefer server-side parsed documents (including PDF resume)
    try {
        const response = await fetch(`${window.location.origin}/api/docs`);
        if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data.docs) && data.docs.length > 0) {
                ragContent = data.docs;
                return;
            }
        }
    } catch (err) {
        console.warn('Could not load /api/docs, falling back to local files:', err.message);
    }

    // Fallback to local text files if server docs were unavailable
    const entries = [];
    for (const pathUrl of RAG_SOURCE_FILES) {
        try {
            const response = await fetch(pathUrl);
            if (!response.ok) continue;
            const text = await response.text();
            if (text.trim()) {
                entries.push({source: pathUrl, text: decodeText(text.trim())});
            }
        } catch (err) {
            console.warn('Local RAG load error:', pathUrl, err);
        }
    }
    ragContent = entries;
}

function getLocalRagAnswer(question) {
    const lower = question.toLowerCase();

    const getDocText = (name) => {
        const doc = ragContent.find(item => item.source.toLowerCase().includes(name));
        return doc ? decodeText(doc.text) : '';
    };

    const extractSection = (text, headingPattern) => {
        if (!text) return '';
        const lines = text.split(/\r?\n/);
        const start = lines.findIndex(l => new RegExp(headingPattern, 'i').test(l));
        if (start === -1) return '';

        const sectionLines = [];
        for (let i = start + 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            if (/^[-]{3,}$/.test(line)) break;
            if (/^\s*#/i.test(line)) break;
            sectionLines.push(line);
        }
        return sectionLines.join('\n').trim();
    };

    const aboutText = getDocText('about');
    const educationText = getDocText('education');
    const projectsText = getDocText('projects');
    const skillsText = getDocText('skills');
    const contactText = getDocText('contact');
    const certificationsText = extractSection(aboutText, 'Certifications|Certifications / Courses');
    const publicationsText = extractSection(aboutText, 'Research Publications|Academic Work');

    if (/\b(resume|experience details|work experience|professional experience|career trajectory)\b/i.test(question)) {
        if (aboutText) {
            return "Here is my profile summary:\n" + aboutText.split(/---/)[2]?.trim() || aboutText;
        }
        return "I am a fresher with no prior industry experience, actively looking for an opportunity where I can apply my technical skills, gain hands-on experience, and contribute to meaningful projects.";
    }

    if (/\b(experience|industry|fresher|internship|work history)\b/i.test(question)) {
        return "I am a fresher with no prior industry experience, actively looking for an opportunity where I can apply my technical skills, gain hands-on experience, and contribute to meaningful projects.";
    }

    if (/\b(gpa|cgpa|percentage)\b/i.test(question)) {
        const gpas = [];
        const lines = educationText.split(/\n/).map(l => l.trim());
        lines.forEach(l => {
            const m = l.match(/(B\.Tech|Intermediate|High School|Amrita School of Engineering|Narayana Junior College|Dr\. KKR's Gowtham).*?([0-9]+\.?[0-9]*)\s*\/\s*10|([0-9]+\.?[0-9]*)/i);
            if (m) {
                const grade = m[1] || m[3];
                // fallback: capture GPA pattern later
            }
        });

        const gpaMatches = educationText.match(/GPA\s*[:\-]?\s*([0-9]+\.?[0-9]*)/gi) || [];
        const unique = [...new Set(gpaMatches.map(v => v.match(/([0-9]+\.?[0-9]*)/)[1]))];
        if (unique.length) {
            let resp = "I have the following GPA records:";
            if (unique[0]) resp += `\n- B.Tech GPA: ${unique[0]}/10`;
            if (unique[1]) resp += `\n- Intermediate GPA: ${unique[1]}/10`;
            if (unique[2]) resp += `\n- High School GPA: ${unique[2]}/10`;
            return resp;
        }

        // fallback: include interpreted education lines
        return "My education record includes: \n" + formatAsBulletList(educationText);
    }

    if (/\b(technical skills|skills|tool|tools|frameworks?)\b/i.test(question)) {
        if (skillsText) {
            return "Technical Skills:\n" + formatAsBulletList(skillsText);
        }
        return "I am skilled with Python, HTML/CSS, SQL, TensorFlow, PyTorch, scikit-learn, NumPy, OpenCV, Django, AWS, Git, MATLAB, and other data/AI tools.";
    }

    if (/\b(strength|strengths|personal traits)\b/i.test(question)) {
        return "Strengths / Personal Traits:\n- Quick learner and adaptable to new technologies\n- Strong problem-solving and analytical thinking\n- Team player with collaborative mindset\n- Passionate about AI and continuous learning\n- Ability to work on real-world projects";
    }

    if (/\b(weakness|improvement|areas of improvement|improve)\b/i.test(question)) {
        return "Areas of Improvement / Weakness:\n- Fresher with no industry experience\n- Actively improving through projects, research, and self-learning\n- Working on gaining more real-world exposure";
    }

    if (/\b(achievement|achievements|certifications|awards)\b/i.test(question)) {
        let responseParts = [];

        if (certificationsText) {
            responseParts.push("Certifications:\n" + certificationsText);
        } else if (aboutText.toLowerCase().includes('certifications')) {
            const certInfo = aboutText.match(/\bCertifications(?:\s*\/\s*Courses)?\b[\s\S]*?(?=---|$)/i);
            if (certInfo) responseParts.push(certInfo[0].trim());
        }

        if (publicationsText) {
            responseParts.push("Research Publications / Academic Work:\n" + publicationsText);
        } else if (aboutText.toLowerCase().includes('research publications') || aboutText.toLowerCase().includes('academic work')) {
            const pubInfo = aboutText.match(/\bResearch Publications(?:\s*\/\s*Academic Work)?\b[\s\S]*?(?=---|$)/i);
            if (pubInfo) responseParts.push(pubInfo[0].trim());
        }

        if (responseParts.length) {
            return responseParts.join('\n\n');
        }

        return "No certifications or achievements are listed in the profile data.";
    }

    if (/(research|publication|paper|ieee)/i.test(question)) {
        if (publicationsText) {
            return "Research Publications / Academic Work:\n" + publicationsText;
        }
        if (aboutText.toLowerCase().includes('research publications') || aboutText.toLowerCase().includes('academic work')) {
            const info = aboutText.match(/\bResearch Publications(?:\s*\/\s*Academic Work)?\b[\s\S]*?(?=---|$)/i);
            if (info) return info[0].trim();
            return "Research publications are mentioned in profile data. (Compiler for Mathematical Operations, Visio-Voice, eKart, Energy Management System).";
        }
        return "No publications are listed in the current profile data.";
    }

    if (/\b(objectives?|goals?|career objective|career goal)\b/i.test(lower)) {
        return "Career Objective / Goals:\n- To work as an AI/ML Engineer in a growth-oriented organization\n- To build scalable and impactful AI solutions\n- To specialize in NLP, LLMs, and data-driven systems\n- To continuously learn and contribute to cutting-edge technologies";
    }

    if (/(phone.*number|mobile.*number|\bphone\b|\bmobile\b|\bcall\b)/i.test(lower)) {
        return "Phone: \ntel:+918074899831 (+91-8074899831)";
    }

    if (/(email(?!\s)|\bgmail\b|\bmail\b)/i.test(lower)) {
        return "Email: \nmailto:guruvenkat99@gmail.com (guruvenkat99@gmail.com)";
    }

    if (/\b(linkedin|linked in)\b/i.test(lower)) {
        return "LinkedIn: \nhttps://www.linkedin.com/in/gurunadh-kothuru-0b3743217/";
    }

    if (/\b(github|git hub)\b/i.test(lower)) {
        return "GitHub: \nhttps://github.com/guru3697";
    }

    if (/(contact|get in touch|reach out)/i.test(lower)) {
        return "Here are my contact details:\n- Phone: tel:+918074899831 (+91-8074899831)\n- Email: mailto:guruvenkat99@gmail.com (guruvenkat99@gmail.com)\n- LinkedIn: \n  https://www.linkedin.com/in/gurunadh-kothuru-0b3743217/\n- GitHub: \n  https://github.com/guru3697";
    }

    // explicit fallback category mapping
    const categoryMap = [
        {regex: /\b(skills?)\b/i, file: 'skills'},
        {regex: /\b(education|school|college|university|graduation)\b/i, file: 'education'},
        {regex: /\b(about|who is|tell me about)\b/i, file: 'about'}
    ];

    for (const map of categoryMap) {
        if (map.regex.test(lower)) {
            const match = ragContent.find(item => item.source.includes(map.file));
            if (match) {
                if (CHATBOT_DEBUG) console.debug(`source= ${map.file} (category)`);
                return formatResponse(question, match.text);
            }
        }
    }

    if (/^(who are you|what('?| )s your name|name|who is gurunadh|who is gurunadh kothuru)$/i.test(lower)) {
        return "I am Gurunadh Kothuru, an aspiring AI engineer and machine learning enthusiast.";
    }

    if (/(introduce|tell me about yourself|about yourself|tell me about you|about me|who is gurunadh)/i.test(lower)) {
        return "Hi! I am Gurunadh Kothuru, a passionate AI/ML Engineer from Vijayawada, Andhra Pradesh. I recently graduated with a B.Tech in Artificial Intelligence Engineering from Amrita School of Engineering. I love building practical, impactful AI solutions, ranging from deep learning models for accessibility, to cloud-based e-commerce platforms. Currently, I am focused on continuously learning and applying my skills in real-world environments!";
    }

    if (/(expertise|specialization|expert)/i.test(lower)) {
        return "My expertise lies in building end-to-end AI and Machine Learning solutions. I specialize in Computer Vision, Natural Language Processing, and Deep Learning architectures, alongside developing robust full-stack web applications and scalable cloud deployments using AWS.";
    }

    if (/(hobbies|hobby|free time|leisure)/i.test(lower)) {
        return "My hobbies include following tech news, exploring new tools and technology, playing and watching cricket, and watching movies.";
    }

    if (/(family|parents|father|mother|sister)/i.test(lower)) {
        return "My father has his own business in Vijayawada, and my mother manages our house. I also have an older sister who is married and has a daughter.";
    }

    if (/(relocate|shift locations?)/i.test(lower)) {
        return "I am completely ready to relocate if there is any good opportunity.";
    }

    if (/(about)/i.test(lower)) {
        const match = ragContent.find(item => item.source.includes('about'));
        if (match) {
            return personalAnswer(truncateLongAnswer(extractShortParagraph(match.text, 3)));
        }
    }

    if (/(hi|hello|hey|greetings)/i.test(lower)) {
        return "Hello! I’m Guru. Ask me anything about education, projects, skills, or contact information.";
    }

    if (/(study|education|school|college|university|graduation)/i.test(lower)) {
        const match = ragContent.find(item => item.source.includes('education'));
        if (match) return match.text;
    }

    if (/(explain any 1 project|explain any project|explain one project)/i.test(lower)) {
        return "I can explain any of these:\n1. Visio-Voice\n2. Crowd Monitoring\n3. eKart\n4. Heart Disease Prediction\n5. Maze Solving\n6. University Course Re-registration";
    }

    if (/\b(project\s*4|heart disease)\b/i.test(lower)) {
        return projectDetailed.heart;
    }
    if (/\b(project\s*1|visio.*voice|visio-voice)\b/i.test(lower)) {
        return projectDetailed.visio;
    }
    if (/\b(project\s*2|crowd monitoring|fight detection)\b/i.test(lower)) {
        return projectDetailed.crowd;
    }
    if (/\b(project\s*3|ekart|e-commerce)\b/i.test(lower)) {
        return projectDetailed.ekart;
    }
    if (/\b(project\s*5|maze solving)\b/i.test(lower)) {
        return projectDetailed.maze;
    }
    if (/\b(project\s*6|course re-registration|re-registration)\b/i.test(lower)) {
        return projectDetailed.course;
    }

    if (/(projects?|project list|list projects)/i.test(lower)) {
        return `Here are my projects:

**1. Visio-Voice**
 - An end-to-end accessibility pipeline converting images to audio for the visually impaired.
 - Implements data augmentation, model optimizations, and real-time caption workflows.
 - For more Detailed information - [github](https://github.com/guru3697/Visio-Voice)

**2. Crowd Monitoring**
 - A crowd behavior detection system using YOLO-style object detection and safety event classification.
 - Evaluates abnormal motion and triggers safety alerts in real-time camera feeds.
 - For more Detailed information - [github](https://github.com/guru3697/Crowd-Monitoring)

**3. eKart**
 - A full-stack cloud ecommerce platform deployed on AWS with scalable continuous integration.
 - Integrates product catalog, user authentication, and an administrative dashboard.
 - For more Detailed information - [github](https://github.com/guru3697/eKart)

**4. Heart Disease Prediction**
 - A supervised ML pipeline predicting cardiovascular risk from a dashboard of clinical features.
 - Utilizes feature engineering, model evaluation, and robust explainability metrics.
 - For more Detailed information - [github](https://github.com/guru3697/Heart-Disease-Prediction)

**5. Maze Solving**
 - A computer vision system solving maze images using erosion and dilation techniques.
 - Computes optimal routes by applying contour detection and graph-based pathfinding.
 - For more Detailed information - [github](https://github.com/guru3697/Maze-Solving-Using-Morphological-Operations)

**6. Course Re-registration**
 - A Django/SQL web system streamlining student course selection and enrollment workflows.
 - Incorporates conflict checks, audit logs, and clear, user-friendly interfaces.`;
    }

    if (/(skills?|technical skills)/i.test(lower)) {
        const match = ragContent.find(item => item.source.includes('skills'));
        if (match) return match.text;
    }

    if (/(contact|email|phone|linkedin|github)/i.test(lower)) {
        const match = ragContent.find(item => item.source.includes('contact'));
        if (match) return match.text;
    }

    if (/(gpa|cgpa|percentage)/i.test(lower)) {
        const education = ragContent.find(item => item.source.includes('education'))?.text || '';
        const gpaMatches = (education.match(/GPA\s*[:\-]?\s*([0-9]+\.?[0-9]*)/gi) || []).map(v => v.match(/([0-9]+\.?[0-9]*)/)[1]);
        if (gpaMatches.length) {
            const [btech, inter, high] = gpaMatches;
            let output = 'My GPA details are:';
            if (btech) output += `\n- B.Tech: ${btech}/10`;
            if (inter) output += `\n- Intermediate: ${inter}/10`;
            if (high) output += `\n- High School: ${high}/10`;
            return output;
        }
        return "My profile contains education details but exact GPA values are not found in the text.";
    }
    if (/visio.*voice.*algorithm/i.test(lower) || /(what|which).*(algorithm|models?).*(visio.*voice)/i.test(lower)) {
        return "The profile entry for Visio-Voice does not list specific algorithms. It is an image-to-sound solution, so likely the project uses computer vision + audio synthesis pipelines (image feature extraction and sound mapping).";
    }

    if (/(paper publications|publications|research paper|ieee)/i.test(lower)) {
        const aboutMatch = ragContent.find(item => item.source.includes('about'));
        const pubs = aboutMatch ? extractSection(aboutMatch.text, 'Research Publications|Academic Work') : '';
        if (pubs) {
            return "Research Publications / Academic Work:\n" + pubs;
        }
        return "No publications are listed in the current profile data.";
    }

    if (/(top|best).*(project|projects)/i.test(lower) || /(project|projects).*(top|best)/i.test(lower)) {
        const projects = ragContent.find(item => item.source.includes('projects'));
        if (projects) {
            const lines = projects.text.split(/[\n\.]+/).map(l => l.trim()).filter(Boolean);
            const top = lines.slice(0, 3);
            if (top.length) {
                return `Top 3 projects:\n1. ${top[0]}\n2. ${top[1] || top[0]}\n3. ${top[2] || top[1] || top[0]}`;
            }
        }
    }

    if (/(project|projects)/i.test(lower)) {
        const match = ragContent.find(item => item.source.includes('projects'));
        if (match) return formatResponse(question, match.text);
    }

    if (/(skill|skills|tool|tools|framework)/i.test(lower)) {
        const match = ragContent.find(item => item.source.includes('skills'));
        if (match) return formatResponse(question, match.text);
    }

    if (/(contact|email|phone|linkedin|github)/i.test(lower)) {
        const match = ragContent.find(item => item.source.includes('contact'));
        if (match) return formatResponse(question, match.text);
    }

    if (/(explain any 1 project|explain any project)/i.test(lower)) {
        return "Pick one for details: 1. Visio-Voice, 2. Crowd Monitoring, 3. eKart, 4. Heart Disease Prediction, 5. Maze Solving, 6. Course Re-registration.";
    }

    if (/(explain|about).*\b(visio|crowd|ekart|heart|maze|course)\b/i.test(lower)) {
        if (/visio/.test(lower)) return projectDetailed.visio;
        if (/crowd/.test(lower)) return projectDetailed.crowd;
        if (/ekart|e-commerce/.test(lower)) return projectDetailed.ekart;
        if (/heart|heart disease/.test(lower)) return projectDetailed.heart;
        if (/maze/.test(lower)) return projectDetailed.maze;
        if (/course|re-registration/.test(lower)) return projectDetailed.course;
    }

    // no 
    if (/(achievements|certifications|awards)/i.test(lower)) {
        return "No achievements or certifications are listed in the current profile data.";
    }

    if (/(publications|papers|research)/i.test(lower)) {
        return "No publications are listed in the current profile data.";
    }

    if (/(name|who are you)/i.test(lower)) {
        return "I am Guru, portfolio assistant for Gurunadh Kothuru.";
    }

    if (/(native place|where.*from|location|city|town)/i.test(lower)) {
        return "I'm from Vijayawada, Andhra Pradesh. But I'm ready to relocate if there is any opportunity.";
    }

    if (/(how are you|how do you do|i.*good)/i.test(lower)) {
        return "I am a chatbot assistant built to answer questions about Gurunadh; I don't have personal feelings, but I’m here to help.";
    }

    if (/\b(learn|learning|experience|skillset).*(project|projects)/i.test(lower)) {
        const proj = ragContent.find(item => item.source.includes('projects'));
        if (proj) {
            return "During projects, Guru learned advanced AI/ML model development, cloud deployment, and practical data science problem solving.\n" +
                formatAsBulletList(proj.text);
        }
    }

    const best = bestMatchFromRAG(question);
    if (best) {
        const snippet = extractAnswerSnippet(question, best);
        let final;
        if (snippet) {
            if (CHATBOT_DEBUG) console.debug('source= RAG-snippet');
            final = formatResponse(question, snippet);
        } else {
            if (CHATBOT_DEBUG) console.debug('source= RAG-best');
            const short = best.split(/[.?!]\s+/).map(s => s.trim()).filter(Boolean).slice(0, 3).join('. ');
            final = formatResponse(question, short);
        }
        return truncateLongAnswer(final);
    }

    return "I’m focused on Gurunadh’s profile data and can only answer directly from those details.";
}

async function queryGuruBot(question) {
    addMessage('⏳ Guru is thinking...', 'bot');

    try {
        const response = await fetch(`${window.location.origin}/api/query`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ question })
        });

        if (response.ok) {
            const data = await response.json();
            const loading = chatbotMessages.querySelector('.bot:last-child');
            if (loading && loading.textContent === '⏳ Guru is thinking...') loading.remove();
            const rawAnswer = data.answer || 'Sorry, I could not answer that right now.';
            const out = formatResponse(question, rawAnswer);
            addMessage(out, 'bot');
            return;
        }

        console.warn('API /api/query response non-ok', response.status);
        throw new Error(`API status ${response.status}`);
    } catch (error) {
        const loading = chatbotMessages.querySelector('.bot:last-child');
        if (loading && loading.textContent === '⏳ Guru is thinking...') loading.remove();

        const localAnswer = getLocalRagAnswer(question);
        addMessage(localAnswer, 'bot');
        console.error('RAG server fetch failed; using local static QA. Error:', error);
    }
}

function renderSuggestions() {
    if (!chatbotSuggestions) return;
    chatbotSuggestions.innerHTML = '';
    
    // Pick 3 random
    const shuffled = [...suggestionPool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    
    selected.forEach(text => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'chatbot-chip';
        btn.textContent = text;
        btn.onclick = () => {
            if(chatbotInput) {
                chatbotInput.value = text;
                if (chatbotForm && typeof chatbotForm.requestSubmit === 'function') {
                    chatbotForm.requestSubmit();
                } else if (chatbotForm) {
                    chatbotForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                }
            }
        };
        chatbotSuggestions.appendChild(btn);
    });
}

function openChatbot() {
    if (!chatbotPanel) return;
    chatbotPanel.classList.add('open');
    chatbotPanel.setAttribute('aria-hidden', 'false');
    if (chatbotInput) chatbotInput.focus();
    renderSuggestions();
}

function closeChatbot() {
    if (!chatbotPanel) return;
    chatbotPanel.classList.remove('open');
    chatbotPanel.setAttribute('aria-hidden', 'true');
}

function toggleChatbotFullscreen() {
    if (!chatbotPanel) return;
    chatbotPanel.classList.toggle('fullscreen');
}

function makeDraggable(element, handle) {
    if (!element || !handle) return;
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;
    let hasMoved = false;

    const onMouseDown = (e) => {
        if (e.target.classList.contains('resize-handle') || e.target.tagName.toLowerCase() === 'button') {
            if (e.target !== handle) return;
        }
        
        isDragging = true;
        hasMoved = false;
        startX = e.clientX;
        startY = e.clientY;
        
        const rect = element.getBoundingClientRect();
        
        if (!element.style.left) element.style.left = rect.left + 'px';
        if (!element.style.top) element.style.top = rect.top + 'px';
        element.style.right = 'auto';
        element.style.bottom = 'auto';
        
        initialLeft = parseFloat(element.style.left) || rect.left;
        initialTop = parseFloat(element.style.top) || rect.top;

        element.style.transition = 'none';
        document.body.style.cursor = 'grabbing';
        if (handle !== chatbotToggle) e.preventDefault();
    };

    const onMouseMove = (e) => {
        if (!isDragging) return;
        
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved = true;
        
        let newLeft = initialLeft + dx;
        let newTop = initialTop + dy;
        
        const rect = element.getBoundingClientRect();
        const maxX = window.innerWidth - rect.width;
        const maxY = window.innerHeight - rect.height;
        
        newLeft = Math.max(0, Math.min(newLeft, maxX));
        newTop = Math.max(0, Math.min(newTop, maxY));

        element.style.left = newLeft + 'px';
        element.style.top = newTop + 'px';
    };

    const onMouseUp = () => {
        if (isDragging) {
            isDragging = false;
            document.body.style.cursor = '';
            element.style.transition = ''; 
        }
    };

    handle.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    if (element === chatbotToggle) {
        handle.addEventListener('click', (e) => {
            if (hasMoved) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
        }, true);
    }
}

function makeResizable(panel) {
    if (!panel) return;
    const handles = panel.querySelectorAll('.resize-handle');
    let activeHandle = null;
    let startX, startY, startWidth, startHeight, startLeft, startTop;

    handles.forEach(handle => {
        handle.addEventListener('mousedown', e => {
            activeHandle = e.target.dataset.dir;
            e.preventDefault();
            
            const rect = panel.getBoundingClientRect();
            startWidth = rect.width;
            startHeight = rect.height;
            startLeft = rect.left;
            startTop = rect.top;
            startX = e.clientX;
            startY = e.clientY;
            
            panel.style.right = 'auto';
            panel.style.bottom = 'auto';
            panel.style.left = startLeft + 'px';
            panel.style.top = startTop + 'px';
            
            panel.style.transition = 'none';
        });
    });

    document.addEventListener('mousemove', e => {
        if (!activeHandle) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        let newWidth = startWidth;
        let newHeight = startHeight;
        let newLeft = startLeft;
        let newTop = startTop;

        const minW = 280, minH = 300; 

        if (activeHandle.includes('e')) {
            newWidth = startWidth + dx;
            if (newWidth < minW) newWidth = minW;
        }
        if (activeHandle.includes('s')) {
            newHeight = startHeight + dy;
            if (newHeight < minH) newHeight = minH;
        }
        if (activeHandle.includes('w')) {
            newWidth = startWidth - dx;
            if (newWidth >= minW) {
                newLeft = startLeft + dx;
            } else {
                newWidth = minW;
                newLeft = startLeft + (startWidth - minW);
            }
        }
        if (activeHandle.includes('n')) {
            newHeight = startHeight - dy;
            if (newHeight >= minH) {
                newTop = startTop + dy;
            } else {
                newHeight = minH;
                newTop = startTop + (startHeight - minH);
            }
        }

        panel.style.width = newWidth + 'px';
        panel.style.height = newHeight + 'px';
        panel.style.left = newLeft + 'px';
        panel.style.top = newTop + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (activeHandle) {
            activeHandle = null;
            panel.style.transition = '';
        }
    });
}

async function initChatbot() {
    initialBotPrompt();
    await loadRagData();
}

if (chatbotToggle) {
    makeDraggable(chatbotToggle, chatbotToggle);
    chatbotToggle.addEventListener('click', () => {
        if (chatbotPanel.classList.contains('open')) closeChatbot();
        else openChatbot();
    });
}
if (chatbotPanel) {
    const header = chatbotPanel.querySelector('.chatbot-header');
    if (header) makeDraggable(chatbotPanel, header);
    makeResizable(chatbotPanel);
}
if (chatbotMaximize) {
    chatbotMaximize.addEventListener('click', toggleChatbotFullscreen);
}
if (chatbotHelp) {
    chatbotHelp.addEventListener('click', () => {
        addMessage("You can ask me about:\n\n- **My Background & Introduction**\n- **Education & GPA**\n- **Technical Skills & Tools**\n- **Details on Projects** (e.g. Visio-Voice, eKart)\n- **Certifications & Publications**\n- **Hobbies, Goals, & Family**\n- **Contact Information**", "bot");
    });
}
if (chatbotClose) {
    chatbotClose.addEventListener('click', closeChatbot);
}
if (chatbotForm) {
    chatbotForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const question = chatbotInput.value.trim();
        if (!question) return;
        addMessage(question, 'user');
        chatbotInput.value = '';
        renderSuggestions(); // Refresh suggestion chips dynamically on each send
        await queryGuruBot(question);
    });
}

if (chatbotInput) {
    chatbotInput.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey && !event.metaKey) {
            event.preventDefault();
            if (chatbotForm) {
                chatbotForm.requestSubmit();
            }
        }
    });
}

initChatbot();

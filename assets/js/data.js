/* ------------------------------------------------------------------
   ALL CONTENT LIVES HERE. Edit this file, not the layout.
   Every fact below was checked against the project files, a report or a
   certificate. Repositories not listed in `projects` still appear on the
   site automatically: they are read live from GitHub.
------------------------------------------------------------------- */
window.SITE = {
  person: {
    name: "Zainab Alameri",
    first: "Zainab",
    role: "Computer Science & AI student",
    school: "Effat University",
    email: "cs.zainabalameri@gmail.com",
    github: "Zalameri",
    linkedin: "https://www.linkedin.com/in/zainab-alameri-b09610348",
    phone: { display: "+966 50 024 2867", tel: "+966500242867" },
    photo: "assets/img/zainab.webp",
    photoAlt: "Portrait of Zainab Alameri"
  },

  /* New GitHub repositories appear on the site only when they carry this topic.
     Add it on GitHub: repository page → About (gear icon) → Topics → "portfolio". */
  showTopic: "portfolio",

  /* GitHub repos that never show on the site (labs, tests, the profile itself) */
  hiddenRepos: ["studybuddy-flashcards", "apply-board", "Zalameri", "Zalameri.github.io", "CS3081AI", "hello-github", "Software-Engineering", "Three-Reports-README.md"],

  categories: { ai: "AI systems", web: "Web apps", data: "Databases", software: "Software", research: "Research", tools: "Tools & CLI" },

  projects: [
    {
      slug: "aquagent",
      featured: true,
      title: "AquaGent",
      category: "ai",
      label: "AI decision support · Water harvesting",
      oneLiner: "An AI decision-support system that recommends the best way to harvest drinking water from the air: a fog-catching net or a water-absorbing MOF material, and for how long.",
      repo: "aquagent",
      course: "CS3081 Artificial Intelligence · CS3151 Software Engineering",
      instructor: "Dr. Passent Elkafrawy",
      when: "Nov 2026",
      status: "Working prototype",
      accent: "aqua",
      tech: ["Python", "Streamlit", "Bayesian inference", "CSP / backtracking", "unittest", "SRS & UML"],
      cover: "assets/img/projects/aquagent-ui.webp",
      coverAlt: "AquaGent interface: intelligent atmospheric water-harvesting decision support system, with weather, sensor and operating-limit inputs",
      phone: "assets/img/projects/aquagent-phone.webp",
      stats: [
        { value: "45", label: "unit tests passing" },
        { value: "10", label: "simulated scenarios" },
        { value: "2", label: "AI methods combined" }
      ],
      problem: "Atmospheric water harvesting depends on humidity, temperature, fog and wind, all of which change hour by hour. No single method suits every condition, and a poor choice wastes both energy and water. Operators need a clear, justified answer to one question: which method should run today, and for how long?",
      solution: "AquaGent combines two AI techniques. A Bayesian model estimates the probability of fog from the sensor reading, and a constraint solver lists every plan that is safe and fits the available time and energy. The feasible plans are then ranked and presented with an explanation, and the operator approves or rejects the recommendation. The system advises; it never controls equipment directly.",
      features: [
        "Bayesian fog probability that accounts for sensor accuracy; a missing reading falls back to the prior instead of guessing",
        "Constraint solver over harvesting method and duration, respecting safety, time, energy and weather limits",
        "Side-by-side comparison of a mesh fog collector and a MOF-303 sorbent bed",
        "Ranks only feasible plans and explains why the others were rejected",
        "Sensor validation that flags missing or out-of-range readings",
        "Operator approval step, run history and CSV export"
      ],
      gallery: [
        { src: "assets/img/projects/aquagent-diagram.webp", alt: "AquaGent system solution diagram: inputs, input checks, Bayesian network and CSP analysis, fog collector vs MOF sorbent bed, recommendation, output and operator decision", caption: "System architecture diagram" },
        { src: "assets/img/projects/aquagent-inputs.webp", alt: "AquaGent input panel: weather, sensors and safety, operating limits and collector specifications", caption: "Interface: weather, sensor and collector inputs" },
        { src: "assets/img/projects/aquagent-results.webp", alt: "AquaGent results: Bayesian posterior and the recommended plan", caption: "Interface: Bayesian posterior and ranked recommendation" },
        { src: "assets/img/projects/aquagent-infographic.webp", alt: "AquaGent infographic: the problem, the read-compare-recommend solution, the two harvesting methods and how it works", caption: "Project infographic", tall: true }
      ],
      role: "I led the project end to end: I defined the requirements and SRS, designed the Bayesian and constraint-satisfaction approach, and delivered the working prototype with its test suite",
      teamSize: 2,
      notes: "A course prototype: Bayesian parameters, yields and energy rates are illustrative assumptions, not field measurements."
    },
    {
      slug: "plantcare-ai",
      featured: true,
      title: "PlantCare AI",
      category: "ai",
      label: "Computer vision · Plant health",
      oneLiner: "A web app that turns a single leaf photo into a structured diagnosis: species, disease, severity, treatment and trusted sources.",
      repo: "plantcare-ai",
      when: "Nov 2026",
      status: "Source on GitHub",
      accent: "leaf",
      tech: ["React 19", "TypeScript", "Tailwind CSS", "TanStack Start", "Zod", "OpenAI API", "Vitest", "GitHub Actions"],
      cover: "assets/img/projects/plantcare-upload.webp",
      phone: "assets/img/projects/plantcare-phone.webp",
      coverAlt: "PlantCare AI upload page with a drop zone for a leaf photo and a list of what the diagnosis report includes",
      stats: [
        { value: "12", label: "Vitest tests passing" },
        { value: "8 MB", label: "maximum photo size" },
        { value: "CI", label: "automated quality checks" }
      ],
      problem: "Gardeners often notice leaf discolouration without knowing the cause, while online advice is fragmented and frequently unreliable.",
      solution: "The app prepares the photo in the browser, validates it again on the server and sends it to a vision model that must answer in a fixed format. Every answer is checked before it is shown, and source links are limited to recognised agricultural institutions. The result is a consistent, trustworthy report every time.",
      features: [
        "Drag-and-drop upload for JPG, PNG or WebP images up to 8 MB, resized automatically before sending",
        "API key kept securely on the server; every request is validated",
        "Fixed report structure enforced by a JSON schema and Zod validation",
        "Clearly states when a photo does not show a plant instead of guessing",
        "Sources limited to trusted institutions such as UC IPM, FAO, USDA, RHS and PlantVillage",
        "Severity and confidence levels so uncertain results are clearly marked"
      ],
      gallery: [
        { src: "assets/img/projects/plantcare-upload.webp", alt: "PlantCare AI upload page", caption: "Image upload interface" }
      ],
      role: "Solo project",
      teamSize: 1
    },
    {
      slug: "smart-study",
      featured: true,
      title: "Smart Study",
      category: "web",
      label: "Full-stack web · Student productivity",
      oneLiner: "A study planner that brings courses, the weekly timetable, chapter notes and self-generated quizzes together in one place, in English or Arabic.",
      repo: "smart-study",
      course: "CS2111 Web Application Development",
      when: "Dec 2025",
      status: "Source on GitHub",
      accent: "coral",
      tech: ["HTML", "CSS", "JavaScript", "PHP 8", "MySQL", "Gemini API", "Node test runner"],
      cover: "assets/img/projects/smartstudy-ui.webp",
      coverAlt: "Smart Study dashboard: plan your week, summarize chapters and get exam-ready",
      phone: "assets/img/projects/smartstudy-phone.webp",
      stats: [
        { value: "17", label: "automated tests passing" },
        { value: "3", label: "quiz formats + exam mode" },
        { value: "EN/AR", label: "bilingual support" }
      ],
      problem: "Students manage courses, timetables, notes and revision material across separate tools, losing valuable time before examinations.",
      solution: "Smart Study brings everything into one platform. Students organise their courses and weekly schedule, write chapter notes, and generate quizzes directly from their own key points, with an optional timed exam mode and AI-generated chapter summaries.",
      features: [
        "Secure accounts with hashed passwords; each user sees only their own data",
        "Colour-coded courses and a weekly schedule of classes and study sessions",
        "Chapter notes with extracted key points",
        "Multiple-choice, true/false and fill-in-the-blank quizzes generated from the student's notes, with a timed exam mode",
        "Full support for English and Arabic notes",
        "Optional AI chapter summaries using the Gemini API"
      ],
      gallery: [
        { src: "assets/img/projects/smartstudy-schedule.webp", alt: "Smart Study week view with classes and a study block on each day", caption: "Weekly schedule" },
        { src: "assets/img/projects/smartstudy-quiz.webp", alt: "A five-question mixed quiz generated from the Uncertainty chapter notes", caption: "Quiz generated from chapter notes" },
        { src: "assets/img/projects/smartstudy-chapters.webp", alt: "Chapters page with a saved chapter of seven key points", caption: "Chapters and key points" },
        { src: "assets/img/projects/smartstudy-dashboard.webp", alt: "Smart Study dashboard with courses, a focus timer and today's plan", caption: "Dashboard" },
        { src: "assets/img/projects/smartstudy-login.webp", alt: "Smart Study sign-in page", caption: "Sign-in page" }
      ],
      role: "I led the project end to end: I defined the scope and features, coordinated the team and delivered the full-stack application",
      teamSize: 3
    },
    {
      slug: "student-grade-tracker",
      featured: false,
      title: "Student Grade Tracker",
      category: "tools",
      label: "Python · Command-line application",
      oneLiner: "A Python command-line program that calculates student grades, validates every input and summarises results for the whole class.",
      repo: "Student-Grade-Tracker",
      when: "Aug 2026",
      status: "Source on GitHub",
      accent: "sun",
      tech: ["Python", "pytest", "GitHub Actions"],
      terminal: [
        "Enter student name: Sarah",
        "Enter quiz grade: abc",
        "Invalid input (grade must be a number).",
        "Enter quiz grade: 20",
        "Total Grade: 85.0",
        "Status: Pass"
      ],
      stats: [{ value: "17", label: "pytest tests passing" }],
      problem: "The original implementation terminated whenever a user entered an invalid grade.",
      solution: "I refactored it into modular, testable functions with full input validation, multi-student support and a class summary report.",
      features: [
        "Re-prompts the user instead of crashing on invalid input",
        "Handles several students per run, with the class average and pass count",
        "Unit tests and continuous integration"
      ],
      role: "Solo project",
      teamSize: 1
    },
    {
      slug: "student-course-management",
      featured: false,
      title: "Student Course Management System",
      category: "data",
      label: "Database design · MariaDB",
      oneLiner: "A relational database that manages course registration, grades and attendance for a university, from the ER model to SQL reports.",
      repo: null,
      deliverable: "Course report",
      course: "CS2071 Database Systems",
      when: "May 2025",
      status: "Course project",
      accent: "violet",
      tech: ["MariaDB", "SQL", "ER modelling", "Views", "Joins"],
      cover: "assets/img/projects/scms-erd.webp",
      coverAlt: "Entity-relationship diagram: Student, Course, Instructor and Log Attendance with Registers, Teaches, Attends and Has Attendance relationships",
      stats: [{ value: "6", label: "tables" }, { value: "4", label: "relationships" }, { value: "4", label: "reports and views" }],
      problem: "Course registration, grading and attendance relied on spreadsheets and paper forms, resulting in lost records, delays and inconsistent data.",
      solution: "We modelled students, instructors, courses, registrations and attendance as an entity-relationship diagram, translated it into MariaDB tables with primary and foreign keys, loaded sample data and wrote reporting queries: each student's courses, attendance rates per course and absences on a given day, plus a reusable view of absent students.",
      features: [
        "ER model with many-to-many registration and teaching relationships",
        "Attendance log linked to both students and courses",
        "Primary and foreign keys that guarantee valid registrations",
        "Reporting queries using joins and aggregation, including attendance rates",
        "A reusable view that lists absent students"
      ],
      gallery: [
        { src: "assets/img/projects/scms-entities.webp", alt: "Tables of entities, attributes and relationship types from the report", caption: "Entities and relationships" }
      ],
      role: "I led the project end to end: I drove the entity-relationship design, the relational schema and the reporting queries",
      teamSize: 3
    },
    {
      slug: "atm-management-system",
      featured: false,
      title: "ATM Management System",
      category: "software",
      label: "Java · Object-oriented design",
      oneLiner: "A Java console application that simulates an ATM: secure login, checking and savings accounts, transfers, transaction history and admin tools.",
      repo: null,
      deliverable: "Course report",
      course: "CS2132 Object-Oriented Programming",
      instructor: "Dr. Fidaa Abed",
      when: "Dec 2025",
      status: "Course project",
      accent: "sun",
      tech: ["Java", "OOP", "Inheritance", "File I/O"],
      classes: ["Account", "CheckingAccount", "SavingsAccount", "User", "Transaction"],
      stats: [{ value: "2", label: "account types via inheritance" }, { value: "3", label: "persistent data files" }, { value: "0", label: "external libraries" }],
      problem: "The objective was to apply object-oriented design to a realistic banking system with multiple users, account types and a complete transaction history.",
      solution: "The design uses an Account base class with Checking and Savings subclasses. Each user can hold several accounts, and every account records its transactions. A menu-driven console handles login, balance enquiries, deposits, withdrawals and transfers, and all data is saved to files between sessions.",
      features: [
        "Secure login with automatic account locking",
        "Checking and savings accounts built through inheritance",
        "Deposits, withdrawals and transfers with validation",
        "Time-stamped transaction history",
        "Admin tools to create users and accounts, reset PINs and unlock accounts",
        "Data saved in users, accounts and transactions files"
      ],
      role: "I led the project end to end: I designed the class structure and coordinated delivery of the Java application",
      teamSize: 2
    },
    {
      slug: "phishing-attacks",
      featured: false,
      title: "Phishing Attacks & How to Stop Them",
      category: "research",
      label: "Cybersecurity · Research & talk",
      oneLiner: "A research report and presentation on how phishing deceives people, what it costs organisations and which habits and controls prevent it.",
      repo: null,
      deliverable: "Course report",
      course: "CS3067 Information & Cybersecurity",
      instructor: "Dr. Sohail Khan",
      when: "Dec 2025",
      status: "Research & presentation",
      accent: "coral",
      tech: ["Threat analysis", "Social engineering", "MFA", "Security awareness"],
      poster: { title: "Phishing Attacks", sub: "& how to stop them", steps: ["Think", "Check", "Don't enter", "Report"] },
      stats: [{ value: "5", label: "phishing types compared" }, { value: "1", label: "real-world case study" }, { value: "4", label: "step prevention habit" }],
      problem: "Phishing exploits human behaviour rather than technical flaws: messages appear legitimate, create urgency and cost attackers almost nothing.",
      solution: "We explained how phishing works, compared five attack types (email, fake websites, SMS, voice and spear phishing), analysed the 2020 Twitter breach as a case study, and translated prevention into practical controls and a simple four-step habit for users.",
      features: [
        "Why phishing succeeds: realism, urgency, low awareness and low cost",
        "Five attack types compared side by side",
        "Impact on organisations: financial loss, account takeover, data breaches, malware and downtime",
        "Case study: the 2020 Twitter breach",
        "Prevention: multi-factor authentication, staff training, email filtering and link verification"
      ],
      gallery: [
        { src: "assets/img/projects/phishing-practices.webp", alt: "Slide: best practices against phishing: think, check, don't enter, report", caption: "Recommended best practices" },
        { src: "assets/img/projects/phishing-what.webp", alt: "Slide: what is phishing", caption: "What is phishing" },
        { src: "assets/img/projects/phishing-impact.webp", alt: "Slide: impact of phishing", caption: "Impact of phishing" }
      ],
      role: "I led the project end to end: I structured the research, developed the case study and delivered the final presentation",
      teamSize: 3
    }
  ],

  /* each skill lists the project slugs where it was really used */
  skillGroups: [
    { name: "Languages", skills: [
      { name: "Python", projects: ["aquagent", "student-grade-tracker"] },
      { name: "TypeScript", projects: ["plantcare-ai"] },
      { name: "JavaScript", projects: ["smart-study", "plantcare-ai"] },
      { name: "Java", projects: ["atm-management-system"] },
      { name: "PHP", projects: ["smart-study"] },
      { name: "SQL", projects: ["student-course-management", "smart-study"] },
      { name: "HTML & CSS", projects: ["smart-study", "plantcare-ai"] }
    ]},
    { name: "AI & reasoning", skills: [
      { name: "Bayesian inference", projects: ["aquagent"] },
      { name: "Constraint satisfaction", projects: ["aquagent"] },
      { name: "Decision support", projects: ["aquagent"] },
      { name: "Vision LLM APIs", projects: ["plantcare-ai"] },
      { name: "Gemini API", projects: ["smart-study"] }
    ]},
    { name: "Frameworks & data", skills: [
      { name: "React", projects: ["plantcare-ai"] },
      { name: "Tailwind CSS", projects: ["plantcare-ai"] },
      { name: "Streamlit", projects: ["aquagent"] },
      { name: "Zod", projects: ["plantcare-ai"] },
      { name: "MySQL / MariaDB", projects: ["smart-study", "student-course-management"] }
    ]},
    { name: "Engineering practice", skills: [
      { name: "Unit testing", projects: ["aquagent", "plantcare-ai", "smart-study", "student-grade-tracker"] },
      { name: "GitHub Actions CI", projects: ["plantcare-ai", "student-grade-tracker"] },
      { name: "Object-oriented design", projects: ["atm-management-system"] },
      { name: "ER modelling", projects: ["student-course-management"] },
      { name: "Requirements (SRS) & UML", projects: ["aquagent"] },
      { name: "Git & GitHub", projects: ["plantcare-ai", "smart-study", "student-grade-tracker"] }
    ]},
    { name: "Security & research", skills: [
      { name: "Phishing & social engineering", projects: ["phishing-attacks"] },
      { name: "Security controls (MFA)", projects: ["phishing-attacks"] },
      { name: "Secret handling & input validation", projects: ["plantcare-ai", "smart-study"] },
      { name: "Literature review", projects: ["aquagent"] },
      { name: "Presenting & pitching", projects: ["aquagent", "phishing-attacks"] }
    ]}
  ],

  /* dated from git history, reports and certificates */
  journey: [
    { when: "Mar 2025", title: "First certifications", text: "Completed Digital Safety and Security (Arizona State University) and Academic Information Seeking (University of Copenhagen & DTU)." },
    { when: "May 2025", title: "Database design", text: "Led the Student Course Management System, from the ER model to SQL reports." },
    { when: "Sep 2025", title: "Peer Tutor", text: "Began tutoring fellow students, a role I held until May 2026." },
    { when: "Nov 2025", title: "Community service", text: "26 volunteer hours: awareness content for a charity and a residents' survey for a municipality." },
    { when: "Dec 2025", title: "Three team projects", text: "Led Smart Study, the ATM Management System and the phishing research project." },
    { when: "Aug 2026", title: "First public repository", text: "Published Student Grade Tracker on GitHub." },
    { when: "Sep 2026", title: "Peer Academic Advisor", text: "Started advising students on planning and registering their course schedules." },
    { when: "Oct 2026", title: "Dean's List & IEEEXtreme 20.0", text: "Named to the Dean's List of Effat College of Engineering and competed in IEEE's global 24-hour programming competition." },
    { when: "Nov 2026", title: "AquaGent & PlantCare AI", text: "Delivered an AI decision-support system and a plant-disease detection platform, and completed 25 certified volunteer hours." }
  ],

  education: {
    school: "Effat University",
    degree: "BSc Computer Science, Artificial Intelligence track",
    when: "Expected Jun 2028",
    courses: ["CS3081 Artificial Intelligence", "CS3151 Software Engineering", "CS3072 Data Science"]
  },

  /* Honours and competitions, from the certificates Zainab photographed */
  recognition: [
    {
      kind: "Academic honour",
      title: "Dean's List",
      org: "Effat College of Engineering · Effat University",
      when: "Oct 2026",
      text: "Recognised by Effat College of Engineering for outstanding academic achievement in the 2025–2026 academic year, and honoured at the Dean's List ceremony.",
      img: "assets/img/recognition/deans-list.webp",
      alt: "Zainab holding her Dean's List certificate from Effat College of Engineering, wearing the Dean's List sash"
    },
    {
      kind: "IEEE membership · Competitive programming",
      title: "IEEEXtreme 20.0",
      org: "IEEE Member · representing Effat University, College of Engineering",
      when: "Oct 2026",
      text: "As an IEEE member, I competed in IEEEXtreme 20.0, IEEE's global 24-hour programming competition, solving algorithmic problems with my team on behalf of Effat University. Our participation was celebrated at the university's excellence and achievement ceremony.",
      big: "24h",
      bigLabel: "global programming competition",
      img: "assets/img/recognition/ieeextreme-certificate.webp",
      alt: "Zainab's IEEEXtreme 20.0 certificate of participation",
      img2: "assets/img/recognition/ieeextreme-ceremony.webp",
      alt2: "Effat University IEEEXtreme 20.0 excellence and achievement recognition ceremony programme, with the IEEEXtreme screens behind"
    }
  ],

  experience: [
    { when: "Sep 2026 – Present", title: "Peer Academic Advisor", org: "Effat University", text: "Advise fellow students on planning and registering their course schedules." },
    { when: "Sep 2025 – May 2026", title: "Peer Tutor", org: "Effat University", text: "Tutored fellow students and supported their progress in their courses." },
    { when: "May 2025 – Nov 2026", title: "Project Lead", org: "Team course projects", text: "Led five team projects in artificial intelligence, software engineering, databases, object-oriented programming and cybersecurity." },
    { when: "Oct 2026 – Nov 2026", title: "Volunteer", org: "National Volunteering Platform", text: "25 certified volunteer hours, recognised by the National Center for Non-Profit Sector." },
    { when: "Nov 2025", title: "Awareness Content Volunteer", org: "Hifz Al-Ni'ma Charity, Al-Bada'i", text: "16 hours creating awareness content for the charity." },
    { when: "Nov 2025", title: "Community Survey Volunteer", org: "Municipal residents' survey", text: "10 hours collecting residents' feedback on municipal services." }
  ],

  certificates: [
    { title: "Introduction to DevOps", issuer: "IBM", via: "Coursera", date: "Nov 2026", img: "assets/img/certs/devops.webp", url: "https://coursera.org/verify/C4JFDYG25VXC" },
    { title: "Intellectual Property as Competitive Advantage for Companies", issuer: "EDHEC Business School", via: "Coursera", date: "Nov 2026", img: "assets/img/certs/ip-edhec.webp", url: "https://coursera.org/verify/VJV8JWZGPHEV" },
    { title: "Design Brainstorming Diagrams for Businesses with Creately", issuer: "Coursera Project Network", via: "Coursera", date: "Nov 2026", img: "assets/img/certs/creately.webp", url: "https://coursera.org/verify/OJ2AS90IXSLI" },
    { title: "Create a Business Mind Map with Coggle", issuer: "Coursera Project Network", via: "Coursera", date: "Nov 2026", img: "assets/img/certs/coggle.webp", url: "https://coursera.org/verify/PDCGCHV4Y1CP" },
    { title: "Business Strategy: Business Model Canvas Analysis with Miro", issuer: "Coursera Project Network", via: "Coursera", date: "Oct 2026", img: "assets/img/certs/bmc-miro.webp", url: "https://coursera.org/verify/RULODZZIL5MK" },
    { title: "Digital Safety and Security", issuer: "Arizona State University", via: "Coursera", date: "Mar 2025", img: "assets/img/certs/digital-safety.webp", url: "https://coursera.org/verify/U40B0NFKYBCE" },
    { title: "Academic Information Seeking", issuer: "University of Copenhagen & DTU", via: "Coursera", date: "Mar 2025", img: "assets/img/certs/academic-info.webp", url: "https://coursera.org/verify/2SPHFRCNXEIG" }
  ]
};

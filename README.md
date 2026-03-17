# 🚀 Devcation Hack 'N' Solve 2026

[![GDG IGDTUW](https://img.shields.io/badge/GDG-IGDTUW-blue?style=flat-square)](https://github.com/aryan-mishra219)
[![GDG IITD](https://img.shields.io/badge/GDG-IIT%20Delhi-red?style=flat-square)](https://github.com/aryan-mishra219)
[![Status](https://img.shields.io/badge/Status-Live-success?style=flat-square)]()

**Devcation Hack 'N' Solve** is a national-level hackathon organized by **Google Developer Groups (GDG) IGDTUW** in collaboration with **GDG IIT Delhi**. This landing page is an immersive, high-performance experience built to reflect the convergence of speed, skill, and code.

🔗 **[Live Demo: Insert Your Deployed Link Here]**

---

## ✨ Key Features & USPs

### 1. Interactive Hacker Terminal (FAQ)
Instead of a standard FAQ, this project features a **custom Command Line Interface (CLI)**.
* **Command Logic:** Users can type `help`, `tracks`, `timeline`, or `sudo register` to interact with the event data.
* **Visuals:** Includes a simulated typewriter effect, system-level responses, and access-granted sequences.

### 2. Dual-Layer Canvas Systems
The site utilizes two distinct HTML5 Canvas engines for a "Cyber-Plum" aesthetic:
* **Hero Particle System:** A floating node network in the header that reacts to mouse movement with gentle repulsion.
* **Network Connection Simulator:** Located in the 'About' section, this canvas features 90+ nodes that connect dynamically based on proximity and react to clicks with a scattering force.

### 3. Advanced UI/UX Components
* **3D Holographic Parallax:** The hero mascot (Horse/Stag) and text column use a 15° rotational tilt that tracks the cursor using `requestAnimationFrame` for buttery-smooth performance.
* **Magnetic Social Buttons:** Social icons use a magnetic pull effect, shifting slightly toward the user's cursor when hovered.
* **Staggered Scroll Reveals:** Sections and track cards utilize intersection observers (via custom JS) to slide into view with varying delays.

### 4. Real-time Event Management
* **Dynamic Countdown:** A high-precision timer with a "tick" CSS animation that updates every second.
* **Interactive Timeline:** A roadmap of the event phases (Registration, Submission, Mentorship, Finale) with expandable details.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3 (Custom Properties, 3D Perspectives, Glassmorphism)
* **Scripting:** Vanilla JavaScript (ES6 logic for Terminal, Canvas, and DOM manipulation)
* **Libraries:** FontAwesome 6.5.1 (Icons)
* **Typography:** Google Fonts (Inter, Space Grotesk, Playfair Display)

---

## 📂 File Structure

```text
├── index.html   # Main layout, SEO meta tags, and terminal structure
├── style.css    # Core styling, responsive queries, and keyframe animations
├── script.js    # Logic for terminal, 3D parallax, and canvas systems
└── horse.png    # Low-poly hero mascot image

/* ════════════════════════════════════════════════════════
   DEVCATION HACK 'N' SOLVE  —  SCRIPT
   ════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Floating Particle System ───────────────────────────
  var canvas = document.getElementById('particleCanvas');
  var ctx = canvas.getContext('2d');
  var particles = [];
  var mouseX = 0;
  var mouseY = 0;
  var PARTICLE_COUNT = 60;

  function resizeCanvas() {
    var hero = document.getElementById('home');
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }

  function Particle() {
    this.reset();
  }

  Particle.prototype.reset = function () {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2.5 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.hue = Math.random() > 0.5 ? 258 : 175; // purple or teal
  };

  Particle.prototype.update = function () {
    // gentle mouse repulsion
    var dx = this.x - mouseX;
    var dy = this.y - mouseY;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 120) {
      var force = (120 - dist) / 120;
      this.x += dx * force * 0.02;
      this.y += dy * force * 0.02;
    }

    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  };

  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = 'hsla(' + this.hue + ', 70%, 65%, ' + this.opacity + ')';
    ctx.fill();
  };

  function initParticles() {
    particles = [];
    for (var i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  }

  function drawLines() {
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(108, 92, 231, ' + (0.06 * (1 - dist / 140)) + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    drawLines();
    requestAnimationFrame(animateParticles);
  }

  window.addEventListener('resize', function () {
    resizeCanvas();
  });

  document.querySelector('.hero').addEventListener('mousemove', function (e) {
    var rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  resizeCanvas();
  initParticles();
  animateParticles();

  // ── Cursor Glow ────────────────────────────────────────
  var cursorGlow = document.createElement('div');
  cursorGlow.className = 'cursor-glow';
  document.body.appendChild(cursorGlow);

  document.addEventListener('mousemove', function (e) {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
    if (!cursorGlow.classList.contains('visible')) {
      cursorGlow.classList.add('visible');
    }
  });

  document.addEventListener('mouseleave', function () {
    cursorGlow.classList.remove('visible');
  });

  // ── Countdown Timer (with tick animation) ──────────────
  var DEADLINE = new Date();
  DEADLINE.setDate(DEADLINE.getDate() + 30);

  var $days  = document.getElementById('cd-days');
  var $hours = document.getElementById('cd-hours');
  var $mins  = document.getElementById('cd-mins');
  var $secs  = document.getElementById('cd-secs');
  var prevVals = { d: '', h: '', m: '', s: '' };

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function applyTick(el, newVal) {
    if (el.textContent !== newVal) {
      el.textContent = newVal;
      el.classList.remove('tick');
      // force reflow
      void el.offsetWidth;
      el.classList.add('tick');
    }
  }

  function tickCountdown() {
    var now  = Date.now();
    var diff = Math.max(0, DEADLINE.getTime() - now);

    var d = pad(Math.floor(diff / (1000 * 60 * 60 * 24)));
    var h = pad(Math.floor((diff / (1000 * 60 * 60)) % 24));
    var m = pad(Math.floor((diff / (1000 * 60)) % 60));
    var s = pad(Math.floor((diff / 1000) % 60));

    applyTick($days, d);
    applyTick($hours, h);
    applyTick($mins, m);
    applyTick($secs, s);
  }

  tickCountdown();
  setInterval(tickCountdown, 1000);

  // ── Navbar: scroll class ───────────────────────────────
  var navbar = document.getElementById('navbar');

  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // ── Navbar: active link on scroll ──────────────────────
  var sections = document.querySelectorAll('section[id], footer[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  function setActiveLink() {
    var current = '';
    sections.forEach(function (sec) {
      var top = sec.offsetTop - 120;
      if (window.scrollY >= top) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', setActiveLink);

  // ── Mobile nav toggle ──────────────────────────────────
  var navToggle = document.getElementById('navToggle');
  var navMenu   = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  navMenu.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });

  // ── Section scroll reveal ──────────────────────────────
  var revealSections = document.querySelectorAll('[data-reveal]');

  function checkSectionReveal() {
    var trigger = window.innerHeight * 0.82;
    revealSections.forEach(function (sec) {
      if (sec.getBoundingClientRect().top < trigger) {
        sec.classList.add('revealed');
      }
    });
  }

  window.addEventListener('scroll', checkSectionReveal);
  checkSectionReveal();

  // ── Track cards: staggered scroll reveal ───────────────
  var trackCards = document.querySelectorAll('.track-card');

  function revealTrackCards() {
    var trigger = window.innerHeight * 0.88;
    trackCards.forEach(function (card, i) {
      if (card.getBoundingClientRect().top < trigger && !card.classList.contains('revealed')) {
        setTimeout(function () {
          card.classList.add('revealed');
        }, i * 120);
      }
    });
  }

  window.addEventListener('scroll', revealTrackCards);
  revealTrackCards();

  // ── Timeline: scroll reveal ────────────────────────────
  var timelineItems = document.querySelectorAll('.timeline-item');

  function revealTimeline() {
    var trigger = window.innerHeight * 0.85;
    timelineItems.forEach(function (item, i) {
      var rect = item.getBoundingClientRect();
      if (rect.top < trigger && !item.classList.contains('visible')) {
        setTimeout(function () {
          item.classList.add('visible');
        }, i * 150);
      }
    });
  }

  window.addEventListener('scroll', revealTimeline);
  revealTimeline();

  // ── Timeline: expand/collapse details ──────────────────
  document.querySelectorAll('.timeline-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card    = btn.closest('.timeline-card');
      var details = card.querySelector('.timeline-details');
      var isOpen  = details.classList.contains('open');

      // Close all first
      document.querySelectorAll('.timeline-details.open').forEach(function (d) {
        d.classList.remove('open');
        d.closest('.timeline-card').querySelector('.timeline-toggle').classList.remove('open');
      });

      // Toggle current
      if (!isOpen) {
        details.classList.add('open');
        btn.classList.add('open');
      }
    });
  });

  // ── Smooth scroll for all anchor links ─────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Track cards: tilt + mouse glow follow ──────────────
  document.querySelectorAll('.track-card[data-tilt]').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x    = e.clientX - rect.left;
      var y    = e.clientY - rect.top;
      var cx   = rect.width / 2;
      var cy   = rect.height / 2;

      var rotateX = ((y - cy) / cy) * -6;
      var rotateY = ((x - cx) / cx) * 6;

      card.style.transform = 'perspective(600px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-8px)';

      // Update CSS custom properties for glow follow
      card.style.setProperty('--mouse-x', x + 'px');
      card.style.setProperty('--mouse-y', y + 'px');
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });

  // ── Magnetic social buttons ────────────────────────────
  document.querySelectorAll('.social-btn').forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      var rect = btn.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.15 - 4) + 'px) scale(1.08)';
    });

    btn.addEventListener('mouseleave', function () {
      btn.style.transform = '';
    });
  });

  // ── Parallax glow orbs on scroll ───────────────────────
  var glow1 = document.querySelector('.hero-glow--1');
  var glow2 = document.querySelector('.hero-glow--2');

  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      glow1.style.transform = 'translate(' + (scrollY * 0.05) + 'px, ' + (scrollY * 0.08) + 'px) scale(' + (1 + scrollY * 0.0003) + ')';
      glow2.style.transform = 'translate(' + (-scrollY * 0.04) + 'px, ' + (scrollY * 0.06) + 'px) scale(' + (1 + scrollY * 0.0002) + ')';
    }
  });

  // ══════════════════════════════════════════════════════════
  // ── NETWORK CONNECTION SIMULATOR (About Section Canvas) ─
  // ══════════════════════════════════════════════════════════

  var netCanvas = document.getElementById('networkCanvas');
  var netCtx = netCanvas.getContext('2d');
  var NET_NODE_COUNT = 90;
  var NET_CONNECT_DIST = 100;
  var NET_MOUSE_RADIUS = 150;
  var nodes = [];
  var netMouseX = -9999;
  var netMouseY = -9999;
  var isRepulsing = false;
  var repulseTimer = null;

  // Resize the network canvas to fill the about section
  function resizeNetCanvas() {
    var section = document.querySelector('.about-section');
    if (!section) return;
    netCanvas.width = section.offsetWidth;
    netCanvas.height = section.offsetHeight;
  }

  // Node constructor
  function NetNode() {
    this.init();
  }

  NetNode.prototype.init = function () {
    this.x = Math.random() * netCanvas.width;
    this.y = Math.random() * netCanvas.height;
    this.radius = Math.random() * 2 + 1;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.baseVx = this.vx;
    this.baseVy = this.vy;
    this.opacity = Math.random() * 0.6 + 0.2;
    // Color: mix of teal and purple hues
    this.hue = Math.random() > 0.6 ? 258 : 175;
    this.saturation = 60 + Math.random() * 20;
    this.lightness = 55 + Math.random() * 15;
  };

  NetNode.prototype.update = function () {
    // Mouse interaction
    var dx = this.x - netMouseX;
    var dy = this.y - netMouseY;
    var dist = Math.sqrt(dx * dx + dy * dy);

    if (isRepulsing && dist < NET_MOUSE_RADIUS * 2) {
      // Repulsion: scatter outward from cursor
      var repForce = (NET_MOUSE_RADIUS * 2 - dist) / (NET_MOUSE_RADIUS * 2);
      this.vx += dx * repForce * 0.15;
      this.vy += dy * repForce * 0.15;
    } else if (!isRepulsing && dist < NET_MOUSE_RADIUS) {
      // Attraction: gently pull toward cursor
      var attrForce = (NET_MOUSE_RADIUS - dist) / NET_MOUSE_RADIUS;
      this.vx -= dx * attrForce * 0.008;
      this.vy -= dy * attrForce * 0.008;
    }

    // Damping: slowly return to base velocity
    this.vx += (this.baseVx - this.vx) * 0.02;
    this.vy += (this.baseVy - this.vy) * 0.02;

    // Apply velocity
    this.x += this.vx;
    this.y += this.vy;

    // Wrap around edges
    if (this.x < 0) this.x = netCanvas.width;
    if (this.x > netCanvas.width) this.x = 0;
    if (this.y < 0) this.y = netCanvas.height;
    if (this.y > netCanvas.height) this.y = 0;
  };

  NetNode.prototype.draw = function () {
    netCtx.beginPath();
    netCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    netCtx.fillStyle = 'hsla(' + this.hue + ', ' + this.saturation + '%, ' + this.lightness + '%, ' + this.opacity + ')';
    netCtx.shadowBlur = 8;
    netCtx.shadowColor = 'hsla(' + this.hue + ', 80%, 60%, 0.3)';
    netCtx.fill();
    netCtx.shadowBlur = 0;
  };

  // Initialize nodes
  function initNetNodes() {
    nodes = [];
    for (var i = 0; i < NET_NODE_COUNT; i++) {
      nodes.push(new NetNode());
    }
  }

  // Draw connections between close nodes
  function drawNetConnections() {
    for (var i = 0; i < nodes.length; i++) {
      for (var j = i + 1; j < nodes.length; j++) {
        var dx = nodes[i].x - nodes[j].x;
        var dy = nodes[i].y - nodes[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < NET_CONNECT_DIST) {
          var opacity = 0.15 * (1 - dist / NET_CONNECT_DIST);
          netCtx.beginPath();
          netCtx.moveTo(nodes[i].x, nodes[i].y);
          netCtx.lineTo(nodes[j].x, nodes[j].y);
          netCtx.strokeStyle = 'rgba(108, 92, 231, ' + opacity + ')';
          netCtx.lineWidth = 0.6;
          netCtx.stroke();
        }
      }

      // Draw brighter connections between nodes and mouse
      var mdx = nodes[i].x - netMouseX;
      var mdy = nodes[i].y - netMouseY;
      var mdist = Math.sqrt(mdx * mdx + mdy * mdy);

      if (mdist < NET_MOUSE_RADIUS) {
        var mOpacity = 0.35 * (1 - mdist / NET_MOUSE_RADIUS);
        netCtx.beginPath();
        netCtx.moveTo(nodes[i].x, nodes[i].y);
        netCtx.lineTo(netMouseX, netMouseY);
        netCtx.strokeStyle = 'rgba(0, 206, 201, ' + mOpacity + ')';
        netCtx.lineWidth = 0.8;
        netCtx.stroke();
      }
    }
  }

  // Draw small cursor dot on canvas
  function drawNetCursor() {
    if (netMouseX < 0 || netMouseY < 0) return;
    netCtx.beginPath();
    netCtx.arc(netMouseX, netMouseY, 3, 0, Math.PI * 2);
    netCtx.fillStyle = 'rgba(0, 206, 201, 0.6)';
    netCtx.shadowBlur = 15;
    netCtx.shadowColor = 'rgba(0, 206, 201, 0.5)';
    netCtx.fill();
    netCtx.shadowBlur = 0;
  }

  // Main animation loop for network canvas
  function animateNetwork() {
    netCtx.clearRect(0, 0, netCanvas.width, netCanvas.height);

    for (var i = 0; i < nodes.length; i++) {
      nodes[i].update();
      nodes[i].draw();
    }

    drawNetConnections();
    drawNetCursor();

    requestAnimationFrame(animateNetwork);
  }

  // Mouse events for the about section
  var aboutSection = document.querySelector('.about-section');

  aboutSection.addEventListener('mousemove', function (e) {
    var rect = netCanvas.getBoundingClientRect();
    netMouseX = e.clientX - rect.left;
    netMouseY = e.clientY - rect.top;
  });

  aboutSection.addEventListener('mouseleave', function () {
    netMouseX = -9999;
    netMouseY = -9999;
  });

  // Click repulsion effect
  aboutSection.addEventListener('click', function () {
    isRepulsing = true;
    clearTimeout(repulseTimer);
    repulseTimer = setTimeout(function () {
      isRepulsing = false;
    }, 400);
  });

  window.addEventListener('resize', function () {
    resizeNetCanvas();
  });

  // Initialize network
  resizeNetCanvas();
  initNetNodes();
  animateNetwork();

  // ── About Stats: count-up animation on scroll ──────────
  var aboutStats = document.querySelectorAll('.about-stat');
  var statsCounted = false;

  function animateCount(el, target) {
    var start = 0;
    var duration = 1800;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // ease-out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(step);
  }

  function checkStatsReveal() {
    var trigger = window.innerHeight * 0.82;
    aboutStats.forEach(function (stat, i) {
      if (stat.getBoundingClientRect().top < trigger && !stat.classList.contains('revealed')) {
        setTimeout(function () {
          stat.classList.add('revealed');
        }, i * 120);
      }
    });

    // Count-up once visible
    if (!statsCounted) {
      var firstStat = aboutStats[0];
      if (firstStat && firstStat.getBoundingClientRect().top < trigger) {
        statsCounted = true;
        document.querySelectorAll('.about-stat-num[data-count]').forEach(function (num) {
          var target = parseInt(num.getAttribute('data-count'), 10);
          animateCount(num, target);
        });
      }
    }
  }

  window.addEventListener('scroll', checkStatsReveal);
  checkStatsReveal();

  // ══════════════════════════════════════════════════════════
  // ── HACKER TERMINAL (FAQ Section) ───────────────────────
  // ══════════════════════════════════════════════════════════

  var terminalEl    = document.getElementById('terminal');
  var terminalInput = document.getElementById('terminalInput');
  var terminalDisplay = document.getElementById('terminalDisplay');
  var terminalOutput  = document.getElementById('terminalOutput');
  var terminalBody    = document.getElementById('terminalBody');

  // Click anywhere in terminal → focus the hidden input
  terminalEl.addEventListener('click', function (e) {
    // Keep focus inside terminal without jumping
    terminalInput.focus({ preventScroll: true });
  });

  // Mirror typed text to the visible display span
  terminalInput.addEventListener('input', function () {
    terminalDisplay.textContent = terminalInput.value;
  });

  // Command definitions
  var COMMANDS = {
    'help': function () {
      return [
        { text: 'Available commands:', cls: 'term-response' },
        { text: '  help                  — Show this help message', cls: 'term-response' },
        { text: '  devcation --about     — About the hackathon', cls: 'term-response' },
        { text: '  sudo register         — Register for the event', cls: 'term-response' },
        { text: '  tracks                — View hackathon tracks', cls: 'term-response' },
        { text: '  timeline              — Event timeline overview', cls: 'term-response' },
        { text: '  clear                 — Clear the terminal', cls: 'term-response' }
      ];
    },

    'devcation --about': function () {
      return [
        { text: '╔══════════════════════════════════════╗', cls: 'term-cmd' },
        { text: '║  DEVCATION HACK \'N\' SOLVE 2026       ║', cls: 'term-cmd' },
        { text: '╚══════════════════════════════════════╝', cls: 'term-cmd' },
        { text: '', cls: 'term-response' },
        { text: 'Devcation Hack \'N\' Solve is a national-level', cls: 'term-response' },
        { text: 'hackathon organized by Google Developer Groups', cls: 'term-response' },
        { text: 'IGDTUW in collaboration with GDG IIT Delhi.', cls: 'term-response' },
        { text: '', cls: 'term-response' },
        { text: '→ 500+ participants  |  48 hrs of hacking', cls: 'term-success' },
        { text: '→ 4 tracks  |  50+ mentors  |  Grand Finale @ IIT Delhi', cls: 'term-success' }
      ];
    },

    'sudo register': function () {
      return [
        { text: '[sudo] password for visitor: ********', cls: 'term-system' },
        { text: '', cls: 'term-response' },
        { text: '✓ ACCESS GRANTED', cls: 'term-success' },
        { text: '✓ Registration portal unlocked!', cls: 'term-success' },
        { text: '', cls: 'term-response' },
        { text: '→ Click here to register:', cls: 'term-response' },
        { html: '<a href="#register" class="term-link">▶ https://devcation.gdgigdtuw.com/register</a>', cls: '' }
      ];
    },

    'tracks': function () {
      return [
        { text: 'HACKATHON TRACKS:', cls: 'term-cmd' },
        { text: '─────────────────', cls: 'term-system' },
        { text: '  [1]  TigerGraph Track        (Premium)', cls: 'term-response' },
        { text: '  [2]  Hack \'N\' Solve          (Open Innovation)', cls: 'term-response' },
        { text: '  [3]  Sustainability Track    (Rotaract Club)', cls: 'term-response' },
        { text: '  [4]  Duality Track           (Interdisciplinary)', cls: 'term-response' }
      ];
    },

    'timeline': function () {
      return [
        { text: 'EVENT TIMELINE:', cls: 'term-cmd' },
        { text: '───────────────', cls: 'term-system' },
        { text: '  Phase 1 ▸ Registration', cls: 'term-response' },
        { text: '  Phase 2 ▸ Hack \'N\' Solve Submission (48 hrs)', cls: 'term-response' },
        { text: '  Phase 3 ▸ Mentorship Round', cls: 'term-response' },
        { text: '  Finale  ▸ Grand Finale @ IIT Delhi 🏆', cls: 'term-success' }
      ];
    },

    'clear': 'CLEAR'
  };

  // Print a line to the terminal output
  function termPrint(text, cls, isHtml) {
    var p = document.createElement('p');
    p.className = 'term-line ' + (cls || '');
    if (isHtml) {
      p.innerHTML = text;
    } else {
      p.textContent = text;
    }
    terminalOutput.appendChild(p);
  }

  // Typewriter effect: print lines one at a time
  function typewriterPrint(lines, index) {
    if (index >= lines.length) return;
    var line = lines[index];
    if (line.html) {
      termPrint(line.html, line.cls, true);
    } else {
      termPrint(line.text, line.cls, false);
    }
    terminalBody.scrollTop = terminalBody.scrollHeight;
    setTimeout(function () {
      typewriterPrint(lines, index + 1);
    }, 50);
  }

  // Handle Enter key
  terminalInput.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;

    var input = terminalInput.value.trim().toLowerCase();
    terminalInput.value = '';
    terminalDisplay.textContent = '';

    if (!input) return;

    // Echo the command
    termPrint('visitor@devcation:~$ ' + input, 'term-user');

    // Process command
    var handler = COMMANDS[input];

    if (input === 'clear') {
      terminalOutput.innerHTML = '';
      terminalBody.scrollTop = 0;
      return;
    }

    if (handler) {
      var lines = handler();
      typewriterPrint(lines, 0);
    } else {
      termPrint('bash: ' + input + ': command not found. Type "help" for available commands.', 'term-error');
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
  });

})();

// ══════════════════════════════════════════════════════════
// 6. HERO SECION ANIMATIONS (CIPHER + PARALLAX)
// ══════════════════════════════════════════════════════════
(function () {
  // --- Animation: 3D Holographic Parallax ---
  const heroSection = document.getElementById('hero3D');
  const heroBody = document.querySelector('.hero-body');
  const floatIcons = document.querySelectorAll('.float-icon');
  
  if (!heroSection || !heroBody) return;

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  let isMouseInHero = false;

  heroSection.addEventListener('mousemove', (e) => {
    // Disable on mobile/tablet widths
    if (window.innerWidth <= 768) return;
    
    isMouseInHero = true;
    const rect = heroSection.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalized coordinates (-1 to 1)
    const rawX = (e.clientX - centerX) / (rect.width / 2);
    const rawY = (e.clientY - centerY) / (rect.height / 2);
    
    // Max rotation 15 degrees
    targetX = -rawY * 15;
    targetY = rawX * 15;
  });

  heroSection.addEventListener('mouseleave', () => {
    isMouseInHero = false;
    targetX = 0;
    targetY = 0;
  });

  function renderParallax() {
    // Disable 3D tilt physically on mobile
    if (window.innerWidth <= 768) {
      if (heroBody.style.transform) {
        heroBody.style.transform = '';
        floatIcons.forEach(icon => icon.style.transform = '');
      }
      requestAnimationFrame(renderParallax);
      return;
    }

    // Lerp smoothing (10% closer to target each frame)
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;

    // Apply tilt to main body
    heroBody.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;

    // Apply inverse tracking to floating icons
    if (floatIcons.length) {
      floatIcons.forEach((icon, index) => {
        // Different icons move different amounts based on their index
        const depth = 1 + (index * 0.5); 
        const iconTargetX = currentY * depth * -1.5;
        const iconTargetY = currentX * depth * -1.5;
        
        icon.style.transform = `translate(${iconTargetX}px, ${iconTargetY}px)`;
      });
    }

    requestAnimationFrame(renderParallax);
  }

  // Start the render loop
  requestAnimationFrame(renderParallax);

})();



const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

// Icon imports
const { FaRobot, FaBrain, FaExclamationTriangle, FaCheckCircle, FaChartLine,
        FaUsers, FaCogs, FaShieldAlt, FaLightbulb, FaArrowRight, FaLayerGroup,
        FaNetworkWired, FaBalanceScale, FaRocket } = require("react-icons/fa");

async function iconToBase64Png(IconComponent, color, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

const makeShadow = () => ({ type: "outer", blur: 8, offset: 3, angle: 135, color: "000000", opacity: 0.12 });

// Color palette — "Midnight Executive" with teal accent
const C = {
  navy:    "1E2761",
  iceBlue: "CADCFC",
  white:   "FFFFFF",
  teal:    "028090",
  tealLight: "00A896",
  dark:    "111827",
  mid:     "374151",
  light:   "F3F6FC",
  accent:  "F59E0B",   // amber for callouts
  muted:   "6B7280",
};

async function buildPptx() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "Agentic AI: From Concept to Competitive Advantage";

  // ─── SLIDE 1: TITLE ───────────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    // Left accent bar
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.18, h: 5.625, fill: { color: C.teal }, line: { color: C.teal } });

    // Teal circle decoration
    s.addShape(pres.shapes.OVAL, { x: 7.5, y: -0.8, w: 3.5, h: 3.5, fill: { color: C.teal, transparency: 80 }, line: { color: C.teal, transparency: 80 } });
    s.addShape(pres.shapes.OVAL, { x: 8.2, y: 3.2, w: 2.2, h: 2.2, fill: { color: C.tealLight, transparency: 85 }, line: { color: C.tealLight, transparency: 85 } });

    s.addText("AGENTIC AI", {
      x: 0.45, y: 0.7, w: 9, h: 0.7,
      fontSize: 13, bold: true, color: C.tealLight, charSpacing: 6, fontFace: "Calibri",
    });
    s.addText("From Concept to\nCompetitive Advantage", {
      x: 0.45, y: 1.25, w: 8.5, h: 2.0,
      fontSize: 40, bold: true, color: C.white, fontFace: "Calibri", lineSpacingMultiple: 1.15,
    });
    s.addText("Synthesising OECD, WEF, KPMG & Skan AI Research", {
      x: 0.45, y: 3.35, w: 8, h: 0.45,
      fontSize: 14, color: C.iceBlue, fontFace: "Calibri", italic: true,
    });
    s.addText("~20 Minute Executive Briefing", {
      x: 0.45, y: 3.9, w: 5, h: 0.4,
      fontSize: 12, color: C.muted, fontFace: "Calibri",
    });
  }

  // ─── SLIDE 2: AGENDA ──────────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.light };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.navy }, line: { color: C.navy } });
    s.addText("AGENDA", { x: 0.4, y: 0.05, w: 9, h: 0.75, fontSize: 26, bold: true, color: C.white, fontFace: "Calibri", valign: "middle" });

    const items = [
      ["01", "What Is Agentic AI?", "Concepts, definitions & the OECD framework"],
      ["02", "Why It's Different", "A genuine paradigm shift, not just automation 2.0"],
      ["03", "The Adoption Reality", "Where organizations are succeeding and failing"],
      ["04", "Five Keys to Success", "The strategic principles shared across all research"],
      ["05", "The Governance Imperative", "Why trust and oversight are non-negotiable"],
      ["06", "Your Roadmap", "Practical next steps and sequencing"],
    ];

    items.forEach(([num, title, sub], i) => {
      const col = i < 3 ? 0 : 1;
      const row = i % 3;
      const x = col === 0 ? 0.35 : 5.25;
      const y = 1.1 + row * 1.35;

      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.6, h: 1.15, fill: { color: C.white }, line: { color: "E5E7EB", width: 1 }, shadow: makeShadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.55, h: 1.15, fill: { color: C.teal }, line: { color: C.teal } });
      s.addText(num, { x, y, w: 0.55, h: 1.15, fontSize: 16, bold: true, color: C.white, align: "center", valign: "middle", fontFace: "Calibri" });
      s.addText(title, { x: x + 0.65, y: y + 0.1, w: 3.85, h: 0.42, fontSize: 13, bold: true, color: C.navy, fontFace: "Calibri" });
      s.addText(sub, { x: x + 0.65, y: y + 0.55, w: 3.85, h: 0.5, fontSize: 10, color: C.muted, fontFace: "Calibri" });
    });
  }

  // ─── SLIDE 3: WHAT IS AGENTIC AI — DEFINITIONS ────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.navy }, line: { color: C.navy } });
    s.addText("01  |  WHAT IS AGENTIC AI?", { x: 0.4, y: 0.05, w: 9, h: 0.75, fontSize: 22, bold: true, color: C.white, fontFace: "Calibri", valign: "middle" });

    // Two-column: AI Agent vs Agentic AI
    s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 1.0, w: 4.4, h: 3.9, fill: { color: C.light }, line: { color: "E5E7EB" }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.3, y: 1.0, w: 4.4, h: 3.9, fill: { color: C.navy }, line: { color: C.navy }, shadow: makeShadow() });

    s.addText("AI AGENT", { x: 0.3, y: 1.0, w: 4.4, h: 0.55, fontSize: 13, bold: true, color: C.white, align: "center", valign: "middle", fontFace: "Calibri",
      fill: { color: C.teal } });
    s.addText("AGENTIC AI", { x: 5.3, y: 1.0, w: 4.4, h: 0.55, fontSize: 13, bold: true, color: C.navy, align: "center", valign: "middle", fontFace: "Calibri",
      fill: { color: C.accent } });

    const agentPoints = [
      "A single software entity",
      "Perceives & acts on its environment",
      "Pursues specific goals autonomously",
      "Uses tools to complete tasks",
      "Adapts to changing inputs",
    ];
    const agenticPoints = [
      "A system of multiple coordinated agents",
      "Breaks down complex tasks & delegates",
      "Pursues long-horizon goals over time",
      "Operates with minimal human supervision",
      "Handles open-ended, unpredictable environments",
    ];

    agentPoints.forEach((pt, i) => {
      s.addText([{ text: "→  ", options: { bold: true, color: C.teal } }, { text: pt, options: { color: C.mid } }],
        { x: 0.5, y: 1.7 + i * 0.43, w: 4.0, h: 0.4, fontSize: 11, fontFace: "Calibri" });
    });
    agenticPoints.forEach((pt, i) => {
      s.addText([{ text: "→  ", options: { bold: true, color: C.accent } }, { text: pt, options: { color: C.iceBlue } }],
        { x: 5.45, y: 1.7 + i * 0.43, w: 4.0, h: 0.4, fontSize: 11, fontFace: "Calibri" });
    });

    s.addText("Source: OECD Agentic AI Landscape Report, Feb 2026", {
      x: 0.3, y: 5.25, w: 9, h: 0.25, fontSize: 9, color: C.muted, fontFace: "Calibri", italic: true,
    });
  }

  // ─── SLIDE 4: THE SPECTRUM OF AGENCY ──────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.light };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.navy }, line: { color: C.navy } });
    s.addText("01  |  THE SPECTRUM OF AGENCY", { x: 0.4, y: 0.05, w: 9, h: 0.75, fontSize: 22, bold: true, color: C.white, fontFace: "Calibri", valign: "middle" });

    s.addText("Agency exists on a spectrum — from simple reactive systems to full agentic AI", {
      x: 0.4, y: 0.95, w: 9.2, h: 0.4, fontSize: 13, color: C.mid, fontFace: "Calibri", italic: true,
    });

    const stages = [
      { label: "Reactive\nAgent", desc: "Responds to stimuli, no planning", color: "94A3B8" },
      { label: "Copilot /\nAssistant", desc: "Supports discrete tasks, human-in-the-loop", color: "64748B" },
      { label: "AI\nAgent", desc: "Goal-directed, autonomous task execution", color: C.teal },
      { label: "Agentic\nAI System", desc: "Multi-agent, long-horizon, minimal oversight", color: C.navy },
    ];

    stages.forEach((st, i) => {
      const x = 0.4 + i * 2.35;
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.5, w: 2.1, h: 2.6, fill: { color: st.color }, line: { color: st.color }, shadow: makeShadow() });
      s.addText(st.label, { x, y: 1.55, w: 2.1, h: 1.0, fontSize: 13, bold: true, color: C.white, align: "center", valign: "middle", fontFace: "Calibri" });
      s.addText(st.desc, { x, y: 2.6, w: 2.1, h: 1.35, fontSize: 10, color: C.white, align: "center", valign: "top", fontFace: "Calibri" });

      if (i < 3) {
        s.addShape(pres.shapes.RECTANGLE, { x: x + 2.12, y: 2.72, w: 0.2, h: 0.12, fill: { color: C.accent }, line: { color: C.accent } });
      }
    });

    // Autonomy arrow
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.3, w: 9.2, h: 0.06, fill: { color: C.teal }, line: { color: C.teal } });
    s.addText("← Less Autonomy", { x: 0.4, y: 4.4, w: 4, h: 0.35, fontSize: 10, color: C.muted, fontFace: "Calibri" });
    s.addText("More Autonomy →", { x: 5.8, y: 4.4, w: 3.8, h: 0.35, fontSize: 10, color: C.muted, fontFace: "Calibri", align: "right" });

    s.addText("Key insight: A system can be autonomous without being agentic. Agency requires goal reasoning and meaningful environmental interaction.", {
      x: 0.4, y: 4.85, w: 9.2, h: 0.55, fontSize: 11, color: C.navy, fontFace: "Calibri", bold: true,
    });
  }

  // ─── SLIDE 5: WHY IT'S DIFFERENT ──────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.teal }, line: { color: C.teal } });
    s.addText("02  |  WHY THIS IS DIFFERENT", { x: 0.4, y: 0.05, w: 9, h: 0.75, fontSize: 22, bold: true, color: C.white, fontFace: "Calibri", valign: "middle" });

    // Big stat
    s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 1.0, w: 3.0, h: 2.0, fill: { color: C.teal, transparency: 20 }, line: { color: C.tealLight } });
    s.addText("50–75%", { x: 0.3, y: 1.05, w: 3.0, h: 1.1, fontSize: 42, bold: true, color: C.accent, align: "center", fontFace: "Calibri" });
    s.addText("Productivity gain potential\nvs. 10–20% from prior automation", { x: 0.3, y: 2.1, w: 3.0, h: 0.8, fontSize: 10, color: C.iceBlue, align: "center", fontFace: "Calibri" });

    s.addShape(pres.shapes.RECTANGLE, { x: 3.7, y: 1.0, w: 6.0, h: 0.0, fill: { color: C.tealLight }, line: { color: C.tealLight } });

    const diffs = [
      ["Task → Role", "Previous automation targeted individual tasks. Agentic AI automates entire roles and workflows."],
      ["React → Plan", "Traditional AI waits for queries. Agentic AI sets goals, maps context, and acts proactively."],
      ["Tools → Ecosystem", "Agents use external APIs, databases, and other agents — operating as a socio-technical system."],
      ["Bounded → Open-ended", "Agentic AI can function in unpredictable environments where outcomes can't be pre-modelled."],
    ];

    diffs.forEach(([title, desc], i) => {
      const y = 1.05 + i * 1.1;
      s.addShape(pres.shapes.RECTANGLE, { x: 3.7, y, w: 0.06, h: 0.9, fill: { color: C.accent }, line: { color: C.accent } });
      s.addText(title, { x: 3.9, y: y + 0.02, w: 5.7, h: 0.38, fontSize: 13, bold: true, color: C.white, fontFace: "Calibri" });
      s.addText(desc, { x: 3.9, y: y + 0.42, w: 5.7, h: 0.45, fontSize: 10.5, color: C.iceBlue, fontFace: "Calibri" });
    });

    s.addText("Source: KPMG, WEF, Skan AI — all three reports independently converge on this characterisation", {
      x: 0.3, y: 5.3, w: 9.4, h: 0.22, fontSize: 9, color: C.muted, fontFace: "Calibri", italic: true,
    });
  }

  // ─── SLIDE 6: THE ADOPTION REALITY — STATS ────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.navy }, line: { color: C.navy } });
    s.addText("03  |  THE ADOPTION REALITY", { x: 0.4, y: 0.05, w: 9, h: 0.75, fontSize: 22, bold: true, color: C.white, fontFace: "Calibri", valign: "middle" });

    // GitHub stat
    s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 1.0, w: 2.9, h: 2.0, fill: { color: C.navy }, line: { color: C.navy }, shadow: makeShadow() });
    s.addText("920%", { x: 0.3, y: 1.05, w: 2.9, h: 1.1, fontSize: 46, bold: true, color: C.accent, align: "center", fontFace: "Calibri" });
    s.addText("Increase in GitHub repos using\nagentic frameworks (2023–2025)", { x: 0.3, y: 2.1, w: 2.9, h: 0.8, fontSize: 9.5, color: C.iceBlue, align: "center", fontFace: "Calibri" });

    // 50% stat
    s.addShape(pres.shapes.RECTANGLE, { x: 3.55, y: 1.0, w: 2.9, h: 2.0, fill: { color: C.teal }, line: { color: C.teal }, shadow: makeShadow() });
    s.addText("~50%", { x: 3.55, y: 1.05, w: 2.9, h: 1.1, fontSize: 46, bold: true, color: C.white, align: "center", fontFace: "Calibri" });
    s.addText("of developers using or planning\nto use AI agents (Stack Overflow)", { x: 3.55, y: 2.1, w: 2.9, h: 0.8, fontSize: 9.5, color: C.white, align: "center", fontFace: "Calibri" });

    // 80% stat
    s.addShape(pres.shapes.RECTANGLE, { x: 6.8, y: 1.0, w: 2.9, h: 2.0, fill: { color: "DC2626" }, line: { color: "DC2626" }, shadow: makeShadow() });
    s.addText("80%", { x: 6.8, y: 1.05, w: 2.9, h: 1.1, fontSize: 46, bold: true, color: C.white, align: "center", fontFace: "Calibri" });
    s.addText("of AI projects fail to scale\nbeyond pilot stage (Skan AI)", { x: 6.8, y: 2.1, w: 2.9, h: 0.8, fontSize: 9.5, color: C.white, align: "center", fontFace: "Calibri" });

    // Concern chart
    s.addText("Developer Concerns About AI Agents (% Agree or Strongly Agree)", {
      x: 0.3, y: 3.2, w: 9.4, h: 0.35, fontSize: 12, bold: true, color: C.navy, fontFace: "Calibri",
    });

    const bars = [
      ["Security & Privacy", 81.4],
      ["Accuracy of Information", 86.9],
      ["40% of AI projects cancelled by 2027*", 40],
    ];
    bars.forEach(([label, val], i) => {
      const y = 3.65 + i * 0.52;
      const barW = (val / 100) * 6.5;
      s.addText(label, { x: 0.3, y, w: 3.0, h: 0.4, fontSize: 10.5, color: C.mid, fontFace: "Calibri", valign: "middle" });
      s.addShape(pres.shapes.RECTANGLE, { x: 3.4, y: y + 0.07, w: 6.5, h: 0.28, fill: { color: "E5E7EB" }, line: { color: "E5E7EB" } });
      s.addShape(pres.shapes.RECTANGLE, { x: 3.4, y: y + 0.07, w: barW, h: 0.28, fill: { color: i < 2 ? C.teal : "DC2626" }, line: { color: i < 2 ? C.teal : "DC2626" } });
      s.addText(`${val}%`, { x: 3.4 + barW + 0.1, y, w: 0.7, h: 0.4, fontSize: 10.5, bold: true, color: C.navy, fontFace: "Calibri", valign: "middle" });
    });

    s.addText("*Gartner projection cited by KPMG & WEF    Sources: Stack Overflow Developer Survey 2025 / Skan AI / KPMG", {
      x: 0.3, y: 5.3, w: 9.4, h: 0.22, fontSize: 9, color: C.muted, fontFace: "Calibri", italic: true,
    });
  }

  // ─── SLIDE 7: WHY PROJECTS FAIL ───────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.light };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.navy }, line: { color: C.navy } });
    s.addText("03  |  WHY PROJECTS FAIL", { x: 0.4, y: 0.05, w: 9, h: 0.75, fontSize: 22, bold: true, color: C.white, fontFace: "Calibri", valign: "middle" });

    s.addText("The failure is not technical — it is strategic and foundational", {
      x: 0.4, y: 0.95, w: 9, h: 0.4, fontSize: 14, color: C.navy, fontFace: "Calibri", bold: true,
    });

    const reasons = [
      { icon: "process", title: "Automating Fictional Processes", body: "Organizations automate documented workflows — not what actually happens. Skan AI: observe before you automate." },
      { icon: "sequence", title: "Wrong Sequencing", body: "Deploying where complexity is highest first. All three reports agree: start where readiness is best, prove it, then expand." },
      { icon: "measure", title: "Measuring Activity, Not Outcomes", body: "Celebrating model accuracy and pilots launched — metrics disconnected from cost, error rates, or customer outcomes." },
      { icon: "people", title: "Underestimating People & Culture", body: "Workforce resistance and change management failures are often larger obstacles than the technology itself." },
      { icon: "govern", title: "Governance as an Afterthought", body: "A single error in agentic programming can propagate across thousands of simultaneous outcomes before humans catch it." },
    ];

    reasons.forEach((r, i) => {
      const col = i < 3 ? 0 : 1;
      const row = i < 3 ? i : i - 3;
      const x = col === 0 ? 0.3 : 5.2;
      const y = 1.45 + row * 1.3;
      const w = col === 0 ? 4.6 : 4.6;

      s.addShape(pres.shapes.RECTANGLE, { x, y, w, h: 1.12, fill: { color: C.white }, line: { color: "E5E7EB" }, shadow: makeShadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.2, h: 1.12, fill: { color: "DC2626" }, line: { color: "DC2626" } });
      s.addText(r.title, { x: x + 0.3, y: y + 0.08, w: w - 0.4, h: 0.38, fontSize: 11.5, bold: true, color: C.navy, fontFace: "Calibri" });
      s.addText(r.body, { x: x + 0.3, y: y + 0.48, w: w - 0.4, h: 0.55, fontSize: 9.5, color: C.mid, fontFace: "Calibri" });
    });
  }

  // ─── SLIDE 8: KEY PRINCIPLE 1 — FOUNDATION FIRST ─────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.teal }, line: { color: C.teal } });
    s.addText("04  |  KEY PRINCIPLE 1", { x: 0.4, y: 0.05, w: 9, h: 0.75, fontSize: 22, bold: true, color: C.white, fontFace: "Calibri", valign: "middle" });

    s.addText("The Foundation Problem", {
      x: 0.4, y: 0.95, w: 9, h: 0.6, fontSize: 32, bold: true, color: C.white, fontFace: "Calibri",
    });

    s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 1.65, w: 9.4, h: 0.06, fill: { color: C.accent }, line: { color: C.accent } });

    s.addText(
      "Every organization has access to the same AI models. What separates those getting $15M in annual savings from those stuck in pilots is whether they understood their own operations before automating.",
      { x: 0.4, y: 1.8, w: 9.2, h: 0.8, fontSize: 14, color: C.iceBlue, fontFace: "Calibri", italic: true }
    );

    const steps = [
      ["OBSERVE", "Map actual workflows, not documented ones. Use process intelligence to see where variability and waste actually live."],
      ["OPTIMISE", "Redesign the process before you automate it. Automating a broken process makes it break faster."],
      ["AUTOMATE", "Only now apply agentic AI — to a well-understood, optimised process with clear success metrics."],
      ["GOVERN", "Implement continuous monitoring and human escalation paths from day one, not as a later addition."],
    ];

    steps.forEach(([title, desc], i) => {
      const x = 0.3 + i * 2.38;
      s.addShape(pres.shapes.RECTANGLE, { x, y: 2.8, w: 2.2, h: 2.5, fill: { color: C.teal, transparency: 15 }, line: { color: C.tealLight } });
      s.addText(`${i + 1}`, { x, y: 2.82, w: 2.2, h: 0.65, fontSize: 28, bold: true, color: C.accent, align: "center", fontFace: "Calibri" });
      s.addText(title, { x, y: 3.45, w: 2.2, h: 0.45, fontSize: 13, bold: true, color: C.white, align: "center", fontFace: "Calibri" });
      s.addText(desc, { x: x + 0.1, y: 3.93, w: 2.0, h: 1.3, fontSize: 9.5, color: C.iceBlue, align: "center", fontFace: "Calibri" });
    });

    s.addText("Source: Skan AI (primary) | Confirmed by WEF & KPMG frameworks", {
      x: 0.4, y: 5.35, w: 9, h: 0.22, fontSize: 9, color: C.muted, fontFace: "Calibri", italic: true,
    });
  }

  // ─── SLIDE 9: KEY PRINCIPLE 2 — SEQUENCING ────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.navy }, line: { color: C.navy } });
    s.addText("04  |  KEY PRINCIPLE 2", { x: 0.4, y: 0.05, w: 9, h: 0.75, fontSize: 22, bold: true, color: C.white, fontFace: "Calibri", valign: "middle" });

    s.addText("Strategic Sequencing Is the Highest-Leverage Decision", {
      x: 0.4, y: 0.95, w: 9.2, h: 0.5, fontSize: 22, bold: true, color: C.navy, fontFace: "Calibri",
    });

    s.addText("All three reports converge: deploy where complexity is manageable and value is demonstrable first. Prove it. Then expand.",
      { x: 0.4, y: 1.5, w: 9.2, h: 0.4, fontSize: 12, color: C.mid, fontFace: "Calibri", italic: true });

    // 2x2 grid for quadrants
    const quadrants = [
      { label: "START HERE", title: "High Value\nLow Complexity", desc: "Best starting point. WEF maps 70 government workflows here. Build governance confidence.", bg: "16A34A", tc: C.white },
      { label: "PLAN CAREFULLY", title: "High Value\nHigh Complexity", desc: "Worth pursuing after confidence is built. Requires robust safeguards and oversight.", bg: C.navy, tc: C.white },
      { label: "LOW PRIORITY", title: "Low Value\nLow Complexity", desc: "May be useful for learning but won't demonstrate meaningful ROI to justify investment.", bg: "E5E7EB", tc: C.mid },
      { label: "AVOID NOW", title: "Low Value\nHigh Complexity", desc: "Classic pilot trap. High effort, low return, erodes organizational confidence in AI.", bg: "DC2626", tc: C.white },
    ];

    const qPositions = [
      { x: 1.0, y: 1.95 },
      { x: 5.5, y: 1.95 },
      { x: 1.0, y: 3.6 },
      { x: 5.5, y: 3.6 },
    ];

    quadrants.forEach((q, i) => {
      const { x, y } = qPositions[i];
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.2, h: 1.5, fill: { color: q.bg }, line: { color: q.bg }, shadow: makeShadow() });
      s.addText(q.label, { x, y: y + 0.05, w: 4.2, h: 0.3, fontSize: 9, bold: true, color: q.tc, align: "center", fontFace: "Calibri", charSpacing: 2 });
      s.addText(q.title, { x, y: y + 0.32, w: 4.2, h: 0.52, fontSize: 13, bold: true, color: q.tc, align: "center", fontFace: "Calibri" });
      s.addText(q.desc, { x: x + 0.15, y: y + 0.85, w: 3.9, h: 0.58, fontSize: 9.5, color: q.tc, align: "center", fontFace: "Calibri" });
    });

    // Axis labels
    s.addText("← Low Value     High Value →", { x: 0.5, y: 5.2, w: 9, h: 0.3, fontSize: 10, color: C.muted, fontFace: "Calibri", align: "center" });
    s.addText("Low\nComplexity", { x: 0.1, y: 1.95, w: 0.8, h: 1.5, fontSize: 8.5, color: C.muted, fontFace: "Calibri", align: "center", valign: "middle" });
    s.addText("High\nComplexity", { x: 0.1, y: 3.6, w: 0.8, h: 1.5, fontSize: 8.5, color: C.muted, fontFace: "Calibri", align: "center", valign: "middle" });

    s.addText("Source: WEF Readiness Framework | KPMG Hot-Spot Mapping | Skan AI ROI Prioritisation", {
      x: 0.4, y: 5.38, w: 9, h: 0.22, fontSize: 9, color: C.muted, fontFace: "Calibri", italic: true,
    });
  }

  // ─── SLIDE 10: KEY PRINCIPLE 3 — GOVERNANCE ───────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.light };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.navy }, line: { color: C.navy } });
    s.addText("05  |  THE GOVERNANCE IMPERATIVE", { x: 0.4, y: 0.05, w: 9, h: 0.75, fontSize: 22, bold: true, color: C.white, fontFace: "Calibri", valign: "middle" });

    s.addText("Bounded Autonomy: All Four Reports Agree", {
      x: 0.4, y: 0.95, w: 9.2, h: 0.45, fontSize: 20, bold: true, color: C.navy, fontFace: "Calibri",
    });

    const govPoints = [
      {
        source: "OECD",
        color: C.navy,
        points: ["Define autonomy levels: human-in-loop vs. human-on-loop vs. human-out-of-loop", "Socio-technical paradigm: agents operate within institutional and social contexts", "Transparency and accountability are foundational, not optional"],
      },
      {
        source: "WEF",
        color: "1D4ED8",
        points: ["Public sector AI must be explainable — citizens affected by AI decisions need visibility", "Cross-department governance frameworks before scaling", "Start where risk is lowest, build public confidence iteratively"],
      },
      {
        source: "KPMG",
        color: C.teal,
        points: ["Amplified risk: one agentic error propagates across thousands of simultaneous workflows", "Continuous monitoring and evaluation from day one", "Align C-suite on accountability before deployment, not after an incident"],
      },
      {
        source: "Skan AI",
        color: "7C3AED",
        points: ["You cannot govern what you cannot observe — process intelligence first", "Human escalation paths embedded in every agentic workflow", "Governance learning is the primary goal of early pilots"],
      },
    ];

    govPoints.forEach((g, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = col === 0 ? 0.3 : 5.2;
      const y = 1.5 + row * 1.95;

      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.6, h: 1.75, fill: { color: C.white }, line: { color: "E5E7EB" }, shadow: makeShadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.6, h: 0.38, fill: { color: g.color }, line: { color: g.color } });
      s.addText(g.source, { x, y, w: 4.6, h: 0.38, fontSize: 12, bold: true, color: C.white, align: "center", valign: "middle", fontFace: "Calibri" });

      g.points.forEach((pt, j) => {
        s.addText([{ text: "• ", options: { bold: true, color: g.color } }, { text: pt, options: { color: C.mid } }],
          { x: x + 0.15, y: y + 0.42 + j * 0.42, w: 4.3, h: 0.38, fontSize: 9.5, fontFace: "Calibri" });
      });
    });
  }

  // ─── SLIDE 11: KEY PRINCIPLE 4 — PEOPLE & MEASUREMENT ───────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.teal }, line: { color: C.teal } });
    s.addText("04  |  KEY PRINCIPLES 4 & 5", { x: 0.4, y: 0.05, w: 9, h: 0.75, fontSize: 22, bold: true, color: C.white, fontFace: "Calibri", valign: "middle" });

    // Principle 4: People
    s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 1.0, w: 4.5, h: 4.3, fill: { color: "1E3A5F" }, line: { color: C.tealLight } });
    s.addText("People & Culture", { x: 0.3, y: 1.0, w: 4.5, h: 0.5, fontSize: 15, bold: true, color: C.accent, align: "center", valign: "middle", fontFace: "Calibri" });

    const peoplePoints = [
      "Workforce resistance is often a larger barrier than the technology",
      "Invest as heavily in behavioural change as in technical deployment",
      "Tacit knowledge capture is the hardest part of process intelligence",
      "Upskilling people alongside AI deployment is a KPMG core recommendation",
      "Involving frontline workers in workflow mapping improves both adoption and accuracy",
    ];
    peoplePoints.forEach((pt, i) => {
      s.addText([{ text: "→  ", options: { bold: true, color: C.tealLight } }, { text: pt, options: { color: C.iceBlue } }],
        { x: 0.5, y: 1.58 + i * 0.68, w: 4.1, h: 0.62, fontSize: 10.5, fontFace: "Calibri" });
    });

    // Principle 5: Measurement
    s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.0, w: 4.5, h: 4.3, fill: { color: "1E3A5F" }, line: { color: C.accent } });
    s.addText("Outcome-Based Measurement", { x: 5.2, y: 1.0, w: 4.5, h: 0.5, fontSize: 15, bold: true, color: C.accent, align: "center", valign: "middle", fontFace: "Calibri" });

    const measureRows = [
      ["❌  Measure Activity", "Model accuracy, pilots launched, speed of deployment"],
      ["✅  Measure Outcomes", "Cost per transaction, processing time, error rates, NPS"],
      ["Why It Matters", "If you don't know what a 10% improvement is worth in dollars, you can't justify the next investment"],
      ["The Test", "Can you make a credible case to the CFO based on operational data? If not, you're not measuring the right things"],
    ];
    measureRows.forEach(([label, val], i) => {
      const y = 1.58 + i * 0.95;
      const labelColor = label.startsWith("❌") ? "DC2626" : label.startsWith("✅") ? "16A34A" : C.accent;
      s.addText(label, { x: 5.35, y, w: 4.15, h: 0.35, fontSize: 10.5, bold: true, color: labelColor, fontFace: "Calibri" });
      s.addText(val, { x: 5.35, y: y + 0.36, w: 4.15, h: 0.5, fontSize: 9.5, color: C.iceBlue, fontFace: "Calibri" });
    });
  }

  // ─── SLIDE 12: AGENTIC AI USE CASES ──────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.navy }, line: { color: C.navy } });
    s.addText("03  |  WHERE IT'S BEING DEPLOYED", { x: 0.4, y: 0.05, w: 9, h: 0.75, fontSize: 22, bold: true, color: C.white, fontFace: "Calibri", valign: "middle" });

    s.addText("Top use cases across private and public sector:", { x: 0.4, y: 0.95, w: 9, h: 0.35, fontSize: 12, color: C.mid, fontFace: "Calibri" });

    const useCases = [
      { sector: "Software Engineering", pct: "~80%", note: "Most common developer use case (Stack Overflow)", color: C.navy },
      { sector: "Data & Analytics", pct: "64%", note: "Among data scientists & engineers (Stack Overflow)", color: C.teal },
      { sector: "Government Services", pct: "High", note: "Benefits processing, permit review, citizen queries (WEF)", color: "1D4ED8" },
      { sector: "Insurance Claims", pct: "High", note: "Autonomous adjudication workflows (KPMG)", color: "7C3AED" },
      { sector: "Customer Service", pct: "Growing", note: "Full workflow automation, not just chatbots (Skan AI)", color: "16A34A" },
      { sector: "Business Process", pct: "Growing", note: "Cross-system orchestration replacing RPA (KPMG & Skan)", color: C.accent },
    ];

    useCases.forEach((uc, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = col === 0 ? 0.3 : 5.2;
      const y = 1.4 + row * 1.3;

      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.6, h: 1.1, fill: { color: C.light }, line: { color: "E5E7EB" }, shadow: makeShadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 1.1, h: 1.1, fill: { color: uc.color }, line: { color: uc.color } });
      s.addText(uc.pct, { x, y, w: 1.1, h: 1.1, fontSize: 16, bold: true, color: C.white, align: "center", valign: "middle", fontFace: "Calibri" });
      s.addText(uc.sector, { x: x + 1.2, y: y + 0.1, w: 3.25, h: 0.42, fontSize: 12.5, bold: true, color: C.navy, fontFace: "Calibri" });
      s.addText(uc.note, { x: x + 1.2, y: y + 0.55, w: 3.25, h: 0.45, fontSize: 9.5, color: C.muted, fontFace: "Calibri" });
    });

    s.addText("Sources: Stack Overflow Developer Survey 2025 | WEF Government AI Readiness | KPMG Agentic AI | Skan AI", {
      x: 0.3, y: 5.35, w: 9.4, h: 0.22, fontSize: 9, color: C.muted, fontFace: "Calibri", italic: true,
    });
  }

  // ─── SLIDE 13: YOUR ROADMAP ───────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.light };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.navy }, line: { color: C.navy } });
    s.addText("06  |  YOUR ROADMAP", { x: 0.4, y: 0.05, w: 9, h: 0.75, fontSize: 22, bold: true, color: C.white, fontFace: "Calibri", valign: "middle" });

    s.addText("A synthesis of Skan → WEF → KPMG into a sequential roadmap", {
      x: 0.4, y: 0.92, w: 9.2, h: 0.35, fontSize: 12, color: C.mid, fontFace: "Calibri", italic: true,
    });

    const phases = [
      {
        phase: "Phase 1",
        title: "Observe & Prioritise",
        source: "Skan AI",
        timeframe: "Weeks 1–6",
        color: "7C3AED",
        steps: ["Map actual workflows using process intelligence tools", "Identify top 3–5 opportunities by observed ROI potential", "Quantify: what is a 10% improvement in each worth in $?", "Discard documentation — watch what actually happens"],
      },
      {
        phase: "Phase 2",
        title: "Assess & Sequence",
        source: "WEF Framework",
        timeframe: "Weeks 4–8",
        color: "1D4ED8",
        steps: ["Score each opportunity on value vs. complexity matrix", "Select one high-value, low-complexity starting point", "Define governance and human oversight requirements", "Establish outcome metrics before deployment begins"],
      },
      {
        phase: "Phase 3",
        title: "Execute & Govern",
        source: "KPMG",
        timeframe: "Months 2–6",
        color: C.teal,
        steps: ["Choose the right agent type for the selected workflow", "Deploy with bounded autonomy and human escalation paths", "Measure outcomes weekly — not model performance", "Treat this pilot as a governance learning exercise"],
      },
    ];

    phases.forEach((p, i) => {
      const x = 0.3 + i * 3.2;
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.35, w: 2.95, h: 4.0, fill: { color: C.white }, line: { color: "E5E7EB" }, shadow: makeShadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.35, w: 2.95, h: 0.72, fill: { color: p.color }, line: { color: p.color } });

      s.addText(p.phase, { x, y: 1.37, w: 2.95, h: 0.3, fontSize: 9, bold: true, color: "rgba(255,255,255,0.7)", align: "center", fontFace: "Calibri", charSpacing: 3 });
      s.addText(p.title, { x, y: 1.65, w: 2.95, h: 0.38, fontSize: 13, bold: true, color: C.white, align: "center", fontFace: "Calibri" });

      s.addText(`Source: ${p.source}`, { x, y: 2.1, w: 2.95, h: 0.25, fontSize: 8.5, color: p.color, align: "center", fontFace: "Calibri" });
      s.addText(p.timeframe, { x, y: 2.33, w: 2.95, h: 0.25, fontSize: 8.5, color: C.muted, align: "center", fontFace: "Calibri" });

      p.steps.forEach((step, j) => {
        s.addText([{ text: `${j + 1}.  `, options: { bold: true, color: p.color } }, { text: step, options: { color: C.mid } }],
          { x: x + 0.15, y: 2.65 + j * 0.63, w: 2.65, h: 0.56, fontSize: 9.5, fontFace: "Calibri" });
      });
    });
  }

  // ─── SLIDE 14: THE URGENCY BALANCE ────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.teal }, line: { color: C.teal } });
    s.addText("06  |  URGENCY WITH DISCIPLINE", { x: 0.4, y: 0.05, w: 9, h: 0.75, fontSize: 22, bold: true, color: C.white, fontFace: "Calibri", valign: "middle" });

    s.addText("The window for competitive advantage is real — and closing", {
      x: 0.4, y: 0.95, w: 9.2, h: 0.5, fontSize: 20, bold: true, color: C.white, fontFace: "Calibri",
    });

    const left = [
      "The organisations moving now are building capabilities that compound over time",
      "Early movers establish governance muscle that becomes a durable competitive advantage",
      "GitHub activity: 920% growth in 2 years shows the ecosystem is maturing fast",
    ];
    const right = [
      "Speed without foundation produces the 80% failure rate — it is not a badge of honour",
      "High-profile agentic failures will erode institutional confidence across entire sectors",
      "The organisations treating this as 'faster RPA' are building tomorrow's case studies in failure",
    ];

    s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 1.6, w: 4.4, h: 3.6, fill: { color: "16A34A", transparency: 85 }, line: { color: "16A34A" } });
    s.addText("MOVE WITH URGENCY", { x: 0.3, y: 1.6, w: 4.4, h: 0.45, fontSize: 12, bold: true, color: "4ADE80", align: "center", valign: "middle", fontFace: "Calibri" });
    left.forEach((pt, i) => {
      s.addText([{ text: "✓  ", options: { bold: true, color: "4ADE80" } }, { text: pt, options: { color: C.white } }],
        { x: 0.45, y: 2.15 + i * 0.93, w: 4.05, h: 0.85, fontSize: 11, fontFace: "Calibri" });
    });

    s.addShape(pres.shapes.RECTANGLE, { x: 5.3, y: 1.6, w: 4.4, h: 3.6, fill: { color: C.accent, transparency: 85 }, line: { color: C.accent } });
    s.addText("MOVE WITH DISCIPLINE", { x: 5.3, y: 1.6, w: 4.4, h: 0.45, fontSize: 12, bold: true, color: C.accent, align: "center", valign: "middle", fontFace: "Calibri" });
    right.forEach((pt, i) => {
      s.addText([{ text: "⚠  ", options: { bold: true, color: C.accent } }, { text: pt, options: { color: C.iceBlue } }],
        { x: 5.45, y: 2.15 + i * 0.93, w: 4.05, h: 0.85, fontSize: 11, fontFace: "Calibri" });
    });

    s.addShape(pres.shapes.OVAL, { x: 4.55, y: 2.7, w: 0.9, h: 0.9, fill: { color: C.white }, line: { color: C.white } });
    s.addText("+", { x: 4.55, y: 2.7, w: 0.9, h: 0.9, fontSize: 24, bold: true, color: C.navy, align: "center", valign: "middle", fontFace: "Calibri" });
  }

  // ─── SLIDE 15: CONCLUSION ─────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.teal }, line: { color: C.teal } });
    s.addText("KEY TAKEAWAYS", { x: 0.4, y: 0.05, w: 9, h: 0.75, fontSize: 22, bold: true, color: C.white, fontFace: "Calibri", valign: "middle" });

    const takeaways = [
      ["The gap is a foundation problem", "Not a technology problem. The AI models are a commodity. Operational intelligence and strategic discipline are not."],
      ["Observe → Prioritise → Execute → Govern", "This is the sequence, not three separate arguments. Follow all three reports in order and you have a complete roadmap."],
      ["Agentic AI operates at role level, not task level", "That changes the magnitude of both the opportunity and the risk. Treat it accordingly."],
      ["Governance is a capability, not a checkbox", "The organisations building governance muscle now will use it as a competitive differentiator in 18 months."],
      ["Measure outcomes, not activity", "If you can't make the case to your CFO in operational terms, you are measuring the wrong things."],
    ];

    takeaways.forEach(([title, body], i) => {
      s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 0.92 + i * 0.91, w: 0.45, h: 0.72, fill: { color: C.accent }, line: { color: C.accent } });
      s.addText(`${i + 1}`, { x: 0.3, y: 0.92 + i * 0.91, w: 0.45, h: 0.72, fontSize: 18, bold: true, color: C.navy, align: "center", valign: "middle", fontFace: "Calibri" });
      s.addText(title, { x: 0.85, y: 0.95 + i * 0.91, w: 8.8, h: 0.3, fontSize: 12.5, bold: true, color: C.accent, fontFace: "Calibri" });
      s.addText(body, { x: 0.85, y: 1.25 + i * 0.91, w: 8.8, h: 0.45, fontSize: 10.5, color: C.iceBlue, fontFace: "Calibri" });
    });

    s.addText("Sources: OECD Agentic AI Landscape (Feb 2026) | WEF Government AI Readiness | KPMG Agentic AI Report | Skan AI Process Intelligence", {
      x: 0.3, y: 5.33, w: 9.4, h: 0.25, fontSize: 8.5, color: C.muted, fontFace: "Calibri", italic: true,
    });
  }

  await pres.writeFile({ fileName: "/mnt/user-data/outputs/Agentic_AI_Executive_Briefing.pptx" });
  console.log("Done!");
}

buildPptx().catch(console.error);
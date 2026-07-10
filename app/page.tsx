"use client";

import { FormEvent, useState } from "react";

const durations = [
  ["15 sec", "Fast social hook", "1 credit"],
  ["30 sec", "Focused story", "1 credit"],
  ["60 sec", "Full walkthrough", "2 credits"],
  ["90 sec", "Signature film", "3 credits"],
];
const scenes = ["Arrival", "The feeling", "The proof", "The invitation"];

export default function Home() {
  const [duration, setDuration] = useState(1);
  const [name, setName] = useState("");
  const [features, setFeatures] = useState("");
  const [audience, setAudience] = useState("Ambitious professionals");
  const [tone, setTone] = useState("Cinematic & warm");
  const [plan, setPlan] = useState<string[] | null>(null);
  const [copied, setCopied] = useState(false);

  function generate(event: FormEvent) {
    event.preventDefault();
    const project = name.trim() || "Your project";
    const proof = features.trim() || "its most compelling details";
    setPlan([
      "Open on an irresistible first impression of " + project + "; establish the place, pace and point of view in the first three seconds.",
      "Build an " + tone.toLowerCase() + " lifestyle moment designed for " + audience.toLowerCase() + ".",
      "Reveal " + proof + ", using confident on-screen captions and a clean visual rhythm.",
      "Finish with a simple invitation to discover " + project + ", framed as the next move—not a hard sell.",
    ]);
    setCopied(false);
  }
  async function copyPlan() {
    if (!plan) return;
    await navigator.clipboard.writeText(plan.map((item, i) => (i + 1) + ". " + item).join("\n\n"));
    setCopied(true);
  }

  return <main>
    <nav className="nav shell"><a className="brand" href="#top"><span>F</span> frameflow</a><div className="nav-links"><a href="#studio">Prompt studio</a><a href="#how">How it works</a></div><a className="nav-cta" href="#studio">Create a plan <b>↗</b></a></nav>
    <section className="hero shell" id="top"><p className="kicker">AI VIDEO BRIEFING STUDIO</p><h1>Turn a good listing into<br /><em>a story people feel.</em></h1><p className="lede">Frameflow turns your property details into a ready-to-shoot video plan—complete with strategic beats, scene prompts and a clear closing line.</p><div className="proof"><span>✦ Built for property teams</span><span>✦ Plans in under a minute</span><span>✦ Ready for any video model</span></div></section>
    <section className="studio shell" id="studio">
      <header className="studio-header"><div><p className="step">STEP 01</p><h2>Set the runtime</h2></div><p>Choose the size of story you want to tell.</p></header>
      <div className="duration-grid">{durations.map(([time, hint, cost], index) => <button type="button" className={duration === index ? "duration active" : "duration"} onClick={() => setDuration(index)} key={time}><b>{time}</b><span>{hint}</span><small>{cost}</small></button>)}</div>
      <form onSubmit={generate}><div className="rule" /><header className="studio-header"><div><p className="step">STEP 02</p><h2>Shape the brief</h2></div><p>The more specific the inputs, the more useful the plan.</p></header>
        <div className="form-grid">
          <label className="wide">Project name <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Bayview Residences" /></label>
          <label>Property type <select defaultValue="Luxury condominium"><option>Luxury condominium</option><option>Premium high-rise</option><option>Serviced apartment</option><option>Landed home</option><option>Commercial space</option></select></label>
          <label>Audience <select value={audience} onChange={(e) => setAudience(e.target.value)}><option>Ambitious professionals</option><option>Young families</option><option>Investors</option><option>Retirees</option><option>International buyers</option></select></label>
          <label className="wide">The standout details <textarea value={features} onChange={(e) => setFeatures(e.target.value)} placeholder="e.g. A sea view from every home, a rooftop pool, freehold ownership and five minutes to the city centre." /></label>
          <label>Tone <select value={tone} onChange={(e) => setTone(e.target.value)}><option>Cinematic & warm</option><option>Quiet luxury</option><option>Modern & energetic</option><option>Family-first</option><option>Calm & considered</option></select></label>
          <label>Sales energy <select defaultValue="Balanced"><option>Balanced</option><option>Soft and editorial</option><option>Direct and urgent</option></select></label>
        </div>
        <div className="submit-row"><div><b>Your plan includes</b><span>Strategy, four scene beats and a closing call-to-action</span></div><button className="generate" type="submit">Generate video plan <b>→</b></button></div>
      </form>
      {plan && <section className="result" aria-live="polite"><div className="result-top"><div><p className="step">YOUR VIDEO PLAN</p><h3>{name || "Your project"}, in four beats</h3></div><button type="button" onClick={copyPlan}>{copied ? "Copied" : "Copy plan"} <b>↗</b></button></div><div className="scene-grid">{plan.map((item, i) => <article key={item}><span>0{i + 1}</span><h4>{scenes[i]}</h4><p>{item}</p></article>)}</div></section>}
    </section>
    <section className="how shell" id="how"><p className="kicker">A SIMPLE STARTING POINT</p><h2>From details to <em>direction.</em></h2><div className="how-grid"><article><span>01</span><h3>Describe</h3><p>Bring the place, its audience and the best reasons to care.</p></article><article><span>02</span><h3>Direct</h3><p>Pick the pace and mood so the plan feels like your brand.</p></article><article><span>03</span><h3>Produce</h3><p>Use the scene plan with your team or your preferred video tool.</p></article></div></section>
    <footer className="shell"><a className="brand" href="#top"><span>F</span> frameflow</a><p>Clearer stories for remarkable places.</p><small>© 2026 Frameflow</small></footer>
  </main>;
}

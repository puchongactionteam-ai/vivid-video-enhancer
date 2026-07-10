"use client";

import { ChangeEvent, useRef, useState } from "react";

const presets = [
  { label: "720p HD", value: "1280 × 720", hint: "Best for older clips" },
  { label: "1080p Full HD", value: "1920 × 1080", hint: "Crisp everyday viewing" },
  { label: "4K Ultra HD", value: "3840 × 2160", hint: "Maximum detail" },
];

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preset, setPreset] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState(false);

  function chooseFile(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0] ?? null;
    if (selected) {
      setFile(selected);
      setComplete(false);
    }
  }

  function enhance() {
    if (!file) return inputRef.current?.click();
    setProcessing(true);
    setComplete(false);
    window.setTimeout(() => {
      setProcessing(false);
      setComplete(true);
    }, 1800);
  }

  return (
    <main>
      <nav className="nav wrap" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Vivid home"><span>v</span> vivid</a>
        <div className="nav-links"><a href="#how">How it works</a><a href="#faq">FAQ</a></div>
        <button className="ghost-button" onClick={() => inputRef.current?.click()}>Try for free <span>↗</span></button>
      </nav>

      <section className="hero wrap" id="top">
        <div className="eyebrow"><i /> AI VIDEO ENHANCEMENT</div>
        <h1>Make every frame<br /><em>worth watching.</em></h1>
        <p className="lede">Turn soft, low-resolution MP4s into clear, polished video. Choose your target quality and let Vivid handle the rest.</p>
        <div className="hero-points"><span>✦ No watermark</span><span>✦ MP4, up to 2 GB</span><span>✦ Files deleted after export</span></div>
      </section>

      <section className="workspace wrap" aria-label="Video enhancer">
        <div className="workspace-head"><div><span className="step">01</span><h2>Upload your video</h2></div><p>Start with an MP4. We’ll optimize it for your chosen output.</p></div>
        <input ref={inputRef} id="video-upload" type="file" accept="video/mp4" onChange={chooseFile} hidden />
        {!file ? (
          <button className="dropzone" onClick={() => inputRef.current?.click()}>
            <span className="upload-icon">↑</span><strong>Drop your MP4 here</strong><small>or click to browse files</small><b>MP4 · Max 2 GB</b>
          </button>
        ) : (
          <div className="file-card"><div className="file-art"><span>▶</span></div><div className="file-info"><b>{file.name}</b><span>{(file.size / 1024 / 1024).toFixed(1)} MB · MP4</span></div><button className="replace" onClick={() => inputRef.current?.click()}>Replace</button></div>
        )}

        <div className="divider" />
        <div className="workspace-head"><div><span className="step">02</span><h2>Choose output quality</h2></div><p>We’ll retain the original frame rate and audio.</p></div>
        <div className="preset-grid">
          {presets.map((item, index) => <button key={item.label} className={`preset ${preset === index ? "selected" : ""}`} onClick={() => setPreset(index)}><span className="radio" /><div><b>{item.label}</b><small>{item.value}</small></div><em>{item.hint}</em></button>)}
        </div>
        <div className="action-row"><div><b>Ready when you are</b><span>{file ? `Output: ${presets[preset].label}` : "Add a video to begin"}</span></div><button className="enhance-button" onClick={enhance} disabled={processing}>{processing ? "Enhancing…" : complete ? "Enhance another" : "Enhance video"}<span>→</span></button></div>
        {processing && <div className="progress"><span /><b>Enhancing frames and refining detail…</b></div>}
        {complete && <div className="success"><span>✓</span><div><b>Preview processing complete</b><p>Your {presets[preset].label} enhancement is ready for export in a connected production workspace.</p></div></div>}
      </section>

      <section className="how wrap" id="how"><div className="section-label">SIMPLE BY DESIGN</div><h2>From low-res to <em>love this.</em></h2><div className="how-grid"><article><span>01</span><h3>Upload</h3><p>Add the MP4 you want to improve.</p></article><article><span>02</span><h3>Enhance</h3><p>Pick a resolution and refine every frame.</p></article><article><span>03</span><h3>Export</h3><p>Save a cleaner, sharper version of your video.</p></article></div></section>
      <footer className="wrap" id="faq"><a className="brand" href="#top"><span>v</span> vivid</a><p>Sharper stories, one frame at a time.</p><small>© 2026 Vivid Studio</small></footer>
    </main>
  );
}

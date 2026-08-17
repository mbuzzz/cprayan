"use client";

import { useEffect, useMemo, useState } from "react";

const bootLines = [
  "loading /etc/indonesia.conf",
  "mounting /dev/nusantara ... done",
  "checking freedom.service ... active",
  "syncing history since 17.08.1945 ... 81 years",
  "",
  "[ OK ] merah-putih protocol initialized",
  "[ OK ] gotong-royong network online",
  "[ OK ] semangat kemerdekaan: 100%",
];

const files = [
  "02/argument.exe",
  "02/polarisasi.dll",
  "02/hoaks.log",
  "02/dinasti.sys",
  "02/privilege.conf",
];

export default function Hutri81Page() {
  const [booted, setBooted] = useState(false);
  const [typed, setTyped] = useState(0);
  const [command, setCommand] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTyped((current) => {
        if (current >= bootLines.length) {
          window.clearInterval(timer);
          setBooted(true);
          return current;
        }
        return current + 1;
      });
    }, 180);
    return () => window.clearInterval(timer);
  }, []);

  const progress = useMemo(() => Math.min(100, Math.round((typed / bootLines.length) * 100)), [typed]);

  function runCommand(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = command.trim().toLowerCase();
    if (normalized === "help") setShowHelp(true);
    if (normalized === "clear") setShowHelp(false);
    setCommand("");
  }

  return (
    <main className="hutri-page">
      <div className="scanlines" aria-hidden="true" />
      <section className="terminal-window" aria-label="Indonesia OS terminal">
        <header className="terminal-bar">
          <div className="window-dots" aria-hidden="true"><i /><i /><i /></div>
          <span className="terminal-title">rayan@nusantara: ~/hutri81</span>
          <span className="terminal-status">● ONLINE</span>
        </header>

        <div className="terminal-body">
          <div className="terminal-grid">
            <div className="terminal-main">
              <div className="prompt-line"><span className="prompt">root@indonesia-os:~#</span> ./kemerdekaan.sh --year=81</div>
              <div className="boot-output" aria-live="polite">
                {bootLines.slice(0, typed).map((line, index) => (
                  <div key={`${line}-${index}`} className={line.startsWith("[ OK ]") ? "ok-line" : "muted-line"}>{line || "\u00a0"}</div>
                ))}
              </div>

              <div className="progress-wrap">
                <div className="progress-label"><span>INDONESIA OS / BOOTING</span><strong>{progress}%</strong></div>
                <div className="progress-track"><div style={{ width: `${progress}%` }} /></div>
              </div>

              {booted && (
                <div className="hero-copy">
                  <div className="flag-mark"><span /> <span /></div>
                  <p className="eyebrow">17 AGUSTUS 1945 — 2026</p>
                  <h1>Dirgahayu<br /><em>Republik Indonesia</em></h1>
                  <p className="hero-message">81 tahun merdeka. Terus melaju, terus berkarya, terus menjaga Indonesia.</p>
                  <div className="hero-command"><span className="prompt">root@nusantara:~#</span> echo &quot;Merdeka!&quot; <b>Merdeka!</b></div>
                </div>
              )}

              <form className="command-form" onSubmit={runCommand}>
                <span className="prompt">rayan@nusantara:~$</span>
                <input value={command} onChange={(event) => setCommand(event.target.value)} aria-label="Terminal command" placeholder={booted ? "ketik help atau clear" : "booting..."} disabled={!booted} />
                <span className="cursor" aria-hidden="true" />
              </form>
              {showHelp && <div className="help-output"><span className="ok-line">help</span> — tampilkan pesan ini<br /><span className="ok-line">clear</span> — bersihkan pesan bantuan<br /><span className="ok-line">merdeka</span> — status: selalu aktif 🇮🇩</div>}
            </div>

            <aside className="system-panel">
              <div className="panel-heading">SYSTEM INFO</div>
              <dl>
                <div><dt>Country</dt><dd>Indonesia</dd></div>
                <div><dt>Version</dt><dd>81.0.0</dd></div>
                <div><dt>Status</dt><dd className="green">INDEPENDENT</dd></div>
                <div><dt>Uptime</dt><dd>81 years</dd></div>
                <div><dt>Users</dt><dd>278,000,000+</dd></div>
                <div><dt>Root access</dt><dd>GRANTED</dd></div>
              </dl>
              <div className="panel-heading commit-heading">RECENT COMMIT</div>
              <ul className="commit-list">
                <li>gotong-royong.patch <b>[merged]</b></li>
                <li>persatuan.update <b>[stable]</b></li>
                <li>masa-depan.init <b>[running]</b></li>
              </ul>
              <div className="ascii-flag" aria-label="Bendera Indonesia"><span /><span /></div>
              <p className="panel-note">&gt; bebas bukan berarti selesai.<br />&gt; merdeka berarti bertanggung jawab.</p>
            </aside>
          </div>
        </div>
        <footer className="terminal-footer"><span>PID 1945</span><span>UTF-8</span><span>INDONESIA OS (BETA)</span><span>© 2026 RAYAN.WEB.ID</span></footer>
      </section>
      <p className="mobile-hint">Tip: ketik <b>help</b> di terminal</p>
    </main>
  );
}

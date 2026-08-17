"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

const bootLines = [
  "from dataclasses import dataclass",
  "import indonesia_os as nusantara",
  "loading /etc/indonesia.conf ...",
  "mounting /dev/merah_putih ... done",
  "checking freedom.service ... active",
  "syncing history since 17.08.1945 ... 81 years",
  "",
  "[ OK ] merah_putih.protocol",
  "[WARN] stability below expected threshold: 0.42",
  "[WARN] Pendidikan.service: FileNotFoundError",
  "[WARN] KDKMP.anomaly: AnomalyDetected",
  "[WARN] makar.exception: Detected",
  "[CRIT] korupsi.vulnerability: SecurityRisk",
  "[WARN] dinasti.patch: MergeConflict",
  "[WARN] MBG.targeting_bug: TargetMismatch",
  "[ OK ] critical_thinking.module",
];

const dashboard = [
  "",
  "@dataclass",
  "class IndonesiaEmas(Beta):",
  "    build = '17.08.1945-beta+81'",
  "    status = 'BETA_RELEASE'",
  "    message = 'Dirgahayu Republik Indonesia'",
  "    stability = 0.42  # below_expected_threshold",
  "    warnings = 7",
  "    critical = 1",
  "    production_readiness = False",
  "    warning = 'bugs_are_features_until_fixed'",
  "",
  "def audit_public_services():",
  "    return {",
  "        'janji': 'deployed',",
  "        'realisasi': ConnectionError,",
  "        'transparansi': PermissionDenied,",
  "        'rakyat': 'waiting_for_patch',",
  "    }",
  "",
];

const files = ["02/argument.exe", "02/polarisasi.dll", "02/hoaks.log", "02/dinasti.sys", "02/privilege.conf"];

function commandOutput(command: string): string[] {
  const c = command.trim().toLowerCase();
  if (c === "help" || c === "--help") return [
    "usage: indonesia_os.py [command]",
    "",
    "commands:",
    "  help                 print(this_help)",
    "  status               return system_status()",
    "  scan                 scan_critical_issues(year=2026)",
    "  kritik()             raise RuntimeError('CHANGE_REQUIRED')",
    "  audit()              audit_public_services()",
    "  rm -rf 02            remove obsolete_services (simulation)",
    "  python3 indonesia_os.py  rerun dashboard()",
    "  merdeka              print('Merdeka!')",
    "  clear                stdout.clear()",
  ];
  if (c === "status") return [
    "def status(self) -> dict:",
    "    return {",
    "        'country': 'Indonesia',",
    "        'version': '81.0.0-beta',",
    "        'stability': 0.42,",
    "        'uptime': 81 * YEAR,",
    "        'root_access': False,",
    "        'democracy': requires_health_check(),",
    "    }",
  ];
  if (c === "scan" || c === "scan --issues=2026" || c === "kritik()") return [
    "def scan_critical_issues(year=2026):",
    "    issues = {",
    "        'Pendidikan.service': FileNotFoundError,",
    "        'desain.md': NotResponsiveError,",
    "        'KDKMP.anomaly': AnomalyDetected,",
    "        'korupsi.vulnerability': SecurityRisk,",
    "        'dinasti.patch': MergeConflict,",
    "        'MBG.targeting_bug': TargetMismatch,",
    "        'masalah_2026.log': UnresolvedIssues,",
    "    }",
    "    raise RuntimeError('CHANGE_REQUIRED')",
    "scan complete: warnings=7, critical=1, excuses=0",
  ];
  if (c === "audit" || c === "audit()") return [
    "def audit_public_services():",
    "    return {",
    "        'janji': 'deployed',",
    "        'realisasi': ConnectionError,",
    "        'transparansi': PermissionDenied,",
    "        'rakyat': 'waiting_for_patch',",
    "        'keadilan': TimeoutError('please_wait'),",
    "    }",
    "audit result: FAILED_OPENLY",
    "message: kritik bukan bug; kritik adalah health_check()",
  ];
  if (c === "rm -rf 02" || c === "rm -rf 02/") return [
    "$ rm -rf 02  # simulation_only=True",
    "Deleting 02 ...",
    "[████████████████████████████████████████] 100%",
    ...files.map((file) => `rm: removing '${file}'`),
    "rm: removing '02/normalized_indifference.conf'",
    "Done. obsolete_services removed from memory.",
    "Warning: some_services may still be running in background.",
  ];
  if (c === "merdeka" || c === "print('merdeka')") return [
    "def merdeka() -> str:",
    "    return 'Merdeka!'",
    "Merdeka! # freedom != silence",
    "Merdeka! # kritik() == health_check()",
    "Merdeka! # TODO: keep_rebuilding(nusantara)",
  ];
  if (c === "python3 indonesia_os.py" || c === "python indonesia_os.py") return [
    "$ python3 indonesia_os.py",
    ...dashboard,
    "dashboard() => rendered",
    "hint: run('scan') to inspect 2026 issues",
  ];
  if (!c) return [];
  return [`command_not_found: ${command}`, "hint: run 'help' for available commands"];
}

export default function Hutri81Page() {
  const [typed, setTyped] = useState(0);
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [complaint, setComplaint] = useState("");
  const [complaints, setComplaints] = useState<string[]>([]);
  const [visibleComplaints, setVisibleComplaints] = useState(12);
  const booted = typed >= bootLines.length;
  const progress = useMemo(() => Math.min(100, Math.round((typed / bootLines.length) * 100)), [typed]);

  useEffect(() => {
    const timer = window.setInterval(() => setTyped((value) => {
      if (value >= bootLines.length) {
        window.clearInterval(timer);
        return value;
      }
      return value + 1;
    }), 150);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const saved = window.localStorage.getItem("hutri81-complaints");
    const shared = new URLSearchParams(window.location.search).get("keluh");
    const initial = saved ? JSON.parse(saved) as string[] : [];
    if (shared && !initial.includes(shared)) initial.unshift(shared);
    setComplaints(initial.slice(0, 100));
  }, []);

  function submitComplaint(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = complaint.trim();
    if (!value) return;
    const next = [value, ...complaints.filter((item) => item !== value)].slice(0, 100);
    setComplaints(next);
    window.localStorage.setItem("hutri81-complaints", JSON.stringify(next));
    window.history.replaceState({}, "", `${window.location.pathname}?keluh=${encodeURIComponent(value)}`);
    setComplaint("");
  }

  async function shareComplaints() {
    const url = window.location.href;
    if (navigator.share) await navigator.share({ title: "Keluh Kesah Nusantara", text: "Keluh kesah masyarakat — IndonesiaEmas", url });
    else await navigator.clipboard.writeText(url);
  }

  function runCommand(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = command.trim();
    if (!value) return;
    if (value.toLowerCase() === "clear") { setHistory([]); setCommand(""); return; }
    setHistory((current) => [...current, `user@nusantara:~$ ${value}`, ...commandOutput(value)]);
    setCommand("");
  }

  return (
    <main className="hutri-page">
      <div className="scanlines" aria-hidden="true" />
      <section className="terminal-window" aria-label="Indonesia OS terminal">
        <header className="terminal-bar"><div className="window-dots" aria-hidden="true"><i /><i /><i /></div><span className="terminal-title">root@nusantara: ~/indonesia_os.py</span><span className="terminal-status">[ BETA_RELEASE ]</span></header>
        <div className="terminal-body"><div className="terminal-grid"><div className="terminal-main">
          <div className="prompt-line"><span className="prompt">root@indonesia-os:~#</span> python3 indonesia_os.py --year=81</div>
          <div className="boot-output" aria-live="polite">{bootLines.slice(0, typed).map((line, index) => <div key={`${line}-${index}`} className={line.includes("[ OK ]") ? "ok-line" : "muted-line"}>{line || "\u00a0"}</div>)}</div>
          <div className="progress-wrap"><div className="progress-label"><span>boot(IndonesiaEmas_Beta)</span><strong>{progress}%</strong></div><div className="progress-track"><div style={{ width: `${progress}%` }} /></div></div>
          {booted && <div className="hero-copy"><div className="flag-mark"><span /><span /></div><p className="eyebrow">const HUT_RI = new Date("1945-08-17");</p><h1>print(<br /><em>"Dirgahayu Republik Indonesia"</em>)</h1><p className="hero-message"># TODO: fix_all_bugs_before_production();<br /># kritik() == health_check();</p><div className="hero-command"><span className="prompt">root@nusantara:~#</span> raise SystemExit("CHANGE_REQUIRED") <b>// exit_code: 2026</b></div></div>}
          <div className="command-history" aria-live="polite">{history.map((line, index) => <div key={`${line}-${index}`} className={line.startsWith("[CRIT]") ? "crit-line" : line.startsWith("[WARN]") ? "warn-line" : line.startsWith("[ OK ]") ? "ok-line" : "history-line"}>{line || "\u00a0"}</div>)}</div>
          <form className="command-form" onSubmit={runCommand}><span className="prompt">user@nusantara:~$</span><input value={command} onChange={(event) => setCommand(event.target.value)} aria-label="Terminal command" placeholder={booted ? "type 'help' for commands" : "booting..."} disabled={!booted} autoComplete="off" /><span className="cursor" aria-hidden="true" /></form>
          <section className="complaint-box" aria-label="Keluh kesah masyarakat"><div className="complaint-title">// public_input::<span>keluh_kesah</span>()</div><form onSubmit={submitComplaint}><textarea value={complaint} onChange={(event) => setComplaint(event.target.value)} maxLength={280} placeholder="// tulis keluh kesah masyarakat..." aria-label="Keluh kesah masyarakat" /><div className="complaint-actions"><small>{complaint.length}/280 :: storage=localStorage</small><button type="submit">submit()</button><button type="button" onClick={shareComplaints}>share()</button></div></form>{complaints.length > 0 && <div className="complaint-list">{complaints.slice(0, visibleComplaints).map((item, index) => <div className="complaint-item" key={`${item}-${index}`}><span className="bullet" aria-hidden="true">•</span>{item}</div>)}{complaints.length > visibleComplaints && <button className="complaint-next" type="button" onClick={() => setVisibleComplaints((count) => count + 12)}>next()</button>}</div>}</section>
        </div><aside className="system-panel"><div className="panel-heading">class IndonesiaEmas(Beta):</div><dl><div><dt>country</dt><dd>"ID"</dd></div><div><dt>version</dt><dd>81.0.0</dd></div><div><dt>status</dt><dd className="red-value">BUGGY</dd></div><div><dt>stability</dt><dd className="red-value">0.42</dd></div><div><dt>uptime</dt><dd>81 * YEAR</dd></div><div><dt>root_access</dt><dd>False</dd></div></dl><div className="panel-heading commit-heading">git log --oneline</div><ul className="commit-list"><li>Pendidikan.service <b>// FILE_NOT_FOUND</b></li><li>desain.md <b>// NOT_RESPONSIVE</b></li><li>masalah_2026.log <b>// UNRESOLVED</b></li><li>makar.exception <b>// DETECTED</b></li><li>korupsi.vulnerability <b>// CRITICAL</b></li><li>dinasti.patch <b>// MERGE_CONFLICT</b></li><li>MBG.targeting_bug <b>// MISDIRECTED</b></li><li>KDKMP.anomaly <b>// DETECTED</b></li></ul><div className="ascii-flag"><span /><span /></div><p className="panel-note"># kritik = health_check()<br /># TODO: ship_change()</p></aside></div></div>
        <footer className="terminal-footer"><span>PID=1945</span><span>encoding="UTF-8"</span><span>env="BETA"</span><span>© NUSANTARA_OS</span></footer>
      </section><p className="mobile-hint">$ type <b>help</b> | <b>scan</b> | <b>status</b> | <b>rm -rf 02</b></p>
    </main>
  );
}

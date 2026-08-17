"use client";

import { useEffect, useMemo, useState } from "react";

type Team = { id: string; name: string };
type Match = { id: string; round: number; slot: number; a: Team | null; b: Team | null; scoreA: number | null; scoreB: number | null; winner: string | null };
type State = { matches: Match[]; rounds: number[]; seed: string };

const teams = [
  "X Animasi", "X Kuliner", "X TEI 1", "X TEI 2", "X TEI 3", "X TKR 1", "X TKR 2", "X TKR 3", "X TKR 4", "X TKR 5", "X TKR 6", "X TKR 7", "X TKR 8", "X TKR 9", "X TKR 10", "X TKR 11", "X TSM 1", "X TSM 2", "X TSM 3", "X TSM 4",
  "XI Animasi", "XI Kuliner", "XI TEI 1", "XI TEI 2", "XI TKR 1", "XI TKR 2", "XI TKR 3", "XI TKR 4", "XI TKR 5", "XI TKR 6", "XI TKR 7", "XI TKR 8", "XI TKR 9", "XI TKR 10", "XI TKR 11", "XI TKR 12", "XI TSM 1", "XI TSM 2", "XI TSM 3", "XI TSM 4",
];

function shuffle<T>(input: T[]) { const copy = [...input]; for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; } return copy; }
function createInitial(): State {
  const shuffled = shuffle(teams).map((name, i) => ({ id: `team-${i}`, name }));
  return { seed: new Date().toISOString(), rounds: [1], matches: Array.from({ length: 20 }, (_, i) => ({ id: `r1-${i}`, round: 1, slot: i + 1, a: shuffled[i * 2], b: shuffled[i * 2 + 1], scoreA: null, scoreB: null, winner: null })) };
}
function advance(state: State): State {
  const sorted = [...state.matches].filter(m => m.round === Math.max(...state.rounds)).sort((a, b) => a.slot - b.slot);
  if (sorted.some(m => !m.winner)) return state;
  const winners = sorted.map(m => (m.winner === m.a?.id ? m.a : m.b)).filter(Boolean) as Team[];
  if (winners.length <= 1) return state;
  const nextRound = Math.max(...state.rounds) + 1;
  const next: Match[] = [];
  for (let i = 0; i < winners.length; i += 2) next.push({ id: `r${nextRound}-${i / 2}`, round: nextRound, slot: i / 2 + 1, a: winners[i], b: winners[i + 1] ?? null, scoreA: winners[i + 1] ? null : 1, scoreB: winners[i + 1] ? null : 0, winner: winners[i + 1] ? null : winners[i].id });
  return { ...state, rounds: [...state.rounds, nextRound], matches: [...state.matches, ...next] };
}

export default function MlbbStemdaPage() {
  const [state, setState] = useState<State | null>(null);
  const [admin, setAdmin] = useState(false);
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetch("/api/mlbbstemda").then(r => r.json()).then(data => { setState(data.matches?.length ? data : createInitial()); setLoading(false); }).catch(() => { setState(createInitial()); setLoading(false); }); }, []);
  const currentRound = useMemo(() => state ? Math.max(...state.rounds) : 1, [state]);
  const currentMatches = state?.matches.filter(m => m.round === currentRound) ?? [];

  async function save(next: State) {
    setState(next);
    if (!admin) return;
    const response = await fetch("/api/mlbbstemda", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pin, state: next }) });
    setMessage(response.ok ? "Skor tersimpan • pemenang otomatis masuk babak berikutnya" : "Gagal menyimpan skor");
  }
  function updateScore(id: string, side: "a" | "b", value: string) {
    if (!state || pin !== "244345") return;
    const next = { ...state, matches: state.matches.map(m => m.id === id ? { ...m, [side === "a" ? "scoreA" : "scoreB"]: value === "" ? null : Math.max(0, Number(value)) } : m) };
    const match = next.matches.find(m => m.id === id)!;
    if (match.scoreA !== null && match.scoreB !== null && match.scoreA !== match.scoreB) match.winner = match.scoreA > match.scoreB ? match.a?.id ?? null : match.b?.id ?? null; else match.winner = null;
    save(advance(next));
  }
  function reset() { if (!confirm("Acak ulang seluruh bagan? Skor lama akan dihapus.")) return; save(createInitial()); }
  if (loading || !state) return <main className="mlbb-page"><p>Memuat bagan pertandingan...</p></main>;

  return <main className="mlbb-page">
    <div className="mlbb-topbar"><div><span className="mlbb-kicker">STEMDA ESPORTS // 2026</span><h1>Battle of <b>Mobile Legends</b></h1><p>SMKS Muhammadiyah 2 Genteng • Bagan kelas X & XI • {teams.length} tim</p></div><div className="mlbb-actions"><button className="outline" onClick={() => window.print()}>Cetak A4</button>{!admin ? <button className="admin" onClick={() => setAdmin(true)}>Admin</button> : <button className="admin" onClick={() => setAdmin(false)}>Keluar Admin</button>}</div></div>
    {admin && <section className="admin-panel"><label>PIN ADMIN <input inputMode="numeric" type="password" value={pin} onChange={e => setPin(e.target.value)} placeholder="Masukkan PIN" /></label><button className="admin" onClick={() => setMessage(pin === "244345" ? "Mode admin aktif" : "PIN salah")}>Buka akses</button><button className="outline" onClick={reset}>Acak ulang</button><span>{message}</span></section>}
    <section className="hero-strip"><div><span className="round-label">BABAK BERJALAN</span><strong>{currentRound === 1 ? "BABAK PENYISIHAN" : `BABAK ${currentRound}`}</strong></div><div className="hero-note">Update skor pertandingan, pemenang langsung naik ke babak selanjutnya.</div></section>
    <section className="bracket"><div className="bracket-head"><h2>Bracket pertandingan</h2><span>Babak {currentRound} • {currentMatches.length} pertandingan</span></div><div className="match-grid">{currentMatches.map((m, i) => <article className={`match ${m.winner ? "done" : ""}`} key={m.id}><div className="match-meta"><span>MATCH {String(i + 1).padStart(2, "0")}</span>{m.winner && <b>WIN</b>}</div><div className={`team ${m.winner === m.a?.id ? "winner" : ""}`}><span>{m.a?.name ?? "BYE"}</span>{admin ? <input aria-label={`Skor ${m.a?.name}`} type="number" min="0" value={m.scoreA ?? ""} onChange={e => updateScore(m.id, "a", e.target.value)} /> : <strong>{m.scoreA ?? "—"}</strong>}</div><div className={`team ${m.winner === m.b?.id ? "winner" : ""}`}><span>{m.b?.name ?? "MENUNGGU"}</span>{admin ? <input aria-label={`Skor ${m.b?.name}`} type="number" min="0" value={m.scoreB ?? ""} onChange={e => updateScore(m.id, "b", e.target.value)} /> : <strong>{m.scoreB ?? "—"}</strong>}</div></article>)}</div></section>
    <footer><span>STEMDA • FAIR PLAY • GGWP</span><span>gumpla.web.id/mlbbstemda</span></footer>
  </main>;
}

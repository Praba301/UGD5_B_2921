'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Game2 from "../../components/Game2";
import Game3 from "../../components/Game3";

type GameType = "game2" | "game3" | null;

export default function Home() {
    const router = useRouter();
    const [activeGame, setActiveGame] = useState<GameType>(null);
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            router.replace('/auth/notauthorized');
        }
    }, [router]);

    const handleSelectGame = (game: GameType) => {
        setAnimating(true);
        setTimeout(() => {
            setActiveGame(game);
            setAnimating(false);
        }, 250);
    };

    const games = [
        {
            key: "game2" as GameType,
            emoji: "🃏",
            label: "Memory Card",
            desc: "Cocokkan semua pasangan kartu sebelum waktu habis!",
            glow: "rgba(245,158,11,0.4)",
            bg: "rgba(245,158,11,0.08)",
            border: "rgba(245,158,11,0.3)",
        },
        {
            key: "game3" as GameType,
            emoji: "🔢",
            label: "Tebak Angka",
            desc: "Tebak angka rahasia 1–100 dalam 7 kesempatan!",
            glow: "rgba(56,189,248,0.4)",
            bg: "rgba(56,189,248,0.08)",
            border: "rgba(56,189,248,0.3)",
        },
    ];

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 50%, #0a1628 100%)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '40px 16px 60px',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: "'Poppins', sans-serif",
        }}>
            {/* Animated blobs */}
            <div style={{ position:'fixed', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle, #3b82f6, transparent)', filter:'blur(80px)', opacity:0.18, top:'-100px', left:'-100px', animation:'blobFloat 12s ease-in-out infinite alternate', pointerEvents:'none', zIndex:0 }} />
            <div style={{ position:'fixed', width:'350px', height:'350px', borderRadius:'50%', background:'radial-gradient(circle, #f59e0b, transparent)', filter:'blur(80px)', opacity:0.18, bottom:'-80px', right:'-80px', animation:'blobFloat 9s ease-in-out infinite alternate', animationDelay:'-3s', pointerEvents:'none', zIndex:0 }} />
            <div style={{ position:'fixed', width:'300px', height:'300px', borderRadius:'50%', background:'radial-gradient(circle, #8b5cf6, transparent)', filter:'blur(80px)', opacity:0.18, top:'50%', left:'50%', transform:'translate(-50%,-50%)', animation:'blobFloat 15s ease-in-out infinite alternate', animationDelay:'-6s', pointerEvents:'none', zIndex:0 }} />

            <div style={{ position:'relative', zIndex:1, width:'100%', maxWidth:'520px', display:'flex', flexDirection:'column', alignItems:'center', gap:'40px' }}>

                {/* Header */}
                <div style={{ textAlign:'center', animation:'slideDown 0.6s ease both' }}>
                    <div style={{ display:'inline-block', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.15)', color:'#93c5fd', fontSize:'0.8rem', fontWeight:600, letterSpacing:'2px', textTransform:'uppercase', padding:'6px 18px', borderRadius:'99px', marginBottom:'16px', backdropFilter:'blur(8px)' }}>
                        🎮 Game Zone
                    </div>
                    <h1 style={{ color:'#ffffff', fontSize:'2.6rem', fontWeight:900, margin:'0 0 10px', letterSpacing:'-1px', textShadow:'0 0 40px rgba(147,197,253,0.3)' }}>
                        Selamat Datang!
                    </h1>
                    <p style={{ color:'#64748b', fontSize:'1rem', margin:0 }}>
                        Pilih game favoritmu dan mulai bermain
                    </p>
                </div>

                {/* Game Cards */}
                {activeGame === null && (
                    <div style={{ display:'flex', flexDirection:'column', gap:'16px', width:'100%' }}>
                        {games.map((g, i) => (
                            <button
                                key={g.key}
                                onClick={() => handleSelectGame(g.key)}
                                style={{
                                    position: 'relative',
                                    background: g.bg,
                                    border: `1px solid ${g.border}`,
                                    borderRadius: '20px',
                                    padding: '24px 24px 24px 20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '18px',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    overflow: 'hidden',
                                    backdropFilter: 'blur(12px)',
                                    animation: `cardIn 0.5s ease both`,
                                    animationDelay: `${i * 0.15}s`,
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px) scale(1.01)';
                                    (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${g.glow}`;
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLElement).style.transform = 'none';
                                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                                }}
                            >
                                <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'5px', background: g.key === 'game2' ? 'linear-gradient(to bottom, #f59e0b, #ea580c)' : 'linear-gradient(to bottom, #38bdf8, #2563eb)', borderRadius:'99px 0 0 99px' }} />
                                <div style={{ fontSize:'2.8rem', flexShrink:0, filter:`drop-shadow(0 0 12px ${g.glow})` }}>{g.emoji}</div>
                                <div style={{ flex:1 }}>
                                    <h3 style={{ color:'#f1f5f9', fontSize:'1.2rem', fontWeight:800, margin:'0 0 4px' }}>{g.label}</h3>
                                    <p style={{ color:'#94a3b8', fontSize:'0.85rem', margin:0, lineHeight:1.4 }}>{g.desc}</p>
                                </div>
                                <div style={{ color:'rgba(255,255,255,0.3)', fontSize:'1.4rem', flexShrink:0 }}>→</div>
                            </button>
                        ))}
                    </div>
                )}

                {/* Active Game - tanpa tabs, tombol kembali di tengah */}
                {activeGame !== null && (
                    <div style={{ width:'100%', display:'flex', flexDirection:'column', alignItems:'center', gap:'16px', animation: animating ? 'fadeOut 0.25s ease both' : 'fadeIn 0.3s ease both' }}>

                        <div style={{ width:'100%' }}>
                            {activeGame === "game2" && <Game2 />}
                            {activeGame === "game3" && <Game3 />}
                        </div>

                        {/* Tombol Kembali di tengah, di bawah game */}
                        <div style={{ display:'flex', justifyContent:'center', width:'100%', marginTop:'8px' }}>
                            <button
                                onClick={() => handleSelectGame(null)}
                                style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', color:'#94a3b8', padding:'8px 24px', borderRadius:'10px', fontSize:'0.85rem', fontWeight:600, cursor:'pointer', backdropFilter:'blur(8px)' }}
                            >
                                ← Kembali
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes blobFloat {
                    0% { transform: scale(1) translate(0, 0); }
                    100% { transform: scale(1.15) translate(30px, -20px); }
                }
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-24px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes cardIn {
                    from { opacity: 0; transform: translateY(20px) scale(0.97); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(12px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `}</style>
        </div>
    );
}

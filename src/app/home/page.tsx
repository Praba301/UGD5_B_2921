'use client'
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Game1 from "../../components/Game1";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            router.replace('/auth/notauthorized');
        }
    }, [router]);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 50%, #0a1628 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
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

            <div style={{ position:'relative', zIndex:1, width:'100%', display:'flex', flexDirection:'column', alignItems:'center', gap:'24px' }}>
                <h1 style={{ color:'#ffffff', fontSize:'2.6rem', fontWeight:900, margin:0, letterSpacing:'-1px', textShadow:'0 0 40px rgba(147,197,253,0.3)' }}>
                    Selamat Datang!
                </h1>
                <Game1 />
            </div>

            <style>{`
                @keyframes blobFloat {
                    0% { transform: scale(1) translate(0, 0); }
                    100% { transform: scale(1.15) translate(30px, -20px); }
                }
            `}</style>
        </div>
    );
}

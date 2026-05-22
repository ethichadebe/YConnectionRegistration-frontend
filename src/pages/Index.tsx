import { useEffect, useState, useRef } from 'react';
import { Calendar, MapPin, CreditCard, ChevronDown, ArrowRight, Users } from 'lucide-react';

const EVENT_DATE = new Date('2026-07-03T00:00:00');

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function useVisible(ref: React.RefObject<Element>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return visible;
}

const CountdownBox = ({ value, label }: { value: number; label: string }) => (
  <div style={{ textAlign: 'center', minWidth: '70px' }}>
    <div style={{
      fontSize: 'clamp(32px, 5vw, 54px)',
      fontWeight: 900,
      color: '#CC0000',
      lineHeight: 1,
      fontFamily: "'Oswald', sans-serif",
      letterSpacing: '-1px',
    }}>
      {String(value).padStart(2, '0')}
    </div>
    <div style={{ fontSize: '10px', color: '#888', letterSpacing: '3px', textTransform: 'uppercase', marginTop: '6px', fontWeight: 600 }}>
      {label}
    </div>
  </div>
);

const DetailCard = ({ icon, title, lines, sub }: { icon: React.ReactNode; title: string; lines: string[]; sub?: string }) => (
  <div className="detail-card">
    <div style={{ color: '#CC0000', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>{icon}</div>
    <div style={{ fontSize: '11px', letterSpacing: '3px', color: '#999', marginBottom: '10px', textTransform: 'uppercase', fontWeight: 600 }}>{title}</div>
    {lines.map((l, i) => (
      <div key={i} style={{ fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 800, color: 'white', lineHeight: 1.2, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.5px' }}>{l}</div>
    ))}
    {sub && <div style={{ fontSize: '12px', color: '#aaa', marginTop: '8px', letterSpacing: '1px' }}>{sub}</div>}
  </div>
);

const Index = () => {
  const countdown = useCountdown(EVENT_DATE);
  const detailsRef = useRef<HTMLElement>(null!);
  const scriptureRef = useRef<HTMLElement>(null!);
  const ctaRef = useRef<HTMLElement>(null!);
  const detailsVisible = useVisible(detailsRef);
  const scriptureVisible = useVisible(scriptureRef);
  const ctaVisible = useVisible(ctaRef);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", overflow: 'hidden' }}>

      {/* ── STICKY NAV ───────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(20, 0, 0, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(204,0,0,0.25)',
        padding: '14px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/assets/salvation-army-logo.png" alt="The Salvation Army" style={{ height: '32px', width: 'auto' }} />
          <img src="/assets/red-logo.png" alt="red." style={{ height: '22px', width: 'auto', filter: 'brightness(10)' }} />
        </div>
        <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
          <a href="#details" className="nav-link">Details</a>
          <a href="#scripture" className="nav-link">Theme</a>
          <a href="#register" className="cta-primary" style={{ padding: '10px 24px', fontSize: '13px', animation: 'none', boxShadow: '0 2px 10px rgba(204,0,0,0.4)' }}>
            Register
          </a>
        </div>
      </nav>

      {/* ── HERO SECTION ─────────────────────────────────── */}
      <section style={{
        minHeight: '100vh',
        background: '#F5F0E8',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '70px',
      }}>

        {/* Background red arc — replicates the poster's large red right shape */}
        <div style={{
          position: 'absolute', top: '-8%', right: '-18%',
          width: '65vw', height: '110vh',
          background: 'radial-gradient(ellipse at 60% 40%, rgba(180,0,0,0.18) 0%, rgba(204,0,0,0.08) 50%, transparent 75%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />

        {/* Halftone decor — top right, faithfully positioned */}
        <img src="/assets/halftone-decor.png" alt="" style={{
          position: 'absolute', top: 0, right: 0,
          width: 'clamp(200px, 32%, 420px)',
          opacity: 1,
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        {/* Floating doodles */}
        <img src="/assets/crown-doodle.png" alt="" className="doodle-float" style={{
          position: 'absolute', top: '18%', right: '12%',
          width: 'clamp(60px, 8vw, 110px)', opacity: 0.9, zIndex: 2, pointerEvents: 'none',
        }} />
        <img src="/assets/x-marks.png" alt="" className="doodle-float-reverse" style={{
          position: 'absolute', top: '28%', left: '3%',
          width: 'clamp(50px, 7vw, 90px)', opacity: 0.8, zIndex: 2, pointerEvents: 'none',
        }} />
        <img src="/assets/zigzag-doodle.png" alt="" className="doodle-float-slow" style={{
          position: 'absolute', bottom: '22%', left: '2%',
          width: 'clamp(60px, 9vw, 130px)', opacity: 0.75, zIndex: 2, pointerEvents: 'none',
        }} />
        <img src="/assets/small-doodles.png" alt="" className="doodle-float" style={{
          position: 'absolute', bottom: '30%', right: '6%',
          width: 'clamp(40px, 5vw, 70px)', opacity: 0.7, zIndex: 2, pointerEvents: 'none',
        }} />

        {/* ── Top logos bar ── */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '20px 40px 10px', gap: '14px', position: 'relative', zIndex: 10 }}>
          <img src="/assets/salvation-army-logo.png" alt="The Salvation Army" style={{ height: 'clamp(48px, 7vw, 72px)', width: 'auto' }} />
          <img src="/assets/red-logo.png" alt="red." style={{ height: 'clamp(36px, 5vw, 54px)', width: 'auto' }} />
        </div>

        {/* ── Main grid: left content + right image ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0',
          padding: '0 40px',
          position: 'relative',
          zIndex: 10,
          alignItems: 'center',
          minHeight: 'calc(100vh - 200px)',
        }}>

          {/* LEFT: text & buttons */}
          <div style={{ animation: 'fadeInLeft 0.8s ease both', paddingRight: '20px' }}>

            <img
              src="/assets/ycon-logo.png"
              alt="Y-CON 2026 Central Division"
              style={{ width: 'clamp(260px, 42vw, 520px)', display: 'block' }}
            />

            <p style={{
              fontSize: 'clamp(15px, 1.8vw, 21px)',
              lineHeight: 1.45,
              marginTop: '18px',
              color: '#1A1A1A',
              fontStyle: 'italic',
              fontWeight: 500,
            }}>
              IT'S MORE THAN<br />
              A CONFERENCE.<br />
              <span style={{ color: '#CC0000', fontWeight: 800, fontStyle: 'normal' }}>IT'S A DIVINE<br />ENCOUNTER!</span>
            </p>

            <img
              src="/assets/mission-team-banner.png"
              alt="Guest: Mission Team"
              style={{ width: 'clamp(200px, 30vw, 380px)', display: 'block', marginTop: '20px' }}
            />

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '14px', marginTop: '30px', flexWrap: 'wrap', alignItems: 'center' }}>
              <a href="#register" className="cta-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Register Now — R550 <ArrowRight size={16} />
              </a>
              <a href="#details" className="cta-secondary">
                Event Details
              </a>
            </div>

            {/* Small tagline under buttons */}
            <p style={{ marginTop: '14px', fontSize: '12px', color: '#888', letterSpacing: '1px' }}>
              MEALS & ACCOMMODATION INCLUDED · 3–5 JULY 2026
            </p>
          </div>

          {/* RIGHT: sunglasses + BELIEVE BEHOLD BECOME */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeInRight 0.8s ease 0.2s both' }}>

            <img
              src="/assets/sunglasses.png"
              alt="SEE — 2 Kings 6:16–17"
              style={{
                width: 'clamp(260px, 42vw, 560px)',
                position: 'relative',
                zIndex: 5,
                filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.20))',
              }}
            />

            {/* BELIEVE. BEHOLD. BECOME. */}
            <div style={{
              position: 'absolute',
              right: '-10px',
              bottom: '8%',
              textAlign: 'right',
              zIndex: 6,
            }}>
              <p style={{
                fontSize: 'clamp(13px, 1.6vw, 20px)',
                fontWeight: 800,
                lineHeight: 1.5,
                color: '#1A1A1A',
                letterSpacing: '2px',
                fontFamily: "'Oswald', sans-serif",
              }}>
                BELIEVE.<br />BEHOLD.<br />BECOME.
              </p>
            </div>
          </div>
        </div>

        {/* ── Countdown bar ── */}
        <div style={{
          position: 'relative', zIndex: 10,
          background: 'rgba(30, 0, 0, 0.07)',
          borderTop: '1px solid rgba(204,0,0,0.18)',
          padding: '22px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(24px, 5vw, 64px)',
          flexWrap: 'wrap',
        }}>
          <div style={{ fontSize: '11px', letterSpacing: '3px', color: '#CC0000', fontWeight: 700, textTransform: 'uppercase', marginRight: '8px' }}>
            Countdown
          </div>
          <CountdownBox value={countdown.days} label="Days" />
          <div style={{ color: '#CC0000', fontWeight: 900, fontSize: '28px', alignSelf: 'flex-start', marginTop: '4px' }}>:</div>
          <CountdownBox value={countdown.hours} label="Hours" />
          <div style={{ color: '#CC0000', fontWeight: 900, fontSize: '28px', alignSelf: 'flex-start', marginTop: '4px' }}>:</div>
          <CountdownBox value={countdown.minutes} label="Minutes" />
          <div style={{ color: '#CC0000', fontWeight: 900, fontSize: '28px', alignSelf: 'flex-start', marginTop: '4px' }}>:</div>
          <CountdownBox value={countdown.seconds} label="Seconds" />
        </div>

        {/* Scroll indicator */}
        <a href="#details" style={{
          position: 'absolute', bottom: '80px', left: '50%',
          animation: 'scroll-bounce 1.5s ease-in-out infinite',
          color: '#CC0000', opacity: 0.7, zIndex: 10, textDecoration: 'none',
        }}>
          <ChevronDown size={28} />
        </a>
      </section>

      {/* ── EVENT DETAILS SECTION ────────────────────────── */}
      <section
        id="details"
        ref={detailsRef}
        style={{
          padding: 'clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px)',
          background: '#141414',
          color: 'white',
        }}
      >
        <div style={{
          textAlign: 'center', marginBottom: '48px',
          opacity: detailsVisible ? 1 : 0,
          transform: detailsVisible ? 'none' : 'translateY(30px)',
          transition: 'all 0.7s ease',
        }}>
          <p style={{ fontSize: '11px', letterSpacing: '4px', color: '#CC0000', marginBottom: '10px', textTransform: 'uppercase', fontWeight: 700 }}>
            EVENT DETAILS
          </p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, fontFamily: "'Oswald', sans-serif", letterSpacing: '1px' }}>
            MARK YOUR CALENDAR
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px',
          maxWidth: '900px',
          margin: '0 auto',
          opacity: detailsVisible ? 1 : 0,
          transform: detailsVisible ? 'none' : 'translateY(40px)',
          transition: 'all 0.8s ease 0.2s',
        }}>
          <DetailCard
            icon={<Calendar size={32} />}
            title="Date"
            lines={['3–5', 'JULY 2026']}
          />
          <DetailCard
            icon={<MapPin size={32} />}
            title="Venue"
            lines={['MIGHTY APIES']}
            sub="Pretoria, Gauteng"
          />
          <DetailCard
            icon={<CreditCard size={32} />}
            title="Registration Fee"
            lines={['R550']}
            sub="Per person · Meals & Accommodation"
          />
        </div>

        {/* Register button within details */}
        <div style={{
          textAlign: 'center', marginTop: '48px',
          opacity: detailsVisible ? 1 : 0,
          transition: 'opacity 0.8s ease 0.4s',
        }}>
          <a href="#register" className="cta-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <Users size={18} /> Secure Your Spot — Register Now
          </a>
        </div>
      </section>

      {/* ── SCRIPTURE SECTION ────────────────────────────── */}
      <section
        id="scripture"
        ref={scriptureRef}
        style={{
          padding: 'clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px)',
          background: '#F5F0E8',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative crown in background */}
        <img src="/assets/crown-x-doodle.png" alt="" style={{
          position: 'absolute', top: '10%', right: '5%',
          width: 'clamp(80px, 12vw, 160px)', opacity: 0.18,
          pointerEvents: 'none',
        }} />

        <div style={{
          maxWidth: '780px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          alignItems: 'center',
          opacity: scriptureVisible ? 1 : 0,
          transform: scriptureVisible ? 'none' : 'translateY(40px)',
          transition: 'all 0.8s ease',
        }}>

          {/* Left: "SEE" display */}
          <div>
            <div style={{
              fontSize: 'clamp(64px, 10vw, 110px)',
              fontWeight: 900,
              color: '#CC0000',
              lineHeight: 0.9,
              fontFamily: "'Oswald', sans-serif",
              letterSpacing: '-2px',
            }}>
              SEE
            </div>
            <div style={{
              fontSize: 'clamp(14px, 2vw, 18px)',
              fontWeight: 700,
              color: '#1A1A1A',
              letterSpacing: '2px',
              marginTop: '10px',
              fontFamily: "'Oswald', sans-serif",
            }}>
              2 KINGS 6:16–17
            </div>
            <div style={{
              width: '50px', height: '4px',
              background: '#FFC107',
              marginTop: '16px',
              borderRadius: '2px',
            }} />
          </div>

          {/* Right: scripture quote */}
          <div>
            <p style={{
              fontSize: 'clamp(13px, 1.5vw, 16px)',
              lineHeight: 1.8,
              color: '#333',
              fontStyle: 'italic',
            }}>
              <span style={{ fontSize: '2em', lineHeight: 0, verticalAlign: '-0.3em', color: '#CC0000', fontWeight: 900 }}>"</span>
              Don't be afraid," Elisha answered. "Those who are with us are{' '}
              <span style={{ color: '#CC0000', fontWeight: 700 }}>more</span> than those who are with them." Then Elisha prayed, "Lord, open his eyes so he may{' '}
              <span style={{ color: '#CC0000', fontWeight: 700 }}>see</span>."
              And the Lord opened the young man's eyes, and he{' '}
              <span style={{ color: '#CC0000', fontWeight: 700 }}>saw</span> the hills filled with horses and chariots of fire all around Elisha.
            </p>
            <p style={{ marginTop: '16px', fontSize: '12px', letterSpacing: '2px', color: '#999', fontWeight: 600 }}>2 KINGS 6:16–17</p>
          </div>
        </div>
      </section>

      {/* ── REGISTER / FINAL CTA SECTION ─────────────────── */}
      <section
        id="register"
        ref={ctaRef}
        style={{
          position: 'relative',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Sunset silhouette background */}
        <img
          src="/assets/sunset-silhouette.png"
          alt=""
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
        />

        {/* Dark overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,0,0,0.55) 0%, rgba(80,0,0,0.70) 100%)',
        }} />

        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 10,
          textAlign: 'center',
          padding: 'clamp(48px, 8vw, 100px) clamp(24px, 5vw, 80px)',
          opacity: ctaVisible ? 1 : 0,
          transform: ctaVisible ? 'none' : 'translateY(30px)',
          transition: 'all 0.8s ease',
        }}>
          <img src="/assets/ycon-logo.png" alt="Y-CON 2026" style={{
            height: 'clamp(80px, 14vw, 160px)',
            width: 'auto',
            marginBottom: '20px',
            filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.5))',
          }} />

          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 54px)',
            fontWeight: 900,
            color: 'white',
            fontFamily: "'Oswald', sans-serif",
            letterSpacing: '2px',
            marginBottom: '8px',
          }}>
            JOIN THE ENCOUNTER
          </h2>

          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'clamp(14px, 1.8vw, 18px)', marginBottom: '36px', maxWidth: '500px', margin: '0 auto 36px' }}>
            3–5 July 2026 · Mighty Apies, Pretoria<br />
            <span style={{ color: '#FFC107', fontWeight: 700 }}>R550 per person</span> · Meals & Accommodation Included
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="cta-primary" style={{ fontSize: '16px', padding: '16px 44px', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              <ArrowRight size={20} /> Register Now
            </button>
            <a href="#details" className="cta-secondary" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}>
              View Details
            </a>
          </div>

          <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
            {['BELIEVE.', 'BEHOLD.', 'BECOME.'].map((w) => (
              <span key={w} style={{
                fontSize: 'clamp(14px, 2vw, 20px)',
                fontWeight: 800,
                color: 'rgba(255,255,255,0.5)',
                letterSpacing: '3px',
                fontFamily: "'Oswald', sans-serif",
              }}>{w}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer style={{
        background: '#0A0000',
        padding: '32px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/assets/salvation-army-logo.png" alt="The Salvation Army" style={{ height: '36px', width: 'auto', opacity: 0.8 }} />
          <img src="/assets/red-logo.png" alt="red." style={{ height: '24px', width: 'auto', filter: 'brightness(10)', opacity: 0.6 }} />
        </div>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', letterSpacing: '1px' }}>
          © 2026 The Salvation Army · Central Division · Y-CON 2026
        </p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="#" className="nav-link" style={{ fontSize: '12px' }}>Contact</a>
          <a href="#" className="nav-link" style={{ fontSize: '12px' }}>Privacy</a>
        </div>
      </footer>

    </div>
  );
};

export default Index;

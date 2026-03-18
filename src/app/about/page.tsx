"use client";

export default function AboutPage() {
  return (
    <main className="decode-main">
      <header className="decode-header">
        <div className="decode-logo">
          <span className="logo-bracket">[</span>
          <span className="logo-text">decode</span>
          <span className="logo-bracket">]</span>
        </div>
        <p className="decode-tagline">Tech, explained like someone who gets it.</p>
      </header>

      <section className="about-section">
        <div className="about-back">
          <a href="/" className="back-link">← Ask a question</a>
        </div>

        <div className="about-headline-block">
          <p className="section-label">About</p>
          <h1 className="about-headline">
            Tech has a language problem.<br />Decode fixes that.
          </h1>
          <p className="about-sub">
            A free tool that explains technology in plain language — no account,
            no judgment, no jargon.
          </p>
        </div>

        <div className="about-divider" />

        <div className="about-block">
          <h2 className="about-block-label">Who this is for</h2>
          <p className="about-body">
            If you&apos;ve got a notification you haven&apos;t touched yet, a bill that
            doesn&apos;t add up, or a text that doesn&apos;t look right — you&apos;re in the
            right place.
          </p>
          <p className="about-body">
            Decode is built for people who are busy living their lives — working
            in construction, in kitchens, in schools, raising families — and
            just need a straight answer without having to wade through a search
            engine or sit on hold.
          </p>
          <p className="about-body">
            No prior knowledge needed. No account. Just ask.
          </p>
        </div>

        <div className="about-divider" />

        <div className="about-block">
          <h2 className="about-block-label">How it works</h2>
          <p className="about-body">
            Describe whatever you&apos;re looking at. A weird text message. A bill
            that doesn&apos;t look right. An error on your screen. Something someone
            told you to download. Anything tech-related.
          </p>
          <p className="about-body">
            Decode tells you what it is, what you need to do (if anything), and
            whether something looks like a scam or a trick. Plain language,
            every time. And if the right answer is &ldquo;head to your local
            library&rdquo; — that&apos;s what we&apos;ll say.
          </p>
        </div>

        <div className="pillars">
          <div className="pillar">
            <span className="pillar-icon">◈</span>
            <p className="pillar-title">No account needed</p>
            <p className="pillar-desc">Just ask. Nothing to sign up for, ever.</p>
          </div>
          <div className="pillar">
            <span className="pillar-icon">◎</span>
            <p className="pillar-title">Always free</p>
            <p className="pillar-desc">No ads, no subscription, no catch.</p>
          </div>
          <div className="pillar">
            <span className="pillar-icon">◬</span>
            <p className="pillar-title">Nothing saved</p>
            <p className="pillar-desc">Your questions are never stored or shared.</p>
          </div>
          <div className="pillar">
            <span className="pillar-icon">⊕</span>
            <p className="pillar-title">Works anywhere</p>
            <p className="pillar-desc">Library computer, older phone, slow connection — it works.</p>
          </div>
        </div>

        <div className="about-divider" />

        <div className="about-block">
          <h2 className="about-block-label">What we&apos;ll never do</h2>
          <p className="about-body">
            We will never sell your data. We will never show you ads. We will
            never ask you to pay. Every question gets treated with the same
            respect — whether it&apos;s your first or your fiftieth.
          </p>
          <p className="about-body">
            Technology should work for people, not the other way around.
            That&apos;s the whole idea.
          </p>
        </div>

        <div className="about-cta">
          <p className="about-cta-text">
            You don&apos;t need an account. You don&apos;t need to know anything first.
          </p>
          <a href="/" className="decode-btn">Ask your first question</a>
        </div>
      </section>

      <footer className="decode-footer">
        <p>Built for anyone who&apos;s ever felt left behind by tech.</p>
      </footer>

      <style jsx>{`
        :global(body) {
          margin: 0;
          background: #1c1610;
          color: #e8dfc8;
          font-family: 'Georgia', 'Times New Roman', serif;
          min-height: 100vh;
          background-image:
            radial-gradient(ellipse at 20% 20%, rgba(74, 95, 58, 0.08) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 80%, rgba(139, 90, 43, 0.08) 0%, transparent 60%);
        }

        .decode-main {
          max-width: 720px;
          margin: 0 auto;
          padding: 3rem 1.5rem 4rem;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .decode-header {
          text-align: center;
          padding-top: 2rem;
        }

        .decode-logo {
          font-family: 'Courier New', monospace;
          font-size: 2.2rem;
          font-weight: bold;
          letter-spacing: 0.15em;
        }

        .logo-bracket { color: #c4a245; }
        .logo-text    { color: #e8dfc8; }

        .decode-tagline {
          margin: 0.6rem 0 0;
          font-size: 1.05rem;
          color: #a8987c;
          font-style: italic;
          letter-spacing: 0.2em;
        }

        .about-section {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .about-back {
          margin-bottom: 2rem;
        }

        .back-link {
          font-family: 'Courier New', monospace;
          font-size: 1rem;
          letter-spacing: 0.08em;
          color: #4a7a5a;
          text-decoration: none;
          text-transform: uppercase;
        }

        .back-link:hover {
          color: #c4a245;
        }

        .about-headline-block {
          margin-bottom: 2.5rem;
        }

        .section-label {
          font-family: 'Courier New', monospace;
          font-size: 1rem;
          letter-spacing: 0.14em;
          color: #4a7a5a;
          text-transform: uppercase;
          margin: 0 0 1rem;
        }

        .about-headline {
          font-size: clamp(1.7rem, 4vw, 2.2rem);
          font-weight: normal;
          color: #e8dfc8;
          line-height: 1.35;
          margin: 0 0 1.1rem;
          letter-spacing: -0.01em;
        }

        .about-sub {
          font-size: 1.1rem;
          color: #a8987c;
          line-height: 1.75;
          font-style: italic;
          margin: 0;
        }

        .about-divider {
          border-top: 1px solid #3d3224;
          margin: 2rem 0;
        }

        .about-block {
          margin-bottom: 1.5rem;
        }

        .about-block-label {
          font-family: 'Courier New', monospace;
          font-size: 1rem;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #a8987c;
          margin: 0 0 1rem;
        }

        .about-body {
          font-size: 1.1rem;
          color: #d4c9b0;
          line-height: 1.85;
          margin: 0 0 1rem;
        }

        .about-body:last-child {
          margin-bottom: 0;
        }

        .pillars {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(155px, 1fr));
          gap: 0.75rem;
          margin: 1.5rem 0 2rem;
        }

        .pillar {
          background: #251e14;
          border: 1px solid #3d3224;
          border-left: 3px solid #3d3224;
          border-radius: 3px;
          padding: 1.2rem 1.3rem;
        }

        .pillar-icon {
          font-size: 1rem;
          color: #98906e;
          display: block;
          margin-bottom: 0.6rem;
        }

        .pillar-title {
          font-family: 'Courier New', monospace;
          font-size: 0.95rem;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #a8987c;
          margin: 0 0 0.4rem;
        }

        .pillar-desc {
          font-size: 1rem;
          color: #a8987c;
          line-height: 1.65;
          margin: 0;
          font-style: italic;
        }

        .about-cta {
          margin-top: 2rem;
          background: #251e14;
          border: 1px solid #3d3224;
          border-radius: 3px;
          padding: 1.6rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.1rem;
        }

        .about-cta-text {
          font-size: 1.1rem;
          color: #d4c9b0;
          line-height: 1.7;
          margin: 0;
        }

        .decode-btn {
          display: inline-block;
          background: #4a5f3a;
          color: #e8dfc8;
          border: 1px solid #5a7a48;
          border-radius: 3px;
          padding: 0.9rem 2rem;
          font-family: 'Courier New', monospace;
          font-size: 1rem;
          font-weight: bold;
          letter-spacing: 0.08em;
          cursor: pointer;
          text-transform: uppercase;
          text-decoration: none;
          transition: background 0.15s ease, transform 0.1s ease, box-shadow 0.15s ease;
          position: relative;
          overflow: hidden;
        }

        .decode-btn::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(196,162,69,0.4), transparent);
        }

        .decode-btn:hover {
          background: #5a7a48;
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(74, 95, 58, 0.3);
        }

        .decode-btn:active {
          transform: translateY(0);
        }

        .decode-footer {
          margin-top: auto;
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid #2a2218;
        }

        .decode-footer p {
          font-size: 1rem;
          color: #98906e;
          font-style: italic;
          margin: 0;
        }

        @media (max-width: 480px) {
          .decode-main { padding: 2rem 1rem 3rem; }
          .about-headline { font-size: 1.5rem; }
          .decode-logo { font-size: 1.8rem; }
          .pillars { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </main>
  );
}
"use client";

import { responseCookiesToRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { emitWarning } from "process";
import { useState, useRef, useEffect } from "react";

type DecodeResponse = {
  what_it_is: string;
  what_to_do: string;
  what_to_watch: string;
};

function parseResponse(raw: string): DecodeResponse {
  const lines = raw.split("\n");
  const sections: Record<string, string> = {};
  const headers = ["What this is", "What you should do", "What to watch out for"];
  
  let currentHeader = "";
  let currentLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    // Strip bold markers if model ignores instructions
    const cleaned = trimmed.replace(/\*\*/g, "").trim();
    
    if (headers.includes(cleaned)) {
      if (currentHeader) {
        sections[currentHeader] = currentLines.join("\n").trim();
      }
      currentHeader = cleaned;
      currentLines = [];
    } else if (currentHeader) {
      currentLines.push(line);
    }
  }

  // Save last section
  if (currentHeader) {
    sections[currentHeader] = currentLines.join("\n").trim();
  }

  return {
    what_it_is: sections["What this is"] || "",
    what_to_do: sections["What you should do"] || "",
    what_to_watch: sections["What to watch out for"] || "",
  };
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<DecodeResponse | null>(null);
  const [rawResponse, setRawResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [charCount, setCharCount] = useState(0);
  const responseRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (response && responseRef.current) {
        responseRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [response]);

  const handleSubmit = async () => {
    if (!query.trim() || loading) return;
    setLoading(true);
    setError("");
    setResponse(null);
    setRawResponse("");

    try {
      const res = await fetch("/api/decode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setRawResponse(data.response);
      setResponse(parseResponse(data.response));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setQuery("");
    setResponse(null);
    setRawResponse("");
    setError("");
    setCharCount(0);
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit();
  };

  return (
    <main className="decode-main">
      <header className="decode-header">
        <div className="decode-logo">
          <span className="logo-bracket">[</span>
          <span className="logo-text">decode</span>
          <span className="logo-bracket">]</span>
        </div>
        <p className="decode-tagline">Tech, explained like someone who gets it.</p>
        <nav className="decode-nav">
          <a href="/about" className="nav-link">About</a>
        </nav>
      </header>


      <div className="decode-welcome">
        <p className="welcome-text">
          Ask anything about technology — bills, notifications, suspicious texts,
          error messages, settings you&apos;ve never understood. Someone who actually
          gets it will explain it in plain language.
        </p>
        <p className="welcome-trust">
          No account. Nothing saved. No ads. Ever.
        </p>
      </div>

      {!response && (
        <section className="decode-input-section">
          <div className="input-prompt">
            <span className="prompt-arrow">→</span>
            <label htmlFor="decode-input" className="prompt-label">
              What&apos;s confusing you right now?
            </label>
          </div>

          <div className="input-wrapper">
            <textarea
              ref={textareaRef}
              id="decode-input"
              className="decode-textarea"
              placeholder="Paste a notification, describe a bill, type out an error message, or tell me about a suspicious text you got. Anything works!"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCharCount(e.target.value.length);
              }}
              onKeyDown={handleKeyDown}
              maxLength={2000}
              rows={5}
              autoFocus
            />
            <div className="input-meta">
              <span className="char-count">{charCount}/2000</span>
              <span className="keyboard-hint">Ctrl+Enter to submit</span>
            </div>
          </div>

          {error && (
            <div className="error-bar" role="alert">
              {error}
            </div>
          )}

          <button
            className="decode-btn"
            onClick={handleSubmit}
            disabled={!query.trim() || loading}
            aria-busy={loading}
          >
            {loading ? (
              <span className="btn-loading">
                <span className="loading-dot" />
                <span className="loading-dot" />
                <span className="loading-dot" />
                <span>Working on it...</span>
              </span>
            ) : (
              "Decode this"
            )}
          </button>

          <p className="no-account-note">
            No account needed. Nothing is saved. Just answers.
          </p>
        </section>
      )}

      {response && (
        <section className="decode-response" ref={responseRef}>
          <div className="response-query-echo">
            <span className="echo-label">You asked about:</span>
            <p className="echo-text">&ldquo;{query}&rdquo;</p>
          </div>

          <div className="response-cards">
            <div className="response-card card-what">
              <div className="card-header">
                <span className="card-icon">◈</span>
                <h2 className="card-title">What this is</h2>
              </div>
              <p className="card-body">{response.what_it_is || rawResponse}</p>
            </div>

            <div className="response-card card-do">
              <div className="card-header">
                <span className="card-icon">◎</span>
                <h2 className="card-title">What you should do</h2>
              </div>
              <p className="card-body">{response.what_to_do}</p>
            </div>

            <div className="response-card card-watch">
              <div className="card-header">
                <span className="card-icon">◬</span>
                <h2 className="card-title">What to watch out for</h2>
              </div>
              <p className="card-body">{response.what_to_watch}</p>
            </div>
          </div>

          <div className="response-actions">
            <button className="decode-btn" onClick={handleReset}>
              Ask another question
            </button>
            <p className="no-account-note">
              Nothing was saved. Your question stays private.
            </p>
          </div>
        </section>
      )}

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

          /* Header */
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

          .logo-bracket {
            color: #c4a245;
          }

          .logo-text {
            color: #e8dfc8;
          }

          .decode-tagline {
            margin: 0.6rem 0 0;
            font-size: 1rem;
            color: #a8987c;
            font-style: italic;
            letter-spacing: 0.2em;
          }

          .decode-nav {
            margin-top: 0.75rem;
          }

          .nav-link {
            font-family: 'Courier New', monospace;
            font-size: 0.95rem;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #a8987c;
            text-decoration: none;
          }

          .nav-link:hover {
            color: #c4a245;
          }

          .decode-welcome {
            text-align: center;
            max-width: 560px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }

          .welcome-text {
            font-size: 1rem;
            line-height: 1.75;
            color: #d4c9b0;
            font-style: italic;
            margin: 0;
          }

          .welcome-trust {
            font-family: 'Courier New', monospace;
            font-size: 1rem;
            font-weight: bold;
            color: #4a7a5a;
            margin: 0;
            letter-spacing: 0.04em;
          }

          /* Input Section */
          .decode-input-section {
            display: flex;
            flex-direction: column;
            gap: 1.2 rem;
          }

          .input-prompt {
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }

          .prompt-arrow {
            color: #c4a245;
            font-size: 1.3rem;
            font-family: 'Courier New', monospace;
          }

          .prompt-label {
            font-size: 1.4rem;
            font-weight: normal;
            color: #e8dfc8;
            letter-spacing: -0.01em;
            line-height: 1.3;
            cursor: pointer;
          }

          .input-wrapper {
            position: relative;
          }

          .decode-textarea {
            width: 100%;
            background: #251e14;
            border: 1px solid #3d3224;
            border-radius: 3px;
            color: #e8dfc8;
            font-family: 'Georgia', serif;
            font-size: 1rem;
            line-height: 1.7;
            padding: 1.2rem 1.4rem;
            resize: vertical;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
            box-sizing: border-box;
            outline: none;
          }

          .decode-textarea:focus {
            border-color: #c4a245;
            box-shadow: 0 0 0 3px rgba(196, 162, 69, 0.08);
          }

          .decode-textarea::placeholder {
            color: #98906e;
            font-style: italic;
          }

          .input-meta {
            display: flex;
            justify-content: space-between;
            margin-top: 0.4rem;
            font-family: 'Courier New', monospace;
            font-size: 0.72rem;
            color: #98906e;
          }

          .error-bar {
            background: #2a1510;
            border: 1px solid #6b2a20;
            border-radius: 3px;
            padding: 0.8rem 1.2rem;
            color: #e08070;
            font-size: 0.9rem;
          }

          /* Button */
          .decode-btn {
            background: #4a5f3a;
            color: #e8dfc8;
            border: 1px solid #5a7a48;
            border-radius: 3px;
            padding: 0.9rem 2rem;
            font-family: 'Courier New', monospace;
            font-size: 0.95rem;
            font-weight: bold;
            letter-spacing: 0.08em;
            cursor: pointer;
            transition: background 0.15s ease, transform 0.1s ease, box-shadow 0.15s ease;
            align-self: flex-start;
            text-transform: uppercase;
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

          .decode-btn:hover:not(:disabled) {
            background: #5a7a48;
            transform: translateY(-1px);
            box-shadow: 0 4px 16px rgba(74, 95, 58, 0.3);
          }

          .decode-btn:active:not(:disabled) {
            transform: translateY(0);
          }

          .decode-btn:disabled {
            opacity: 0.35;
            cursor: not-allowed;
          }

          .btn-loading {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .loading-dot {
            width: 5px;
            height: 5px;
            background: #e8dfc8;
            border-radius: 50%;
            animation: pulse 1.2s ease-in-out infinite;
          }

          .loading-dot:nth-child(2) { animation-delay: 0.2s; }
          .loading-dot:nth-child(3) { animation-delay: 0.4s; }

          @keyframes pulse {
            0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
            40% { opacity: 1; transform: scale(1); }
          }

          .no-account-note {
            font-size: 1rem;
            color: #98906e;
            font-family: 'Courier New', monospace;
            margin: 0;
          }

          /* Response */
          .decode-response {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            animation: fadeIn 0.4s ease;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .response-query-echo {
            border-left: 3px solid #3d3224;
            padding-left: 1rem;
          }

          .echo-label {
            font-family: 'Courier New', monospace;
            font-size: 0.72rem;
            color: #98906e;
            text-transform: uppercase;
            letter-spacing: 0.08em;
          }

          .echo-text {
            margin: 0.3rem 0 0;
            font-size: 0.9rem;
            color: #a8987c;
            font-style: italic;
            line-height: 1.5;
          }

          .response-cards {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .response-card {
            background: #251e14;
            border: 1px solid #3d3224;
            border-radius: 3px;
            padding: 1.4rem 1.6rem;
            border-left-width: 3px;
          }

          /* Each card gets a distinct earthy accent */
          .card-what  { border-left-color: #4a7a5a; } /* forest green */
          .card-do    { border-left-color: #c4a245; } /* gold lamp */
          .card-watch { border-left-color: #8b5a2b; } /* warm wood brown */

          .card-header {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            margin-bottom: 0.8rem;
          }

          .card-icon {
            color: #98906e;
            font-size: 0.85rem;
          }

          .card-title {
            font-family: 'Courier New', monospace;
            font-size: 0.78rem;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #a8987c;
            margin: 0;
          }

          .card-body {
            font-size: 1rem;
            line-height: 1.78;
            color: #d4c9b0;
            margin: 0;
            white-space: pre-wrap;
          }

          .response-actions {
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
            padding-top: 0.5rem;
          }

          /* Footer */
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

          /* Responsive */
          @media (max-width: 480px) {
            .decode-main { padding: 2rem 1rem 3rem; }
            .prompt-label { font-size: 1.2rem; }
            .decode-logo { font-size: 1.8rem; }
          }
       `}</style>
    </main>
  );
}
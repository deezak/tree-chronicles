import React, { useEffect, useRef, useState } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { Link } from 'react-router-dom';
import './AskMe.css';

const askBlogBot = httpsCallable(getFunctions(), 'askBlogBot');

const AskMe = ({ setActive }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! Ask me anything about a place, experience, or travel tip from my blog. I'll stick to what I've written.",
      sources: [],
    },
  ]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setActive('ask-me');
  }, [setActive]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView?.({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const text = question.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: 'user', content: text, sources: [] }];
    setMessages(nextMessages);
    setQuestion('');
    setLoading(true);

    try {
      const history = nextMessages
        .slice(1, -1)
        .slice(-6)
        .map(({ role, content }) => ({ role, content }));
      const result = await askBlogBot({ question: text, history });
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: result.data.answer,
          sources: result.data.sources || [],
        },
      ]);
    } catch (error) {
      console.error('Unable to get an answer from the blog assistant:', error);
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: "I couldn't connect to the blog assistant. Please try again in a moment.",
          sources: [],
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="ask-me-page">
      <header className="ask-me-heading">
        <h1>ASK ME ANYTHING!</h1>
        {/* <p>Travel questions, answered with stories and details from my blog.</p> */}
      </header>

      <section className="ask-me-chat" aria-label="Ask Me Anything travel chat">
        <div className="ask-me-messages" aria-live="polite">
          {messages.map((message, index) => (
            <article
              className={`ask-me-message ${message.role}${message.isError ? ' error' : ''}`}
              key={`${message.role}-${index}`}
            >
              <p>{message.content}</p>
              {message.sources.length > 0 && (
                <div className="ask-me-sources">
                  <span>From the blog</span>
                  {message.sources.map((source) => (
                    <Link key={source.id} to={`/detail/${encodeURIComponent(source.id)}`}>
                      {source.title}
                      {source.location ? ` · ${source.location}` : ''}
                    </Link>
                  ))}
                </div>
              )}
            </article>
          ))}
          {loading && (
            <p className="ask-me-loading" role="status">Looking through the travel stories…</p>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="ask-me-form" onSubmit={handleSubmit}>
          <label className="visually-hidden" htmlFor="ask-me-question">Your travel question</label>
          <textarea
            id="ask-me-question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask about a place, a meal, getting around…"
            maxLength={500}
            rows={2}
            disabled={loading}
          />
          <button type="submit" disabled={loading || !question.trim()}>
            {loading ? 'Asking…' : 'Ask'}
          </button>
        </form>
        <p className="ask-me-note">Answers are based only on my written experiences.</p>
      </section>
    </main>
  );
};

export default AskMe;

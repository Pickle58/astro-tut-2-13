import { useState } from "preact/hooks";

export default function ContactForm() {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch('/api/send-email', {
      method: 'POST',
      body: JSON.stringify({ email, message }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      setStatus('Email sent successfully!');
    } else {
      setStatus('Error sending email.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input type="email" value={email} onInput={(e) => setEmail(e.target.value)} required />

      <label>Message:</label>
      <textarea value={message} onInput={(e) => setMessage(e.target.value)} required></textarea>

      <button type="submit">Send</button>
      <p>{status}</p>
    </form>
  );
}
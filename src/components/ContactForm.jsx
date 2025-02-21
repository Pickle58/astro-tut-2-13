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
      setEmail('');
      setMessage('');
    } else {
      setStatus('Error sending email.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>

      <label className="block text-sm font-medium text-gray-700">Email:</label>
      <input
        type="email"
        value={email}
        onInput={(e) => setEmail(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label className="block mt-4 text-sm font-medium text-gray-700">Message:</label>
      <textarea
        value={message}
        onInput={(e) => setMessage(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
      ></textarea>

      <button
        type="submit"
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Send
      </button>

      {status && <p className="mt-4 text-center text-sm text-gray-700">{status}</p>}
    </form>
  );
}
import { Resend } from 'resend';

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export async function POST({ request }) {
  try {
    const { email, message } = await request.json();

    await resend.emails.send({
      from: 'james.pilkington@pilkington.info',
      to: 'jpilkington332@gmail.com',
      subject: 'New Contact Message',
      text: `From: ${email}\n\nMessage:\n${message}`, // Plain text version
      html: `<p><strong>From:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, "<br>")}</p>` // HTML version
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Email failed to send' }), { status: 500 });
  }
}
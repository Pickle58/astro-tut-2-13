import { Resend } from 'resend';

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export async function POST({ request }) { // Change 'post' to 'POST'
  try {
    const { email, message } = await request.json();

    await resend.emails.send({
      from: 'james.pilkington@pilkington.info', // Fixed typo in "pilkington"
      to: 'delivered@resend.dev',
      subject: 'New Contact Message',
      text: `From: ${email}\n\nMessage:\n${message}`
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Email failed to send' }), { status: 500 });
  }
}
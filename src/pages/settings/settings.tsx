import { Show, createSignal, onMount } from 'solid-js';
import { Scaffold } from '~/components/scaffold/scaffold';

// ---------- DPO ENV VARS ----------
const DPO_SUBSCRIBE_LINK = import.meta.env.VITE_DPO_SUBSCRIBE_LINK;
const DPO_DONATE_LINK = import.meta.env.VITE_DPO_DONATE_LINK;

// ---------- SIMPLE PAGE ----------
export default function SettingsPage() {
  const [statusMsg, setStatusMsg] = createSignal<string>("");

  // Optional: show a thank-you if you send users back with ?success=1 or ?canceled=1
  onMount(() => {
    const q = new URLSearchParams(window.location.search);
    if (q.get('success')) setStatusMsg("🎉 Thank you for your support!");
    if (q.get('canceled')) setStatusMsg("Payment canceled. You can try again anytime.");
  });

  const hasPaymentLinks = Boolean(DPO_SUBSCRIBE_LINK || DPO_DONATE_LINK);

  return (
    <Scaffold title="Donate">
      {/*  Make this container scrollable */}
      <div
        style={{
          padding: '20px',
          display: 'grid',
          gap: '16px',
          'grid-template-columns': '1fr',
          'max-width': '520px',
          margin: '0 auto',
          'overflow-y': 'auto',        // <--- enables vertical scroll
          height: '100vh',             // <--- fills viewport
          'box-sizing': 'border-box',
        }}
      >
        <h1 style={{ 'font-size': '22px', 'font-weight': 700, 'margin-bottom': '8px' }}>
          THANK YOU!
        </h1>

        <p style={{ color: '#6b6b6b', 'margin-top': '-6px' }}>
          Donate bitcoin to this address: bc1qhkv9gps0vr4wdjf9eaze2t9wwrxjxzcz0el3np   

          OR

          
        </p>

        <Show when={statusMsg()}>
          <div
            style={{
              padding: '12px 14px',
              background: '#eef8ee',
              color: '#145a32',
              'border-radius': '12px',
            }}
          >
            {statusMsg()}
          </div>
        </Show>

        <PaymentCard title="Donate $5" link='www.google.com' buttonText="DONATE $5" />
        <PaymentCard title="Donate $20" link='www.google.com' buttonText="DONATE $20" />
        <PaymentCard title="Donate $100" link='www.google.com' buttonText="DONATE $100" />
        <PaymentCard title="Donate $500" link='www.google.com' buttonText="DONATE $500" />
        <PaymentCard title="Donate $2000" link='www.google.com' buttonText="DONATE $2000" />

        <Show when={!hasPaymentLinks}>
          <div
            style={{
              padding: '12px 14px',
              background: '#fff7e6',
              color: '#6b3e00',
              'border-radius': '12px',
              border: '1px solid #ffe2b3',
            }}
          >
            No DPO links found. Add env vars VITE_DPO_SUBSCRIBE_LINK / VITE_DPO_DONATE_LINK.
          </div>
        </Show>
      </div>
    </Scaffold>
  );
}

// ---------- PAYMENT CARD ----------
function PaymentCard(props: { title: string; desc?: string; link?: string; buttonText: string }) {
  return (
    <section
      style={{
        background: '#fbf7ff',
        padding: '18px',
        'border-radius': '16px',
        border: '1px solid #efe6ff',
        display: 'grid',
        gap: '10px',
      }}
    >
      <h2 style={{ 'font-size': '18px', margin: 0 }}>{props.title}</h2>
      {props.desc && <p style={{ color: '#5b5b5b', margin: 0 }}>{props.desc}</p>}

      <Show when={props.link}>
        <a
          href={props.link!}
          style={buttonStyle()}
          target="_blank"
          rel="noopener noreferrer"
        >
          {props.buttonText}
        </a>
      </Show>
    </section>
  );
}

function buttonStyle(): any {
  return {
    display: 'inline-block',
    padding: '12px 18px',
    'border-radius': '9999px',
    'font-weight': 700,
    'text-decoration': 'none',
    background: '#000000',
    color: 'white',
    'text-align': 'center',
    'box-shadow': '0 4px 14px rgba(0,0,0,0.08)',
  };
}

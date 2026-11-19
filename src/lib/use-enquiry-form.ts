import { useRef, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { type EnquiryForm, validateEnquiry } from './enquiry';

const fallback = 'We could not confirm your enquiry was sent. Please try again or contact us by phone or WhatsApp.';

export function useEnquiryForm(kind: EnquiryForm) {
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const locked = useRef(false);
  const lastAttempt = useRef<{ payload: string; id: string } | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (locked.current) return;
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    if (fields._gotcha) return;

    const validation = validateEnquiry(fields, kind);
    if ('error' in validation) {
      setErrorMsg(validation.error);
      form.querySelector<HTMLElement>(`[name="${validation.field}"]`)?.focus();
      return;
    }

    locked.current = true;
    setSending(true);
    setErrorMsg('');
    let accepted = false;
    try {
      const payload = JSON.stringify(validation.data);
      // Retry an unchanged submission with the same key if the first response was lost.
      if (lastAttempt.current?.payload !== payload) lastAttempt.current = { payload, id: crypto.randomUUID() };
      const response = await fetch(`/api/contact/${kind}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': lastAttempt.current.id },
        body: payload,
        signal: AbortSignal.timeout(15_000),
      });
      const result = await response.json().catch(() => null);
      if (response.ok && result?.success === true) {
        accepted = true;
        form.reset();
        navigate('/thank-you');
        return;
      }
      setErrorMsg(typeof result?.error === 'string' ? result.error : fallback);
    } catch {
      setErrorMsg(fallback);
    } finally {
      if (!accepted) {
        locked.current = false;
        setSending(false);
      }
    }
  }

  return { handleSubmit, sending, errorMsg };
}

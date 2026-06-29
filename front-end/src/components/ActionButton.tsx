type Props = {
  onOCR: () => void;
  onGoogleOCR: () => void;
  onTTS: () => void;
  onGoogleTTS: () => void;
  loading: boolean;
  hasText: boolean;
};
export default function ActionButtons({
  onOCR,
  onGoogleOCR,
  onTTS,
  onGoogleTTS,
  loading,
  hasText,
}: Props) {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      <button onClick={onOCR} disabled={loading}>
        OCR GPT
      </button>

      <button onClick={onGoogleOCR} disabled={loading}>
        OCR Google
      </button>

      <button onClick={onTTS} disabled={!hasText || loading}>
        TTS GPT
      </button>

      <button onClick={onGoogleTTS} disabled={!hasText || loading}>
        TTS Google
      </button>
    </div>
  );
}

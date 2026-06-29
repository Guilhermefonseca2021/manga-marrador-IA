type Props = {
  pages: string[];
  current: number;
  onSelect: (index: number) => void;
};

export default function ReaderSidebar({ pages, current, onSelect }: Props) {
  return (
    <aside>
      {pages.map((_, i) => (
        <div
          key={i}
          onClick={() => onSelect(i)}
          style={{
            fontWeight: current === i ? "bold" : "normal",
            background: current === i ? "#2c2f36" : "transparent",
            cursor: "pointer",
            padding: "6px 10px",
            borderRadius: 4,
          }}
        >
          Página {i + 1}
        </div>
      ))}
    </aside>
  );
}

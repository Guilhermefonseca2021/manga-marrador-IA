import { theme } from "../theme/theme";

export default function Header() {
  return (
    <header
      style={{
        height: 70,
        background: theme.colors.surface,
        borderBottom: `1px solid ${theme.colors.border}`,
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
      }}
    >
      <h3
        style={{
          color: theme.colors.text,
          margin: 0,
        }}
      >
        Manga Narrator AI
      </h3>
    </header>
  );
}

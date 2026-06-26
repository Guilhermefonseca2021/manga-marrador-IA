import { Link, useLocation } from "react-router-dom";
import { theme } from "../theme/theme";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    {
      label: "Upload PDF",
      path: "/",
    },
    {
      label: "Ler - Salvos",
      path: "/reader",
    },
  ];

  return (
    <aside
      style={{
        width: "100%",
        background: theme.colors.surface,
        borderRight: `1px solid ${theme.colors.border}`,
        paddingBottom: 24,
      }}
    >
      <h2
        style={{
          color: theme.colors.primary,
          marginBottom: 40,
        }}
      >
        Manga Narrator
      </h2>

      <nav
        style={{
          gap: 12,
        }}
      >
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              textDecoration: "none",
              color:
                location.pathname === item.path
                  ? theme.colors.primary
                  : theme.colors.text,

              background:
                location.pathname === item.path ? "#00b37e15" : "transparent",
              padding: 12,
              borderRadius: 10,
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

type Props = {
  src: string;
};

export default function ImageViewer({ src }: Props) {
  return (
    <div style={styles.wrapper}>
      <img src={src} alt="page" style={styles.image} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    justifyContent: "center",
    background: "#0b0d10",
    padding: 16,
  },

  image: {
    width: "100%",
    maxWidth: 900,
    height: "auto",
    objectFit: "contain",
    borderRadius: 4,
  },
};

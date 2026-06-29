type Props = {
    text: string;
    loading: boolean;
};

export default function TextViewer({
    text,
    loading,
}: Props) {
    return (
        <div>
            {loading ? "Processando..." : text}
        </div>
    );
}
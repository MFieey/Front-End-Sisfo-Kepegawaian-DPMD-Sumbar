type Props = {
  title: string;
};

export default function SectionTitle({
  title,
}: Props) {
  return (
    <h2
      className="
      text-xl
      font-bold
      text-green-700
      border-l-4
      border-green-600
      pl-3
      mb-5
      "
    >
      {title}
    </h2>
  );
}
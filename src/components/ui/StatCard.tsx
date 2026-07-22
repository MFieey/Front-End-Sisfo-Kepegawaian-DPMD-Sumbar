type Props = {
  title: string;
  value: number | string;
  color?: string;
};

export default function StatCard({
  title,
  value,
  color = "bg-white",
}: Props) {
  return (
    <div
      className={`
        ${color}
        p-5
        rounded-xl
        shadow
      `}
    >
      <p className="text-gray-600">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-2">
        {value}
      </h2>
    </div>
  );
}
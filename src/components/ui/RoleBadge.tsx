type Props = {
  role: string;
};

export default function RoleBadge({
  role,
}: Props) {

  const style = {
    ADMIN:
      "bg-red-100 text-red-700",

    OPERATOR:
      "bg-blue-100 text-blue-700",

    PIMPINAN:
      "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`
        px-3
        py-1
        rounded-full
        text-sm
        font-semibold
        ${
          style[
            role as keyof typeof style
          ]
        }
      `}
    >
      {role}
    </span>
  );
}
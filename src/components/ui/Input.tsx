type Props = {
  label?: string;
  type?: string;
  value: string;
  onChange: (
    value: string
  ) => void;
  placeholder?: string;
  required?: boolean;
};

export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required=false,
}: Props) {
  return (
    <div>
        {

        label&&(

            <label

            className="

            block

            mb-2

            font-medium

            text-gray-700

            "

            >

            {label}

            </label>

            )
        }

    <input
      type={type}
      value={value}
      required={required}
      placeholder={placeholder}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="
      w-full
      rounded-lg
      border
      border-black-100
      px-4
      py-2
      outline-none
      focus:ring-2
      focus:ring-green-500
      "
    />
    </div>

  );
}
import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchBar({
  value,
  onChange,
  placeholder = "Cari data...",
}: Props) {
  return (
    <div className="relative w-full">

      <div
        className="
          absolute
          left-4
          top-0
          bottom-0
          flex
          items-center
          justify-center
        "
      >
        <Search
          size={18}
          className="text-gray-400"
        />
      </div>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          h-12
          border
          rounded-xl
          pl-12
          pr-4
          text-sm
          leading-none
          placeholder:leading-none
          focus:outline-none
          focus:ring-2
          focus:ring-green-600
        "
      />

    </div>
  );
}
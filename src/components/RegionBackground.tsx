import { useMemo } from "react";

type Props = {
  name: string;
  className: string;
  children: React.ReactNode;
};

const RegionBackground = ({ name, className, children }: Props) => {
  const backgroundColor: string = useMemo(() => {
    const num = Math.ceil("abcdefghijklmnopqrstuvwxyz".indexOf(name[2]) / 4);

    switch (num) {
      case 1:
        return "bg-zinc-600";
      case 2:
        return "bg-amber-500";
      case 3:
        return "bg-cyan-600";
      case 4:
        return "bg-sky-900";
      case 5:
        return "bg-sky-500";
      case 6:
        return "bg-teal-600";
      case 7:
      default:
        return "bg-orange-500";
    }
  }, [name]);

  return (
    <div
      className={`flex items-center justify-center rounded text-white ${backgroundColor} ${className}`}
    >
      {children}
    </div>
  );
};

export default RegionBackground;

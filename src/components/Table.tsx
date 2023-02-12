type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Table = ({ children, className }: Props) => {
  return (
    <div className={`relative overflow-x-auto rounded ${className || ""}`}>
      <table className="w-full text-left text-sm text-gray-400">
        {children}
      </table>
    </div>
  );
};

export const THead = ({ children }: Props) => {
  return <thead className="text-xs uppercase text-gray-400">{children}</thead>;
};

export const Tr = ({ children }: Props) => {
  return (
    <tr className="border-b border-gray-700 bg-gray-800 last:border-0">
      {children}
    </tr>
  );
};

export const Th = ({ children }: Props) => {
  return (
    <th scope="col" className="bg-gray-700 px-6 py-3">
      {children}
    </th>
  );
};

export const TBody = ({ children }: Props) => {
  return <tbody>{children}</tbody>;
};

export const Td = ({ children, className }: Props) => {
  return <td className={`px-6 py-4 ${className}`}>{children}</td>;
};

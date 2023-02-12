type Props = {
  id: string;
  className?: string;
  checked?: any;
  onChange?: any;
  children: any;
};

const Checkbox = ({ id, className, checked, onChange, children }: Props) => {
  return (
    <div className={`flex select-none items-center ${className || ""}`}>
      <input
        id={id}
        type="checkbox"
        className="cursor-pointer accent-sky-400"
        onChange={onChange}
        checked={checked}
      />
      <label
        htmlFor={id}
        className="ml-2 cursor-pointer text-sm font-medium text-gray-300"
      >
        {children}
      </label>
    </div>
  );
};

export default Checkbox;

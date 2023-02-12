import { useState } from "react";
import { useSearchParams } from "react-router-dom";

type Props = {
  elements: {
    name: string;
    value: string;
    component: React.ReactNode;
  }[];
  defaultValue: string;
  className?: string;
};

const Tabs = ({ elements, defaultValue, className }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selected = searchParams.get("tab") || defaultValue;

  const content: React.ReactNode = elements.find(
    (element) => element.value === selected
  )?.component;

  const onSelect = (name: string) => {
    searchParams.delete("page");
    searchParams.set("tab", name);
    setSearchParams(searchParams);
  };

  return (
    <div>
      <ul
        className={`mb-3 flex flex-wrap border-b border-gray-700 text-center text-sm font-medium text-gray-400 ${
          className || ""
        }`}
      >
        {elements.map((element) => {
          const isSelected = element.value === selected;

          const className = isSelected
            ? "bg-gray-800 text-blue-500"
            : "hover:bg-gray-800 hover:text-gray-300";

          return (
            <li
              className="mr-2 cursor-pointer"
              key={element.value}
              onClick={() => onSelect(element.value)}
            >
              <span
                aria-current="page"
                className={`inline-block rounded-t-lg p-4 ${className}`}
              >
                {element.name}
              </span>
            </li>
          );
        })}
      </ul>
      {content}
    </div>
  );
};

export default Tabs;

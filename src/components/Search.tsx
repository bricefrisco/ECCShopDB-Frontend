import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import stringSimilarity from "string-similarity";

type Props = {
  getOptions: Function;
  label: string;
};

export type Option = {
  value: string;
  label: string;
};

const Search = ({ getOptions, label }: Props) => {
  const [materialNames, setMaterialNames] = useState<string[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [value, setValue] = useState<Option | undefined>();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const start = async () => {
      const options = await getOptions();
      setMaterialNames(options);
      setOptions(search("", options));
    };

    start();
  }, [getOptions]);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      const decoded = decodeURIComponent(q);
      setValue({ value: decoded, label: decoded });
    } else {
      setValue(undefined);
    }
  }, [searchParams, options]);

  const onInputChange = (text: string) => {
    setOptions(search(text, materialNames));
  };

  const search = (text: string, materialNames: string[]) => {
    const { ratings } = stringSimilarity.findBestMatch(text, materialNames);
    return ratings
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 50)
      .map((r) => ({ value: r.target, label: r.target }));
  };

  const onChange = (e: any) => {
    searchParams.set("page", "1");
    if (!e?.value) {
      searchParams.delete("q");
    } else {
      searchParams.set("q", e.value);
    }

    setSearchParams(searchParams);
  };

  return (
    <div className="relative w-full md:max-w-[376px] lg:max-w-[390.7px] xl:max-w-[340.5px] 2xl:max-w-[425.8px]">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3">
        <svg
          aria-hidden="true"
          className="h-5 w-5 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <Select
        options={options}
        isClearable
        onInputChange={onInputChange}
        onChange={onChange}
        value={options ? value : undefined}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "rgb(31 41 55)",
            border: "1px solid rgb(55 65 81)",
            "&:hover": {
              borderColor: "rgb(55 65 81)",
              cursor: "text",
            },
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "rgb(31 41 55)",
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isFocused
              ? "rgb(75 85 99)"
              : "rgb(31 41 55)",
            color: state.isFocused ? "rgb(255 255 255)" : "rgb(156 163 175)",
            cursor: "pointer",
          }),
          placeholder: (baseStyles) => ({
            ...baseStyles,
            color: "rgb(156 163 175)",
          }),
          input: (baseStyles) => ({
            ...baseStyles,
            color: "rgb(255 255 255)",
            paddingTop: "0.3125rem",
            paddingBottom: "0.3125rem",
          }),
          valueContainer: (baseStyles) => ({
            ...baseStyles,
            paddingLeft: "2.5rem",
          }),
          singleValue: (baseStyles, state) => ({
            ...baseStyles,
            color: "rgb(255 255 255)",
          }),
          indicatorSeparator: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isFocused
              ? "rgb(75 85 99)"
              : "rgb(156 163 175)",
          }),
          dropdownIndicator: (baseStyles, state) => ({
            ...baseStyles,
            color: state.isFocused
              ? "rgb(75 85 99)!important"
              : "rgb(156 163 175)!important",
            cursor: "pointer",
          }),
          clearIndicator: (baseStyles, state) => ({
            ...baseStyles,
            color: state.isFocused
              ? "rgb(75 85 99)!important"
              : "rgb(156 163 175)!important",
            cursor: "pointer",
          }),
        }}
        placeholder={`Search for ${label}...`}
      />
    </div>
  );
};

export default Search;

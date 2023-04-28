import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Breadcrumb, Breadcrumbs } from "../components/Breadcrumbs";
import Checkbox from "../components/Checkbox";
import PageLayout from "../components/PageLayout";
import RadioGroup from "../components/RadioGroup";
import RegionList from "../components/RegionList";

const Regions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false); // Only applicable on small screens

  const server = searchParams.get("server") || "all";
  const hideUnlisted = !(searchParams.get("hideUnlisted") === "false");
  const sort = searchParams.get("sort") || "num-chest-shops";
  const page = searchParams.get("page") || 1;
  const name = searchParams.get("q");

  const onRadioChange = (option: string) => (e: any) => {
    searchParams.set("page", "1");
    searchParams.set(option, e.target.value);
    setSearchParams(searchParams);
  };

  const onCheckboxChange = (option: string) => (e: any) => {
    searchParams.set("page", "1");
    searchParams.set(option, e.target.checked);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const capitalizedRegion = name
      ?.toLowerCase()
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");

    document.title = `${
      capitalizedRegion ? `${capitalizedRegion} - ` : ""
    }Regions - ${Number(page) > 1 ? `Page ${page} - ` : ""}ShopDB`;
  }, [name, page]);

  return (
    <PageLayout>
      <div className="container mx-auto">
        <Breadcrumbs>
          <Breadcrumb to="/">Home</Breadcrumb>
          <Breadcrumb to="/regions" hasPrevious>
            Regions
          </Breadcrumb>
        </Breadcrumbs>
        <div className="mt-6 flex flex-col lg:flex-row">
          <div className="min-w-fit">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800 lg:cursor-default lg:bg-inherit lg:px-0 lg:py-0 lg:hover:bg-inherit lg:focus:ring-0"
            >
              Filters
              <span className="ml-2 lg:hidden">
                {showFilters ? <>&uarr;</> : <>&darr;</>}
              </span>
            </button>
            <section
              id="filters"
              className={`grid grid-cols-2 lg:block ${
                !showFilters ? "hidden" : ""
              }`}
            >
              <RadioGroup
                className="mt-5"
                label="Server"
                options={[
                  { name: "All", value: "all" },
                  { name: "Main", value: "main" },
                  { name: "Main North", value: "main-north" },
                ]}
                value={server}
                onChange={onRadioChange("server")}
              />

              <div className="mt-5">
                <legend className="font-semibold uppercase text-gray-200">
                  Options
                </legend>
                <Checkbox
                  id="hide-unlisted"
                  className="mt-4"
                  checked={hideUnlisted}
                  onChange={onCheckboxChange("hideUnlisted")}
                >
                  Hide Unlisted
                </Checkbox>
              </div>

              <RadioGroup
                className="mt-8"
                label="Sort By"
                options={[
                  { name: "Chest Shop Count", value: "num-chest-shops" },
                  { name: "Mayor Count", value: "num-players" },
                  { name: "Name", value: "name" },
                ]}
                value={sort}
                onChange={onRadioChange("sort")}
              />
            </section>
          </div>

          <section id="region-list" className="mt-6 w-full lg:ml-20">
            <RegionList
              name={name}
              page={Number(page)}
              server={server}
              hideUnlisted={hideUnlisted}
              sort={sort}
              condense={false}
            />
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default Regions;

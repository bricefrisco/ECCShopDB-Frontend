import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Breadcrumb, Breadcrumbs } from "../components/Breadcrumbs";
import PageLayout from "../components/PageLayout";
import PlayerList from "../components/PlayerList";
import RadioGroup from "../components/RadioGroup";

const Players = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false); // Only applicable on small screens

  const page = searchParams.get("page") || 1;
  const sort = searchParams.get("sort") || "num-chest-shops";
  const name = searchParams.get("q");

  const onRadioChange = (option: string) => (e: any) => {
    searchParams.set("page", "1");
    searchParams.set(option, e.target.value);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const capitalizedPlayer = name
      ?.toLowerCase()
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");

    document.title = `${
      capitalizedPlayer ? `${capitalizedPlayer} - ` : ""
    }Players - ${Number(page) > 1 ? `Page ${page} - ` : ""}ShopDB`;
  }, [name, page]);

  return (
    <PageLayout>
      <div className="container mx-auto">
        <Breadcrumbs>
          <Breadcrumb to="/">Home</Breadcrumb>
          <Breadcrumb to="/players" hasPrevious>
            Players
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
                label="Sort By"
                options={[
                  { name: "Chest Shop Count", value: "num-chest-shops" },
                  { name: "Region Count", value: "num-regions" },
                  { name: "Name", value: "name" },
                ]}
                value={sort}
                onChange={onRadioChange("sort")}
              />
            </section>
          </div>

          <section id="players-list" className="mt-6 w-full lg:ml-20">
            <PlayerList
              name={name}
              page={Number(page)}
              sort={sort}
              condense={false}
            />
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default Players;

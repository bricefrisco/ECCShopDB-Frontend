import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Breadcrumb, Breadcrumbs } from "../components/Breadcrumbs";
import Checkbox from "../components/Checkbox";
import ChestShopList from "../components/ChestShopList";
import PageLayout from "../components/PageLayout";
import RadioGroup from "../components/RadioGroup";

const Shops = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false); // Only applicable on small screens

  const item = searchParams.get("q");
  const tradeType = searchParams.get("tradeType") || "buy";
  const server = searchParams.get("server") || "all";
  const sort = searchParams.get("sort") || "price";
  const hideUnavailable = !(searchParams.get("hideUnavailable") === "false");
  const hideDuplicates = !(searchParams.get("hideDuplicates") === "false");
  const condense = searchParams.get("condense") === "true";
  const page = searchParams.get("page") || 1;

  useEffect(() => {
    const capitalizedItem = item
      ?.toLowerCase()
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");

    document.title = `${
      capitalizedItem ? `${capitalizedItem} - ` : ""
    }Chest Shops - ${page > 1 ? `Page ${page} - ` : ""}ShopDB`;
  }, [item, page]);

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

  return (
    <PageLayout>
      <div className="container mx-auto">
        <Breadcrumbs>
          <Breadcrumb to="/">Home</Breadcrumb>
          <Breadcrumb to="/shops" hasPrevious>
            Shops
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

              <RadioGroup
                className="mt-5"
                label="Trade Type"
                options={[
                  { name: "Buy", value: "buy" },
                  { name: "Sell", value: "sell" },
                ]}
                value={tradeType}
                onChange={onRadioChange("tradeType")}
              />

              <div className="mt-5">
                <legend className="font-semibold uppercase text-gray-200">
                  Options
                </legend>
                <Checkbox
                  id="hide-unavailable"
                  className="mt-4"
                  checked={hideUnavailable}
                  onChange={onCheckboxChange("hideUnavailable")}
                >
                  Hide Unavailable
                </Checkbox>
                <Checkbox
                  id="hide-duplicates"
                  className="mt-4"
                  checked={hideDuplicates}
                  onChange={onCheckboxChange("hideDuplicates")}
                >
                  Hide Duplicates
                </Checkbox>
                <Checkbox
                  id="condense"
                  className="mt-4"
                  checked={condense}
                  onChange={onCheckboxChange("condense")}
                >
                  Condense
                </Checkbox>
              </div>

              <RadioGroup
                className="mt-7"
                label="Sort By"
                options={[
                  { name: "Price", value: "price" },
                  { name: "Quantity", value: "quantity" },
                  { name: "Availability", value: "availability" },
                ]}
                value={sort}
                onChange={onRadioChange("sort")}
              />
            </section>
          </div>

          <section id="chest-shop-list" className="mt-6 w-full lg:ml-20">
            <ChestShopList
              item={item}
              tradeType={tradeType}
              server={server}
              sort={sort}
              hideUnavailable={hideUnavailable}
              hideDuplicates={hideDuplicates}
              condense={condense}
              page={Number(page)}
            />
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default Shops;

import { useState, useMemo, useEffect } from "react";
import { Triangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import Pagination, { PaginationPlaceholder } from "./Pagination";
import Region, { RegionProps } from "./Region";
import Search from "./Search";
import { Table, TBody, Td, Th, THead, Tr } from "./Table";

type ShopDBAPIResponse = {
  page: number;
  totalPages: number;
  totalElements: number;
  results: RegionProps[];
};

type ShopDBAPIParameters = {
  name: string | null;
  page: number;
  server: string;
  hideUnlisted: boolean;
  sort: string; // num-chest-shops, num-players, name
  condense: boolean;
};

const RegionList = ({
  name,
  page,
  server,
  hideUnlisted,
  sort,
  condense,
}: ShopDBAPIParameters) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ShopDBAPIResponse | undefined>();
  const pageSize = condense ? 50 : 9;

  const getOptions = useMemo(() => {
    return async () => {
      const url = new URL(
        "https://api.shopdb.ecocitycraft.com/api/v3/regions/region-names"
      );
      url.searchParams.append("active", hideUnlisted.toString());
      if (server !== "all") {
        url.searchParams.append("server", server);
      }

      const res = await fetch(url);
      return await res.json();
    };
  }, [server, hideUnlisted]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchRegions = async () => {
      setLoading(true);

      const url = new URL("https://api.shopdb.ecocitycraft.com/api/v3/regions");

      url.searchParams.append("sortBy", sort);
      url.searchParams.append("page", page.toString());
      url.searchParams.append("pageSize", pageSize.toString());
      url.searchParams.append("active", hideUnlisted.toString());

      if (server !== "all") {
        url.searchParams.append("server", server);
      }

      if (name) {
        url.searchParams.append("name", name);
      }

      const res = await fetch(url, { signal: controller.signal });
      const json = (await res.json()) as ShopDBAPIResponse;
      setData(json);
      setLoading(false);
    };

    fetchRegions();

    return () => controller.abort();
  }, [name, server, hideUnlisted, pageSize, page, sort]);

  if (loading) {
    return (
      <>
        <div className="mb-3 flex flex-col place-content-between md:flex-row">
          <Search getOptions={getOptions} label="regions" />
          <PaginationPlaceholder />
        </div>
        <div className="flex min-h-[1000px] w-full justify-center md:min-h-[1274px] xl:min-h-[746px]">
          <Triangle
            height="80"
            width="80"
            color="rgb(59 130 246)"
            wrapperClass="mt-16"
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mb-3 flex flex-col place-content-between md:flex-row">
        <Search getOptions={getOptions} label="regions" />
        <Pagination
          page={data?.page || 1}
          pageSize={pageSize}
          totalElements={data?.totalElements || 0}
        />
      </div>
      {condense ? (
        <RegionTable data={data} hideUnlisted={hideUnlisted} server={server} />
      ) : (
        <List data={data} />
      )}
    </>
  );
};

type ListProps = {
  data: ShopDBAPIResponse | undefined;
};

const List = ({ data }: ListProps) => {
  if (!data?.results?.length) {
    return (
      <div className="pt-1 text-gray-400">
        No results were found which match that criteria.
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-1 justify-items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
      {data.results.map((region, idx) => (
        <Region {...region} key={idx} />
      ))}
    </div>
  );
};

type TableProps = {
  data: ShopDBAPIResponse | undefined;
  hideUnlisted: boolean;
  server: string;
};

export const RegionTable = ({ data, hideUnlisted, server }: TableProps) => {
  if (!data?.results?.length) {
    return (
      <div className="pt-1 text-gray-400">
        No results were found which match that criteria.
      </div>
    );
  }

  return (
    <Table>
      <THead>
        <Tr>
          <Th>Name</Th>
          <Th>Mayors</Th>
          <Th>Chest Shops</Th>
          {server === "all" && <Th>Server</Th>}
          {!hideUnlisted && <Th>Listed</Th>}
        </Tr>
      </THead>
      <TBody>
        {data.results.map((region, idx) => (
          <Tr key={idx}>
            <Td>
              <Link
                to={
                  region.server === "main"
                    ? `/regions/${region.name}`
                    : `/regions/${region.name}?server=${region.server}`
                }
              >
                <span className="cursor-pointer font-semibold text-blue-500 hover:underline">
                  {region.name}
                </span>
              </Link>
            </Td>
            <Td>{region.numMayors}</Td>
            <Td>{region.numChestShops}</Td>
            {server === "all" && <Td>{region.server}</Td>}
            {!hideUnlisted && <Td>{region.active.toString()}</Td>}
          </Tr>
        ))}
      </TBody>
    </Table>
  );
};

export default RegionList;

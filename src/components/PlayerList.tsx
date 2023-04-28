import { useState, useMemo, useEffect } from "react";
import { Triangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import Pagination, { PaginationPlaceholder } from "./Pagination";
import Player, { PlayerProps } from "./Player";
import Search from "./Search";
import { Table, TBody, Td, Th, THead, Tr } from "./Table";

type ShopDBAPIResponse = {
  page: number;
  totalPages: number;
  totalElements: number;
  results: PlayerProps[];
};

type ShopDBAPIParameters = {
  name: string | null;
  page: number;
  sort: string; // num-chest-shops, num-regions, name
  condense: boolean;
};

const PlayerList = ({ name, page, sort, condense }: ShopDBAPIParameters) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ShopDBAPIResponse | undefined>();
  const pageSize = condense ? 50 : 9;

  const getOptions = useMemo(() => {
    return async () => {
      const url = new URL(
        "https://api.shopdb.ecocitycraft.com/api/v3/players/player-names"
      );

      const res = await fetch(url);
      return await res.json();
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPlayers = async () => {
      setLoading(true);

      const url = new URL("https://api.shopdb.ecocitycraft.com/api/v3/players");

      url.searchParams.append("sortBy", sort);
      url.searchParams.append("page", page.toString());
      url.searchParams.append("pageSize", pageSize.toString());

      if (name) {
        url.searchParams.append("name", name);
      }

      const res = await fetch(url, { signal: controller.signal });
      const json = (await res.json()) as ShopDBAPIResponse;

      setData(json);
      setLoading(false);
    };

    fetchPlayers();

    return () => controller.abort();
  }, [name, sort, page, pageSize]);

  if (loading) {
    return (
      <>
        <div className="mb-3 flex flex-col place-content-between md:flex-row">
          <Search getOptions={getOptions} label="players" />
          <PaginationPlaceholder />
        </div>
        <div className="flex min-h-[1000px] w-full justify-center md:min-h-[1030px] xl:min-h-[618px]">
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
        <Search getOptions={getOptions} label="players" />
        <Pagination
          page={data?.page || 1}
          pageSize={pageSize}
          totalElements={data?.totalElements || 0}
        />
      </div>
      <List data={data} />
    </>
  );
};

type ListProps = {
  data: ShopDBAPIResponse | undefined;
};

export const List = ({ data }: ListProps) => {
  if (!data?.results?.length) {
    return (
      <div className="pt-1 text-gray-400">
        No results were found which match that criteria.
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-1 justify-items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
      {data.results.map((player, idx) => (
        <Player {...player} key={idx} />
      ))}
    </div>
  );
};

type PlayerTableProps = {
  data: ShopDBAPIResponse | undefined;
};

export const PlayerTable = ({ data }: PlayerTableProps) => {
  return (
    <Table>
      <THead>
        <Tr>
          <Th>Player Name</Th>
          <Th>Regions</Th>
          <Th>Chest Shops</Th>
        </Tr>
      </THead>
      <TBody>
        {data?.results.map((player, idx) => (
          <Tr key={idx}>
            <Td>
              <Link to={`/players/${player.name}`}>
                <span className="cursor-pointer font-semibold text-blue-500 hover:underline">
                  {player.name}
                </span>
              </Link>
            </Td>
            <Td>{player.towns.length}</Td>
            <Td>{player.numChestShops.toLocaleString()}</Td>
          </Tr>
        ))}
      </TBody>
    </Table>
  );
};

export default PlayerList;

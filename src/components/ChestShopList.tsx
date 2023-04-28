import { useState, useEffect, useMemo } from "react";
import { Triangle } from "react-loader-spinner";
import ChestShop, { ChestShopProps } from "./ChestShop";
import Pagination, { PaginationPlaceholder } from "./Pagination";
import Search from "./Search";
import { Table, TBody, Td, Th, THead, Tr } from "./Table";

type ShopDBAPIResponse = {
  page: number;
  results: ChestShopProps[];
  totalElements: number;
  totalPages: number;
};

type ShopDBAPIParameters = {
  item: string | null;
  tradeType: string; // "buy" | "sell";
  server: string; // "all" | "main" | "main-north";
  sort: string; // "price" | "quantity" | "availability";
  hideUnavailable: boolean;
  hideDuplicates: boolean;
  condense: boolean;
  page: number;
};

const ChestShopList = ({
  item,
  tradeType,
  server,
  sort,
  hideUnavailable,
  hideDuplicates,
  condense,
  page,
}: ShopDBAPIParameters) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ShopDBAPIResponse | undefined>();
  const pageSize = condense ? 50 : 9;

  const mapSortBy = (sortBy: string) => {
    if (sortBy === "price") return "best-price";
    if (sortBy === "quantity") return "quantity";
    if (sortBy === "availability") return "quantity-available";
    return "";
  };

  const getOptions = useMemo(() => {
    return async () => {
      const url = new URL(
        "https://api.shopdb.ecocitycraft.com/api/v3/chest-shops/material-names"
      );
      url.searchParams.append("tradeType", tradeType);
      if (server !== "all") {
        url.searchParams.append("server", server);
      }

      const res = await fetch(url);
      return await res.json();
    };
  }, [server, tradeType]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchChestShops = async () => {
      setLoading(true);

      const url = new URL(
        "https://api.shopdb.ecocitycraft.com/api/v3/chest-shops"
      );

      if (item) {
        url.searchParams.append("material", item);
      }

      url.searchParams.append("tradeType", tradeType);
      url.searchParams.append("sortBy", mapSortBy(sort));
      url.searchParams.append("page", page.toString());
      url.searchParams.append("hideUnavailable", hideUnavailable.toString());
      url.searchParams.append("distinct", hideDuplicates.toString());
      url.searchParams.append("pageSize", pageSize.toString());

      if (server !== "all") {
        url.searchParams.append("server", server);
      }

      const res = await fetch(url, { signal: controller.signal });
      const data = (await res.json()) as ShopDBAPIResponse;

      setData({
        ...data,
        results: data.results.map((shop) => ({ ...shop, tradeType })),
      });

      setLoading(false);
    };

    fetchChestShops();

    return () => controller.abort();
  }, [
    item,
    tradeType,
    server,
    sort,
    hideUnavailable,
    hideDuplicates,
    pageSize,
    page,
  ]);

  if (loading) {
    return (
      <>
        <div className="mb-3 flex flex-col place-content-between md:flex-row">
          <Search getOptions={getOptions} label="items" />
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
        <Search getOptions={getOptions} label="items" />
        <Pagination
          page={data?.page || 1}
          pageSize={pageSize}
          totalElements={data?.totalElements || 0}
        />
      </div>
      {condense ? (
        <ChestShopsTable
          data={data}
          server={server}
          tradeType={tradeType}
          hideUnavailable={hideUnavailable}
        />
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
      {data.results.map((shop, idx) => (
        <ChestShop {...shop} key={idx} />
      ))}
    </div>
  );
};

type TableProps = {
  data: ShopDBAPIResponse | undefined;
  tradeType: string;
  server: string;
  hideUnavailable: boolean;
};

export const ChestShopsTable = ({
  data,
  server,
  tradeType,
  hideUnavailable,
}: TableProps) => {
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
          <Th>Item</Th>
          <Th>Quantity</Th>
          <Th>Price</Th>
          {tradeType === "buy" && !hideUnavailable && <Th>In stock</Th>}
          {tradeType === "sell" && !hideUnavailable && <Th>Has space</Th>}
          <Th>Owner</Th>
          <Th>Region</Th>
          {server === "all" && <Th>Server</Th>}
          <Th>Coordinates</Th>
        </Tr>
      </THead>
      <TBody>
        {data.results.map((shop, idx) => (
          <Tr key={idx}>
            <Td>{shop.material}</Td>
            <Td>{shop.quantity.toLocaleString()}</Td>
            <Td>
              $
              {shop.tradeType === "buy"
                ? shop.buyPrice.toLocaleString()
                : shop.sellPrice.toLocaleString()}
            </Td>
            {tradeType === "buy" && !hideUnavailable && (
              <Td>{(shop.quantityAvailable > 0).toString()}</Td>
            )}
            {tradeType === "sell" && !hideUnavailable && (
              <Td>{(!shop.full).toString()}</Td>
            )}

            <Td>{shop.owner.name}</Td>
            <Td>{shop.town.name}</Td>
            {server === "all" && <Td>{shop.server}</Td>}
            <Td>
              {shop.location.x}, {shop.location.y}, {shop.location.z}
            </Td>
          </Tr>
        ))}
      </TBody>
    </Table>
  );
};

export default ChestShopList;

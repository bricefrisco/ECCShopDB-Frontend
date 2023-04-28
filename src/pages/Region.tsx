import { useState, useEffect } from "react";
import { Triangle } from "react-loader-spinner";
import Moment from "react-moment";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Breadcrumb, Breadcrumbs } from "../components/Breadcrumbs";
import PageLayout from "../components/PageLayout";
import { PlayerProps } from "../components/Player";
import RegionBackground from "../components/RegionBackground";
import { Table, THead, Tr, Th, TBody, Td } from "../components/Table";
import Tabs from "../components/Tabs";
import RegionIcon from "../icons/Region";
import { PlayerTable } from "../components/PlayerList";
import Pagination from "../components/Pagination";
import { ChestShopProps } from "../components/ChestShop";
import { ChestShopsTable } from "../components/ChestShopList";

type ShopDBAPIResponse = {
  name: string;
  server: string;
  iBounds: {
    x: number;
    y: number;
    z: number;
  };
  oBounds: {
    x: number;
    y: number;
    z: number;
  };
  numChestShops: number;
  active: boolean;
  mayors: {
    name: string;
  }[];
  lastUpdated: string;
};

const Region = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ShopDBAPIResponse | undefined>();

  const { name } = useParams();
  const [searchParams] = useSearchParams();
  const server = searchParams.get("server") || "main";

  const lowerName = name?.toLowerCase();

  useEffect(() => {
    const controller = new AbortController();

    const fetchRegion = async () => {
      setLoading(true);
      const response = await fetch(
        `https://api.shopdb.ecocitycraft.com/api/v3/regions/${server}/${lowerName}`,
        { signal: controller.signal }
      );

      if (response.status === 404) {
        navigate("/region-not-found");
        return;
      }

      const data: ShopDBAPIResponse = await response.json();
      setData(data);
      setLoading(false);
    };

    fetchRegion();

    return () => controller.abort();
  }, [server, lowerName]);

  useEffect(() => {
    const capitalizedRegion = name
      ?.toLowerCase()
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");

    document.title = `${capitalizedRegion} - Regions - ShopDB`;
  }, [name]);

  return (
    <PageLayout>
      <div className="container mx-auto">
        <Breadcrumbs>
          <Breadcrumb to="/">Home</Breadcrumb>
          <Breadcrumb to="/regions" hasPrevious>
            Regions
          </Breadcrumb>
          <Breadcrumb
            to={
              server === "main"
                ? `/regions/${lowerName}`
                : `/regions/${lowerName}?server=${server}`
            }
            hasPrevious
          >
            {lowerName || ""}
          </Breadcrumb>
        </Breadcrumbs>

        {loading ? (
          <div className="mx-auto mt-10 flex justify-center">
            <Triangle
              height="80"
              width="80"
              color="rgb(59 130 246)"
              wrapperClass="mt-16"
            />
          </div>
        ) : (
          <div className="mt-8">
            <div className="flex flex-col place-content-between md:flex-row">
              <div className="flex">
                <RegionBackground className="h-32 w-32" name={name || "ab"}>
                  <RegionIcon className="h-20 w-20" />
                </RegionBackground>
                <div className="ml-4 text-white">
                  <div className="text-2xl font-bold capitalize">
                    {lowerName}
                  </div>
                  <div className="mt-1.5 text-xl">
                    <span className="font-bold">
                      {data?.mayors.length === 0 ? "No" : data?.mayors.length}{" "}
                    </span>
                    {data?.mayors.length === 1 ? "Mayor" : "Mayors"}
                  </div>
                  <div className="text-xl">
                    <span className="font-bold">
                      {data?.numChestShops === 0
                        ? "No"
                        : data?.numChestShops.toLocaleString()}
                    </span>{" "}
                    {data?.numChestShops === 1 ? "Chest Shop" : "Chest Shops"}
                  </div>
                  <div className="mt-1.5 text-lg">
                    {data?.active ? (
                      <span className="text-green-300">
                        Listed: Shops are shown
                      </span>
                    ) : (
                      <span className="text-red-300">
                        Unlisted: Shops are hidden
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <Table className="mt-8 md:mt-0">
                <THead>
                  <Tr>
                    <Th>Info</Th>
                    <Th> </Th>
                  </Tr>
                </THead>
                <TBody>
                  <Tr>
                    <Td>
                      <span className="font-semibold">Server</span>
                    </Td>
                    <Td>{server}</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <span className="font-semibold">Last Updated</span>
                    </Td>
                    <Td>
                      <Moment fromNow>{data?.lastUpdated}</Moment>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <span className="font-semibold">Coordinates (start)</span>
                    </Td>
                    <Td>
                      {data?.iBounds.x}, {data?.iBounds.y}, {data?.iBounds.z}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <span className="font-semibold">Coordinates (end)</span>
                    </Td>
                    <Td>
                      {data?.oBounds.x}, {data?.oBounds.y}, {data?.oBounds.z}
                    </Td>
                  </Tr>
                </TBody>
              </Table>
            </div>

            <Tabs
              elements={[
                {
                  name: "Mayors",
                  value: "mayors",
                  component: <RegionMayors server={server} name={name || ""} />,
                },
                {
                  name: "Items Sold",
                  value: "items-sold",
                  component: (
                    <RegionChestShops
                      server={server}
                      name={name || ""}
                      tradeType="buy"
                    />
                  ),
                },
                {
                  name: "Items Purchased",
                  value: "items-purchased",
                  component: (
                    <RegionChestShops
                      server={server}
                      name={name || ""}
                      tradeType="sell"
                    />
                  ),
                },
              ]}
              defaultValue="mayors"
              className="mt-8"
            />
          </div>
        )}
      </div>
    </PageLayout>
  );
};

type RegionChestShopsProps = {
  server: string;
  name: string;
  tradeType: string;
};

type ShopDBChestShopsResponse = {
  page: number;
  totalPages: number;
  totalElements: number;
  results: ChestShopProps[];
};

const RegionChestShops = ({
  server,
  name,
  tradeType,
}: RegionChestShopsProps) => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ShopDBChestShopsResponse | undefined>();

  const page = searchParams.get("page") || 1;
  const pageSize = 50;

  const lowerName = name?.toLowerCase();

  useEffect(() => {
    const controller = new AbortController();

    const fetchChestShops = async () => {
      setLoading(true);

      const response = await fetch(
        `https://api.shopdb.ecocitycraft.com/api/v3/regions/${server}/${lowerName}/chest-shops?tradeType=${tradeType}&page=${page}&pageSize=${pageSize}`,
        { signal: controller.signal }
      );
      const data = await response.json();
      setData({
        ...data,
        results: data.results.map((chestShop: ChestShopProps) => ({
          ...chestShop,
          tradeType,
        })),
      });
      setLoading(false);
    };

    fetchChestShops();

    return () => controller.abort();
  }, [server, lowerName, tradeType, page, pageSize]);

  if (loading || !data) {
    return (
      <div className="flex w-full justify-center">
        <Triangle
          height="80"
          width="80"
          color="rgb(59 130 246)"
          wrapperClass="mt-16"
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 flex place-content-end">
        <Pagination
          page={data.page}
          pageSize={50}
          totalElements={data.totalElements}
        />
      </div>

      <ChestShopsTable
        data={data}
        tradeType={tradeType}
        hideUnavailable={false}
        server={server}
      />
    </div>
  );
};

type RegionMayorsProps = {
  server: string;
  name: string;
};

type ShopDBMayorsResponse = {
  page: number;
  totalPages: number;
  totalElements: number;
  results: PlayerProps[];
};

const RegionMayors = ({ server, name }: RegionMayorsProps) => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ShopDBMayorsResponse | undefined>();

  const page = searchParams.get("page") || 1;
  const pageSize = 50;

  useEffect(() => {
    const controller = new AbortController();

    const fetchMayors = async () => {
      setLoading(true);

      const response = await fetch(
        `https://api.shopdb.ecocitycraft.com/api/v3/regions/${server}/${name}/players?page=${page}&pageSize=${pageSize}`,
        { signal: controller.signal }
      );
      const data = await response.json();
      setData(data);
      setLoading(false);
    };

    fetchMayors();

    return () => controller.abort();
  }, [server, name, page, pageSize]);

  if (loading || !data) {
    return (
      <div className="flex w-full justify-center">
        <Triangle
          height="80"
          width="80"
          color="rgb(59 130 246)"
          wrapperClass="mt-16"
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 flex place-content-end">
        <Pagination
          page={data.page}
          pageSize={50}
          totalElements={data.totalElements}
        />
      </div>
      <PlayerTable data={data} />
    </div>
  );
};

export default Region;

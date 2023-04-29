import { useState, useEffect } from "react";
import { Triangle } from "react-loader-spinner";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Breadcrumb, Breadcrumbs } from "../components/Breadcrumbs";
import { ChestShopProps } from "../components/ChestShop";
import { ChestShopsTable } from "../components/ChestShopList";
import PageLayout from "../components/PageLayout";
import Pagination from "../components/Pagination";
import { RegionProps } from "../components/Region";
import { RegionTable } from "../components/RegionList";
import Tabs from "../components/Tabs";

type ShopDBAPIResponse = {
  name: string;
  numChestShops: number;
  numRegions: number;
};

const Player = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ShopDBAPIResponse | undefined>();
  const { name } = useParams();

  const lowerName = name?.toLowerCase();

  useEffect(() => {
    const controller = new AbortController();

    const fetchPlayer = async () => {
      setLoading(true);
      const response = await fetch(
        `https://api.shopdb.ecocitycraft.com/api/v3/players/${lowerName}`,
        { signal: controller.signal }
      );

      if (response.status === 204) {
        navigate("/player-not-found");
        return;
      }

      const data: ShopDBAPIResponse = await response.json();
      setData(data);
      setLoading(false);
    };

    fetchPlayer();

    return () => controller.abort();
  }, [lowerName]);

  useEffect(() => {
    const capitalizedPlayer = name
      ?.toLowerCase()
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");

    document.title = `${capitalizedPlayer} - Players - ShopDB`;
  }, [name]);

  return (
    <PageLayout>
      <div className="container mx-auto">
        <Breadcrumbs>
          <Breadcrumb to="/">Home</Breadcrumb>
          <Breadcrumb to="/players" hasPrevious>
            Players
          </Breadcrumb>
          <Breadcrumb to={`/players/${lowerName}`} hasPrevious>
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
            <div className="flex">
              <img
                height={128}
                width={128}
                src={`https://mc-heads.net/avatar/${name}/128`}
                alt="Player Head"
                className="rounded"
              />
              <div className="ml-4 text-white">
                <div className="text-2xl font-bold capitalize">{lowerName}</div>
                <div className="mt-1.5 text-xl">
                  <span className="font-bold">
                    {data?.numRegions === 0 ? "No" : data?.numRegions}{" "}
                  </span>
                  {data?.numRegions === 1 ? "Region" : "Regions"}
                </div>
                <div className="text-xl">
                  <span className="font-bold">
                    {data?.numChestShops === 0
                      ? "No"
                      : data?.numChestShops.toLocaleString()}
                  </span>{" "}
                  {data?.numChestShops === 1 ? "Chest Shop" : "Chest Shops"}
                </div>
              </div>
            </div>

            <Tabs
              elements={[
                {
                  name: "Regions",
                  value: "regions",
                  component: <PlayerRegions name={lowerName || ""} />,
                },
                {
                  name: "Items Sold",
                  value: "items-sold",
                  component: (
                    <PlayerChestShops name={lowerName || ""} tradeType="buy" />
                  ),
                },
                {
                  name: "Items Purchased",
                  value: "items-purchased",
                  component: (
                    <PlayerChestShops name={lowerName || ""} tradeType="sell" />
                  ),
                },
              ]}
              defaultValue="regions"
              className="mt-8"
            />
          </div>
        )}
      </div>
    </PageLayout>
  );
};

type PlayerChestShopProps = {
  name: string;
  tradeType: string;
};

type ShopDBChestShopsResponse = {
  page: number;
  totalPages: number;
  totalElements: number;
  results: ChestShopProps[];
};

const PlayerChestShops = ({ name, tradeType }: PlayerChestShopProps) => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ShopDBChestShopsResponse | undefined>();

  const page = searchParams.get("page") || 1;
  const pageSize = 50;

  useEffect(() => {
    const controller = new AbortController();

    const fetchPlayerChestShops = async () => {
      setLoading(true);
      const response = await fetch(
        `https://api.shopdb.ecocitycraft.com/api/v3/players/${name}/chest-shops?tradeType=${tradeType}&page=${page}&pageSize=${pageSize}`,
        { signal: controller.signal }
      );

      const data: ShopDBChestShopsResponse = await response.json();
      setData({
        ...data,
        results: data.results.map((chestShop: ChestShopProps) => ({
          ...chestShop,
          tradeType,
        })),
      });
      setLoading(false);
    };

    fetchPlayerChestShops();

    return () => controller.abort();
  }, [name, page, pageSize, tradeType]);

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
        server="any"
      />
    </div>
  );
};

type PlayerRegionsProps = {
  name: string;
};

type PlayerRegionsResponse = {
  page: number;
  totalPages: number;
  totalElements: number;
  results: RegionProps[];
};

const PlayerRegions = ({ name }: PlayerRegionsProps) => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PlayerRegionsResponse | undefined>();

  const page = searchParams.get("page") || 1;
  const pageSize = 50;

  useEffect(() => {
    const controller = new AbortController();

    const fetchPlayerRegions = async () => {
      setLoading(true);
      const response = await fetch(
        `https://api.shopdb.ecocitycraft.com/api/v3/players/${name}/regions?page=${page}&pageSize=${pageSize}`,
        { signal: controller.signal }
      );
      const data = await response.json();
      setData(data);
      setLoading(false);
    };

    fetchPlayerRegions();

    return () => controller.abort();
  }, [name, page, pageSize]);

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
      <RegionTable data={data} hideUnlisted={false} server="all" />
    </div>
  );
};

export default Player;

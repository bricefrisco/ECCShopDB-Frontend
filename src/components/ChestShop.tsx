import { Link } from "react-router-dom";
import CopyButton from "./CopyButton";
import { useMemo } from "react";

export type ChestShopProps = {
  buyPrice: number;
  buyPriceEach: number;
  sellPrice: number;
  sellPriceEach: number;
  buySign: boolean;
  full: boolean;
  server: string;
  location: {
    x: number;
    y: number;
    z: number;
  };
  town: {
    name: string;
  };
  material: string;
  owner: {
    name: string;
  };
  quantity: number;
  quantityAvailable: number;
  sellSign: boolean;
  tradeType: string;
};

const ChestShop = (props: ChestShopProps) => {
  const price = useMemo(() => {
    return props.tradeType === "buy" ? props.buyPrice : props.sellPrice;
  }, [props.tradeType, props.buyPrice, props.sellPrice]);

  const priceEach = useMemo(() => {
    return props.tradeType === "buy" ? props.buyPriceEach : props.sellPriceEach;
  }, [props.tradeType, props.buyPriceEach, props.sellPriceEach]);

  return (
    <div className="flex flex-col rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-md">
      <div className="flex place-content-between">
        <img
          src={`https://mc-heads.net/avatar/${props.owner.name}/60`}
          alt="Player Head"
          height={60}
          width={60}
          className="mr-3 rounded"
        />
        <div className="text-right text-sm text-white">
          <div>
            <Link to={`/players/${props.owner.name}`}>
              <span className="cursor-pointer font-semibold text-blue-500 hover:underline">
                {props.owner.name}
              </span>
            </Link>
            <span className="text-xs text-gray-400">{" • "}</span>
            <Link
              to={
                props.server === "main"
                  ? `/regions/${props.town.name}`
                  : `/regions/${props.town.name}?server=${props.server}`
              }
            >
              <span className="cursor-pointer font-semibold text-blue-500 hover:underline">
                {props.town.name}
              </span>
            </Link>
          </div>
          <div className="mt-1 text-gray-400">
            {props.location.x}, {props.location.y}, {props.location.z}
          </div>
          <span className="text-sm text-gray-400">{props.server}</span>
        </div>
      </div>

      <div className="flex h-full place-content-between">
        <div className="w-full">
          <div className="text mt-3 tracking-tight text-white">
            {props.tradeType === "buy" ? "Selling" : "Purchasing"}
          </div>

          <div className="text-xl font-semibold capitalize tracking-tight text-white">
            {props.quantity} {props.material}
          </div>

          <div className="mt-2 text-xl font-semibold tracking-tight text-white">
            <div className="flex">
              <span className="mt-0.5 mr-[1px] text-xs font-normal">$</span>
              {Math.floor(price).toLocaleString()}
              <span className="mt-0.5 ml-[2px] text-xs font-normal">
                {(price % 1).toFixed(2).toString().split(".")[1]}
              </span>

              {props.quantity > 1 && (
                <span className="mt-1 ml-1 text-sm font-normal text-gray-400">
                  (${priceEach.toFixed(2)}/Count)
                </span>
              )}
            </div>
          </div>

          <div className="mt-1">
            {props.tradeType === "buy" ? (
              <>
                {props.quantityAvailable >= 1 ? (
                  <span className="rounded bg-green-900 px-2.5 py-0.5 text-xs font-medium text-green-300">
                    In stock ({props.quantityAvailable.toLocaleString()} left)
                  </span>
                ) : (
                  <span className="rounded bg-red-900 px-2.5 py-0.5 text-xs font-medium text-red-300">
                    Out of stock
                  </span>
                )}
              </>
            ) : (
              <>
                {!props.full ? (
                  <span className="rounded bg-green-900 px-2.5 py-0.5 text-xs font-medium text-green-300">
                    Space available
                  </span>
                ) : (
                  <span className="rounded bg-red-900 px-2.5 py-0.5 text-xs font-medium text-red-300">
                    Chest is full
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        <div className="self-end text-right">
          <CopyButton
            id={`warp-${props.location.x}-${props.location.y}-${props.location.z}`}
            copyText={`/warp ${props.town.name}`}
          >
            Warp
          </CopyButton>

          <CopyButton
            id={`coords-${props.location.x}-${props.location.y}-${props.location.z}`}
            copyText={`/tpc ${props.location.x} ${props.location.z}`}
          >
            Coords
          </CopyButton>
        </div>
      </div>
    </div>
  );
};

export default ChestShop;

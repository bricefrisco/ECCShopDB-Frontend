import { Link } from "react-router-dom";
import RegionIcon from "../icons/Region";
import CopyButton from "./CopyButton";
import RegionBackground from "./RegionBackground";

export type RegionProps = {
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
  numMayors: number;
  active: boolean;
};

const Region = (props: RegionProps) => {
  return (
    <div className="flex flex-col rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-md">
      <div className="flex place-content-between items-start">
        <RegionBackground className="h-16 w-16" name={props.name}>
          <RegionIcon className="h-10 w-10" />
        </RegionBackground>
        <div className="text-right">
          <Link
            to={
              props.server === "main"
                ? `/regions/${props.name}`
                : `/regions/${props.name}?server=${props.server}`
            }
          >
            <div className="cursor-pointer text-right text-sm font-semibold text-blue-500 hover:underline">
              Details
            </div>
          </Link>
          <span className="text-sm text-gray-400">{props.server}</span>
        </div>
      </div>

      <div className="align-end flex place-content-between">
        <div className="flex flex-col">
          <span className="mt-3 text-xl font-semibold capitalize tracking-tight text-white">
            {props.name}
          </span>
          <span className="mt-2 text-white">
            <span className="font-bold">
              {props.numMayors === 0 ? "No" : props.numMayors}{" "}
            </span>
            {props.numMayors === 1 ? "Mayor" : "Mayors"}
          </span>
          <span className="text-white">
            <span className="font-bold">
              {props.numChestShops === 0
                ? "No"
                : props.numChestShops.toLocaleString()}
            </span>{" "}
            {props.numChestShops === 1 ? "Chest Shop" : "Chest Shops"}
          </span>
          <div className="mt-2">
            {props.active ? (
              <span className="inline-block rounded bg-green-900 px-2.5 py-0.5 text-xs font-medium text-green-300">
                Listed
              </span>
            ) : (
              <span className="rounded bg-red-900 px-2.5 py-0.5 text-xs font-medium text-red-300">
                Unlisted
              </span>
            )}
          </div>
        </div>
        <CopyButton id={`warp-${props.name}`} copyText={`/warp ${props.name}`}>
          Warp
        </CopyButton>
      </div>
    </div>
  );
};

export default Region;

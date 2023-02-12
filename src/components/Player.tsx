import { Link } from "react-router-dom";

export type PlayerProps = {
  name: string;
  numChestShops: number;
  towns: {
    name: string;
    server: string;
  }[];
};

const Player = ({ name, numChestShops, towns }: PlayerProps) => {
  return (
    <div className="flex flex-col rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-md">
      <div className="flex place-content-between items-start">
        <img
          height={60}
          width={60}
          src={`https://mc-heads.net/avatar/${name}/60`}
          alt="Player Head"
          className="mr-3 rounded"
        />
        <Link to={`/players/${name}`}>
          <span className="cursor-pointer text-right text-sm font-semibold text-blue-500 hover:underline">
            Details
          </span>
        </Link>
      </div>
      <span className="mt-3 text-xl font-semibold capitalize tracking-tight text-white">
        {name}
      </span>
      <span className="mt-2 text-white">
        <span className="font-bold">
          {towns.length === 0 ? "No" : towns.length}{" "}
        </span>
        {towns.length === 1 ? "Region" : "Regions"}
      </span>
      <span className="text-white">
        <span className="font-bold">
          {numChestShops === 0 ? "No" : numChestShops.toLocaleString()}
        </span>{" "}
        Chest Shops
      </span>
    </div>
  );
};

export default Player;

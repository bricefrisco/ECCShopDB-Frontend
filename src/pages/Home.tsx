import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import BookOpen from "../icons/BookOpen";
import Pin from "../icons/Pin";
import Shop from "../icons/Shop";
import User from "../icons/User";

type CardProps = {
  Icon: any;
  title: string;
  description: string;
  link: string;
  to: string;
};

const Card = ({ Icon, title, description, link, to }: CardProps) => {
  return (
    <Link to={to}>
      <div className="mb-3 cursor-pointer rounded bg-gray-800 p-4 py-6 hover:bg-gray-700 md:mb-0 md:border-0 md:bg-inherit md:py-4">
        <Icon className="m-auto h-10 w-10 text-blue-500 md:m-0 md:mb-3" />
        <h3 className="text-xl font-bold text-white lg:text-2xl">{title}</h3>
        <p className="mb-1 text-gray-400 lg:text-lg">{description}</p>
        <span className="font-medium text-blue-500">{link} &rarr;</span>
      </div>
    </Link>
  );
};

const Home = () => {
  useEffect(() => {
    document.title = "Home - ShopDB";
  }, []);

  return (
    <PageLayout>
      <section id="main" className="container mx-auto pb-24 text-center">
        <h1 className="mb-5 pt-16 text-4xl font-bold leading-none tracking-tight text-white lg:text-6xl">
          EcoCityCraft ShopDB
        </h1>
        <p className="text-lg text-gray-400 lg:text-xl">
          Find items to buy or sell on EcoCityCraft.
        </p>
        <Link to="/shops">
          <button
            type="button"
            className="mt-6 mr-2 mb-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800"
          >
            View Chest Shops
          </button>
        </Link>
      </section>
      <section id="info" className="md:bg-gray-800 md:py-16">
        <div className="mx-auto max-w-5xl text-center md:grid md:grid-cols-2 md:gap-5 md:text-left">
          <Card
            to="/shops"
            Icon={Shop}
            title="Chest Shops"
            description="Search for items to buy or sell."
            link="Find chest shops"
          />

          <Card
            to="/docs"
            Icon={BookOpen}
            title="Documentation"
            description="Read about how ShopDB works and how to use it."
            link="Read the docs"
          />

          <Card
            to="/regions"
            Icon={Pin}
            title="Regions"
            description="View towns and the chest shops they contain."
            link="Explore regions"
          />

          <Card
            to="/players"
            Icon={User}
            title="Players"
            description="View players and chest shops they own."
            link="Discover traders"
          />
        </div>
      </section>
    </PageLayout>
  );
};

export default Home;

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

type NavItemProps = {
  children: JSX.Element | string;
  to: string;
};

const NavItem = ({ children, to }: NavItemProps) => {
  const { pathname } = useLocation();
  const isActive = pathname.split("/")[1] === to.slice(1);

  return (
    <Link to={to}>
      <li
        className={`md:rounded-0 mx-3 cursor-pointer rounded px-4 py-1.5 font-semibold text-gray-400 hover:bg-gray-700 hover:text-white md:mx-0 md:hover:bg-inherit md:hover:text-blue-500 ${
          isActive
            ? "bg-blue-700 text-white hover:bg-blue-700 md:bg-inherit md:text-blue-500 md:hover:bg-inherit"
            : "md:text-white"
        }`}
      >
        {children}
      </li>
    </Link>
  );
};

type NavItemsProps = {
  children: JSX.Element | JSX.Element[];
};

const NavItems = ({ children }: NavItemsProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <button
        data-collapse-toggle="navbar-hamburger"
        type="button"
        className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 md:hidden"
        aria-controls="navbar-hamburger"
        aria-expanded="false"
        onClick={() => setOpen(!open)}
      >
        <svg
          className="h-6 w-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <ul
        className={`${
          open ? "fixed top-16 left-0 z-50 w-full" : "hidden md:block"
        } text-slate-200 md:relative md:top-0`}
      >
        <div className="container mx-auto rounded-lg rounded-tr-none rounded-tl-none border-gray-800 bg-gray-900 pb-3 md:flex md:pb-0">
          {children}
        </div>
      </ul>
    </div>
  );
};

const Navigation = () => {
  return (
    <nav className="container sticky top-0 z-20 mx-auto flex h-[64px] place-content-between items-center bg-gray-900 py-2 md:relative">
      <Link to="/">
        <img
          height={44}
          width={44}
          src="/logo.png"
          alt="Logo"
          className="h-[44px] w-[44px]"
        />
      </Link>
      <NavItems>
        <NavItem to="/">Home</NavItem>
        <NavItem to="/shops">Chest Shops</NavItem>
        <NavItem to="/regions">Regions</NavItem>
        <NavItem to="/players">Players</NavItem>
        <NavItem to="/docs">Docs</NavItem>
      </NavItems>
    </nav>
  );
};

export default Navigation;

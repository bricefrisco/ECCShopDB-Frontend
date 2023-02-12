import CaretRight from "../icons/CaretRight";
import Home from "../icons/Home";
import { Link } from "react-router-dom";

type BreadcrumbProps = {
  children: JSX.Element | string;
  hasPrevious?: boolean;
  to: string;
};

export const Breadcrumb = ({ children, hasPrevious, to }: BreadcrumbProps) => {
  return (
    <>
      {hasPrevious && <CaretRight className="h-6 w-6" />}
      <Link to={to}>
        <li className="flex cursor-pointer items-center text-sm font-medium capitalize hover:text-white">
          {children === "Home" && <Home className="mr-2 h-4 w-4" />}
          {children}
        </li>
      </Link>
    </>
  );
};

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const Breadcrumbs = ({ children }: Props) => {
  return (
    <nav className="flex">
      <ol className="inline-flex items-center space-x-1 text-gray-400 md:space-x-3">
        {children}
      </ol>
    </nav>
  );
};

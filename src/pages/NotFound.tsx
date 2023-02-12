import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import NotFoundSvg from "../icons/NotFound";

const NotFound = () => {
  useEffect(() => {
    document.title = "Page not found - ShopDB";
  }, []);

  return (
    <PageLayout>
      <div className="container mx-auto flex h-full min-h-[calc(100vh-160px)] w-full place-content-center items-center">
        <div className="flex items-center">
          <NotFoundSvg className="h-40 w-40" />
          <div className="ml-5">
            <h1 className="text-2xl font-semibold text-white">
              Page not found
            </h1>
            <p className="text-lg text-white">
              We couldn't find the page you were looking for.
            </p>
            <p className="mt-2 text-white">
              Looking for{" "}
              <Link to="/shops">
                <span className="cursor-pointer font-semibold text-blue-500 hover:underline">
                  chest shops
                </span>
              </Link>
              ?
            </p>
            <p className="text-white">
              If you feel that this is an error, please{" "}
              <a
                href="https://ecocitycraft.com/forum/threads/205318/"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer font-semibold text-blue-500 hover:underline"
              >
                contact us
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFound;

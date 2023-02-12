import { useEffect } from "react";
import { useRouteError } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import ErrorSvg from "../icons/Error";

const Error = () => {
  const error = useRouteError();
  console.error(error);

  useEffect(() => {
    document.title = "Error - ShopDB";
  }, []);

  return (
    <PageLayout>
      <div className="container mx-auto flex h-full min-h-[calc(100vh-160px)] w-full place-content-center items-center">
        <div className="flex items-center">
          <ErrorSvg className="h-60 w-60" />
          <div className="ml-5">
            <h1 className="text-2xl font-semibold text-white">Oh no!</h1>
            <p className="text-lg text-white">
              An error occurred when trying to load the page.
            </p>
            <p className="mt-2 text-white">
              Please try again. If the issue persists,{" "}
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

export default Error;

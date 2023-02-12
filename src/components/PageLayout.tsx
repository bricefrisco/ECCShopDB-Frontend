import Navigation from "./Navigation";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const PageLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-gray-900 px-3">
      <Navigation />
      <div className="mt-6 flex-grow pb-12 md:mt-12">{children}</div>
    </div>
  );
};

export default PageLayout;

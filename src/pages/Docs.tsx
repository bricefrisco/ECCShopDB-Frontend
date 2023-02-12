import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../components/PageLayout";

type HeadingProps = {
  children: React.ReactNode;
};

type SectionProps = {
  id: string;
  children: React.ReactNode;
};

const Section = ({ id, children }: SectionProps) => {
  return (
    <section id={id} className="mb-4">
      {children}
    </section>
  );
};

const Heading = ({ children }: HeadingProps) => {
  return (
    <h1 className="mb-5 pt-16 text-4xl font-bold leading-none tracking-tight text-white lg:text-5xl">
      {children}
    </h1>
  );
};

const Subheading = ({ children }: HeadingProps) => {
  return <p className="pt-1 text-2xl font-light text-white">{children}</p>;
};

const Text = ({ children }: HeadingProps) => {
  return <div className="pt-5 text-lg leading-7 text-white">{children}</div>;
};

const Docs = () => {
  useEffect(() => {
    document.title = "Documentation - ShopDB";
  }, []);

  return (
    <PageLayout>
      <div className="container mx-auto">
        <div className="max-w-3xl">
          <Section id="documentation">
            <Heading>ShopDB Documentation</Heading>
            <Subheading>
              This page is an overview of the ShopDB documentation.
            </Subheading>

            <Text>
              <span className="font-semibold">ShopDB</span> is a Minecraft
              plugin and web application that allows players to easily search
              for chest shops to buy or sell from.
            </Text>
          </Section>

          <Section id="feedback">
            <Heading>Feedback</Heading>
            <Subheading>Have a suggestion, or found a bug?</Subheading>
            <Text>
              <p>
                ShopDB has evolved significantly over the past two years thanks
                to the support of the community. If you have an idea, or find a
                bug, please share it on the{" "}
                <a
                  href="https://ecocitycraft.com/forum/threads/205318/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer font-semibold text-blue-500 hover:underline"
                >
                  forums
                </a>
                . All feedback is welcomed and encouraged.
              </p>
            </Text>
          </Section>

          <Section id="integration">
            <Heading>Integration</Heading>
            <Subheading>How is ShopDB updated?</Subheading>
            <Text>
              <div className="mb-3">
                Each time a player{" "}
                <span className="font-semibold">interacts</span> with a chest
                shop, the chest shop data is captured and sent to ShopDB.
              </div>
              <div className="mb-2 font-semibold">Interactions include: </div>
              <ul className="mb-3 list-inside list-disc">
                <li>A chest shop is created</li>
                <li>A chest shop is opened</li>
                <li>A chest shop is used</li>
                <li>A chest shop is destroyed</li>
              </ul>
              After each interaction, the chest shop information (including the
              shop owner and region information) is sent to and updated in
              ShopDB in specified intervals.{" "}
              <span className="font-semibold">
                By default, shops are updated every ten minutes.
              </span>
            </Text>
          </Section>

          <Section id="usage">
            <Heading>Usage</Heading>
            <Subheading>
              How can I add or remove my chest shops from ShopDB?
            </Subheading>
            <Text>
              <p className="mb-3">
                <span className="font-semibold">
                  By default, all chest shops are hidden.
                </span>{" "}
                Two criteria must be met for chest shops to be shown:
              </p>
              <ul className="mb-3 list-inside list-disc">
                <li>The chest shop must be in a WorldGuard region.</li>
                <li>A region owner has listed the region.</li>
              </ul>
              <p className="mb-3">
                To check if a chest shop is in a region, go to the chest shop
                in-game and type:{" "}
                <span className="rounded bg-gray-800 py-1 px-2">/rg i</span>.
              </p>
              <p className="mb-3">
                To see if a region is listed, visit the{" "}
                <Link to="/regions">
                  <span className="cursor-pointer font-semibold text-blue-500 hover:underline">
                    regions
                  </span>
                </Link>{" "}
                page and search for it. Under the region name is an indication
                of whether or not it is listed. If the region is not displayed,
                ensure you have unchecked the 'Hide Unlisted' option.
              </p>

              <p>
                It is also possible that the region is not yet in ShopDB.
                Regions are only sent to or updated in ShopDB after a chest shop
                within it has been{" "}
                <a href="#integration">
                  <span className="cursor-pointer font-semibold text-blue-500 hover:underline">
                    interacted
                  </span>
                </a>{" "}
                with, or after the region has been listed.
              </p>
            </Text>
          </Section>

          <Section id="listing">
            <Heading>Listing a region</Heading>
            <div className="mt-[-1rem]">
              <Text>
                To list a region, run the command in-game{" "}
                <span className="rounded bg-gray-800 py-1 px-2">
                  /shopdb <span className="font-semibold">list</span>{" "}
                  &lt;region-name&gt;
                </span>
                . You <span className="font-semibold">must be an owner</span> to
                list the region. After a region is listed,{" "}
                <span className="font-semibold">all</span> chest shops within it
                will be visible on ShopDB.
              </Text>
            </div>
          </Section>

          <Section id="unlisting">
            <Heading>Unlisting a region</Heading>
            <div className="mt-[-1rem]">
              <Text>
                To unlist a region, run the command in-game{" "}
                <span className="rounded bg-gray-800 py-1 px-2">
                  /shopdb <span className="font-semibold">unlist</span>{" "}
                  &lt;region-name&gt;
                </span>
                . You <span className="font-semibold"> must be an owner</span>{" "}
                to unlist the region. After a region is unlisted,{" "}
                <span className="font-semibold">all</span> chest shops within it
                will be hidden on ShopDB.
              </Text>
            </div>
          </Section>

          <Section id="subregions">
            <Heading>Subregions</Heading>
            <Subheading>How are overlapping regions handled?</Subheading>
            <Text>
              <p className="mb-3">
                Sometimes regions overlap. For example, all the chest shops in
                the market are also in spawn. In ShopDB, chest shops are linked
                to only one region. In this case, the following criteria is used
                to select which region the shop likely belongs to:
              </p>
              <ol type="1" className="mb-3 list-inside list-decimal pl-4">
                <li>The region which is listed will be linked.</li>
                <li>
                  If no region is listed, or both are listed, the smallest
                  region will be chosen.
                </li>
              </ol>
              <p>
                In most cases, this selection criteria results in the correct
                region being linked. However, if a region is chosen incorrectly,
                this can be resolved by the region owners by ensuring that only
                the correct region is listed. Then, chest shops will be
                correctly linked after{" "}
                <a href="#integration">
                  <span className="cursor-pointer font-semibold text-blue-500 hover:underline">
                    interactions
                  </span>
                </a>{" "}
                occur.
              </p>
            </Text>
          </Section>

          <Section id="equality">
            <Heading>Equality</Heading>
            <Subheading>Which chest shops show up first?</Subheading>
            <Text>
              <p className="mb-3">
                The sorting criteria selected determines the order in which
                shops are listed. <span className="italic">Best price</span>,
                selected by default, sorts chest shops by the best value
                (cheapest per individual item sold, or most money offered per
                individual item purchased).{" "}
                <span className="font-semibold">However</span>, many times
                players trade items for the same price as others.
              </p>
              <p>
                In the case where the sorting criteria results in a tie, the
                results are randomized. This way, no chest shops are favored or
                listed higher than other chest shops.
              </p>
            </Text>
          </Section>

          <Section id="uniqueness">
            <Heading>Uniqueness</Heading>
            <Subheading>Where are my other 100 dirt chest shops?</Subheading>
            <Text>
              <p className="mb-3">
                To avoid filling search results with redundant chest shops,{" "}
                <span className="italic">hide identical shops</span>, enabled by
                default, filters out chest shops that have the same item, owner,
                region, and price. This can be disabled by unchecking the
                filter.
              </p>
              <p>
                When the filter is enabled, the{" "}
                <span className="font-semibold">most available</span> chest shop
                will be the unique shop selected and shown. When purchasing,
                this prioritizes shops with greater quantity. When selling, this
                prioritizes shops with the greatest space available.
              </p>
            </Text>
          </Section>
        </div>
      </div>
    </PageLayout>
  );
};

export default Docs;

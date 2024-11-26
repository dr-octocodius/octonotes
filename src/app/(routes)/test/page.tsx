import type { NextComponentType, NextPageContext } from "next";

interface Props {}

const Page: NextComponentType<NextPageContext, {}, Props> = (props: Props) => {
  return <div>TEST PAGE</div>;
};

export default Page;

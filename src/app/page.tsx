import { Button } from "@/components/ui/button";
import Greet from "./greet";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <Link href="/test">
        <Button>Button</Button>
      </Link>
      <Greet />
    </div>
  );
}

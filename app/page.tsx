import { getHome } from "@/lib/aniList/home";
import Nav from "@/components/nav";
import Home from "@/components/home/home";

export default async function Page() {
  return (
    <>
      <Nav />
      <Home />
    </>
  );
}

import { getHome } from "@/lib/aniList/home";
import { gql, useQuery } from "@apollo/client";

export default async function Home() {
  const data = await getHome();

  return <p>{JSON.stringify(data)}</p>;

  // return (
  //   <div className='flex flex-col items-center justify-center'>
  //     <TrendingNow />
  //   </div>
  // );
}

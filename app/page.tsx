import TrendingNow from "@/components/home/trendingNow";
import { gql, useQuery } from "@apollo/client";
import { Card } from "@nextui-org/react";

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <TrendingNow />
    </div>
  );
}

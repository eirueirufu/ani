import HomeMedia from "@/components/home/homeMedia";
import HomeMediaRank from "@/components/home/homeMediaRank";
import { getHome } from "@/lib/aniList/home";

export default async function Home() {
  const data = await getHome();

  return (
    <div className='flex flex-col items-center justify-center'>
      <HomeMedia title='现在流行' media={data.trending.media} />
      <HomeMedia title='当季热门' media={data.season.media} />
      <HomeMedia title='下季上映' media={data.nextSeason.media} />
      <HomeMedia title='最受欢迎' media={data.popular.media} />
      <HomeMediaRank title='TOP' media={data.top.media} />
    </div>
  );
}

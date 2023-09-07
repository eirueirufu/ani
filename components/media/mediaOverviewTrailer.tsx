import { graphql, useFragment, FragmentType } from "@/lib/aniList";
import { GetMediaOverviewTrailer } from "./gql";

export function MediaOverviewTrailer(props: {
  trailer: FragmentType<typeof GetMediaOverviewTrailer>;
}) {
  const trailer = useFragment(GetMediaOverviewTrailer, props.trailer);

  if (!trailer.id || !trailer.site || trailer.site !== "youtube") {
    return;
  }

  return (
    <div className='w-full'>
      <p>TRAILER</p>
      <div className='grid grid-cols-2 gap-3'>
        <iframe
          src={`https://www.youtube.com/embed/${trailer.id}`}
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        ></iframe>
      </div>
    </div>
  );
}

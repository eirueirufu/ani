"use client";

import { useQuery } from "@apollo/client";
import { GET_MEDIA, Media } from "@/lib/aniList/media";
import { Image } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import Loading from "@/components/loading";

export default function Media(props: { id: number }) {
  const searchParams = useSearchParams();

  const { loading, error, data } = useQuery<Media>(GET_MEDIA, {
    variables: {
      id: props.id,
      type: searchParams.get("type") ?? "",
      isAdult: searchParams.get("isAdult") === "true",
    },
  });
  if (loading) {
    return <Loading className='w-screen h-screen' />;
  }
  if (error) {
    throw error;
  }
  if (!data) {
    return <div>no data</div>;
  }
  const media = data.Media;
  return (
    <>
      <Image
        alt={media.title.native}
        width={"100%"}
        src={media.bannerImage}
        radius='none'
        className='h-48 md:h-auto md:max-h-96 object-cover'
      ></Image>
      <div className='max-w-5xl mx-auto flex flex-col items-center justify-center'>
        <div className='flex gap-3'>
          <Image
            alt={media.title.native}
            src={media.coverImage.large}
            radius='none'
            className='relative -top-1/3 object-cover w-40'
          ></Image>
          <div className='flex-1 p-3'>
            <h1>{media.title.native}</h1>
            <div
              className='text-xs mt-3'
              dangerouslySetInnerHTML={{ __html: media.description }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

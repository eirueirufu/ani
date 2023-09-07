"use client";

import { useQuery } from "@apollo/client";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { MediaType } from "@/lib/aniList/graphql";
import { MediaOverviewRelations } from "./mediaOverviewRelations";
import { GetMedia } from "./gql";
import { MediaOverviewCharacters } from "./mediaOverviewCharacters";
import { MediaOverviewStaffs } from "./mediaOverviewStaffs";
import { MediaOverviewTrailer } from "./mediaOverviewTrailer";
import { MediaOverviewRecommendations } from "./mediaOverviewRecommedations";

export default function Media(props: { id: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { loading, error, data } = useQuery(GetMedia, {
    variables: {
      id: props.id,
      type: searchParams.get("type") as MediaType,
      isAdult: searchParams.get("isAdult") === "true",
    },
  });
  if (loading) {
    return;
  }
  if (error) {
    throw error;
  }
  return (
    <>
      {data?.Media?.bannerImage ? (
        <Image
          alt={data?.Media?.title?.native ?? ""}
          width={"100%"}
          src={data?.Media?.bannerImage}
          radius='none'
          className='h-48 md:h-auto md:max-h-96 object-cover'
          height={320}
        ></Image>
      ) : (
        <div className='h-16'></div>
      )}
      <div className='max-w-5xl mx-auto flex flex-col p-3'>
        <div className='w-full'>
          <Image
            alt={data?.Media?.title?.native ?? ""}
            src={data?.Media?.coverImage?.large ?? ""}
            radius='none'
            width={160}
            height={240}
            className='object-cover float-left mr-3 mb-3'
          ></Image>
          <div className='flex-1 md:block'>
            <h1>{data?.Media?.title?.native}</h1>
            <div
              className='text-xs mt-3'
              dangerouslySetInnerHTML={{
                __html: data?.Media?.description ?? "",
              }}
            />
          </div>
        </div>
        <div className='flex flex-col md:flex-row gap-3'>
          <div className='flex flex-row md:flex-col gap-3 p-3 whitespace-nowrap overflow-scroll md:overflow-visible'>
            {data?.Media?.nextAiringEpisode?.airingAt && (
              <div>
                <p className='text-sm font-bold'>Airing</p>
                <p className='text-xs'>
                  {new Date(
                    data?.Media?.nextAiringEpisode?.airingAt * 1000
                  ).toDateString()}
                </p>
              </div>
            )}
            {data?.Media?.format && (
              <div>
                <p className='text-sm font-bold'>Format</p>
                <p className='text-xs'>{data.Media.format}</p>
              </div>
            )}
            {data?.Media?.episodes && (
              <div>
                <p className='text-sm font-bold'>Episodes</p>
                <p className='text-xs'>{data.Media.episodes}</p>
              </div>
            )}
            {data?.Media?.duration && (
              <div>
                <p className='text-sm font-bold'>Episode Duration</p>
                <p className='text-xs'>{data.Media.duration}</p>
              </div>
            )}
            {data?.Media?.status && (
              <div>
                <p className='text-sm font-bold'>Status</p>
                <p className='text-xs'>{data.Media.status}</p>
              </div>
            )}
            {data?.Media?.startDate && (
              <div>
                <p className='text-sm font-bold'>Start Date</p>
                <p className='text-xs'>{`${data.Media.startDate.year}-${data.Media.startDate.month}-${data.Media.startDate.day}`}</p>
              </div>
            )}
            {data?.Media?.endDate && (
              <div>
                <p className='text-sm font-bold'>End Date</p>
                <p className='text-xs'>{`${data.Media.endDate.year}-${data.Media.endDate.month}-${data.Media.endDate.day}`}</p>
              </div>
            )}
            {data?.Media?.season && (
              <div>
                <p className='text-sm font-bold'>Season</p>
                <p className='text-xs'>{data.Media.season}</p>
              </div>
            )}
            {data?.Media?.studios && (
              <div>
                <p className='text-sm font-bold'>Studios</p>
                <div className='flex md:flex-col'>
                  {data?.Media?.studios.edges?.map((item, index) => {
                    return (
                      <p key={index} className='text-xs'>
                        {item?.node?.name}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}
            {data?.Media?.source && (
              <div>
                <p className='text-sm font-bold'>Source</p>
                <p className='text-xs'>{data.Media.source}</p>
              </div>
            )}
            {data?.Media?.hashtag && (
              <div>
                <p className='text-sm font-bold'>Hashtag</p>
                <p className='text-xs'>{data.Media.hashtag}</p>
              </div>
            )}
            {data?.Media?.genres && (
              <div>
                <p className='text-sm font-bold'>Genres</p>
                <div className='flex md:flex-col'>
                  {data?.Media?.genres.map((item, index) => {
                    return (
                      <p key={index} className='text-xs'>
                        {item}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}
            {data?.Media?.title?.native && (
              <div>
                <p className='text-sm font-bold'>Native</p>
                <p className='text-xs'>{data.Media.title.native}</p>
              </div>
            )}
          </div>
          <div className='flex flex-col items-center justify-center gap-3'>
            {data?.Media?.relations && (
              <MediaOverviewRelations relations={data.Media.relations} />
            )}
            {data?.Media?.characterPreview && (
              <MediaOverviewCharacters
                characters={data.Media.characterPreview}
              />
            )}
            {data?.Media?.staffPreview && (
              <MediaOverviewStaffs staffs={data.Media.staffPreview} />
            )}
            {data?.Media?.trailer && (
              <MediaOverviewTrailer trailer={data.Media.trailer} />
            )}
            {data?.Media?.recommendations && (
              <MediaOverviewRecommendations
                recommendations={data.Media.recommendations}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

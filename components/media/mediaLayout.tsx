"use client";

import { useQuery } from "@apollo/client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Tab,
  Tabs,
} from "@nextui-org/react";
import {
  usePathname,
  useRouter,
  useSearchParams,
  useSelectedLayoutSegment,
} from "next/navigation";
import { MediaType } from "@/lib/aniList/graphql";
import { GetMedia } from "./gql";
import { ReactNode } from "react";
import Link from "next/link";
import Loading from "../loading";

export default function MediaLayout(props: {
  id: number;
  children: ReactNode;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const segament = useSelectedLayoutSegment();

  const { loading, error, data } = useQuery(GetMedia, {
    variables: {
      id: props.id,
      type: searchParams.get("type") as MediaType,
      isAdult: searchParams.get("isAdult") === "true",
    },
  });
  if (loading) {
    return <Loading className='w-full h-96' />;
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
        <div className='grid grid-cols-3 py-3 items-center justify-center'>
          <Button
            radius='none'
            isDisabled={!segament}
            variant='flat'
            onClick={() => {
              router.push(`/media/${props.id}?${searchParams.toString()}`);
            }}
          >
            Overview
          </Button>
          <Button
            radius='none'
            isDisabled={segament === "characters"}
            variant='flat'
            onClick={() => {
              router.push(
                `/media/${props.id}/characters?${searchParams.toString()}`
              );
            }}
          >
            Characters
          </Button>
          <Button
            radius='none'
            isDisabled={segament === "staff"}
            variant='flat'
            onClick={() => {
              router.push(
                `/media/${props.id}/staff?${searchParams.toString()}`
              );
            }}
          >
            Staff
          </Button>
        </div>
        <div className='flex flex-col md:flex-row gap-3'>
          <div className='flex flex-row md:flex-col gap-3 p-3 whitespace-nowrap overflow-scroll md:overflow-auto md:max-w-xs'>
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
          <div className='w-full'>{props.children}</div>
        </div>
      </div>
    </>
  );
}

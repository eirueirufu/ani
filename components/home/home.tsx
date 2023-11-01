"use client";

import { graphql, useFragment, FragmentType } from "@/lib/aniList";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { Card, CardBody, Image } from "@nextui-org/react";
import { getMediaDate } from "@/lib/utils";
import { TopMediaItem } from "./topMediaItem";
import { MediaItem } from "./mediaItem";
import Loading from "../loading";
import { useState } from "react";
import Link from "next/link";

export const GetHome = graphql(/* GraphQL */ `
  query GetHome(
    $season: MediaSeason
    $seasonYear: Int
    $nextSeason: MediaSeason
    $nextYear: Int
  ) {
    trending: Page(page: 1, perPage: 6) {
      media(sort: TRENDING_DESC, type: ANIME, isAdult: false) {
        ...media
      }
    }
    season: Page(page: 1, perPage: 6) {
      media(
        season: $season
        seasonYear: $seasonYear
        sort: POPULARITY_DESC
        type: ANIME
        isAdult: false
      ) {
        ...media
      }
    }
    nextSeason: Page(page: 1, perPage: 6) {
      media(
        season: $nextSeason
        seasonYear: $nextYear
        sort: POPULARITY_DESC
        type: ANIME
        isAdult: false
      ) {
        ...media
      }
    }
    popular: Page(page: 1, perPage: 6) {
      media(sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
        ...media
      }
    }
    top: Page(page: 1, perPage: 10) {
      media(sort: SCORE_DESC, type: ANIME, isAdult: false) {
        ...media
      }
    }
  }
`);

export const HomeMedia = graphql(/* GraphQL */ `
  fragment media on Media {
    id
    title {
      userPreferred
      native
    }
    coverImage {
      extraLarge
      large
      color
    }
    startDate {
      year
      month
      day
    }
    endDate {
      year
      month
      day
    }
    bannerImage
    season
    seasonYear
    description
    type
    format
    status(version: 2)
    episodes
    duration
    chapters
    volumes
    genres
    isAdult
    averageScore
    popularity
    mediaListEntry {
      id
      status
    }
    nextAiringEpisode {
      airingAt
      timeUntilAiring
      episode
    }
    studios(isMain: true) {
      edges {
        isMain
        node {
          id
          name
        }
      }
    }
  }
`);

export default function Home() {
  const mediaDate = getMediaDate();
  const { loading, error, data } = useQuery(GetHome, {
    variables: {
      season: mediaDate.Season,
      seasonYear: mediaDate.SeasonYear,
      nextSeason: mediaDate.NextSeason,
      nextYear: mediaDate.NextYear,
    },
  });
  if (error) {
    throw error;
  }
  if (loading) {
    return <Loading className='w-full h-96' />;
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center'>
        <div className='container mx-auto max-w-6xl p-3'>
          <div className='flex justify-between items-center'>
            <h1 className='font-bold text-2xl my-3'>TRENDING NOW</h1>
            <Link href={"/search"}>
              <p className='font-bold text-xs'>VLEW ALL →</p>
            </Link>
          </div>
          <div className='grid grid-cols-3 md:grid-cols-6 gap-3'>
            {data?.trending?.media?.map((item, index) => {
              if (!item) {
                return;
              }
              return <MediaItem key={index} media={item} />;
            })}
          </div>
        </div>
        <div className='container mx-auto max-w-6xl p-3'>
          <h1 className='font-bold text-2xl my-3'>THIS SEASON</h1>
          <div className='grid grid-cols-3 md:grid-cols-6 gap-3'>
            {data?.season?.media?.map((item, index) => {
              if (!item) {
                return;
              }
              return <MediaItem key={index} media={item} />;
            })}
          </div>
        </div>
        <div className='container mx-auto max-w-6xl p-3'>
          <h1 className='font-bold text-2xl my-3'>COMING SOON</h1>
          <div className='grid grid-cols-3 md:grid-cols-6 gap-3'>
            {data?.nextSeason?.media?.map((item, index) => {
              if (!item) {
                return;
              }
              return <MediaItem key={index} media={item} />;
            })}
          </div>
        </div>
        <div className='container mx-auto max-w-6xl p-3'>
          <h1 className='font-bold text-2xl my-3'>POPULAR</h1>
          <div className='grid grid-cols-3 md:grid-cols-6 gap-3'>
            {data?.popular?.media?.map((item, index) => {
              if (!item) {
                return;
              }
              return <MediaItem key={index} media={item} />;
            })}
          </div>
        </div>
        <div className='container mx-auto max-w-6xl p-3'>
          <h1 className='font-bold text-2xl my-3'>TOP</h1>
          <div className='flex flex-col'>
            {data?.top?.media?.map((item, index) => {
              if (!item) {
                return;
              }
              return <TopMediaItem key={index} index={index} media={item} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

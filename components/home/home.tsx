"use client";

import { graphql, useFragment, FragmentType } from "@/lib/aniList";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { Card, CardBody, Image } from "@nextui-org/react";
import { getDate } from "@/lib/utils";
import { TopMediaItem } from "./topMediaItem";
import { MediaItem } from "./mediaItem";

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
  console.log(getDate());
  const [season, year, nextSeason, nextYear] = getDate();
  const { loading, error, data } = useQuery(GetHome, {
    variables: {
      season: season,
      seasonYear: year,
      nextSeason: nextSeason,
      nextYear: nextYear,
    },
  });
  if (error) {
    throw error;
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center'>
        <div className='container mx-auto max-w-6xl p-3'>
          <h1 className='font-bold text-2xl my-3'>TRENDING NOW</h1>
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
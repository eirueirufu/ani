"use client";

import Nav from "@/components/nav";
import { graphql, useFragment, FragmentType } from "@/lib/aniList";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { MediaSeason } from "@/lib/aniList/graphql";
import PageLoading from "../pageLoading";
import { Card, CardBody, Image } from "@nextui-org/react";

export const getHome = graphql(/* GraphQL */ `
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

export const Media = graphql(`
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
  const searchParams = useSearchParams();

  const { loading, error, data } = useQuery(getHome, {
    variables: {
      season: MediaSeason.Summer,
      seasonYear: 2023,
      nextSeason: MediaSeason.Fall,
      nextYear: 2023,
    },
  });
  if (loading) {
    return <PageLoading />;
  }
  if (error) {
    throw error;
  }
  if (!data) {
    return <div>no data</div>;
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center'>
        <div className='container mx-auto max-w-6xl p-3'>
          <h1 className='font-bold text-2xl my-3'>当下流行</h1>
          <div className='grid grid-cols-3 md:grid-cols-6 gap-3'>
            {data?.trending?.media?.map((item, index) => {
              if (!item) {
                return;
              }
              return <MediaItem key={index} media={item} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function MediaItem(props: { media: FragmentType<typeof Media> }) {
  const media = useFragment(Media, props.media);
  const router = useRouter();
  return (
    <Card
      shadow='sm'
      isPressable
      isHoverable
      onClick={() => {
        router.push(
          `/media/${media.id}?type=${media.type}&isAdult=${media.isAdult}`
        );
      }}
    >
      <CardBody className='p-0'>
        <Image
          alt={media.title?.native ?? ""}
          src={media.coverImage?.extraLarge ?? ""}
          className='object-cover'
        />
        <p className='text-xs md:text-sm font-bold my-auto text-center p-3'>
          {media.title?.native}
        </p>
      </CardBody>
    </Card>
  );
}

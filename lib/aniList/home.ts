import { gql, ApolloClient, InMemoryCache } from "@apollo/client";
import { cache } from "react";

export const revalidate = 3600; // revalidate the data at most every hour

const GET_HOME = gql`
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
  fragment media on Media {
    id
    title {
      userPreferred
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
`;

export const getHome = cache(async () => {
  const client = new ApolloClient({
    uri: "https://graphql.anilist.co",
    cache: new InMemoryCache(),
    ssrMode: true,
  });
  const data = await client.query({
    query: GET_HOME,
    variables: {
      type: "ANIME",
      season: "SUMMER",
      seasonYear: 2023,
      nextSeason: "FALL",
      nextYear: 2023,
    },
  });
  return data;
});

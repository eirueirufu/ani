import { gql } from "@apollo/client";

export const GET_MEDIA = gql`
  query media($id: Int, $type: MediaType, $isAdult: Boolean) {
    Media(id: $id, type: $type, isAdult: $isAdult) {
      id
      title {
        userPreferred
        romaji
        english
        native
      }
      coverImage {
        extraLarge
        large
      }
      bannerImage
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
      description
      season
      seasonYear
      type
      format
      status(version: 2)
      episodes
      duration
      chapters
      volumes
      genres
      synonyms
      source(version: 3)
      isAdult
      isLocked
      meanScore
      averageScore
      popularity
      favourites
      isFavouriteBlocked
      hashtag
      countryOfOrigin
      isLicensed
      isFavourite
      isRecommendationBlocked
      isFavouriteBlocked
      isReviewBlocked
      nextAiringEpisode {
        airingAt
        timeUntilAiring
        episode
      }
      relations {
        edges {
          id
          relationType(version: 2)
          node {
            id
            title {
              userPreferred
            }
            format
            type
            status(version: 2)
            bannerImage
            coverImage {
              large
            }
          }
        }
      }
      characterPreview: characters(perPage: 6, sort: [ROLE, RELEVANCE, ID]) {
        edges {
          id
          role
          name
          voiceActors(language: JAPANESE, sort: [RELEVANCE, ID]) {
            id
            name {
              userPreferred
            }
            language: languageV2
            image {
              large
            }
          }
          node {
            id
            name {
              userPreferred
            }
            image {
              large
            }
          }
        }
      }
      staffPreview: staff(perPage: 8, sort: [RELEVANCE, ID]) {
        edges {
          id
          role
          node {
            id
            name {
              userPreferred
            }
            language: languageV2
            image {
              large
            }
          }
        }
      }
      studios {
        edges {
          isMain
          node {
            id
            name
          }
        }
      }
      reviewPreview: reviews(perPage: 2, sort: [RATING_DESC, ID]) {
        pageInfo {
          total
        }
        nodes {
          id
          summary
          rating
          ratingAmount
          user {
            id
            name
            avatar {
              large
            }
          }
        }
      }
      recommendations(perPage: 7, sort: [RATING_DESC, ID]) {
        pageInfo {
          total
        }
        nodes {
          id
          rating
          userRating
          mediaRecommendation {
            id
            title {
              userPreferred
            }
            format
            type
            status(version: 2)
            bannerImage
            coverImage {
              large
            }
          }
          user {
            id
            name
            avatar {
              large
            }
          }
        }
      }
      externalLinks {
        id
        site
        url
        type
        language
        color
        icon
        notes
        isDisabled
      }
      streamingEpisodes {
        site
        title
        thumbnail
        url
      }
      trailer {
        id
        site
      }
      rankings {
        id
        rank
        type
        format
        year
        season
        allTime
        context
      }
      tags {
        id
        name
        description
        rank
        isMediaSpoiler
        isGeneralSpoiler
        userId
      }
      mediaListEntry {
        id
        status
        score
      }
      stats {
        statusDistribution {
          status
          amount
        }
        scoreDistribution {
          score
          amount
        }
      }
    }
  }
`;

export type Media = {
  Media: {
    id: number;
    title: {
      userPreferred: string;
      romaji: string;
      english: string;
      native: string;
    };
    coverImage: {
      extraLarge: string;
      large: string;
    };
    bannerImage: string;
    startDate: {
      year: number;
      month: number;
      day: number;
    };
    endDate: {
      year: number;
      month: number;
      day: number;
    };
    description: string;
    season: string;
    seasonYear: number;
    type: string;
    format: string;
    status: string;
    episodes: number;
    duration: number;
    chapters: any;
    volumes: any;
    genres: Array<string>;
    synonyms: Array<string>;
    source: string;
    isAdult: boolean;
    isLocked: boolean;
    meanScore: number;
    averageScore: number;
    popularity: number;
    favourites: number;
    isFavouriteBlocked: boolean;
    hashtag: string;
    countryOfOrigin: string;
    isLicensed: boolean;
    isFavourite: boolean;
    isRecommendationBlocked: boolean;
    isReviewBlocked: boolean;
    nextAiringEpisode: {
      airingAt: number;
      timeUntilAiring: number;
      episode: number;
    };
    relations: {
      edges: Array<{
        id: number;
        relationType: string;
        node: {
          id: number;
          title: {
            userPreferred: string;
          };
          format: string;
          type: string;
          status: string;
          bannerImage?: string;
          coverImage: {
            large: string;
          };
        };
      }>;
    };
    characterPreview: {
      edges: Array<{
        id: number;
        role: string;
        name: any;
        voiceActors: Array<{
          id: number;
          name: {
            userPreferred: string;
          };
          language: string;
          image: {
            large: string;
          };
        }>;
        node: {
          id: number;
          name: {
            userPreferred: string;
          };
          image: {
            large: string;
          };
        };
      }>;
    };
    staffPreview: {
      edges: Array<{
        id: number;
        role: string;
        node: {
          id: number;
          name: {
            userPreferred: string;
          };
          language: string;
          image: {
            large: string;
          };
        };
      }>;
    };
    studios: {
      edges: Array<{
        isMain: boolean;
        node: {
          id: number;
          name: string;
        };
      }>;
    };
    reviewPreview: {
      pageInfo: {
        total: number;
      };
      nodes: Array<any>;
    };
    recommendations: {
      pageInfo: {
        total: number;
      };
      nodes: Array<{
        id: number;
        rating: number;
        userRating: string;
        mediaRecommendation: {
          id: number;
          title: {
            userPreferred: string;
          };
          format: string;
          type: string;
          status: string;
          bannerImage: string;
          coverImage: {
            large: string;
          };
        };
        user: {
          id: number;
          name: string;
          avatar: {
            large: string;
          };
        };
      }>;
    };
    externalLinks: Array<{
      id: number;
      site: string;
      url: string;
      type: string;
      language?: string;
      color?: string;
      icon?: string;
      notes?: string;
      isDisabled: boolean;
    }>;
    streamingEpisodes: Array<any>;
    trailer: {
      id: string;
      site: string;
    };
    rankings: Array<{
      id: number;
      rank: number;
      type: string;
      format: string;
      year?: number;
      season?: string;
      allTime: boolean;
      context: string;
    }>;
    tags: Array<{
      id: number;
      name: string;
      description: string;
      rank: number;
      isMediaSpoiler: boolean;
      isGeneralSpoiler: boolean;
      userId: number;
    }>;
    mediaListEntry: any;
    stats: {
      statusDistribution: Array<{
        status: string;
        amount: number;
      }>;
      scoreDistribution: Array<{
        score: number;
        amount: number;
      }>;
    };
  };
};

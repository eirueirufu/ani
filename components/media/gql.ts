import { graphql, useFragment, FragmentType } from "@/lib/aniList";

export const GetMedia = graphql(/* GraphQL */ `
  query GetMedia($id: Int, $type: MediaType, $isAdult: Boolean) {
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
        ...GetMediaOverviewRelations
      }
      characterPreview: characters(perPage: 6, sort: [ROLE, RELEVANCE, ID]) {
        ...GetMediaOverviewCharacters
      }
      staffPreview: staff(perPage: 8, sort: [RELEVANCE, ID]) {
        ...GetMediaOverviewStaffs
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
      recommendations(perPage: 6, sort: [RATING_DESC, ID]) {
        ...GetMediaOverviewRecommendations
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
        ...GetMediaOverviewTrailer
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
`);

export const GetMediaOverviewRelations = graphql(/* GraphQL */ `
  fragment GetMediaOverviewRelations on MediaConnection {
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
`);

export const GetMediaOverviewCharacters = graphql(/* GraphQL */ `
  fragment GetMediaOverviewCharacters on CharacterConnection {
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
`);

export const GetMediaOverviewStaffs = graphql(/* GraphQL */ `
  fragment GetMediaOverviewStaffs on StaffConnection {
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
`);

export const GetMediaOverviewTrailer = graphql(/* GraphQL */ `
  fragment GetMediaOverviewTrailer on MediaTrailer {
    id
    site
  }
`);

export const GetMediaOverviewRecommendations = graphql(/* GraphQL */ `
  fragment GetMediaOverviewRecommendations on RecommendationConnection {
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
`);

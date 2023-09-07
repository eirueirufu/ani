/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetHome(\n    $season: MediaSeason\n    $seasonYear: Int\n    $nextSeason: MediaSeason\n    $nextYear: Int\n  ) {\n    trending: Page(page: 1, perPage: 6) {\n      media(sort: TRENDING_DESC, type: ANIME, isAdult: false) {\n        ...media\n      }\n    }\n    season: Page(page: 1, perPage: 6) {\n      media(\n        season: $season\n        seasonYear: $seasonYear\n        sort: POPULARITY_DESC\n        type: ANIME\n        isAdult: false\n      ) {\n        ...media\n      }\n    }\n    nextSeason: Page(page: 1, perPage: 6) {\n      media(\n        season: $nextSeason\n        seasonYear: $nextYear\n        sort: POPULARITY_DESC\n        type: ANIME\n        isAdult: false\n      ) {\n        ...media\n      }\n    }\n    popular: Page(page: 1, perPage: 6) {\n      media(sort: POPULARITY_DESC, type: ANIME, isAdult: false) {\n        ...media\n      }\n    }\n    top: Page(page: 1, perPage: 10) {\n      media(sort: SCORE_DESC, type: ANIME, isAdult: false) {\n        ...media\n      }\n    }\n  }\n": types.GetHomeDocument,
    "\n  fragment media on Media {\n    id\n    title {\n      userPreferred\n      native\n    }\n    coverImage {\n      extraLarge\n      large\n      color\n    }\n    startDate {\n      year\n      month\n      day\n    }\n    endDate {\n      year\n      month\n      day\n    }\n    bannerImage\n    season\n    seasonYear\n    description\n    type\n    format\n    status(version: 2)\n    episodes\n    duration\n    chapters\n    volumes\n    genres\n    isAdult\n    averageScore\n    popularity\n    mediaListEntry {\n      id\n      status\n    }\n    nextAiringEpisode {\n      airingAt\n      timeUntilAiring\n      episode\n    }\n    studios(isMain: true) {\n      edges {\n        isMain\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.MediaFragmentDoc,
    "\n  query GetMedia($id: Int, $type: MediaType, $isAdult: Boolean) {\n    Media(id: $id, type: $type, isAdult: $isAdult) {\n      id\n      title {\n        userPreferred\n        romaji\n        english\n        native\n      }\n      coverImage {\n        extraLarge\n        large\n      }\n      bannerImage\n      startDate {\n        year\n        month\n        day\n      }\n      endDate {\n        year\n        month\n        day\n      }\n      description\n      season\n      seasonYear\n      type\n      format\n      status(version: 2)\n      episodes\n      duration\n      chapters\n      volumes\n      genres\n      synonyms\n      source(version: 3)\n      isAdult\n      isLocked\n      meanScore\n      averageScore\n      popularity\n      favourites\n      isFavouriteBlocked\n      hashtag\n      countryOfOrigin\n      isLicensed\n      isFavourite\n      isRecommendationBlocked\n      isFavouriteBlocked\n      isReviewBlocked\n      nextAiringEpisode {\n        airingAt\n        timeUntilAiring\n        episode\n      }\n      relations {\n        ...GetMediaOverviewRelations\n      }\n      characterPreview: characters(perPage: 6, sort: [ROLE, RELEVANCE, ID]) {\n        ...GetMediaOverviewCharacters\n      }\n      staffPreview: staff(perPage: 8, sort: [RELEVANCE, ID]) {\n        ...GetMediaOverviewStaffs\n      }\n      studios {\n        edges {\n          isMain\n          node {\n            id\n            name\n          }\n        }\n      }\n      reviewPreview: reviews(perPage: 2, sort: [RATING_DESC, ID]) {\n        pageInfo {\n          total\n        }\n        nodes {\n          id\n          summary\n          rating\n          ratingAmount\n          user {\n            id\n            name\n            avatar {\n              large\n            }\n          }\n        }\n      }\n      recommendations(perPage: 6, sort: [RATING_DESC, ID]) {\n        ...GetMediaOverviewRecommendations\n      }\n      externalLinks {\n        id\n        site\n        url\n        type\n        language\n        color\n        icon\n        notes\n        isDisabled\n      }\n      streamingEpisodes {\n        site\n        title\n        thumbnail\n        url\n      }\n      trailer {\n        ...GetMediaOverviewTrailer\n      }\n      rankings {\n        id\n        rank\n        type\n        format\n        year\n        season\n        allTime\n        context\n      }\n      tags {\n        id\n        name\n        description\n        rank\n        isMediaSpoiler\n        isGeneralSpoiler\n        userId\n      }\n      mediaListEntry {\n        id\n        status\n        score\n      }\n      stats {\n        statusDistribution {\n          status\n          amount\n        }\n        scoreDistribution {\n          score\n          amount\n        }\n      }\n    }\n  }\n": types.GetMediaDocument,
    "\n  fragment GetMediaOverviewRelations on MediaConnection {\n    edges {\n      id\n      relationType(version: 2)\n      node {\n        id\n        title {\n          userPreferred\n        }\n        format\n        type\n        status(version: 2)\n        bannerImage\n        coverImage {\n          large\n        }\n      }\n    }\n  }\n": types.GetMediaOverviewRelationsFragmentDoc,
    "\n  fragment GetMediaOverviewCharacters on CharacterConnection {\n    edges {\n      id\n      role\n      name\n      voiceActors(language: JAPANESE, sort: [RELEVANCE, ID]) {\n        id\n        name {\n          userPreferred\n        }\n        language: languageV2\n        image {\n          large\n        }\n      }\n      node {\n        id\n        name {\n          userPreferred\n        }\n        image {\n          large\n        }\n      }\n    }\n  }\n": types.GetMediaOverviewCharactersFragmentDoc,
    "\n  fragment GetMediaOverviewStaffs on StaffConnection {\n    edges {\n      id\n      role\n      node {\n        id\n        name {\n          userPreferred\n        }\n        language: languageV2\n        image {\n          large\n        }\n      }\n    }\n  }\n": types.GetMediaOverviewStaffsFragmentDoc,
    "\n  fragment GetMediaOverviewTrailer on MediaTrailer {\n    id\n    site\n  }\n": types.GetMediaOverviewTrailerFragmentDoc,
    "\n  fragment GetMediaOverviewRecommendations on RecommendationConnection {\n    pageInfo {\n      total\n    }\n    nodes {\n      id\n      rating\n      userRating\n      mediaRecommendation {\n        id\n        title {\n          userPreferred\n        }\n        format\n        type\n        status(version: 2)\n        bannerImage\n        coverImage {\n          large\n        }\n      }\n      user {\n        id\n        name\n        avatar {\n          large\n        }\n      }\n    }\n  }\n": types.GetMediaOverviewRecommendationsFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetHome(\n    $season: MediaSeason\n    $seasonYear: Int\n    $nextSeason: MediaSeason\n    $nextYear: Int\n  ) {\n    trending: Page(page: 1, perPage: 6) {\n      media(sort: TRENDING_DESC, type: ANIME, isAdult: false) {\n        ...media\n      }\n    }\n    season: Page(page: 1, perPage: 6) {\n      media(\n        season: $season\n        seasonYear: $seasonYear\n        sort: POPULARITY_DESC\n        type: ANIME\n        isAdult: false\n      ) {\n        ...media\n      }\n    }\n    nextSeason: Page(page: 1, perPage: 6) {\n      media(\n        season: $nextSeason\n        seasonYear: $nextYear\n        sort: POPULARITY_DESC\n        type: ANIME\n        isAdult: false\n      ) {\n        ...media\n      }\n    }\n    popular: Page(page: 1, perPage: 6) {\n      media(sort: POPULARITY_DESC, type: ANIME, isAdult: false) {\n        ...media\n      }\n    }\n    top: Page(page: 1, perPage: 10) {\n      media(sort: SCORE_DESC, type: ANIME, isAdult: false) {\n        ...media\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetHome(\n    $season: MediaSeason\n    $seasonYear: Int\n    $nextSeason: MediaSeason\n    $nextYear: Int\n  ) {\n    trending: Page(page: 1, perPage: 6) {\n      media(sort: TRENDING_DESC, type: ANIME, isAdult: false) {\n        ...media\n      }\n    }\n    season: Page(page: 1, perPage: 6) {\n      media(\n        season: $season\n        seasonYear: $seasonYear\n        sort: POPULARITY_DESC\n        type: ANIME\n        isAdult: false\n      ) {\n        ...media\n      }\n    }\n    nextSeason: Page(page: 1, perPage: 6) {\n      media(\n        season: $nextSeason\n        seasonYear: $nextYear\n        sort: POPULARITY_DESC\n        type: ANIME\n        isAdult: false\n      ) {\n        ...media\n      }\n    }\n    popular: Page(page: 1, perPage: 6) {\n      media(sort: POPULARITY_DESC, type: ANIME, isAdult: false) {\n        ...media\n      }\n    }\n    top: Page(page: 1, perPage: 10) {\n      media(sort: SCORE_DESC, type: ANIME, isAdult: false) {\n        ...media\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment media on Media {\n    id\n    title {\n      userPreferred\n      native\n    }\n    coverImage {\n      extraLarge\n      large\n      color\n    }\n    startDate {\n      year\n      month\n      day\n    }\n    endDate {\n      year\n      month\n      day\n    }\n    bannerImage\n    season\n    seasonYear\n    description\n    type\n    format\n    status(version: 2)\n    episodes\n    duration\n    chapters\n    volumes\n    genres\n    isAdult\n    averageScore\n    popularity\n    mediaListEntry {\n      id\n      status\n    }\n    nextAiringEpisode {\n      airingAt\n      timeUntilAiring\n      episode\n    }\n    studios(isMain: true) {\n      edges {\n        isMain\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment media on Media {\n    id\n    title {\n      userPreferred\n      native\n    }\n    coverImage {\n      extraLarge\n      large\n      color\n    }\n    startDate {\n      year\n      month\n      day\n    }\n    endDate {\n      year\n      month\n      day\n    }\n    bannerImage\n    season\n    seasonYear\n    description\n    type\n    format\n    status(version: 2)\n    episodes\n    duration\n    chapters\n    volumes\n    genres\n    isAdult\n    averageScore\n    popularity\n    mediaListEntry {\n      id\n      status\n    }\n    nextAiringEpisode {\n      airingAt\n      timeUntilAiring\n      episode\n    }\n    studios(isMain: true) {\n      edges {\n        isMain\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMedia($id: Int, $type: MediaType, $isAdult: Boolean) {\n    Media(id: $id, type: $type, isAdult: $isAdult) {\n      id\n      title {\n        userPreferred\n        romaji\n        english\n        native\n      }\n      coverImage {\n        extraLarge\n        large\n      }\n      bannerImage\n      startDate {\n        year\n        month\n        day\n      }\n      endDate {\n        year\n        month\n        day\n      }\n      description\n      season\n      seasonYear\n      type\n      format\n      status(version: 2)\n      episodes\n      duration\n      chapters\n      volumes\n      genres\n      synonyms\n      source(version: 3)\n      isAdult\n      isLocked\n      meanScore\n      averageScore\n      popularity\n      favourites\n      isFavouriteBlocked\n      hashtag\n      countryOfOrigin\n      isLicensed\n      isFavourite\n      isRecommendationBlocked\n      isFavouriteBlocked\n      isReviewBlocked\n      nextAiringEpisode {\n        airingAt\n        timeUntilAiring\n        episode\n      }\n      relations {\n        ...GetMediaOverviewRelations\n      }\n      characterPreview: characters(perPage: 6, sort: [ROLE, RELEVANCE, ID]) {\n        ...GetMediaOverviewCharacters\n      }\n      staffPreview: staff(perPage: 8, sort: [RELEVANCE, ID]) {\n        ...GetMediaOverviewStaffs\n      }\n      studios {\n        edges {\n          isMain\n          node {\n            id\n            name\n          }\n        }\n      }\n      reviewPreview: reviews(perPage: 2, sort: [RATING_DESC, ID]) {\n        pageInfo {\n          total\n        }\n        nodes {\n          id\n          summary\n          rating\n          ratingAmount\n          user {\n            id\n            name\n            avatar {\n              large\n            }\n          }\n        }\n      }\n      recommendations(perPage: 6, sort: [RATING_DESC, ID]) {\n        ...GetMediaOverviewRecommendations\n      }\n      externalLinks {\n        id\n        site\n        url\n        type\n        language\n        color\n        icon\n        notes\n        isDisabled\n      }\n      streamingEpisodes {\n        site\n        title\n        thumbnail\n        url\n      }\n      trailer {\n        ...GetMediaOverviewTrailer\n      }\n      rankings {\n        id\n        rank\n        type\n        format\n        year\n        season\n        allTime\n        context\n      }\n      tags {\n        id\n        name\n        description\n        rank\n        isMediaSpoiler\n        isGeneralSpoiler\n        userId\n      }\n      mediaListEntry {\n        id\n        status\n        score\n      }\n      stats {\n        statusDistribution {\n          status\n          amount\n        }\n        scoreDistribution {\n          score\n          amount\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMedia($id: Int, $type: MediaType, $isAdult: Boolean) {\n    Media(id: $id, type: $type, isAdult: $isAdult) {\n      id\n      title {\n        userPreferred\n        romaji\n        english\n        native\n      }\n      coverImage {\n        extraLarge\n        large\n      }\n      bannerImage\n      startDate {\n        year\n        month\n        day\n      }\n      endDate {\n        year\n        month\n        day\n      }\n      description\n      season\n      seasonYear\n      type\n      format\n      status(version: 2)\n      episodes\n      duration\n      chapters\n      volumes\n      genres\n      synonyms\n      source(version: 3)\n      isAdult\n      isLocked\n      meanScore\n      averageScore\n      popularity\n      favourites\n      isFavouriteBlocked\n      hashtag\n      countryOfOrigin\n      isLicensed\n      isFavourite\n      isRecommendationBlocked\n      isFavouriteBlocked\n      isReviewBlocked\n      nextAiringEpisode {\n        airingAt\n        timeUntilAiring\n        episode\n      }\n      relations {\n        ...GetMediaOverviewRelations\n      }\n      characterPreview: characters(perPage: 6, sort: [ROLE, RELEVANCE, ID]) {\n        ...GetMediaOverviewCharacters\n      }\n      staffPreview: staff(perPage: 8, sort: [RELEVANCE, ID]) {\n        ...GetMediaOverviewStaffs\n      }\n      studios {\n        edges {\n          isMain\n          node {\n            id\n            name\n          }\n        }\n      }\n      reviewPreview: reviews(perPage: 2, sort: [RATING_DESC, ID]) {\n        pageInfo {\n          total\n        }\n        nodes {\n          id\n          summary\n          rating\n          ratingAmount\n          user {\n            id\n            name\n            avatar {\n              large\n            }\n          }\n        }\n      }\n      recommendations(perPage: 6, sort: [RATING_DESC, ID]) {\n        ...GetMediaOverviewRecommendations\n      }\n      externalLinks {\n        id\n        site\n        url\n        type\n        language\n        color\n        icon\n        notes\n        isDisabled\n      }\n      streamingEpisodes {\n        site\n        title\n        thumbnail\n        url\n      }\n      trailer {\n        ...GetMediaOverviewTrailer\n      }\n      rankings {\n        id\n        rank\n        type\n        format\n        year\n        season\n        allTime\n        context\n      }\n      tags {\n        id\n        name\n        description\n        rank\n        isMediaSpoiler\n        isGeneralSpoiler\n        userId\n      }\n      mediaListEntry {\n        id\n        status\n        score\n      }\n      stats {\n        statusDistribution {\n          status\n          amount\n        }\n        scoreDistribution {\n          score\n          amount\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment GetMediaOverviewRelations on MediaConnection {\n    edges {\n      id\n      relationType(version: 2)\n      node {\n        id\n        title {\n          userPreferred\n        }\n        format\n        type\n        status(version: 2)\n        bannerImage\n        coverImage {\n          large\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment GetMediaOverviewRelations on MediaConnection {\n    edges {\n      id\n      relationType(version: 2)\n      node {\n        id\n        title {\n          userPreferred\n        }\n        format\n        type\n        status(version: 2)\n        bannerImage\n        coverImage {\n          large\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment GetMediaOverviewCharacters on CharacterConnection {\n    edges {\n      id\n      role\n      name\n      voiceActors(language: JAPANESE, sort: [RELEVANCE, ID]) {\n        id\n        name {\n          userPreferred\n        }\n        language: languageV2\n        image {\n          large\n        }\n      }\n      node {\n        id\n        name {\n          userPreferred\n        }\n        image {\n          large\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment GetMediaOverviewCharacters on CharacterConnection {\n    edges {\n      id\n      role\n      name\n      voiceActors(language: JAPANESE, sort: [RELEVANCE, ID]) {\n        id\n        name {\n          userPreferred\n        }\n        language: languageV2\n        image {\n          large\n        }\n      }\n      node {\n        id\n        name {\n          userPreferred\n        }\n        image {\n          large\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment GetMediaOverviewStaffs on StaffConnection {\n    edges {\n      id\n      role\n      node {\n        id\n        name {\n          userPreferred\n        }\n        language: languageV2\n        image {\n          large\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment GetMediaOverviewStaffs on StaffConnection {\n    edges {\n      id\n      role\n      node {\n        id\n        name {\n          userPreferred\n        }\n        language: languageV2\n        image {\n          large\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment GetMediaOverviewTrailer on MediaTrailer {\n    id\n    site\n  }\n"): (typeof documents)["\n  fragment GetMediaOverviewTrailer on MediaTrailer {\n    id\n    site\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment GetMediaOverviewRecommendations on RecommendationConnection {\n    pageInfo {\n      total\n    }\n    nodes {\n      id\n      rating\n      userRating\n      mediaRecommendation {\n        id\n        title {\n          userPreferred\n        }\n        format\n        type\n        status(version: 2)\n        bannerImage\n        coverImage {\n          large\n        }\n      }\n      user {\n        id\n        name\n        avatar {\n          large\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment GetMediaOverviewRecommendations on RecommendationConnection {\n    pageInfo {\n      total\n    }\n    nodes {\n      id\n      rating\n      userRating\n      mediaRecommendation {\n        id\n        title {\n          userPreferred\n        }\n        format\n        type\n        status(version: 2)\n        bannerImage\n        coverImage {\n          large\n        }\n      }\n      user {\n        id\n        name\n        avatar {\n          large\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
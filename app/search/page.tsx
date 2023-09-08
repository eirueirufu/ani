"use client";

import { Input, Select, SelectItem, SelectSection } from "@nextui-org/react";
import { graphql } from "@/lib/aniList";
import { useState } from "react";
import { MediaFormat, MediaSeason, MediaStatus } from "@/lib/aniList/graphql";

const GetSearch = graphql(`
  query GetSearch(
    $page: Int = 1
    $id: Int
    $type: MediaType
    $isAdult: Boolean = false
    $search: String
    $format: [MediaFormat]
    $status: MediaStatus
    $countryOfOrigin: CountryCode
    $source: MediaSource
    $season: MediaSeason
    $seasonYear: Int
    $year: String
    $onList: Boolean
    $yearLesser: FuzzyDateInt
    $yearGreater: FuzzyDateInt
    $episodeLesser: Int
    $episodeGreater: Int
    $durationLesser: Int
    $durationGreater: Int
    $chapterLesser: Int
    $chapterGreater: Int
    $volumeLesser: Int
    $volumeGreater: Int
    $licensedBy: [Int]
    $isLicensed: Boolean
    $genres: [String]
    $excludedGenres: [String]
    $tags: [String]
    $excludedTags: [String]
    $minimumTagRank: Int
    $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]
  ) {
    Page(page: $page, perPage: 20) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(
        id: $id
        type: $type
        season: $season
        format_in: $format
        status: $status
        countryOfOrigin: $countryOfOrigin
        source: $source
        search: $search
        onList: $onList
        seasonYear: $seasonYear
        startDate_like: $year
        startDate_lesser: $yearLesser
        startDate_greater: $yearGreater
        episodes_lesser: $episodeLesser
        episodes_greater: $episodeGreater
        duration_lesser: $durationLesser
        duration_greater: $durationGreater
        chapters_lesser: $chapterLesser
        chapters_greater: $chapterGreater
        volumes_lesser: $volumeLesser
        volumes_greater: $volumeGreater
        licensedById_in: $licensedBy
        isLicensed: $isLicensed
        genre_in: $genres
        genre_not_in: $excludedGenres
        tag_in: $tags
        tag_not_in: $excludedTags
        minimumTagRank: $minimumTagRank
        sort: $sort
        isAdult: $isAdult
      ) {
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
        nextAiringEpisode {
          airingAt
          timeUntilAiring
          episode
        }
        mediaListEntry {
          id
          status
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
    }
  }
`);

export default function Page() {
  return (
    <>
      <div className='w-full my-6 grid grid-cols-3 md:grid-cols-6 gap-3'>
        <Input label='Search' size='sm' />
        <Select
          label='Genres'
          size='sm'
          isMultiline={true}
          selectionMode='multiple'
          className='max-w-xs'
          placeholder='Select Genres'
        >
          <SelectSection showDivider title='genres'>
            {genres.map((item) => {
              return <SelectItem key={item}>{item}</SelectItem>;
            })}
          </SelectSection>
          <SelectSection title='tags'>
            {Object.keys(tags).map((item) => {
              return <SelectItem key={item}>{item}</SelectItem>;
            })}
          </SelectSection>
        </Select>
        <Select
          label='Year'
          placeholder='Select A Year'
          size='sm'
          isMultiline={true}
          className='max-w-xs'
        >
          {years.map((item) => {
            return <SelectItem key={item}>{item}</SelectItem>;
          })}
        </Select>
        <Select
          label='Season'
          placeholder='Select A Season'
          size='sm'
          className='max-w-xs'
        >
          {Object.values(MediaSeason).map((item) => {
            return (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            );
          })}
        </Select>
        <Select
          label='Format'
          placeholder='Select A Format'
          size='sm'
          className='max-w-xs'
        >
          {Object.values(MediaFormat).map((item) => {
            return (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            );
          })}
        </Select>
        <Select
          label='Airing Status'
          placeholder='Select A Status'
          size='sm'
          className='max-w-xs'
        >
          {Object.values(MediaStatus).map((item) => {
            return (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            );
          })}
        </Select>
      </div>
    </>
  );
}

const genres = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Ecchi",
  "Fantasy",
  "Horror",
  "Mahou",
  "Shoujo",
  "Mecha",
  "Music",
  "Mystery",
  "Psychological",
  "Romance",
  "Sci-Fi",
  "Slice",
  "of",
  "Life",
  "Sports",
  "Supernatural",
  "Thriller",
];

const tags = new Set([
  "4-koma",
  "Achromatic",
  "Achronological",
  "Order",
  "Acting",
  "Adoption",
  "Advertisement",
  "Afterlife",
  "Age",
  "Gap",
  "Regression",
  "Agender",
  "Agriculture",
  "Airsoft",
  "Alchemy",
  "Aliens",
  "Alternate",
  "Universe",
  "American",
  "Football",
  "Amnesia",
  "Anachronism",
  "Angels",
  "Animals",
  "Anthology",
  "Anthropomorphism",
  "Anti-Hero",
  "Archery",
  "Artificial",
  "Intelligence",
  "Asexual",
  "Assassins",
  "Astronomy",
  "Athletics",
  "Augmented",
  "Reality",
  "Autobiographical",
  "Aviation",
  "Badminton",
  "Band",
  "Bar",
  "Baseball",
  "Basketball",
  "Battle",
  "Royale",
  "Biographical",
  "Bisexual",
  "Body",
  "Horror",
  "Body",
  "Swapping",
  "Boxing",
  "Boys'",
  "Love",
  "Bullying",
  "Butler",
  "Calligraphy",
  "Cannibalism",
  "Card",
  "Battle",
  "Cars",
  "Centaur",
  "CGI",
  "Cheerleading",
  "Chibi",
  "Chimera",
  "Chuunibyou",
  "Circus",
  "Classic",
  "Literature",
  "Clone",
  "College",
  "Coming",
  "of",
  "Conspiracy",
  "Cosmic",
  "Horror",
  "Cosplay",
  "Crime",
  "Crossdressing",
  "Crossover",
  "Cult",
  "Cultivation",
  "Cute",
  "Boys",
  "Doing",
  "Cute",
  "Things",
  "Cute",
  "Girls",
  "Doing",
  "Cute",
  "Things",
  "Cyberpunk",
  "Cyborg",
  "Cycling",
  "Dancing",
  "Death",
  "Game",
  "Delinquents",
  "Demons",
  "Denpa",
  "Desert",
  "Detective",
  "Dinosaurs",
  "Disability",
  "Dissociative",
  "Identities",
  "Dragons",
  "Drawing",
  "Drugs",
  "Dullahan",
  "Dungeon",
  "Dystopian",
  "E-Sports",
  "Economics",
  "Educational",
  "Elf",
  "Ensemble",
  "Cast",
  "Environmental",
  "Episodic",
  "Ero",
  "Guro",
  "Espionage",
  "Fairy",
  "Fairy",
  "Tale",
  "Family",
  "Life",
  "Fashion",
  "Female",
  "Harem",
  "Female",
  "Protagonist",
  "Femboy",
  "Fencing",
  "Firefighters",
  "Fishing",
  "Fitness",
  "Flash",
  "Food",
  "Football",
  "Foreign",
  "Found",
  "Family",
  "Fugitive",
  "Full",
  "CGI",
  "Full",
  "Color",
  "Gambling",
  "Gangs",
  "Gender",
  "Bending",
  "Ghost",
  "Go",
  "Goblin",
  "Gods",
  "Golf",
  "Gore",
  "Guns",
  "Gyaru",
  "Handball",
  "Henshin",
  "Heterosexual",
  "Hikikomori",
  "Historical",
  "Homeless",
  "Ice",
  "Skating",
  "Idol",
  "Isekai",
  "Iyashikei",
  "Josei",
  "Judo",
  "Kaiju",
  "Karuta",
  "Kemonomimi",
  "Kids",
  "Kuudere",
  "Lacrosse",
  "Language",
  "Barrier",
  "LGBTQ+",
  "Themes",
  "Lost",
  "Civilization",
  "Love",
  "Triangle",
  "Mafia",
  "Magic",
  "Mahjong",
  "Maids",
  "Makeup",
  "Male",
  "Harem",
  "Male",
  "Protagonist",
  "Marriage",
  "Martial",
  "Arts",
  "Medicine",
  "Memory",
  "Manipulation",
  "Mermaid",
  "Meta",
  "Military",
  "Mixed",
  "Gender",
  "Harem",
  "Monster",
  "Boy",
  "Monster",
  "Girl",
  "Mopeds",
  "Motorcycles",
  "Musical",
  "Mythology",
  "Necromancy",
  "Nekomimi",
  "Ninja",
  "No",
  "Dialogue",
  "Noir",
  "Non-fiction",
  "Nudity",
  "Nun",
  "Office",
  "Lady",
  "Oiran",
  "Ojou-sama",
  "Orphan",
  "Otaku",
  "Culture",
  "Outdoor",
  "Pandemic",
  "Parkour",
  "Parody",
  "Philosophy",
  "Photography",
  "Pirates",
  "Poker",
  "Police",
  "Politics",
  "Post-Apocalyptic",
  "POV",
  "Primarily",
  "Adult",
  "Cast",
  "Primarily",
  "Child",
  "Cast",
  "Primarily",
  "Female",
  "Cast",
  "Primarily",
  "Male",
  "Cast",
  "Primarily",
  "Teen",
  "Cast",
  "Prison",
  "Puppetry",
  "Rakugo",
  "Real",
  "Robot",
  "Rehabilitation",
  "Reincarnation",
  "Religion",
  "Revenge",
  "Robots",
  "Rotoscoping",
  "Rugby",
  "Rural",
  "Samurai",
  "Satire",
  "School",
  "School",
  "Club",
  "Scuba",
  "Diving",
  "Seinen",
  "Shapeshifting",
  "Ships",
  "Shogi",
  "Shoujo",
  "Shounen",
  "Shrine",
  "Maiden",
  "Skateboarding",
  "Skeleton",
  "Slapstick",
  "Slavery",
  "Software",
  "Development",
  "Space",
  "Space",
  "Opera",
  "Spearplay",
  "Steampunk",
  "Stop",
  "Motion",
  "Succubus",
  "Suicide",
  "Sumo",
  "Super",
  "Power",
  "Super",
  "Robot",
  "Superhero",
  "Surfing",
  "Surreal",
  "Comedy",
  "Survival",
  "Swimming",
  "Swordplay",
  "Table",
  "Tennis",
  "Tanks",
  "Tanned",
  "Skin",
  "Teacher",
  "Teens'",
  "Love",
  "Tennis",
  "Terrorism",
  "Time",
  "Skip",
  "Tokusatsu",
  "Tomboy",
  "Torture",
  "Tragedy",
  "Trains",
  "Transgender",
  "Travel",
  "Triads",
  "Tsundere",
  "Twins",
  "Urban",
  "Fantasy",
  "Vampire",
  "Video",
  "Games",
  "Vikings",
  "Villainess",
  "Virtual",
  "World",
  "Volleyball",
  "VTuber",
  "War",
  "Werewolf",
  "Witch",
  "Work",
  "Wrestling",
  "Writing",
  "Wuxia",
  "Yakuza",
  "Yandere",
  "Youkai",
  "Yuri",
  "Zombie",
]);

const years = (function () {
  const now = new Date();
  const years: string[] = [];
  for (let year = now.getFullYear(); year >= 1940; year--) {
    years.push(year.toString());
  }
  return years;
})();

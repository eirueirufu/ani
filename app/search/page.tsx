"use client";

import {
  Card,
  CardBody,
  Chip,
  Input,
  Pagination,
  Select,
  SelectItem,
  SelectSection,
  Selection,
} from "@nextui-org/react";
import { graphql } from "@/lib/aniList";
import { useEffect, useRef, useState } from "react";
import {
  InputMaybe,
  MediaFormat,
  MediaSeason,
  MediaStatus,
} from "@/lib/aniList/graphql";
import { useQuery } from "@apollo/client";
import Loading from "@/components/loading";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [searchGenres, setSearchGenres] = useState<Selection>(new Set([]));
  const [searchYear, setSearchYear] = useState<Selection>(new Set([]));
  const [searchSeason, setSearchSeason] = useState<Selection>(new Set([]));
  const [searchFotmat, setSearchFormat] = useState<Selection>(new Set([]));
  const [searchStatus, setSearchStatus] = useState<Selection>(new Set([]));

  const timeout = useRef<NodeJS.Timeout | undefined>();
  useEffect(() => {
    if (!!timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      setSearch(text);
    }, 500);
  }, [text]);

  const { loading, error, data } = useQuery(GetSearch, {
    variables: {
      page: page,
      search: search.length > 0 ? search : undefined,
      genres: conv(searchGenres),
      year: convOne(searchYear),
      season: convOne(searchSeason) as InputMaybe<MediaSeason>,
      format: conv(searchFotmat) as InputMaybe<Array<InputMaybe<MediaFormat>>>,
      status: convOne(searchStatus) as InputMaybe<MediaStatus>,
    },
  });
  if (error) {
    throw error;
  }
  return (
    <>
      <div className='w-full my-6 grid grid-cols-3 md:grid-cols-6 gap-3'>
        <Input label='Search' size='sm' value={text} onValueChange={setText} />
        <Select
          label='Genres'
          size='sm'
          isMultiline={true}
          selectionMode='multiple'
          className='max-w-xs'
          placeholder='Select'
          selectedKeys={searchGenres}
          onSelectionChange={setSearchGenres}
        >
          <SelectSection showDivider title='genres'>
            {genres.map((item) => {
              return <SelectItem key={item}>{item}</SelectItem>;
            })}
          </SelectSection>
          <SelectSection title='tags'>
            {tags.map((item) => {
              return <SelectItem key={item}>{item}</SelectItem>;
            })}
          </SelectSection>
        </Select>
        <Select
          label='Year'
          placeholder='Select'
          size='sm'
          isMultiline={true}
          className='max-w-xs'
          selectedKeys={searchYear}
          onSelectionChange={setSearchYear}
        >
          {years.map((item) => {
            return <SelectItem key={item}>{item}</SelectItem>;
          })}
        </Select>
        <Select
          label='Season'
          placeholder='Select'
          size='sm'
          className='max-w-xs'
          selectedKeys={searchSeason}
          onSelectionChange={setSearchSeason}
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
          placeholder='Select'
          size='sm'
          isMultiline={true}
          selectionMode='multiple'
          className='max-w-xs'
          selectedKeys={searchFotmat}
          onSelectionChange={setSearchFormat}
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
          placeholder='Select'
          size='sm'
          className='max-w-xs'
          selectedKeys={searchStatus}
          onSelectionChange={setSearchStatus}
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
      {loading && <Loading className='w-full h-96' />}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {data?.Page?.media?.map((item, index) => {
          return (
            <Card
              key={index}
              radius='none'
              isPressable
              isHoverable
              onClick={() => {
                router.push(
                  `/media/${item?.id}?type=${item?.type}&isAdult=${
                    item?.isAdult ?? false
                  }`
                );
              }}
            >
              <CardBody className='p-0 flex flex-row h-[192px]'>
                <div className='relative w-[128px] h-full shrink-0'>
                  <Image
                    alt={item?.title?.userPreferred ?? ""}
                    src={item?.coverImage?.large ?? ""}
                    height={192}
                    width={128}
                    className='object-cover h-full'
                  ></Image>
                  <p className='absolute w-full bottom-0 bg-slate-200/75 dark:bg-slate-800/75'>
                    {item?.title?.userPreferred}
                  </p>
                </div>
                <div className='flex flex-col flex-1 overflow-auto'>
                  <div className='p-3 overflow-y-scroll flex-1'>
                    <h1>{item?.seasonYear}</h1>
                    <h2>{`${item?.format}·${item?.episodes} episode·${item?.duration} mins`}</h2>
                    <p
                      className='text-xs mt-3'
                      dangerouslySetInnerHTML={{
                        __html: item?.description ?? "",
                      }}
                    />
                  </div>
                  <div className='flex p-3 gap-2 overflow-x-auto'>
                    {item?.genres?.map((genre, index) => {
                      return (
                        <Chip
                          key={index}
                          style={{
                            backgroundColor: `${item?.coverImage?.color}`,
                          }}
                          size='sm'
                          className='flex-shrink-0'
                        >
                          <p className='text-xs dark:mix-blend-difference'>
                            {genre}
                          </p>
                        </Chip>
                      );
                    })}
                  </div>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
      <Pagination
        isCompact
        showControls
        total={data?.Page?.pageInfo?.lastPage ?? 1}
        initialPage={1}
        page={page}
        onChange={setPage}
        className='flex justify-center m-3'
      />
    </>
  );
}

function conv(selection: Selection) {
  if (selection === "all") {
    return undefined;
  }
  const arr = Array.from(selection);
  if (arr.length === 0) {
    return undefined;
  }
  return arr.map((item) => {
    if (typeof item !== "string") {
      return "";
    }
    return item;
  });
}

function convOne(selection: Selection) {
  if (selection === "all") {
    return undefined;
  }
  const list = Array.from(selection);
  if (list.length === 0) {
    return undefined;
  }
  const item = list[0];
  if (typeof item !== "string") {
    return undefined;
  }
  return item;
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

const tags = Array.from(
  new Set([
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
  ])
);

const years = (function () {
  const now = new Date();
  const years: string[] = [];
  for (let year = now.getFullYear(); year >= 1940; year--) {
    years.push(year.toString());
  }
  return years;
})();

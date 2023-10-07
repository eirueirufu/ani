import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MediaSeason } from "@/lib/aniList/graphql";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface MediaDate {
  Season: MediaSeason;
  SeasonYear: number;
  NextSeason: MediaSeason;
  NextYear: number;
}

export function getMediaDate(): MediaDate {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const season = getSeason(month);
  const nextSeason = getSeason(month + 3);
  let nextYear = year;
  if (nextSeason == MediaSeason.Winter) {
    nextYear = year + 1;
  }
  return {
    Season: season,
    SeasonYear: year,
    NextSeason: nextSeason,
    NextYear: nextYear,
  };
}

export function getSeason(month: number) {
  month = month % 12;
  let season: MediaSeason = MediaSeason.Winter;
  if (month >= 1 && month <= 3) {
    season = MediaSeason.Spring;
  } else if (month >= 4 && month <= 6) {
    season = MediaSeason.Summer;
  } else if (month >= 7 && month <= 9) {
    season = MediaSeason.Fall;
  }
  return season;
}

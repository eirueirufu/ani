import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MediaSeason } from "@/lib/aniList/graphql";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDate(): [MediaSeason, number, MediaSeason, number] {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const season = getSeason(month);
  const nextSeason = getSeason(month + 3);
  let nextYear = year;
  if (nextSeason == MediaSeason.Winter) {
    nextYear = year + 1;
  }
  return [season, year, nextSeason, nextYear];
}

export function getSeason(month: number) {
  month = month % 13;
  let season = MediaSeason.Winter;
  if (month <= 6) {
    season = MediaSeason.Spring;
  } else if (month <= 9) {
    season = MediaSeason.Summer;
  } else if (month <= 12) {
    season = MediaSeason.Fall;
  }
  return season;
}

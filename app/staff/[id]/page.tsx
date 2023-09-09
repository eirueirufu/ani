"use client";

import { graphql } from "@/lib/aniList";
import { useQuery } from "@apollo/client";
import { Image } from "@nextui-org/react";

const GetStaff = graphql(`
  query GetStaff(
    $id: Int
    $sort: [MediaSort]
    $characterPage: Int
    $staffPage: Int
    $onList: Boolean
    $type: MediaType
    $withCharacterRoles: Boolean = false
    $withStaffRoles: Boolean = false
  ) {
    Staff(id: $id) {
      id
      name {
        first
        middle
        last
        full
        native
        userPreferred
        alternative
      }
      image {
        large
      }
      description(asHtml: true)
      favourites
      isFavourite
      isFavouriteBlocked
      age
      gender
      yearsActive
      homeTown
      bloodType
      primaryOccupations
      dateOfBirth {
        year
        month
        day
      }
      dateOfDeath {
        year
        month
        day
      }
      language: languageV2
      characterMedia(page: $characterPage, sort: $sort, onList: $onList)
        @include(if: $withCharacterRoles) {
        pageInfo {
          total
          perPage
          currentPage
          lastPage
          hasNextPage
        }
        edges {
          characterRole
          characterName
          node {
            id
            type
            bannerImage
            isAdult
            title {
              userPreferred
            }
            coverImage {
              large
            }
            startDate {
              year
            }
            mediaListEntry {
              id
              status
            }
          }
          characters {
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
      staffMedia(page: $staffPage, type: $type, sort: $sort, onList: $onList)
        @include(if: $withStaffRoles) {
        pageInfo {
          total
          perPage
          currentPage
          lastPage
          hasNextPage
        }
        edges {
          staffRole
          node {
            id
            type
            isAdult
            title {
              userPreferred
            }
            coverImage {
              large
            }
            mediaListEntry {
              id
              status
            }
          }
        }
      }
    }
  }
`);

export default function Page({ params }: { params: { id: number } }) {
  const { loading, error, data } = useQuery(GetStaff, {
    variables: {
      id: params.id,
    },
  });
  if (loading) {
    return;
  }
  if (error) {
    throw error;
  }

  return (
    <div className='flex flex-col p-5 w-full'>
      <div className='flex flex-col md:flex-row gap-5 w-full max-w-5xl self-center'>
        <div className='shrink-0 self-center md:self-auto'>
          <Image
            alt={data?.Staff?.name?.full ?? ""}
            src={data?.Staff?.image?.large ?? ""}
            width={196}
            height={256}
          />
        </div>
        <div className='flex flex-col gap-5 flex-1'>
          <div>
            <h1 className='text-2xl font-bold'>{data?.Staff?.name?.full}</h1>
            <h2 className='text-sm'>{`${data?.Staff?.name?.native},${data?.Staff?.name?.last},${data?.Staff?.name?.userPreferred}`}</h2>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='text-xs'>
              <span className='font-bold'>Birth: </span>
              <span>{`${data?.Staff?.dateOfBirth?.month} ${data?.Staff?.dateOfBirth?.day},${data?.Staff?.dateOfBirth?.year}`}</span>
            </p>
            <p className='text-xs'>
              <span className='font-bold'>Gender: </span>
              <span>{`${data?.Staff?.gender}`}</span>
            </p>
            <p className='text-xs'>
              <span className='font-bold'>Years active: </span>
              <span>{`${data?.Staff?.yearsActive}`}</span>
            </p>
            <p className='text-xs'>
              <span className='font-bold'>Hometown: </span>
              <span>{`${data?.Staff?.homeTown}`}</span>
            </p>
          </div>
          <div
            className='text-xs'
            dangerouslySetInnerHTML={{
              __html: data?.Staff?.description ?? "",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

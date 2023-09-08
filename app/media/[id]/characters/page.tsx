"use client";

import { graphql } from "@/lib/aniList";
import { useQuery } from "@apollo/client";
import { Card, CardBody, Image } from "@nextui-org/react";

const GetMediaCharacters = graphql(`
  query media($id: Int, $page: Int) {
    Media(id: $id) {
      id
      characters(page: $page, sort: [ROLE, RELEVANCE, ID]) {
        pageInfo {
          total
          perPage
          currentPage
          lastPage
          hasNextPage
        }
        edges {
          id
          role
          name
          voiceActorRoles(sort: [RELEVANCE, ID]) {
            roleNotes
            dubGroup
            voiceActor {
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
    }
  }
`);

export default function Page({ params }: { params: { id: number } }) {
  const { loading, error, data } = useQuery(GetMediaCharacters, {
    variables: {
      id: params.id,
      page: 1,
    },
  });
  if (loading) {
    return;
  }
  if (error) {
    throw error;
  }

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
      {data?.Media?.characters?.edges?.map((item, index) => {
        return (
          <Card
            key={index}
            radius='none'
            isPressable
            isHoverable
            onClick={() => {}}
          >
            <CardBody className='p-0 flex flex-row justify-between'>
              <div className='flex items-center justify-start shrink-0'>
                <Image
                  alt={item?.node?.name?.userPreferred ?? ""}
                  src={item?.node?.image?.large ?? ""}
                  radius='none'
                  className='object-cover'
                  height={96}
                  width={40}
                />
                <div className='flex flex-col justify-between h-full p-3 shrink-0'>
                  <p className='text-xs w-24 overflow-hidden whitespace-nowrap text-ellipsis'>
                    {item?.node?.name?.userPreferred ?? ""}
                  </p>
                  <p className='text-xs w-24 overflow-hidden whitespace-nowrap text-ellipsis'>
                    {item?.role}
                  </p>
                </div>
              </div>
              <div className='hidden md:flex items-center justify-end shrink-0'>
                {item?.voiceActorRoles?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className='flex items-center justify-end h-full'
                    >
                      <div className='flex flex-col justify-between h-full p-3'>
                        <p className='text-right text-xs w-24 overflow-hidden whitespace-nowrap text-ellipsis'>
                          {item?.voiceActor?.name?.userPreferred}
                        </p>
                        <p className='text-right text-xs w-24 overflow-hidden whitespace-nowrap text-ellipsis'>
                          {item?.voiceActor?.language}
                        </p>
                      </div>
                      <Image
                        alt={item?.voiceActor?.name?.userPreferred ?? ""}
                        src={item?.voiceActor?.image?.large ?? ""}
                        radius='none'
                        className='object-cover'
                        height={96}
                        width={40}
                      />
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}

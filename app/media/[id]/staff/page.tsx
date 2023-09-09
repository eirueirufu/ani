"use client";

import { graphql } from "@/lib/aniList";
import { useQuery } from "@apollo/client";
import { Card, CardBody, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const GetMediaStaff = graphql(`
  query GetMediaStaff($id: Int, $page: Int) {
    Media(id: $id) {
      id
      staff(page: $page, sort: [RELEVANCE, ID]) {
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
  const router = useRouter();

  const { loading, error, data } = useQuery(GetMediaStaff, {
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
      {data?.Media?.staff?.edges?.map((item, index) => {
        return (
          <Card
            key={index}
            radius='none'
            isPressable
            isHoverable
            onClick={() => {
              router.push(`/staff/${item?.node?.id}`);
            }}
          >
            <CardBody className='p-0 flex flex-row justify-between'>
              <div className='flex items-center justify-start shrink-0'>
                <Image
                  alt={item?.node?.name?.userPreferred ?? ""}
                  src={item?.node?.image?.large ?? ""}
                  radius='none'
                  className='object-cover'
                  height={72}
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
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}

"use client";

import { gql, useQuery } from "@apollo/client";
import { Card, CardBody, Image } from "@nextui-org/react";

const GET_TRENDING = gql`
  query GetTrending {
    Page(page: 1, perPage: 6) {
      media(sort: TRENDING_DESC, type: ANIME, isAdult: false) {
        id
        title {
          native
        }
        coverImage {
          extraLarge
          large
          medium
          color
        }
      }
    }
  }
`;

interface trending {
  Page: {
    media: {
      id: number;
      title: { native: string };
      coverImage: { extraLarge: string };
    }[];
  };
}

export default function TrendingNow() {
  const { loading, error, data } = useQuery<trending>(GET_TRENDING);

  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    throw error;
  }

  return (
    <div className='container mx-auto max-w-6xl p-3'>
      <h1 className='font-bold text-2xl my-3'>现在流行</h1>
      <div className='flex justify-between flex-wrap'>
        {data &&
          data.Page.media.map((item, index) => {
            return (
              <Card key={index} shadow='sm' isPressable className='w-44'>
                <CardBody className='p-0'>
                  <Image
                    key={index}
                    alt={item.title.native}
                    src={item.coverImage.extraLarge}
                    className='w-44 h-52 object-cover'
                  />
                  <p className='text-small font-bold my-auto text-center p-3'>
                    {item.title.native}
                  </p>
                </CardBody>
              </Card>
            );
          })}
      </div>
    </div>
  );
}

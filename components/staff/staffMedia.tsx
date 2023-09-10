"use client";

import { useQuery } from "@apollo/client";
import { GetStaff } from "./staff";
import Loading from "../loading";
import { MediaSort } from "@/lib/aniList/graphql";
import { useState } from "react";
import { Pagination, Image, Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export function StaffMedia(props: { id: number }) {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(GetStaff, {
    variables: {
      id: props.id,
      characterPage: page,
      sort: MediaSort.StartDateDesc,
      onList: null,
      withCharacterRoles: true,
    },
  });
  if (loading) {
    return <Loading className='w-full h-16' />;
  }
  if (error) {
    throw error;
  }

  return (
    <div>
      <div className='grid grid-cols-3 md:grid-cols-6 gap-3 p-3 max-w-6xl'>
        {data?.Staff?.characterMedia?.edges?.map((item, index) => {
          return (
            <Card
              key={index}
              isHoverable
              isPressable
              onClick={() => {
                router.push(
                  `/media/${item?.node?.id}?type=${item?.node?.type}&isAdult=${item?.node?.isAdult}`
                );
              }}
            >
              <CardBody className='p-0'>
                <div className='flex flex-row gap-1 items-center justify-center relative'>
                  {item?.characters?.map((item, index) => {
                    return (
                      <Image
                        key={index}
                        alt={item?.name?.userPreferred ?? ""}
                        src={item?.image?.large ?? ""}
                        width={196}
                        height={256}
                        className='object-cover'
                      />
                    );
                  })}
                  <div className='absolute left-0 bottom-0'>
                    <Image
                      key={index}
                      alt={item?.node?.title?.userPreferred ?? ""}
                      src={item?.node?.coverImage?.large ?? ""}
                      width={72}
                      height={108}
                      className='border'
                    />
                  </div>
                </div>

                <div className='overflow-hidden p-2'>
                  <p>
                    {item?.characters?.map((character, index) => {
                      return (
                        <span key={index} className='text-sm font-bold'>
                          {character?.name?.userPreferred}
                          {index < (item.characters?.length ?? 0) - 1 && ", "}
                        </span>
                      );
                    })}
                    <span className='text-xs ml-1'>
                      {item?.characterRole === "MAIN" && item?.characterRole}
                    </span>
                  </p>
                  <p className='text-xs'>{item?.node?.title?.userPreferred}</p>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
      <Pagination
        isCompact
        showControls
        total={data?.Staff?.characterMedia?.pageInfo?.lastPage ?? 1}
        initialPage={1}
        page={page}
        onChange={setPage}
        className='flex justify-center m-3'
      />
    </div>
  );
}

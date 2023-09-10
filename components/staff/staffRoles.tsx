"use client";

import { useQuery } from "@apollo/client";
import { GetStaff } from "./staff";
import Loading from "../loading";
import { MediaSort } from "@/lib/aniList/graphql";
import { useState } from "react";
import { Pagination, Image, Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export function StaffRoles(props: { id: number }) {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(GetStaff, {
    variables: {
      id: props.id,
      staffPage: page,
      sort: MediaSort.StartDateDesc,
      onList: null,
      withStaffRoles: true,
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
        {data?.Staff?.staffMedia?.edges?.map((item, index) => {
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
                <Image
                  alt={item?.node?.title?.userPreferred ?? ""}
                  src={item?.node?.coverImage?.large ?? ""}
                  width={196}
                  height={256}
                  className='object-cover'
                />

                <div className='p-2'>
                  <p className='text-sm'>{item?.node?.title?.userPreferred}</p>
                  <p className='text-xs'>{item?.staffRole}</p>
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

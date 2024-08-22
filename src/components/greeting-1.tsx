"use client";
import { clientApi } from "@/app/_trpc/client-api";
import { FC } from "react";

const Greeting1: FC = () => {
  const greeting1 = clientApi.greeting1.useQuery();
  return (
    <div className="bg-red-100 p-5 border-2 border-red-500">
      <div className="text-red-500 font-bold">Client Component</div>
      <div>{JSON.stringify(greeting1.data)}</div>
    </div>
  );
};

export default Greeting1;

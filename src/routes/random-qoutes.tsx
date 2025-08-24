import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Route = createFileRoute("/random-qoutes")({
  component: RandomQoutes,
});

type Qoute = {
  sentence: string;
  character: {
    name: string;
    slug: string;
    house: {
      name: string;
      slug: string;
    };
  };
};

function RandomQoutes() {
  const { data: qoute, isFetching, refetch } = useQuery({ queryKey: ["qoute"], queryFn: () => getQoute() });

  const getQoute = async () => {
    const result = await fetch("https://api.gameofthronesquotes.xyz/v1/random");
    return (await result.json()) as Qoute;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="flex flex-col items-center justify-center border-2 border-gray-300 p-8 rounded-md gap-4">
        {isFetching ? <p>Loading...</p> : <p>"{qoute?.sentence}"</p>}
        <button className="bg-blue-500 text-white p-4 rounded mt-10" onClick={() => refetch()}>
          Next qoute
        </button>
      </div>
    </div>
  );
}

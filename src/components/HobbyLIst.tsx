/* eslint-disable @next/next/no-async-client-component */
"use client";
import React, { useEffect, useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import api from "../../endpoints.json";
import Cookies from "js-cookie";

const HobbyList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [tempSaved, setTempSaved] = useState([]);
  const token = Cookies.get("name");
console.log({token})
  async function fetchDataHandler() {
    const rawResponse = await fetch(api.getHobbies + `?page=${1}&pageSize=6`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const json = await rawResponse.json();
    setData(json.data.hobbies);
    setTempSaved(json.data.hobbies.filter((item) => item.isSaved === true));
    console.log(json);
  }

  async function onSaveHandler(event) {
    const item = JSON.parse(event.target.value);
    const isExist = tempSaved.find((d) => d.id === item.id);
    if (!isExist) setTempSaved((prevItems) => [...prevItems, item]);
    else setTempSaved((l) => l.filter((i) => i.id !== item.id));
    // console.log(JSON.parse(event.target.value));
    const rawResponse = await fetch(api.saveHobby, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 58,
        hobbyName: item.name,
      }),
    });
    const json = await rawResponse.json();
    // console.log(json);
  }
  // console.log({ data });
  console.log({ tempSaved });
  useEffect(() => {
    fetchDataHandler();
    const token = Cookies.get("name");
    // console.log({ token });
  }, [page]);

  return (
    <div className="mt-10 flex justify-center">
      <div className="flex flex-col rounded-xl border px-8 py-9">
        <div className="mb-2 text-[32px]">Please mark your interests!</div>
        <div className="mb-4">My saved interests!</div>
        {data.map((item) => {
          return (
            <div className="flex items-center" key={item.id}>
              <input
                onChange={(e) => onSaveHandler(e)}
                checked={tempSaved.find((d) => d.id === item.id)}
                id={item.id}
                type="checkbox"
                value={JSON.stringify(item)}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <label
                htmlFor={item.id}
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {item.name}
              </label>
            </div>
          );
        })}

        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default HobbyList;

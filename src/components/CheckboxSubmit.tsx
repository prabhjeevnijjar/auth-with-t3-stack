/* eslint-disable @next/next/no-async-client-component */
"use client";
import React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { Checkbox } from "./ui/checkbox";

const CheckboxSubmit = () => {

  return (
    <div className="mt-10 flex justify-center">
      <div className="flex flex-col items-center rounded-xl border px-8 py-9">
        <div className="text-[32px]">Please mark your interests!</div>
        My saved interests!
        <div className="mt-5 flex items-center space-x-2">
          <Checkbox id="terms2" disabled />
          <label
            htmlFor="terms2"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            option 1
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms2" disabled />
          <label
            htmlFor="terms2"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            option 1
          </label>
        </div>{" "}
        <div className="flex items-center space-x-2">
          <Checkbox id="terms2" disabled />
          <label
            htmlFor="terms2"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            option 1
          </label>
        </div>{" "}
        <div className="flex items-center space-x-2">
          <Checkbox id="terms2" disabled />
          <label
            htmlFor="terms2"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            option 1
          </label>
        </div>{" "}
        <div className="flex items-center space-x-2">
          <Checkbox id="terms2" disabled />
          <label
            htmlFor="terms2"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            option 1
          </label>
        </div>{" "}
        <div className="flex items-center space-x-2">
          <Checkbox id="terms2" disabled />
          <label
            htmlFor="terms2"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            option 1
          </label>
        </div>{" "}
        <div className="flex items-center space-x-2">
          <Checkbox id="terms2" disabled />
          <label
            htmlFor="terms2"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            option 1
          </label>
        </div>
        <Pagination>
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

export default CheckboxSubmit;

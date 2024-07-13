"use client";

import React, { Fragment } from "react";
import { Drawer } from "vaul";

export const Header = () => {
  return (
    <Fragment>
      <div className="mt-2 flex flex-row justify-end gap-6">
        <ul className="flex gap-3 text-xs sm:gap-4">
          <li className="cursor-pointer">Help</li>
          <li className="cursor-pointer">Orders & Return</li>
          <li className="cursor-pointer">Hi, John</li>
        </ul>
      </div>
      <div className="py-auto relative top-0 flex items-center justify-between px-6 pt-4 sm:px-10">
        <span className="cursor-pointer text-[32px] font-bold">ECOMMERCE</span>
        <div className="z-50 hidden md:block">
          <ul className="flex gap-3 text-sm sm:gap-4 sm:text-base">
            <li className="cursor-pointer">Categories</li>
            <li className="cursor-pointer">Sale</li>
            <li className="cursor-pointer">Clearance</li>
            <li className="hidden cursor-pointer sm:block">New Stock</li>
            <li className="cursor-pointer">Trending</li>
          </ul>
        </div>
        <div className="hidden flex-row gap-8 lg:flex">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.5145 18.4587L14.8214 13.7656C16.1843 12.131 16.8646 10.0338 16.7206 7.91044C16.5767 5.78706 15.6197 3.8009 14.0486 2.36517C12.4776 0.929445 10.4135 0.154682 8.28578 0.202064C6.15804 0.249446 4.13049 1.11532 2.62492 2.61957C1.11935 4.12381 0.251676 6.15059 0.202413 8.27829C0.153151 10.406 0.926089 12.4707 2.36043 14.0431C3.79477 15.6154 5.78008 16.5742 7.90334 16.72C10.0266 16.8658 12.1243 16.1874 13.7601 14.8259L18.4533 19.5199C18.5229 19.5896 18.6057 19.6449 18.6967 19.6826C18.7878 19.7203 18.8853 19.7397 18.9839 19.7397C19.0824 19.7397 19.18 19.7203 19.2711 19.6826C19.3621 19.6449 19.4448 19.5896 19.5145 19.5199C19.5842 19.4503 19.6395 19.3675 19.6772 19.2765C19.7149 19.1854 19.7343 19.0879 19.7343 18.9893C19.7343 18.8908 19.7149 18.7932 19.6772 18.7021C19.6395 18.6111 19.5842 18.5284 19.5145 18.4587ZM1.73388 8.48932C1.73388 7.15429 2.12977 5.84925 2.87146 4.73922C3.61316 3.62919 4.66737 2.76402 5.90077 2.25313C7.13417 1.74224 8.49137 1.60857 9.80074 1.86902C11.1101 2.12947 12.3129 2.77234 13.2569 3.71635C14.2009 4.66035 14.8437 5.86309 15.1042 7.17246C15.3646 8.48183 15.231 9.83903 14.7201 11.0724C14.2092 12.3058 13.344 13.36 12.234 14.1017C11.124 14.8434 9.81891 15.2393 8.48388 15.2393C6.69428 15.2373 4.97855 14.5255 3.71311 13.2601C2.44767 11.9947 1.73587 10.2789 1.73388 8.48932Z"
              fill="#333333"
            />
          </svg>
          <svg
            width="22"
            height="20"
            viewBox="0 0 22 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18.25C9 18.5467 8.91203 18.8367 8.7472 19.0834C8.58238 19.33 8.34811 19.5223 8.07403 19.6358C7.79994 19.7494 7.49834 19.7791 7.20736 19.7212C6.91639 19.6633 6.64912 19.5204 6.43934 19.3107C6.22956 19.1009 6.0867 18.8336 6.02882 18.5426C5.97094 18.2517 6.00065 17.9501 6.11418 17.676C6.22771 17.4019 6.41997 17.1676 6.66665 17.0028C6.91332 16.838 7.20333 16.75 7.5 16.75C7.89782 16.75 8.27936 16.908 8.56066 17.1893C8.84196 17.4706 9 17.8522 9 18.25ZM17.25 16.75C16.9533 16.75 16.6633 16.838 16.4166 17.0028C16.17 17.1676 15.9777 17.4019 15.8642 17.676C15.7506 17.9501 15.7209 18.2517 15.7788 18.5426C15.8367 18.8336 15.9796 19.1009 16.1893 19.3107C16.3991 19.5204 16.6664 19.6633 16.9574 19.7212C17.2483 19.7791 17.5499 19.7494 17.824 19.6358C18.0981 19.5223 18.3324 19.33 18.4972 19.0834C18.662 18.8367 18.75 18.5467 18.75 18.25C18.75 17.8522 18.592 17.4706 18.3107 17.1893C18.0294 16.908 17.6478 16.75 17.25 16.75ZM21.7172 4.97031L19.0425 13.6619C18.9024 14.1226 18.6175 14.5259 18.2301 14.812C17.8427 15.0981 17.3734 15.2517 16.8919 15.25H7.88156C7.3931 15.2482 6.91837 15.0882 6.52848 14.7939C6.13858 14.4997 5.85449 14.087 5.71875 13.6178L2.32687 1.75H0.75C0.551088 1.75 0.360322 1.67098 0.21967 1.53033C0.0790176 1.38968 0 1.19891 0 1C0 0.801088 0.0790176 0.610322 0.21967 0.46967C0.360322 0.329018 0.551088 0.25 0.75 0.25H2.32687C2.65257 0.25108 2.96916 0.357614 3.22925 0.553654C3.48934 0.749694 3.67895 1.0247 3.76969 1.3375L4.53 4H21C21.1174 3.99996 21.2331 4.02746 21.3379 4.08029C21.4427 4.13313 21.5336 4.20982 21.6034 4.30421C21.6732 4.39859 21.7198 4.50803 21.7396 4.62372C21.7593 4.73941 21.7517 4.85812 21.7172 4.97031ZM19.9847 5.5H4.95844L7.16062 13.2062C7.20543 13.3629 7.30002 13.5007 7.43009 13.5988C7.56016 13.6969 7.71864 13.75 7.88156 13.75H16.8919C17.0524 13.7501 17.2086 13.6986 17.3377 13.6033C17.4668 13.508 17.5619 13.3737 17.6091 13.2203L19.9847 5.5Z"
              fill="#333333"
            />
          </svg>
        </div>
        <Drawer.Root direction="right">
          <Drawer.Trigger asChild className="block md:hidden">
            <button>
              <svg
                fill="#000000"
                width="30px"
                height="30px"
                viewBox="-2.5 0 19 19"
                xmlns="http://www.w3.org/2000/svg"
                className="cf-icon-svg"
              >
                <path d="M.789 4.836a1.03 1.03 0 0 1 1.03-1.029h10.363a1.03 1.03 0 1 1 0 2.059H1.818A1.03 1.03 0 0 1 .79 4.836zm12.422 4.347a1.03 1.03 0 0 1-1.03 1.029H1.819a1.03 1.03 0 0 1 0-2.059h10.364a1.03 1.03 0 0 1 1.029 1.03zm0 4.345a1.03 1.03 0 0 1-1.03 1.03H1.819a1.03 1.03 0 1 1 0-2.059h10.364a1.03 1.03 0 0 1 1.029 1.03z" />
              </svg>
            </button>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40" />
            <Drawer.Content className="fixed bottom-0 right-0 mt-24 flex h-full w-[400px] flex-col rounded-t-[10px] bg-white">
              <div className="h-full flex-1 bg-white p-4">
                <div className="mx-auto max-w-md">
                  <ul className="flex flex-col gap-3 text-sm sm:gap-6 sm:text-base">
                    <li className="cursor-pointer">Categories</li>
                    <li className="cursor-pointer">Sale</li>
                    <li className="cursor-pointer">Clearance</li>
                    <li className="hidden cursor-pointer sm:block">
                      New Stock
                    </li>
                    <li className="cursor-pointer">Trending</li>
                  </ul>
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
      <div className="mt-2 flex flex-row items-center justify-center gap-6 bg-[#F4F4F4]">
        <span className="text-xs">{"<"}</span>{" "}
        <span className="py-1 text-xs">Get 10% off on business sign up</span>{" "}
        <span className="text-xs">{">"}</span>
      </div>
    </Fragment>
  );
};

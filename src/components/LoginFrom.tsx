"use client";
import React, { Fragment } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import Link from "next/link";

const LoginFrom = () => {
  return (
    <Fragment>
      <div className="flex flex-col items-center rounded-xl border px-8 py-9">
        <div className="text-[32px]">Login</div>
        <div className="mt-2 flex flex-col items-center sm:flex-row">
          <span className="text-[24px]">Welcome back to&nbsp;</span>
          <span className="text-[24px]">ECOMMERCE</span>
        </div>
        <div className="mt-2 text-sm">The next gen business marketplace</div>
        <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>
        <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>
        <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
          <Button variant="outline" className="bg-black text-white">
            LOGIN
          </Button>
          <hr className="my-3"></hr>
          <div className="flex flex-row justify-center gap-2">
            <span className="text-xs">Don&apos;t have an Account? </span>
            <Link className="text-sm" href="/signup">
              SIGN UP
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginFrom;

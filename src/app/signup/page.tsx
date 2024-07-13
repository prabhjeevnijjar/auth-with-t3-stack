import React from "react";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="mt-10 flex justify-center">
      <div className="flex flex-col items-center rounded-xl border px-8 py-9">
        <div className="text-[32px]">Create your Account</div>

        <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" placeholder="name" />
        </div>
        <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>
        <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="pass">Password</Label>
          <Input type="text" id="pass" placeholder="Password" />
        </div>
        <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
          <Button variant="outline" className="bg-black text-white">
            CREATE ACCOUNT
          </Button>
          <hr className="my-3"></hr>
          <div className="flex flex-row justify-center items-center gap-2">
            <span className="text-xs">Have an Account? </span>
            <Link className="text-sm" href="/signup">
              LOGIN
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

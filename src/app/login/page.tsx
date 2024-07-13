import React from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default async function LoginPage() {
  return (
    <div className="flex justify-center mt-10">
      <div className="border rounded-xl px-8 py-9 flex flex-col items-center">
        <div className="text-[32px]">Login</div>
        <div className="text-[24px] mt-2">Welcome back to ECOMMERCE</div>
        <div className="text-sm mt-2">The next gen business marketplace</div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
          <Button variant="outline" className="bg-black text-white">LOGIN</Button>
          <hr className="my-3"></hr>
          <div className="flex flex-row justify-center gap-2">
            <span className="text-xs">Don&apos;t have an Account? </span><Link className="text-sm" href='/signup'>SIGN UP</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

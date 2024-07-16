"use client";
import React, { Fragment, useState } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import api from "../../endpoints.json";
import { useForm } from "react-hook-form";
import { showToast } from "~/utils-client";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(3, "Invalid length").max(16, "Invalid length"),
});

type IFormInput = z.infer<typeof FormSchema>;

const LoginFrom = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: IFormInput) => {
    setIsLoading(true);
    const rawResponse = await fetch(api.verifyPassword, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const content = await rawResponse.json();

    if (content.error === true) {
      setIsLoading(false);
      showToast("warning", <p>{content.message}</p>);
    } else {
      router.push(`/verify?email=${data.email}`);
    }
    setIsLoading(false);
  };
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
          <Input
            {...register("email")}
            type="text"
            id="email"
            placeholder="Email"
          />
          {errors?.email?.message && (
            <p className="mb-4 text-red-700">{errors.email.message}</p>
          )}
        </div>
        <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="pass">Password</Label>
          <Input
            {...register("password")}
            type="password"
            id="pass"
            placeholder="Password"
          />
          {errors?.password?.message && (
            <p className="mb-4 text-red-700">{errors.password.message}</p>
          )}
        </div>
        <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
          <Button
            disabled={isLoading}
            onClick={handleSubmit(onSubmit)}
            variant="outline"
            className="bg-black text-white"
          >
            {!isLoading ? "LOGIN" : "LOADING..."}
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

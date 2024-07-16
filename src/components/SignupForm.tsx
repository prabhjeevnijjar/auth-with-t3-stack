"use client";
import React, { useState } from "react";
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
  username: z
    .string()
    .min(3, "Invalid length")
    .max(25, "Invalid length")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "The username must contain only letters, numbers and underscore",
    ),
  email: z.string().email("Invalid email address"),
  password: z.string().min(3, "Invalid length").max(16, "Invalid length"),
});

type IFormInput = z.infer<typeof FormSchema>;

const SignupForm = () => {
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
    console.log(api);
    setIsLoading(true);
    const rawResponse = await fetch(api.register, {
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
    <div className="mt-10 flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center rounded-xl border px-8 py-9"
      >
        <div className="text-[32px]">Create your Account</div>
        <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            {...register("username")}
            type="text"
            id="name"
            placeholder="name"
          />
          {errors?.username?.message && (
            <p className="mb-4 text-red-700">{errors.username.message}</p>
          )}
        </div>
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
            onClick={handleSubmit(onSubmit)}
            variant="outline"
            className="bg-black text-white"
            disabled={isLoading}
          >
            {!isLoading ? "CREATE ACCOUNT" : "LOADING..."}
          </Button>
          <hr className="my-3"></hr>
          <div className="flex flex-row items-center justify-center gap-2">
            <span className="text-xs">Have an Account? </span>
            <Link className="text-sm" href="/login">
              LOGIN
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;

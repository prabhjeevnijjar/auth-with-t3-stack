"use client";
import React, { Fragment, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import { useSearchParams } from "next/navigation";
import { slpitEmail } from "~/utils-client";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../../endpoints.json";
import { showToast } from "~/utils-client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import * as z from "zod";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z.string().email("Invalid email address"),
  code: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const VerifyOtp = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: "",
      email: searchParams.get("email") ?? "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    setIsLoading(true);

    const rawResponse = await fetch(api.verifyOtp, {
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
      router.push(`/`);
      setIsLoading(false);

      showToast("success", <p>{content.message}</p>);
    }
    setIsLoading(false);

    console.log(content);
  };

  return (
    <Fragment>
      <div className="flex flex-col items-center rounded-xl border px-8 py-9">
        <div className="text-[32px]">Verify your email</div>
        <div className="mt-2 text-sm">
          Enter the 6 digit code you have received on{" "}
        </div>
        <span className="semi-bold">
          {" "}
          {slpitEmail(searchParams.get("email") ?? "")}
        </span>
        <div className="mt-10 flex flex-col items-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the one-time password sent to your phone.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-4 grid w-full max-w-sm">
                <Button disabled={isLoading} type="submit">
                  {!isLoading ? "SUBMIT" : "LOADING ..."}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Fragment>
  );
};

export default VerifyOtp;

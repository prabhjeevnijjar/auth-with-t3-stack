import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <div>This  is the homepage</div>
    </HydrateClient>
  );
}

import { TaskInput } from "~/components/ui/TaskInput";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  // const session = await auth();

  // if (session?.user) {
  //   void api.post.getLatest.prefetch();
  // }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-grass-1 bg-gradient-to-b text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <TaskInput />
        </div>
      </main>
    </HydrateClient>
  );
}

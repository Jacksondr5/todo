import { TaskList } from "~/components/TaskList";
import { auth } from "@clerk/nextjs/server";
import { api } from "~/trpc/server";
import { TaskProvider } from "~/contexts/TaskContext";

export default async function Home() {
  const { userId } = await auth();
  if (userId) {
    void api.todo.get.prefetch();
    void api.bossConversation.get.prefetch();
  }

  return (
    <TaskProvider>
      <TaskList />
    </TaskProvider>
  );
}

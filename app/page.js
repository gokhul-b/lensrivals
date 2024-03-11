import { ScrollArea } from "@/components/ui/scroll-area";
import { getFeeds } from "./action";
import PostCard from "@/components/PostCard";
import { auth } from "@clerk/nextjs";

export default async function Home() {
  const feeds = await getFeeds();
  const { userId } = auth();
  return (
    <div>
      <div className="my-6">
        <ScrollArea className="h-screen  w-[720px] rounded-md p-4">
          <p className="font-bold text-2xl text-center mb-8">Feeds</p>
          <div className="px-8">
            {feeds.map((feed) => (
              <PostCard
                key={feed.id}
                feed={feed.data}
                docId={feed.id}
                currentUser={userId}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

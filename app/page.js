import { ScrollArea } from "@/components/ui/scroll-area";
import { auth, currentUser } from "@clerk/nextjs";
import { getFeeds } from "./action";
import PostCard from "@/components/PostCard";

export default async function Home() {
  const feeds = await getFeeds();
  return (
    <div>
      <div className="my-6">
        <ScrollArea className="h-screen  w-[720px] rounded-md p-4">
          <p className="font-bold text-2xl text-center mb-8">Feeds</p>
          <div className="px-8">
            {feeds.map((feed) => (
              <PostCard key={feed.id} feed={feed.data} docId={feed.id} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

import { ScrollArea } from "@/components/ui/scroll-area";
import { getFeeds } from "./action";
import PostCard from "@/components/PostCard";
import { auth, currentUser } from "@clerk/nextjs";

export default async function Home() {
  const feeds = await getFeeds();
  const { userId } = auth();
  const userName = (await currentUser()).username;
  return (
    <div>
      <div>
        <ScrollArea className="h-screen  w-[800px] rounded-md px-1 relative">
          <p className="py-3 font-semibold text-base text-center mb-8 bg-indigo-700 text-white mt-1 sticky top-1 z-10">
            Feeds
          </p>
          <div className="px-8">
            {feeds.map((feed) => (
              <PostCard
                key={feed.id}
                feed={feed.data}
                docId={feed.id}
                currentUser={userId}
                currentUserName={userName}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

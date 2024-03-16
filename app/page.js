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
        <ScrollArea className="lg:h-screen sm:h-full lg:w-[800px] w-screen rounded-md px-1 relative pt-1">
          <p className="py-3 font-semibold text-base text-center mb-8 bg-indigo-700 text-white mt-1 sticky top-1 z-10 hidden md:block">
            Feeds
          </p>
          <div className="lg:px-8 px-1 lg:pt-0 pt-2">
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

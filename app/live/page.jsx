import LiveCompList from "@/components/LiveCompList";
import { getLiveCompList } from "../action";

const page = async () => {
  const compList = await getLiveCompList();
  return (
    <div>
      <LiveCompList contestList={{ compList }} />
    </div>
  );
};

export default page;

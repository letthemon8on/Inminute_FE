import React from "react";
import { ISummaryItem } from "../../data/dummyData";

interface SummaryBySpkItemProps {
  item: ISummaryItem;
}

const SummaryBySpkItem: React.FC<SummaryBySpkItemProps> = ({ item }) => {
  return (
    <div className="flex mb-3">
      <div className="bg-pink-100/[.7] rounded-xl px-2.5 mx-1">
        {item.speaker}
      </div>
      <span>{item.content}</span>
    </div>
  );
};

export default SummaryBySpkItem;

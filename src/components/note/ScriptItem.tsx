import React from "react";
import { IScriptItem } from "../../data/dummyData";

interface ScriptItemProps {
  item: IScriptItem;
}

const ScriptItem: React.FC<ScriptItemProps> = ({ item }) => {
  return (
    <div className="flex mb-3">
      <div className="bg-pink-100/[.7] rounded-xl px-2.5 mx-1">
        {item.speaker}
      </div>
      <span>{item.content}</span>
    </div>
  );
};

export default ScriptItem;

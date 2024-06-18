import React from "react";
import { IToDoItem } from "../../data/dummyData";

interface ToDoBySpkItemProps {
  item: IToDoItem;
}

const ToDoBySpkItem: React.FC<ToDoBySpkItemProps> = ({ item }) => {
  return (
    <div className="flex mb-3">
      <div className="bg-pink-100/[.7] rounded-xl px-2.5 mx-1">
        {item.speaker}
      </div>
      <span>{item.content}</span>
    </div>
  );
};

export default ToDoBySpkItem;

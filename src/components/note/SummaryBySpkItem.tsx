// import React, { useState, useRef, useEffect } from "react";
// import { ISummaryItem } from "../../context/AppContext";
// import pencil from "./../../assets/pencil.svg";
// import trash from "./../../assets/trash.svg";
// import { useAppContext } from "../../context/AppContext";

// interface SummaryBySpkItemProps {
//   noteId: number;
//   item: ISummaryItem;
// }

// const SummaryBySpkItem: React.FC<SummaryBySpkItemProps> = ({
//   noteId,
//   item,
// }) => {
//   const { updateSummaryBySpkItem, deleteSummaryBySpkItem } = useAppContext();
//   const [isEditing, setIsEditing] = useState<boolean>(false);
//   const [newContent, setNewContent] = useState<string>(item.content);
//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     if (isEditing && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [isEditing]);

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewContent(e.target.value);
//   };

//   const handleSaveContent = () => {
//     if (newContent.trim()) {
//       updateSummaryBySpkItem(noteId, item.id, newContent.trim());
//       setIsEditing(false);
//     }
//   };

//   const handleKeyDownContent = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       handleSaveContent();
//       inputRef.current?.blur();
//     }
//   };

//   const handleDelete = () => {
//     deleteSummaryBySpkItem(noteId, item.id);
//   };

//   return (
//     <div className="hover:bg-gray-100 rounded-md flex mb-3">
//       <div className="bg-pink-100/[.7] rounded-xl px-2.5 mx-1">
//         {item.speaker}
//       </div>
//       {isEditing ? (
//         <input
//           className="grow bg-white shadow-inner shadow-gray-400 rounded-lg text-gray-600"
//           value={newContent}
//           onChange={handleChangeContent}
//           onBlur={handleSaveContent}
//           onKeyDown={handleKeyDownContent}
//           ref={inputRef}
//         />
//       ) : (
//         <span className="grow cursor-pointer" onClick={handleEdit}>
//           {item.content}
//         </span>
//       )}
//       <button onClick={handleEdit} className="ml-2">
//         <img className="w-5" src={pencil} />
//       </button>
//       <button onClick={handleDelete} className="ml-2">
//         <img className="w-5" src={trash} />
//       </button>
//     </div>
//   );
// };

// export default SummaryBySpkItem;

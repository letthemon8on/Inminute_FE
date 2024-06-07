import { useNavigate } from "react-router-dom";

const NoteItem: React.FC = (
  {
    // id,
    // name,
    // createdDate,
    // createdTime,
    // length,
    // oneLineSummary,
  }
) => {
  const nav = useNavigate();

  return (
    <>
      {/* <div onClick={() => nav(`/diary/${id}`)} className="info_section">
        <div className="created_date">
          {new Date(createdDate).toLocaleDateString()}
        </div>
        <div className="content">{content}</div>
      </div>
      <div className="button_section">
        <Button onClick={() => nav(`/edit/${id}`)} text={"수정하기"} />
      </div> */}
    </>
  );
};

export default NoteItem;

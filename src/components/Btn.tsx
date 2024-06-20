import React from "react";
import "./../styles/fonts/font.css";

interface BtnProps {
  label: string;
}

const Btn: React.FC<BtnProps> = ({ label }) => {
  return (
    <button className="w-28 h-12 border-none bg-gray-200/[.7] text-lg rounded-lg cursor-pointer">
      {label}
    </button>
  );
};

export default Btn;

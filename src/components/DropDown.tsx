import React, { useState, useRef, useEffect } from "react";
import chevron_up from "./../assets/chevron/chevron_up.svg";
import chevron_down from "./../assets/chevron/chevron_down.svg";

const DropDown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("latest");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    { value: "latest", label: "최신순" },
    { value: "oldest", label: "오래된 순" },
  ];

  const handleSelectOption = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  // 외부 클릭시 창 닫기

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node) // DropDown이 있고, DropDown 내부에 클릭되지 않으면
    ) {
      setIsOpen(false); // 창 닫기
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside); // 컴포넌트가 마운트될 때
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // 컴포넌트가 언마운트될 때
    };
  }, []);

  return (
    <div className="relative w-28" ref={dropdownRef}>
      <div
        className="h-11 flex items-center justify-between cursor-pointer border border-solid border-gray-200 bg-white rounded-2xl px-3 text-gray-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* options 배열에서 현재 선택된 옵션을 찾음 */}
        {options.find((option) => option.value === selectedOption)?.label}
        <span className="mx-1">
          {isOpen ? (
            <img className="w-5" src={chevron_up} />
          ) : (
            <img className="w-5" src={chevron_down} />
          )}
        </span>
      </div>
      {isOpen && (
        <div className="absolute w-full top-12 border border-solid border-gray-200 rounded-2xl bg-white z-10 shadow-lg text-gray-500">
          {options.map((option, index) => (
            <div
              className={`p-3 cursor-pointer hover:bg-gray-200 ${
                index === 0
                  ? "hover:rounded-t-2xl"
                  : index === options.length - 1
                  ? "hover:rounded-b-2xl"
                  : ""
              }`}
              key={option.value}
              onClick={() => handleSelectOption(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;

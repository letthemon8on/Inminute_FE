import React, { useState, useRef, useEffect } from "react";
import chevron_up from "./../assets/chevron/chevron_up.svg";
import chevron_down from "./../assets/chevron/chevron_down.svg";

interface Option {
  value: number;
  label: string;
}

interface DropDownProps {
  options: Option[];
  selectedOption: number;
  onSelect: (value: number) => void;
  width?: string;
  height?: string;
  top?: string;
  py?: string;
}

const DropDown: React.FC<DropDownProps> = ({
  options,
  selectedOption,
  onSelect,
  width,
  height,
  top,
  py,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelectOption = (value: number) => {
    onSelect(value);
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${width}`} ref={dropdownRef}>
      <div
        className={`${height} flex items-center cursor-pointer border border-solid border-gray-200 bg-white rounded-2xl px-3 text-gray-500`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex-1">
          {/* options 배열에서 현재 선택된 옵션을 찾음 */}
          {options.find((option) => option.value === selectedOption)?.label}
        </div>
        <span className="flex items-center">
          {isOpen ? (
            <img className="w-5 right-5" src={chevron_up} />
          ) : (
            <img className="w-5" src={chevron_down} />
          )}
        </span>
      </div>
      {isOpen && (
        <div
          className={`absolute w-full ${top} border border-solid border-gray-200 rounded-2xl bg-white z-10 shadow-lg text-gray-500 max-h-60 overflow-y-auto`}
        >
          {options.map((option, index) => (
            <div
              className={`px-3 ${py} cursor-pointer hover:bg-gray-200 ${
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

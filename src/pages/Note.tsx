import React, { useState } from "react";
import Folder from "../components/Folder";
import Navbar from "../components/Navbar";
import Script from "../components/note/Script";
import SummaryBySpk from "../components/note/SummaryBySpk";
import ToDoBySpk from "../components/note/ToDoBySpk";
import { useNavigate } from "react-router-dom";
import calendar from "./../assets/calendar.svg";
import clock from "./../assets/clock.svg";
import pencil from "./../assets/pencil.svg";
import trash from "./../assets/trash.svg";

const Note: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Script");

  const nav = useNavigate();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-bg-blue">
      <Navbar />
      <div className="flex w-full min-h-screen ">
        <Folder />
        <section className="bg-white grow px-12">
          <div className="flex justify-between mt-4">
            <div
              onClick={() => nav(-1)}
              className="text-2xl text-gray-400 cursor-pointer"
            >
              &lt;
            </div>
            <div className="flex items-center text-gray-500">
              <span className="mr-4 flex items-center">
                <img className="w-5 mx-1" src={calendar} />
                <span>240405 Fri</span>
              </span>
              <span className="mr-2 flex items-center">
                <img className="w-5 mx-1" src={clock} />
                <span>10:35</span>
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <h2 className="text-4xl mt-4 mb-3">프로젝트 이름</h2>
            <div className="flex items-center">
              <button className="text-xl mx-2 w-6 transition-transform duration-200 hover:scale-125">
                <img src={pencil} />
              </button>
              <button className="text-xl mx-2 w-6 transition-transform duration-200 hover:scale-125">
                <img src={trash} />
              </button>
            </div>
          </div>

          <hr />
          <div className="flex py-2">
            <h6 className="text-gray-400 pt-light mx-2">participants</h6>
            <span className="bg-main-blue/[.5] rounded-xl px-2.5 mx-1">
              심수연
            </span>
            <span className="bg-pink-100/[.7] rounded-xl px-2.5 mx-1">
              박상욱
            </span>
            <span className="bg-yellow-100/[.7] rounded-xl px-2.5 mx-1">
              노태일
            </span>
          </div>
          <hr />
          <div className="flex flex-col mx-3">
            <div className="pt-medium text-lg mt-3 mb-2">One Line Summary</div>
            <div className="flex flex-col items-center">
              <input
                className="w-full h-10 bg-white shadow-inner shadow-gray-400 rounded-lg px-4 text-gray-"
                value="프로젝트 이름을 인미닛으로 정하였다"
                disabled
              />
            </div>

            <section>
              <div className="flex items-center my-6">
                <div
                  className={`hover:bg-main-blue w-1/3 h-10 flex items-center justify-center pt-medium text-lg rounded-t-full cursor-pointer transition-colors duration-300 border ${
                    activeTab === "Script"
                      ? "bg-main-blue/[.7] text-gray-500 border-transparent"
                      : "bg-white text-gray-500 border border-solid border-main-blue"
                  }`}
                  onClick={() => handleTabClick("Script")}
                >
                  Script
                </div>
                <div
                  className={`hover:bg-main-blue w-1/3 h-10 flex items-center justify-center pt-medium text-lg rounded-t-full cursor-pointer transition-colors duration-300 border ${
                    activeTab === "Summary by Speaker"
                      ? "bg-main-blue/[.7] text-gray-500 border-transparent"
                      : "bg-white text-gray-500 border border-solid border-main-blue"
                  }`}
                  onClick={() => handleTabClick("Summary by Speaker")}
                >
                  Summary by Speaker
                </div>
                <div
                  className={`hover:bg-main-blue w-1/3 h-10 flex items-center justify-center pt-medium text-lg rounded-t-full cursor-pointer transition-colors duration-300 border ${
                    activeTab === "To Do by Speaker"
                      ? "bg-main-blue/[.7] text-gray-500 border-transparent"
                      : "bg-white text-gray-500 border border-solid border-main-blue"
                  }`}
                  onClick={() => handleTabClick("To Do by Speaker")}
                >
                  To Do by Speaker
                </div>
              </div>
              <div className="w-200 h-24 rounded-xl bg-white mb-4">
                {activeTab === "Script" && <Script />}
                {activeTab === "Summary by Speaker" && <SummaryBySpk />}
                {activeTab === "To Do by Speaker" && <ToDoBySpk />}
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Note;

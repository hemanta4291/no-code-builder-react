import React from "react";
import { TbTextRecognition } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiImageOn } from "react-icons/ci";

const Sidebar: React.FC = ({}) => {
  return (
    <div className="w-24 border-r border-gray-200 h-full overflow-auto z-10 bg-white">
      <div className="border-b p-4 border-gray-200 text-center mb-6 cursor-pointer h-16">
        <RxHamburgerMenu className="inline-block text-2xl" />
      </div>
      <div className="flex justify-center flex-col gap-4 items-center">
        <div
          className="text-gray-500 text-center cursor-pointer"
          draggable
          onDragStart={(e) => {
            console.log(e.dataTransfer.setData("element", "Container"));
          }}>
          <TbTextRecognition className="inline-block text-2xl" />
          <p className="text-sm">Container</p>
        </div>
        <div
          className="text-gray-500 text-center cursor-pointer"
          draggable
          onDragStart={(e) => {
            console.log(e.dataTransfer.setData("element", "Text"));
            e.dataTransfer.setData("element", "Text");
          }}>
          <TbTextRecognition className="inline-block text-2xl" />
          <p className="text-sm">Text</p>
        </div>
        <div
          className="text-gray-500 text-center cursor-pointer"
          draggable
          onDragStart={(e) => e.dataTransfer.setData("element", "Image")}>
          <CiImageOn className="inline-block text-2xl" />
          <p className="text-sm">Image</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

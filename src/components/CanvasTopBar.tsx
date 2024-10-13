import React from "react";
import { IoEyeOutline } from "react-icons/io5";
import { GoFileCode } from "react-icons/go";
import { TopBarProps } from "./types";

const CanvasTopBar: React.FC<TopBarProps> = ({ onPreview, onViewSource }) => {
  return (
    <div className="flex justify-center items-center gap-3 pb-6">
      <div
        onClick={onPreview}
        className="flex justify-center items-center border border-gray-200 rounded-lg w-10 h-10">
        <IoEyeOutline />
      </div>
      <div
        onClick={onViewSource}
        className="flex justify-center items-center border border-gray-200 rounded-lg w-10 h-10">
        <GoFileCode />
      </div>
    </div>
  );
};

export default CanvasTopBar;

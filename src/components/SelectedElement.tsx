import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IoMdClose } from "react-icons/io";
import {
  MdFormatAlignCenter,
  MdFormatAlignJustify,
  MdFormatAlignLeft,
  MdFormatAlignRight,
} from "react-icons/md";
import { ColumnProps, SidebarProps } from "./types";

const SelectedElement: React.FC<SidebarProps> = ({
  selectedElement,
  setSelectedElement,
  onElementChange,
}) => {
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    setToggle(selectedElement ? true : false);
  }, [selectedElement]);

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedElement && selectedElement.type === "Text") {
      const fontSize = parseInt(e.target.value);
      if (!isNaN(fontSize)) {
        onElementChange({ ...selectedElement, fontSize });
      }
    }
  };

  const handleColumnsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectedElement && selectedElement.type === "Container") {
      const columns = parseInt(e.target.value);
      if (!isNaN(columns)) {
        const updatedColumns: ColumnProps[] = Array.from(
          { length: columns },
          (_, idx) => ({
            id: `column-${idx + 1}-${uuidv4()}`,
            elements: [],
          })
        );
        onElementChange({
          ...selectedElement,
          columns,
          children: updatedColumns,
        });
      }
    }
  };

  const handlePaddingMarginChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (selectedElement && selectedElement.type === "Container") {
      const value = parseInt(e.target.value);
      const key = e.target.name;
      if (!isNaN(value)) {
        onElementChange({ ...selectedElement, [key]: value });
      }
    }
  };

  const handleLineHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedElement && selectedElement.type === "Text") {
      const lineHeight = parseFloat(e.target.value);
      if (!isNaN(lineHeight)) {
        onElementChange({ ...selectedElement, lineHeight });
      }
    }
  };

  const handleLetterSpacingChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (selectedElement && selectedElement.type === "Text") {
      const letterSpacing = parseInt(e.target.value, 10);
      if (!isNaN(letterSpacing)) {
        onElementChange({ ...selectedElement, letterSpacing });
      }
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedElement && selectedElement.type === "Text") {
      onElementChange({ ...selectedElement, color: e.target.value });
    }
  };

  const handleTextAlignChange = (
    align: "left" | "center" | "right" | "justify"
  ) => {
    if (selectedElement && selectedElement.type === "Text") {
      onElementChange({
        ...selectedElement,
        textAlign: align,
      });
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (selectedElement && selectedElement.type === "Text") {
      onElementChange({ ...selectedElement, content: e.target.value });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedElement && selectedElement.type === "Image" && e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        onElementChange({
          ...selectedElement,
          content: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedElement && selectedElement.type === "Image") {
      const width = parseInt(e.target.value);
      if (!isNaN(width)) {
        onElementChange({ ...selectedElement, width });
      }
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedElement && selectedElement.type === "Image") {
      const height = parseInt(e.target.value);
      if (!isNaN(height)) {
        onElementChange({ ...selectedElement, height });
      }
    }
  };

  console.log("selectedElement", selectedElement);
  return (
    <div
      className={`${
        !toggle ? "w-0 overflow-hidden" : "w-[250px]"
      }  border-r border-gray-200 h-full transition-all duration-100 bg-white`}>
      <div className="flex p-4 justify-between items-center border-b border-gray-200">
        <h3>{selectedElement?.type}</h3>
        <div
          className="cursor-pointer"
          onClick={() => setSelectedElement(null)}>
          <IoMdClose />
        </div>
      </div>

      {selectedElement?.type === "Container" && (
        <div className="p-4 border-b border-gray-200">
          <h4 className="pb-4 text-sm font-bold">Clumn</h4>
          <select
            className="border border-gray-200 rounded-lg w-full bg-transparent p-2"
            value={selectedElement.columns || 1}
            onChange={handleColumnsChange}>
            <option value={1}>1 Column</option>
            <option value={2}>2 Columns</option>
            <option value={3}>3 Columns</option>
            <option value={4}>4 Columns</option>
          </select>
          <div className="flex items-center justify-between gap-4 pt-4">
            <div className="flex-1">
              <h4 className="pb-4 text-sm font-bold">Margin (px)</h4>
              <input
                name="margin"
                className="border border-gray-200 rounded-lg w-full bg-transparent p-2"
                type="number"
                value={selectedElement.margin || 10}
                onChange={handlePaddingMarginChange}
              />
            </div>
            <div className="flex-1">
              <h4 className="pb-4 text-sm font-bold">Padding style</h4>
              <input
                name="padding"
                className="border border-gray-200 rounded-lg w-full bg-transparent p-2"
                type="number"
                value={selectedElement.padding || 10}
                onChange={handlePaddingMarginChange}
              />
            </div>
          </div>
        </div>
      )}

      {/* for text */}
      {selectedElement?.type === "Text" && (
        <>
          <div className="p-4 border-b border-gray-200">
            <h4 className="pb-4 text-sm font-bold">Text content</h4>
            <textarea
              value={selectedElement.content}
              onChange={handleTextChange}
              className="w-full p-2 border rounded mb-4"
              placeholder="Edit text content..."></textarea>
            <h4 className="pb-4 text-sm font-bold">Text alignment</h4>
            <div className="flex justify-around items-center border border-gray-200 rounded-lg p-2">
              <button
                className={`text-gray-500 hover:text-blue-500 ${
                  selectedElement?.textAlign === "left" ? "text-blue-500" : ""
                }`}
                onClick={() => handleTextAlignChange("left")}
                aria-label="Align Left">
                <MdFormatAlignLeft />
              </button>

              <button
                className={`text-gray-500 hover:text-blue-500 ${
                  selectedElement?.textAlign === "center" ? "text-blue-500" : ""
                }`}
                onClick={() => handleTextAlignChange("center")}
                aria-label="Align Center">
                <MdFormatAlignCenter />
              </button>

              <button
                className={`text-gray-500 hover:text-blue-500 ${
                  selectedElement?.textAlign === "justify"
                    ? "text-blue-500"
                    : ""
                }`}
                onClick={() => handleTextAlignChange("justify")}
                aria-label="Justify">
                <MdFormatAlignJustify />
              </button>

              <button
                className={`text-gray-500 hover:text-blue-500 ${
                  selectedElement?.textAlign === "right" ? "text-blue-500" : ""
                }`}
                onClick={() => handleTextAlignChange("right")}
                aria-label="Align Right">
                <MdFormatAlignRight />
              </button>
            </div>
          </div>
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between gap-4 pt-4">
              <div className="flex-1">
                <h4 className="pb-4 text-sm font-bold">Font size (px)</h4>
                <input
                  className="border border-gray-200 rounded-lg w-full bg-transparent p-2"
                  value={selectedElement.fontSize || 16}
                  onChange={handleFontSizeChange}
                  type="number"
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 pt-4">
              <div className="flex-1">
                <h4 className="pb-4 text-sm font-bold">Line height (px)</h4>
                <input
                  name="lineHeigth"
                  className="border border-gray-200 rounded-lg w-full bg-transparent p-2"
                  value={selectedElement.lineHeight || 1.5}
                  onChange={handleLineHeightChange}
                  type="number"
                />
              </div>
              <div className="flex-1">
                <h4 className="pb-4 text-sm font-bold">Later spacing (px)</h4>
                <input
                  name="lineSpacing"
                  className="border border-gray-200 rounded-lg w-full bg-transparent p-2"
                  value={selectedElement.letterSpacing || 0}
                  onChange={handleLetterSpacingChange}
                  type="number"
                />
              </div>
            </div>
          </div>
          <div className="p-4 border-b border-gray-200">
            <h4 className="pb-4 text-sm font-bold">Font color</h4>
            <div className="border border-gray-200 rounded-lg p-2">
              <div className="flex justify-center items-center">
                <div className="flex-1 flex items-center gap-2">
                  <input
                    className="w-full"
                    type="color"
                    value={selectedElement.color || "#000000"}
                    onChange={handleColorChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* for images */}
      {selectedElement?.type === "Image" && (
        <div className="p-4 border-b border-gray-200">
          <h4 className="pb-4 text-sm font-bold">Image</h4>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex items-center justify-between gap-4 pt-4">
            <div className="flex-1">
              <h4 className="pb-4 text-sm font-bold">width (px)</h4>
              <input
                className="border border-gray-200 rounded-lg w-full bg-transparent p-2"
                value={selectedElement.width || 300}
                onChange={handleWidthChange}
                type="number"
              />
            </div>
            <div className="flex-1">
              <h4 className="pb-4 text-sm font-bold">height (px)</h4>
              <input
                className="border border-gray-200 rounded-lg w-full bg-transparent p-2"
                value={selectedElement.height || 300}
                onChange={handleHeightChange}
                type="number"
              />
            </div>
          </div>

          <div>
            <h4 className="pb-4 mt-4 text-sm font-bold">Alter text </h4>
            <input
              className="border border-gray-200 rounded-lg p-2 w-full"
              value={"responsive image"}
              type="text"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedElement;

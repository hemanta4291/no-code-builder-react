import React from "react";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { ContainerProps, ElementProps } from "./types";

const Container: React.FC<ContainerProps> = ({
  container,
  onSelectElement,
  onAddElementToColumn,
}) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, columnId: string) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("child elem");
    const elementType = e.dataTransfer.getData("element");
    if (elementType === "Text" || elementType === "Image") {
      const newElement: ElementProps = {
        id: `${elementType.toLowerCase()}-${uuidv4()}`,
        type: elementType as "Text" | "Image",
        content: elementType === "Text" ? "Editrrr me" : "",
        top: 0,
        left: 0,
        width: elementType === "Image" ? 300 : undefined,
        height: elementType === "Image" ? 300 : undefined,
        fontSize: 16,
        color: "#000000",
        lineHeight: 1.5,
        letterSpacing: 0,
        textAlign: "left",
        alt: "",
      };
      onAddElementToColumn(container.id, columnId, newElement);
    }
  };

  const renderElement = (element: ElementProps) => {
    if (element.type === "Text") {
      console.log("kkkk", element);
      return (
        <div
          key={element.id}
          onClick={() => onSelectElement(element)}
          className="p-2 border rounded cursor-pointer mb-2"
          style={{
            fontSize: `${element.fontSize}px`,
            color: element.color,
            lineHeight: element.lineHeight,
            letterSpacing: `${element.letterSpacing}px`,
            textAlign: element.textAlign,
          }}>
          {element.content}
        </div>
      );
    }

    if (element.type === "Image") {
      return (
        <img
          key={element.id}
          src={element.content || "https://via.placeholder.com/300"}
          alt={element.alt || "Image"}
          onClick={() => onSelectElement(element)}
          className="cursor-pointer mb-2"
          style={{
            width: `${element.width}px`,
            height: `${element.height}px`,
            objectFit: "cover",
          }}
        />
      );
    }

    return null;
  };
  return (
    <div
      className="relative"
      style={{
        padding: `${container.padding}px`,
        margin: `${container.margin}px`,
      }}>
      <div className="absolute top-0 right-0 p-2">
        <div
          className="p-2 text-white bg-green-400 rounded-md"
          onClick={() => onSelectElement(container)}>
          <FaEdit />
        </div>
      </div>
      <div className="flex gap-4">
        {container.children?.map((column) => (
          <div
            key={column.id}
            className="flex-1 border p-2"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, column.id)}>
            <div className="min-h-[100px] border-dashed border-2 p-2">
              {column.elements.map((el) => renderElement(el))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Container;

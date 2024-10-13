import React from "react";
import { v4 as uuidv4 } from "uuid";
import { CanvasAreaProps, ElementProps } from "./types";
import Container from "./Container";

const CanvasArea: React.FC<CanvasAreaProps> = ({
  elements,
  setElements,
  setSelectedElement,
}) => {
  const createNewElement = (elementType: string): ElementProps => {
    return {
      id: `${elementType.toLowerCase()}-${uuidv4()}`,
      type: elementType as "Text" | "Image" | "Container",
      content: elementType === "Text" ? "Edit me" : "",
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
      columns: elementType === "Container" ? 1 : undefined,
      padding: elementType === "Container" ? 10 : undefined,
      margin: elementType === "Container" ? 10 : undefined,
      children:
        elementType === "Container"
          ? [{ id: `column-1-${uuidv4()}`, elements: [] }]
          : undefined,
    };
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const elementType = e.dataTransfer.getData("element");
    if (elementType === "Container") {
    }
    const newElement = createNewElement(elementType);
    setElements((prev) => [...prev, newElement]);
  };

  const handleSelectElement = (element: ElementProps) => {
    setSelectedElement(element);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleAddElementToColumn = (
    containerId: string,
    columnId: string,
    element: ElementProps
  ) => {
    setElements((prevElements) =>
      prevElements.map((el) => {
        if (el.id === containerId && el.type === "Container") {
          const updatedColumns = el.children?.map((col) => {
            if (col.id === columnId) {
              return { ...col, elements: [...col.elements, element] };
            }
            return col;
          });
          return { ...el, children: updatedColumns };
        }
        return el;
      })
    );
  };

  const renderElement = (element: ElementProps) => {
    if (element.type === "Container") {
      return (
        <Container
          key={element.id}
          container={element}
          onSelectElement={handleSelectElement}
          onAddElementToColumn={handleAddElementToColumn}
        />
      );
    }
    if (element.type === "Text") {
      return (
        <div
          key={element.id}
          onClick={() => handleSelectElement(element)}
          className="p-2 border rounded cursor-pointer"
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
          onClick={() => handleSelectElement(element)}
          className="cursor-pointer"
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
      className="p-4 border border-gray-200 rounded-lg h-[calc(100%-40px)]"
      onDrop={handleDrop}
      onDragOver={handleDragOver}>
      <div className="relative">{elements.map((el) => renderElement(el))}</div>
    </div>
  );
};

export default CanvasArea;

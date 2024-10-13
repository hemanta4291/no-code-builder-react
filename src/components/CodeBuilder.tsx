import React, { useState } from "react";
import Modal from "react-modal";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import CanvasArea from "./CanvasArea";
import CanvasTopBar from "./CanvasTopBar";
import SelectedElement from "./SelectedElement";
import PreviewModal from "./PreviewModal";
import SourceCodeModal from "./SourceCodeModal";
import { ElementProps } from "./types";

// Initialize react-modal
Modal.setAppElement("#root");

const CodeBuilder: React.FC = () => {
  const [elements, setElements] = useState<ElementProps[]>([]);
  const [selectedElement, setSelectedElement] = useState<ElementProps | null>(
    null
  );
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);
  const [htmlContent, setHtmlContent] = useState("");

  const updateElement = (
    elements: ElementProps[],
    updatedElement: ElementProps
  ): ElementProps[] => {
    return elements.map((el) => {
      if (el.id === updatedElement.id) {
        return updatedElement;
      }
      if (el.type === "Container" && el.children) {
        return {
          ...el,
          children: el.children.map((column) => ({
            ...column,
            elements: updateElement(column.elements, updatedElement),
          })),
        };
      }
      return el;
    });
  };
  const handleElementChange = (updatedElement: ElementProps) => {
    setElements((prevElements) => updateElement(prevElements, updatedElement));
    setSelectedElement(updatedElement);
  };

  const generateHTML = (elementsList: ElementProps[]): string => {
    const generateElementHTML = (el: ElementProps): string => {
      if (el.type === "Text") {
        return `<p style="
          font-size: ${el.fontSize}px;
          color: ${el.color};
          line-height: ${el.lineHeight};
          letter-spacing: ${el.letterSpacing}px;
          text-align: ${el.textAlign};
        ">
          ${el.content}
        </p>`;
      }

      if (el.type === "Image") {
        return `<img src="${el.content}" alt="${el.alt}" style="
          width: ${el.width}px;
          height: ${el.height}px;
          object-fit: cover;
          margin-bottom: 10px;
        " />`;
      }

      if (el.type === "Container" && el.children) {
        const columnsHTML = el.children
          .map((col) => {
            const columnContent = col.elements
              .map((childEl) => generateElementHTML(childEl))
              .join("\n");
            return `<div style="
              flex: 1;
              padding: ${el.padding}px;
              margin: ${el.margin}px;
              border: 1px solid #ccc;
            ">
              ${columnContent}
            </div>`;
          })
          .join("\n");

        return `<div style="
          display: flex;
          padding: ${el.padding}px;
          margin: ${el.margin}px 0;
          border: 1px solid #ccc;
        ">
          ${columnsHTML}
        </div>`;
      }

      return "";
    };

    return elementsList.map(generateElementHTML).join("\n");
  };
  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  const handleViewSource = () => {
    const generatedHTML = generateHTML(elements);
    setHtmlContent(generatedHTML);
    setIsSourceModalOpen(true);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <div className="flex h-full">
          <SelectedElement
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
            onElementChange={handleElementChange}
          />
          <div className="flex-1 p-6 h-full">
            <CanvasTopBar
              onPreview={handlePreview}
              onViewSource={handleViewSource}
            />
            <CanvasArea
              elements={elements}
              setElements={setElements}
              setSelectedElement={setSelectedElement}
            />
          </div>
        </div>
      </div>
      {/* Preview Modal */}
      <PreviewModal
        isOpen={isPreviewOpen}
        onRequestClose={() => setIsPreviewOpen(false)}
        elements={elements}
      />

      {/* Source Code Modal */}
      <SourceCodeModal
        isOpen={isSourceModalOpen}
        onRequestClose={() => setIsSourceModalOpen(false)}
        htmlContent={htmlContent}
      />
    </div>
  );
};

export default CodeBuilder;

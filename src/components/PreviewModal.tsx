import React from "react";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";
import { ElementProps, PreviewModalProps } from "./types";

const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onRequestClose,
  elements,
}) => {
  const renderElements = (elementsList: ElementProps[]) => {
    return elementsList.map((el) => {
      if (el.type === "Text") {
        return (
          <p
            key={el.id}
            style={{
              fontSize: `${el.fontSize}px`,
              color: el.color,
              lineHeight: el.lineHeight,
              letterSpacing: `${el.letterSpacing}px`,
              textAlign: el.textAlign,
              marginBottom: "10px",
            }}>
            {el.content}
          </p>
        );
      }

      if (el.type === "Image") {
        return (
          <img
            key={el.id}
            src={el.content || "https://via.placeholder.com/300"}
            alt={el.alt || "Image"}
            style={{
              width: `${el.width}px`,
              height: `${el.height}px`,
              objectFit: "cover",
              marginBottom: "10px",
            }}
          />
        );
      }

      if (el.type === "Container" && el.children) {
        return (
          <div
            key={el.id}
            style={{
              display: "flex",
              padding: `${el.padding}px`,
              margin: `${el.margin}px 0`,
              border: "1px solid #ccc",
            }}>
            {el.children.map((col) => (
              <div
                key={col.id}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderLeft: "1px solid #eee",
                  borderRight: "1px solid #eee",
                }}>
                {renderElements(col.elements)}
              </div>
            ))}
          </div>
        );
      }

      return null;
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Preview"
      className="bg-white mx-auto rounded w-full relative  h-full"
      overlayClassName="fixed inset-0 z-10 bg-white flex justify-center items-start">
      <div className="w-full ">
        <div className="border-b border-gray-200 flex justify-between items-center p-4">
          <h2 className="text-xl mb-4">Preview</h2>
          <button
            onClick={onRequestClose}
            className="flex justify-center items-center p-0 text-red-600 w-6 h-6 rounded-full border border-gray-500">
            <MdClose />
          </button>
        </div>
        <div>{renderElements(elements)}</div>
      </div>
    </Modal>
  );
};

export default PreviewModal;

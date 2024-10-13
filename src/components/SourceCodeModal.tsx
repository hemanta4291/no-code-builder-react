import React from "react";
import { MdClose } from "react-icons/md";
import Modal from "react-modal";
import { SourceCodeModalProps } from "./types";

const SourceCodeModal: React.FC<SourceCodeModalProps> = ({
  isOpen,
  onRequestClose,
  htmlContent,
}) => {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Preview"
      className="bg-white mx-auto rounded w-full relative  h-full"
      overlayClassName="fixed inset-0 z-10 bg-white flex justify-center items-start">
      <div className="w-full ">
        <div className="border-b border-gray-200 flex justify-between items-center p-4">
          <h2 className="text-xl mb-4">Source Code</h2>

          <button
            onClick={onRequestClose}
            className="flex justify-center items-center p-0 text-red-600 w-6 h-6 rounded-full border border-gray-500">
            <MdClose />
          </button>
        </div>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
          {htmlContent}
        </pre>
      </div>
    </Modal>
  );
};

export default SourceCodeModal;

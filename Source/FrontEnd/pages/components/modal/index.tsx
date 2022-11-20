// import { modal } from "react-modal";

import { useState } from "react";
import ReactModal from "react-modal";
import { FiX } from "react-icons/fi";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid black",
    borderRadius: "15px",
    width: "50%",
  },
};

interface Props {
  modalIsOpen: boolean;
  onClose: any;
  children: any;
}
export default function ModalComponent(props: Props) {
  return (
    <ReactModal
      isOpen={props.modalIsOpen}
      onRequestClose={props.onClose}
      shouldCloseOnOverlayClick={false}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <FiX cursor={"pointer"} color={"red"} size={30} onClick={props.onClose} style={{"position":"absolute", "top":"5px", "right":"5px"}}></FiX>
     {props.children}
    </ReactModal>
  );
}

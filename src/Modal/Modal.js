import { createPortal } from "react-dom";
import { useState } from "react";

export const Modal = () => {
  const [modalActive, setModalActive] = useState(false);

  const handleModalActive = () => {
    setModalActive(true);
  };

  const handleModalClose = () => {
    setModalActive(false);
  };
  return (
    <>
      <button onClick={handleModalActive}>show Modal</button>
      {modalActive && (
        <PopUp title={Modal} onClose={handleModalClose}>
          One morning, when Gregor Samsa woke from troubled dreams, he found
          himself transformed in his bed into a horrible vermin. He lay on his
          armour-like back, and if he lifted his head a little he could see his
          brown belly, slightly domed and divided by arches into stiff sections.
        </PopUp>
      )}
    </>
  );
};

const PopUp = ({ title, onClose, children }) => {
  return createPortal(
    <div
      style={{
        width: "100vw",
        height: "100vh",
        zIndex: "1000",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        position: "absolute",
        left: "0",
        top: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      role="dialog"
    >
      <div
        style={{
          position: "relative",
          padding: "16px",
          width: "80%",
          maxHeight: "500px",
          borderRadius: "10px",
          backgroundColor: "white",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {children}
        <button onClick={() => onClose()}>Close Modal</button>
      </div>
    </div>,
    document.body
  );
};

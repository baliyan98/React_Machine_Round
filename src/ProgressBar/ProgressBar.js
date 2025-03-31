import { useEffect, useState } from "react";

const BAR_LIMIT = 3;

export const ProgressBar = () => {
  const [bars, setBars] = useState(0);
  const [activeBar, setActiveBar] = useState(0);
  const handleBarCompletion = () => {
    setActiveBar(activeBar + 1);
  };
  return (
    <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
      <button
        style={{
          width: "50px",
          backgroundColor: "white",
          border: "1px solid grey",
          borderRadius: "5px",
        }}
        onClick={() => {
          setBars((prev) => prev + 1);
        }}
      >
        Add
      </button>
      {Array.from({ length: bars }).map((bar, index) => {
        return (
          <Bar
            key={index}
            transitionStart={index < activeBar + BAR_LIMIT}
            onCompleted={handleBarCompletion}
          />
        );
      })}
    </div>
  );
};

const Bar = ({ transitionStart, onCompleted }) => {
  const [transition, setTransition] = useState(false);
  useEffect(() => {
    if (!transitionStart || transition) {
      return;
    }
    setTransition(true);
  }, [transitionStart]);
  return (
    <div style={{ height: "10px", border: "1px solid grey" }}>
      <div
        style={{
          height: "100%",
          backgroundColor: "green",
          transform: transition ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transitionDuration: "2000ms",
          transitionTimingFunction: "linear",
        }}
        onTransitionEnd={() => onCompleted()}
      ></div>
    </div>
  );
};

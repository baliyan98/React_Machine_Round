import { accordionData } from "./data";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const Accordion = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  return (
    <div
      role="presentation"
      style={{
        margin: "10px",
        display: "flex",
        gap: "10px",
        flexDirection: "column",
      }}
    >
      {accordionData.map((data) => {
        return (
          <div key={data.id}>
            <div
              style={{
                border: "1px solid grey",
                borderRadius: "10px",
                padding: "10px",
                height: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
              }}
              role="button"
              aria-expanded={activeAccordion === data.id}
              aria-controls={`accordion-content-${data.id}`}
              tabIndex={0}
              onClick={() => {
                setActiveAccordion((prev) =>
                  prev === data.id ? null : data.id
                );
              }}
            >
              <h3>{data.title}</h3>
              {activeAccordion === data.id ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </div>
            {activeAccordion === data.id && (
              <p
                role="region"
                id={`accordion-content-${data.id}`}
                style={{ padding: "10px" }}
              >
                {data.content}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

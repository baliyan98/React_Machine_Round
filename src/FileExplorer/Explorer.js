import { useState } from "react";
import file from "./fileStructure.json";

export const Explorer = () => {
  const [data, setData] = useState(file);
  const handleAddFile = (id) => {
    const name = prompt("Enter File name");
    setData((prev) => {
      const newData = [...prev];
      const addFileToFolder = (items, parentId) => {
        return items.map((item) => {
          if (item.id === parentId && item.folder) {
            return {
              ...item,
              children: [
                ...item.children,
                {
                  id: Date.now(),
                  name: name,
                  folder: false,
                  children: [],
                },
              ],
            };
          } else if (item.folder) {
            return {
              ...item,
              children: addFileToFolder(item.children, parentId),
            };
          }
          return item;
        });
      };
      return addFileToFolder(newData, id);
    });
  };

  const handleDeleteFile = (id) => {
    setData((prev) => {
      const updatedData = [...prev];
      const deleteFileNode = (data, nodeId) => {
        return data
          .filter((node) => node.id !== nodeId)
          .map((node) => {
            return node.folder
              ? { ...node, children: deleteFileNode(node.children, nodeId) }
              : node;
          });
      };
      return [...deleteFileNode(updatedData, id)];
    });
  };
  return (
    <div style={{ height: "100vh" }}>
      <File
        structure={data}
        onFileAddChange={handleAddFile}
        onFileDeleteChange={handleDeleteFile}
      />
    </div>
  );
};

const File = ({ structure, onFileAddChange, onFileDeleteChange }) => {
  const [expanded, setExpanded] = useState({});
  const handleExpanded = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const handleAddFile = (parentId) => {
    onFileAddChange(parentId);
  };

  const handleDeleteFile = (id) => {
    onFileDeleteChange(id);
  };
  return (
    <div style={{ padding: "3px" }}>
      {structure.map((data) => {
        return (
          <div key={data.id}>
            <div style={{ marginLeft: "10px" }}>
              <span
                style={{ marginRight: "5px", cursor: "pointer" }}
                onClick={() => handleExpanded(data.id)}
              >
                {data.folder &&
                  data.children.length > 0 &&
                  (expanded[data.id] ? "-" : "+")}
              </span>
              {data.folder && (
                <span style={{ marginRight: "5px" }}>
                  <img
                    src="https://img.icons8.com/?size=100&id=71186&format=png&color=000000"
                    alt="img"
                    height="12"
                  />
                </span>
              )}
              {data.name}
              {data.folder && (
                <span
                  style={{ marginLeft: "5px", cursor: "pointer" }}
                  onClick={() => handleAddFile(data.id)}
                >
                  <img
                    src="https://img.icons8.com/?size=100&id=11550&format=png&color=000000"
                    alt="add file"
                    height={12}
                  />
                </span>
              )}
              <span
                onClick={() => handleDeleteFile(data.id)}
                style={{ marginLeft: "5px", cursor: "pointer" }}
              >
                <img
                  src="https://img.icons8.com/?size=100&id=3555&format=png&color=000000"
                  alt="delete file"
                  height={12}
                />
              </span>
            </div>
            {data.folder && data.children.length > 0 && expanded[data.id] && (
              <div style={{ marginLeft: "10px" }}>
                <File
                  structure={data.children}
                  onFileAddChange={onFileAddChange}
                  onFileDeleteChange={onFileDeleteChange}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

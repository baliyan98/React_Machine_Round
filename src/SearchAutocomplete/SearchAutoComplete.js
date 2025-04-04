import { useState, useEffect } from "react";

export const SearchAutoComplete = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  useEffect(() => {
    if (!searchValue) {
      setData([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      fetchData(searchValue);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchValue]);

  const fetchData = async (param) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://demo.dataverse.org/api/search?q=${param}`
      );
      const res = await response.json();
      setData(res?.data.items);
      setSelectedIndex(-1);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (data.length == 0) {
      return;
    }
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev < data.length - 1 ? prev + 1 : prev));
    }
    if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }
    if (e.key === "Enter" && selectedIndex >= 0) {
      setSearchValue(data[selectedIndex].name);
      setShowData(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "30%",
      }}
    >
      <input
        style={{
          width: "300px",
          height: "30px",
          borderRadius: "10px",
          border: "2px solid grey",
          padding: "5px",
        }}
        type="search"
        onChange={handleChange}
        onFocus={() => setShowData(true)}
        onBlur={() => setTimeout(() => setShowData(false), 200)}
        onKeyDown={handleKeyDown}
      />
      {showData && (isLoading || data.length > 0) && (
        <div
          style={{
            marginTop: "2px",
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            border: "1px solid grey",
            borderRadius: "10px",
            maxHeight: "400px",
            width: "290px",
            overflowY: "scroll",
            background: "white",
          }}
        >
          {isLoading
            ? "Loading...."
            : data.map((d, index) => {
                return (
                  <div key={d.global_id}>
                    <div
                      style={{
                        padding: "3px",
                        cursor: "pointer",
                        backgroundColor:
                          selectedIndex === index ? "#ddd" : "white",
                      }}
                    >
                      {d.name}
                    </div>
                    <hr />
                  </div>
                );
              })}
        </div>
      )}
    </div>
  );
};

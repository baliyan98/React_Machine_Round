import { useState, useEffect } from "react";

export const SearchAutoComplete = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState(false);

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
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
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
            : data.map((d) => {
                return (
                  <div key={d.global_id}>
                    <div style={{ padding: "3px" }}>{d.name}</div>
                    <hr />
                  </div>
                );
              })}
        </div>
      )}
    </div>
  );
};

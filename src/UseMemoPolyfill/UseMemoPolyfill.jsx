import { useState } from "react";
import { useMemoPolyfill } from "./useMemoPolyfill";

export default function UseMemoPolyfill() {
    const [count, setCount] = useState(0);
    const [anotherValue, setAnotherValue] = useState(1);

    const memoizedValue = useMemoPolyfill(() => {
        console.log("inside polyfill")
        return anotherValue + count;
    }, [anotherValue]);

    return (
        <div className="App">
            <p>Count: {count}</p>
            <p>Memoized: {memoizedValue}</p>
            <button onClick={() => setCount((prevCount) => prevCount + 1)}>
                Increase count
            </button>
            <button onClick={() => setAnotherValue((prevVal) => prevVal + 1)}>
                Increase Another count
            </button>
        </div>
    );
}
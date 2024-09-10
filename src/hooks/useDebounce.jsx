import { useState, useEffect } from "react";

/**
 * useDebounce hook
 * @param value - the value to debounce
 * @param delay - delay in milliseconds (ms)
 * @returns Debounced value after the specified delay
 */
function useDebounce(value, delay) {
  // State to hold the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timer to change the value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timer on effect cleanup
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-call effect if value or delay changes

  return debouncedValue;
}

export default useDebounce;

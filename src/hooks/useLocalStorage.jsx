import { useState, useEffect } from 'react';

// This is my useLocalStorage custom hook. It allows me to store a key-value pair in local storage.

function useLocalStorage(key, firstValue = null) {
  const initialValue = localStorage.getItem(key) || firstValue;
  const [item, setItem] = useState(initialValue);

  useEffect(
    function setKeyInLocalStorage() {
      // console.debug("hooks useLocalStorage useEffect", "key=", key, "item=", item);
    if (item === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, item);
    }
  }, [key, item]);

  return [item, setItem];
}

export default useLocalStorage;
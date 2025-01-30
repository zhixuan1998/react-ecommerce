import './style.css';

import { useState, useRef, useEffect } from 'react';

function Component() {
  const isFirstRender = useRef(true);
  const inputRef = useRef(null);

  const [inputValidity, setInputValidity] = useState(true);

  useEffect(() => {
    if (isFirstRender.current === true) {
      isFirstRender.current = false;
    }
  }, []);

  function checkValidity() {
    setInputValidity(inputRef.current.checkValidity());
  }

  return (
    <>
      <input
        style={{ borderColor: inputValidity ? '#000000' : 'red' }}
        type="text"
        pattern="[a-zA-Z0-9]+"
        onBlur={checkValidity}
        required
        autoFocus
        ref={inputRef}
      />
      <div>{inputRef.current.validationMessage}</div>
    </>
  );
}

export { Component };

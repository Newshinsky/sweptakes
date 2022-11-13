import { useState } from "react";
import { useSelector } from 'react-redux'
const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e, id) => {
        if (e.target.id === id) {
            setValue({ ...value, [e.target.id]: e.target.value.replace(/[^0-9.]/g, '') })
        }
    };

    return {
        value,
        onChange: handleChange
    };
};

export default useInput;
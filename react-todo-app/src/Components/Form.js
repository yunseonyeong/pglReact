import React from 'react';

const Form = ({value, setValue, handleSubmit}) => {

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex pt-2">
      <input
        type="text"
        name="value"
        className="w-4/5 px-3 py-2 mr-4 text-gray-500 border rounded shadow"
        placeholder="해야 할 일을 입력하세요."
        value={value}
        onChange={handleChange}
      />
      <button
        className="w-1/5 p-2 hover:text-white hover:bg-blue-200 text-blue-400 border-2  border-blue-400  rounded"
        onClick={() => {
          handleSubmit(value);
        }}>
        입력
      </button>
    </div>
  );
}

export default Form;
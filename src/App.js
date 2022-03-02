import React, {useState} from 'react';
import './App.css';
import Data from './Data.js'
import List from './Components/List.js';
import Form from './Components/Form.js';

export default function App () {

  const [todoData, setTodoData] = useState(Data);
  const [value, setValue] = useState("");

  const handleSubmit = (value) => {
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };
    setTodoData([...todoData, newTodo]);
    setValue("");
  };

  const erasor = () => {
    let emptyTodo = [];
    setTodoData(emptyTodo);
  }
  
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1 className=''>할 일 목록</h1>
          <button
            className="p-2 hover:text-white hover:bg-blue-200 text-blue-400 border-2  border-blue-400 rounded"
            onClick={erasor}
          >
            모두 지우기
          </button>
        </div>
        <List todoData={todoData} setTodoData={setTodoData} />
        <Form value={value} setValue={setValue} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}
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
  
  return (
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>할 일 목록</h1>
        </div>
        <List todoData={todoData} setTodoData={setTodoData} />
        <Form value={value} setValue={setValue} handleSubmit={handleSubmit}/>
      </div>
    </div>
  );
}
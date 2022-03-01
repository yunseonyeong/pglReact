import React, {useState} from 'react';
import './App.css';
import Data from './Data.js'
import List from './Components/List';

export default function App () {

  const [todoData, setTodoData] = useState(Data);
  const [value, setValue] = useState("");

  

 

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleSubmit = (value) => {
    let newTodo = {
      id : Date.now(),
      title: value,
      completed : false,
    };
    setTodoData([...todoData, newTodo]);
    setValue("")
  }

  
 
  return (
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>할 일 목록</h1>
        </div>
        <List todoData={todoData} setTodoData={setTodoData}/>
       
        <input
          type="text"
          name="value"
          style={{ flex: "10", padding: "5px" }}
          placeholder="해야 할 일을 입력하세요."
          value={value}
          onChange={handleChange}
        />
        <button
          onClick={() => {
            handleSubmit(value);
          }}>입력</button>
          
        
      </div>
    </div>
  );
}
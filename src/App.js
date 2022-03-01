import React, {useState} from 'react';
import './App.css';
import Data from './Data.js'

export default function App () {

  const [todoData, setTodoData] = useState(Data);
  const [value, setValue] = useState("");

  const btnStyle = () => {
    return {
      color : "#fff",
      border: "none",
      padding: "5px 9px", 
      borderRadius: "50%",
      cursor: "pointer",
      float: "right",
    }
  }

  const getStyle = (completed) => { 
    return {
      padding : "10px",
      borderBottom : "1px #ccc dotted",
      textDecoration :  completed ? 'line-through':'none',
    }
  }

  const handleClick = (id) => {
    let newTodo = [...todoData];
    newTodo = newTodo.filter(data => data.id !== id);
    setTodoData(newTodo);
  }

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

  const handleCompletedChange = (id) => {
    let newTodoData = todoData.map((data) => {
      if (data.id === id){
        data.completed = !data.completed;
      }
      return data;
    });
    setTodoData(newTodoData);
  };
 
  return (
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>할 일 목록</h1>
        </div>
        {todoData.map((data) => {
          return (
            <div style={getStyle(data.completed)} key={data.id}>
              <input type="checkbox" defaultChecked={false} onChange={()=> {handleCompletedChange(data.id)}}/>
              {data.title}
              <button
                style={btnStyle()}
                onClick={() => {
                  handleClick(data.id);
                }}
              >
                x
              </button>
            </div>
          );
        })}
       
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
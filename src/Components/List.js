import React from 'react';

export default function List ({todoData, setTodoData}) {

  const btnStyle = () => {
    return {
      color: "#fff",
      border: "none",
      padding: "5px 9px",
      borderRadius: "50%",
      cursor: "pointer",
      float: "right",
    };
  };

  const getStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    };
  };

  const handleCompletedChange = (id) => {
    let newTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    setTodoData(newTodoData);
  };

   const handleClick = (id) => {
     let newTodo = [...todoData];
     newTodo = newTodo.filter((data) => data.id !== id);
     setTodoData(newTodo);
   };

  return(
    <div>
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
    </div>);
}
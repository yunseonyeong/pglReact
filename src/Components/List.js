import React from 'react';

export default function List ({todoData, setTodoData}) {

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
        <div key={data.id}>
          <div className="flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded ">
            <div className="items-center ">
              <input
                type="checkbox"
                defaultChecked={data.completed}
                onChange={() => {
                  handleCompletedChange(data.id);
                }}
              />
              <span className={data.completed ? "line-through px-2" : "px-2" } >{data.title}</span>
            </div>
            <div className="items-center">
              <button className='px-4 py-2 float-right'
                onClick={() => {
                  handleClick(data.id);
                }}
              >
                x
              </button>
            </div>
          </div>
        </div>
      );
    })}
    </div>);
}
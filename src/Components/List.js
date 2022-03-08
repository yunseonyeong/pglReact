import React, {useState} from 'react';


const List = ({id,title,edit,completed,todoData,setTodoData,provided,snapshot,handleRemove}) => {

  const [newTitle, setNewTitle] = useState(title);

  const handleCompletedChange = (id) => {
    let newTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    setTodoData(newTodoData);
    console.log(todoData);
  };


  // 수정 버튼 클릭시 상태 true, false 로 변화
  // 나중에 true면 input 보이게, false면 title 보이게 할거야.

  const editNewTitle = (id, newTitle) => {
    let newTodo = todoData.map((data) =>{
      if (data.id === id){
          data.title = newTitle;
      }
      return data;
    });
    setTodoData(newTodo);
  };

  const handleEdit = (id) => {
    let newTodo = todoData.map((data) => {
      if (data.id === id) {
        data.edit=!data.edit; 
      }
      return data;
    });
    setTodoData(newTodo);
  };
  //  새로 입력한 값으로 todoData의 title을 바꿔준다. 



  return (
    <div
      className={`${
        snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"
      } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`}
      key={id}
      {...provided.draggableProps}
      ref={provided.innerRef}
      {...provided.dragHandleProps}
    >
      <div className="items-center ">
        <input
          type="checkbox"
          defaultChecked={completed}
          onChange={() => {
            handleCompletedChange(id);
          }}
        />
        {edit ? (
          <>
            <input
              type="text"
              className="w-4/5 px-3 py-2 mr-4 text-gray-500 border rounded shadow"
              value={newTitle}
              onChange={(e) => {
                setNewTitle(e.target.value);
              }}
            />
          </>
        ) : (
          <>
            <span className={`${completed ? "line-through" : undefined} px-2`}>
              {title}
            </span>
          </>
        )}
      </div>
      <div className="items-center">
        <button
          className="px-4 py-2 float-right"
          onClick={() => {
            handleRemove(id);
          }}
        >
          x
        </button>
        {edit ? (
          <>
            <button
              className="px-4 py-2 float-right"
              onClick={() => {
                editNewTitle(id,newTitle);
                handleEdit(id);
              }}
            >
              완료
            </button>
          </>
        ) : (
          <>
            <button
              className="px-4 py-2 float-right"
              onClick={() => {
                handleEdit(id);
              }}
            >
              edit
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default List;
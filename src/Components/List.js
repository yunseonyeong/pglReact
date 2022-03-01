import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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

  const handleEnd = (result) => {
    const newTodoData = [...todoData];
    // 드래그드랍 하기 전 위치를 지운다., reorderdItem 에는 삭제된 요소(인덱스 아니고) 값이 담긴다.
    // splice(시작인덱스, 몇개 지울 지, 뭐 추가할지)
    const [reorderedItem] = newTodoData.splice(result.source.index, 1);
    // 그 요소 값을 드랍한 위치로 삽입해 옮긴다.
    newTodoData.splice(result.destination.index,0,reorderedItem);
    setTodoData(newTodoData);
  }  
  
   
  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((data,index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot)=>(
                      <div className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`}
                      key={data.id} {...provided.draggableProps} 
                      ref={provided.innerRef} {...provided.dragHandleProps}>
                        <div className="items-center ">
                          <input
                            type="checkbox"
                            defaultChecked={data.completed}
                            onChange={() => {
                              handleCompletedChange(data.id);
                            }}
                          />
                          <span
                            className={
                              `${data.completed ? "line-through" : undefined} px-2`
                            }
                          >
                            {data.title}
                          </span>
                        </div>
                        <div className="items-center">
                          <button
                            className="px-4 py-2 float-right"
                            onClick={() => {
                              handleClick(data.id);
                            }}
                          >
                            x
                          </button>
                        </div>
                      </div>
                    )
                  }
                </Draggable>
              ))}
              {provided.placeholder}
              {/*placeholder 속성은 목록에 빈 공간 만들어서 드래그 드랍할 때 좀 자연스러워짐 */}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
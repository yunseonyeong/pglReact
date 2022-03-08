import React from 'react';
import List from './List.js'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const Lists = ({todoData, setTodoData, handleRemove}) => {
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
              <>
                {todoData.map((data, index) => (
                  <Draggable
                    key={data.id}
                    draggableId={data.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <List
                        key={data.id}
                        id={data.id}
                        title={data.title}
                        edit={data.edit}
                        completed={data.completed}
                        todoData={todoData}
                        setTodoData={setTodoData}
                        provided={provided}
                        snapshot={snapshot}
                        handleRemove={handleRemove}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                {/*placeholder 속성은 목록에 빈 공간 만들어서 드래그 드랍할 때 좀 자연스러워짐 */}
              </>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Lists;
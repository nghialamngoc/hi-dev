import React from 'react'
import { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Column from './components/Column';
import initialData from './initial-data'
import './todoPage.scss'

export default function TodoPage() {
  const [todoData, setTodoData] = useState(initialData)
  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (type === 'column') {
      const fromIndex = source.index;
      const toIndex = destination.index;
      const newOrderColumn = Array.from(todoData.columnOrder)
      newOrderColumn.splice(fromIndex, 1);
      newOrderColumn.splice(toIndex, 0, draggableId);
      setTodoData({
        ...todoData,
        columnOrder: newOrderColumn
      })
      return;
    } else {
      if (source.droppableId === destination.droppableId) {
        // dragg and drop in same column
        const column = todoData.columns[source.droppableId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
          ...column,
          taskIds: newTaskIds
        }

        const newToDoData = {
          ...todoData,
          columns: {
            ...todoData.columns,
            [newColumn.id]: newColumn
          }
        }

        setTodoData(newToDoData);
      } else {
        // dragg and drop to another column
        const fromColumn = todoData.columns[source.droppableId];
        const toColumn = todoData.columns[destination.droppableId];

        const newFromTaskIds = Array.from(fromColumn.taskIds);
        const newToTaskIds = Array.from(toColumn.taskIds)
        newFromTaskIds.splice(source.index, 1);
        newToTaskIds.splice(destination.index, 0, draggableId);

        const newFromColumn = {
          ...fromColumn,
          taskIds: newFromTaskIds
        }

        const newToColumn = {
          ...toColumn,
          taskIds: newToTaskIds
        }

        const newToDoData = {
          ...todoData,
          columns: {
            ...todoData.columns,
            [newFromColumn.id]: newFromColumn,
            [newToColumn.id]: newToColumn
          }
        }
        setTodoData(newToDoData);
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="todo-container"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {
              todoData.columnOrder.map((columnId, index) => {
                // get column data
                const column = todoData.columns[columnId];
                // get task of column
                const tasks = column.taskIds.map(taskId => todoData.tasks[taskId]);
                return <Column key={column.id} column={column} tasks={tasks} index={index}></Column>
              }
              )}
            { provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

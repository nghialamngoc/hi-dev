import React, { useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Column from './components/Column'
import initialData from './initial-data'
import FormAdd from './components/FormAdd'
import { Modal } from 'antd'
import './todoPage.scss'

export default function TodoPage() {
  const [todoData, setTodoData] = useState(initialData);
  const [modalTitle, setModalTitle] = useState('')
  const [modalState, setModalState] = useState(false);

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
        if (destination.droppableId !== 'column-4') {
          newToTaskIds.splice(destination.index, 0, draggableId);
        }

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

  const onAdd = (data) => {
    const newTask = {
      id: data.createdDate.toString(),
      content: data.content
    };

    const newToDoData = JSON.parse(JSON.stringify(todoData));
    let columnId = '';
    switch (modalTitle) {
      case 'To Do':
        columnId = 'column-1'
        break;
      case 'In Progress':
        columnId = 'column-2'
        break;
      case 'Done':
        columnId = 'column-3'
        break;
      default:
        break;
    }
    if ( columnId === '' || newToDoData.columns == null || newToDoData.columns[columnId] == null || newToDoData.columns[columnId].taskIds == null ) {
      setModalState(false);
      return;
    }
    newToDoData.tasks[`task-${data.createdDate}`] = newTask;
    newToDoData.columns[columnId].taskIds = [ ...newToDoData.columns[columnId].taskIds, `task-${data.createdDate}`];
    setTodoData(newToDoData);
    setModalState(false);
  }

  const showModal = (title) => {
    setModalTitle(title)
    setModalState(true);
  };

  const handleCancel = e => {
    setModalState(false);
  };

  return (
    <div>

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
                  return <Column key={column.id} column={column} tasks={tasks} index={index} showModal={showModal}></Column>
                }
                )}
              { provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Modal
        title={`Add ${modalTitle} Task`}
        visible={modalState}
        onCancel={handleCancel}
        footer={null}
      >
        <FormAdd onAdd={onAdd}></FormAdd>
      </Modal>
    </div>
  )
}

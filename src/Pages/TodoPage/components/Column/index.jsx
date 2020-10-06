import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import InnerTask from '../InnerTask'
import './column.scss'

const Column = function (props) {
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {
        (provided) => (
          <div
            className="column-container"
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <h3
              className="column-title"
              {...provided.dragHandleProps}
            >
              {props.column.title}
            </h3>
            <Droppable droppableId={props.column.id} type="task">
              {
                (provided, snapshot) => (
                  <div
                    className={
                      snapshot.isDraggingOver ? 'column-tasks draggingOver' : snapshot.draggingFromThisWith ? 'column-tasks draggingOverColumn' : 'column-tasks'}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <InnerTask tasks={props.tasks}></InnerTask>
                    {provided.placeholder}
                  </div>
                )
              }
            </Droppable>
          </div>
        )
      }
    </Draggable>
  )
}

export default React.memo(Column);
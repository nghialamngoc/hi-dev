import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import Task from '../Task'
import './column.scss'

export default function Column(props) {
  return (
    <div className="column-container">
      <h3 className="column-title">{props.column.title}</h3>
      <Droppable droppableId={props.column.id}>
        {
          (provided, snapshot) => (
            <div
              className={
                snapshot.isDraggingOver ? 'column-tasks draggingOver': snapshot.draggingFromThisWith ? 'column-tasks draggingOverColumn' : 'column-tasks'} 
              ref={provided.innerRef}
              {...provided.droppableProps}
              >
              { props.tasks.map((task, index) => <Task key={task.id} task={task} index={index}></Task>) }
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>
    </div>
  )
}

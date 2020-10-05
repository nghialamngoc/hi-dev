import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import './task.scss'

export default function Task(props) {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      { (provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={snapshot.isDragging ? 'task-container dragging': 'task-container'}
          >
          {props.task.content}
        </div>
        )}
    </Draggable>
    
  )
}

import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import ToDoImage from '../../../../assets/Images/todo.jpg'
import InProgressImage from '../../../../assets/Images/inprogress.jpg'
import DoneImage from '../../../../assets/Images/done.jpg'
import './task.scss'

export default function Task(props) {
  const columnId = props.column.id;
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      { (provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={snapshot.isDragging ? 'task-container dragging': 'task-container'}
        >
          <img src={ columnId === 'column-1' ? ToDoImage : columnId === 'column-2' ? InProgressImage : DoneImage } alt="" width="70px"/>
          <span className="task-content">{props.task.content}</span>
          
        </div>
        )}
    </Draggable>
    
  )
}

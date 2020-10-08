import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import InnerTask from '../InnerTask'
import {
  PlusCircleOutlined
} from '@ant-design/icons';
import './column.scss'

const Column = function (props) {
  const columnId = props.column.id;

  return (
    <Draggable draggableId={columnId} index={props.index}>
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
              style={{ color: columnId === 'column-1' ? '#01ad01' : columnId === 'column-2' ? '#00bbf3' : columnId === 'column-3' ? '#e88b00' : 'red' }}
            >
              {props.column.title}
            </h3>
            <Droppable droppableId={columnId} type="task">
              {
                (provided, snapshot) => (
                  <div
                    className={
                      snapshot.isDraggingOver ? 'column-tasks draggingOver' : snapshot.draggingFromThisWith ? 'column-tasks draggingOverColumn' : 'column-tasks'}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <InnerTask tasks={props.tasks} column={props.column}></InnerTask>
                    { provided.placeholder}
                    { columnId !== 'column-4' &&
                      <div className="column-add">
                        <PlusCircleOutlined onClick={() => props.showModal(props.column.title)}></PlusCircleOutlined>
                      </div>
                    }
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
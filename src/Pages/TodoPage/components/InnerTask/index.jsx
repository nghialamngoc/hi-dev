import React from 'react'
import Task from '../Task'

const InnerTask = function (props) {
  return (
    <div style={{flexGrow: 1}}>
      {
        props.tasks.map((task, index) => <Task key={task.id} task={task} index={index} column={props.column}></Task>)
      }
    </div>
  )
}

export default React.memo(InnerTask);

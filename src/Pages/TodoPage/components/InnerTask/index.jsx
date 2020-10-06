import React from 'react'
import Task from '../Task'

const InnerTask = function (props) {
  return (
    <div>
      {
        props.tasks.map((task, index) => <Task key={task.id} task={task} index={index}></Task>)
      }
    </div>
  )
}

export default React.memo(InnerTask);

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Take out the garbage'},
    'task-2': { id: 'task-2', content: 'Watch my favorite show'},
    'task-3': { id: 'task-3', content: 'Charge my phone'}
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2', 'task-3']
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: []
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: []
    },
    'column-4': {
      id: 'column-4',
      title: 'Trash',
      taskIds: []
    }
  },
  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4']
}

export default initialData;
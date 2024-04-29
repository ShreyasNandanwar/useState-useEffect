import React from 'react'
import { useState, useEffect } from 'react'


const App = () => {
  
  const [tasks, setTasks] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    return storedTasks || [];
  });

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if(storedTasks){
      setTasks(storedTasks);
    }

  },[]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  },[tasks]);

  const addTask = (taskText) => {
    const newTask = {id: Date.now(), text:taskText, completed:false};
    setTasks([...tasks, newTask]);
  };

  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? {...task, completed: !task.completed} : task
    );
    setTasks(updatedTasks);
  };

  // if(typeof localStorage !== 'undefined'){
  //   console.log(JSON.stringify(tasks))
  // }else{
  //   console.error('localStorage not supported ')
  // }
  
  return (
    <>
      <h1>
        TODO LIST
      </h1>
      <form onSubmit={e => {
        e.preventDefault();
        const taskText = e.target.task.value.trim();
        if(taskText !== ''){
          addTask(taskText);
          e.target.task.value = '';
        }
      }}>
        <input type='text' name='task' placeholder='Add a new task' />
        <button type='submit'>Add Task</button>
      </form>
      <ul>
        {tasks.map( task => (
          <li key={task.id}>
            <input 
            type='checkbox' 
            checked={task.completed} 
            onChange={() => toggleTaskCompletion(task.id)}
            />
            <span style={{ color: (task.completed ? 'green': 'red') }}>
              {task.text} 
            </span>
            <button onClick={() => removeTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>

    </>
  );
};

export default App
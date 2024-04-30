import React from 'react'
import { useState, useEffect } from 'react'


const App = () => {
  //store the state of tasks
  const [tasks, setTasks] = useState(() => {
    //need to get the tasks already present in browser's localStorage or if not present then return empty array
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    return storedTasks || [];
  });

  useEffect(() => {
    // Get stored Items from localStorage of the browser
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if(storedTasks){
      //if there are storedTasks present, then store them in tasks using state updater setTasks()
      setTasks(storedTasks);
    }
  //dependency array is kept empty because we only want to call this useEffect once when DOM was first rendered(when components is mounted)
  },[]);


  // Now this useEffect is needed to store the tasks in the localstorage and it will only come into effect when it has something to do with the 'tasks'
  useEffect(() => {
    // we are converting the tasks to string type and then storing them in localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  },[tasks]);


  const addTask = (taskText) => {
    const newTask = {id: Date.now(), text:taskText, completed:false};
    // used spread operator to shallow copy the content of tasks to new array and append the newTask at the end of it and updating it in the tasks
    setTasks([...tasks, newTask]);
  };


  const removeTask = (taskId) => {
    // using filter function, we keep only those tasks where task.id!==taskId
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
            <span>{task.id}</span>
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
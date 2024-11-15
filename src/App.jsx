import './App.css'
import { useContext, useState } from 'react';
import TodoContext from './ContextProvider';

import { MdDeleteForever } from "react-icons/md";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import { IoSunnyOutline } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
import toast from 'react-hot-toast';
import moment from 'moment';


function App() {

  const { todos, setTodos } = useContext(TodoContext);
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
  }

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo(''); // Clear input field

      toast.success('Task Added Sucessfully')
    }
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
    toast.error('Task Deleted')
  };

  const toggleCompletion = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const [theme, setTheme] = useState('light'); // Initial theme

  const toggleTheme = () => {
    // Toggle between light and dark themes
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div data-theme={theme} className="min-h-screen p-4 container mx-auto">

      <div className='min-h-screen py-4 md:py-6 lg:py-8'>
        <div className='w-10/12 lg:w-8/12 mx-auto flex flex-col justify-center text-center'>
          <div className='flex items-center justify-evenly'>
            <h1 className='text-2xl md:text-4xl font-semibold'>Just Do It</h1>
            <button
              onClick={toggleTheme}
              className="btn btn-outline rounded-full"
            >
              {theme === 'light' ? <IoMoon /> : <IoSunnyOutline />}
            </button>
          </div>
          <form onSubmit={handleSubmit} className="join md:w-8/12 mx-auto my-4">
            <input
              name='add'
              className="input input-bordered join-item w-full"
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task"
            />
            <button className="btn join-item rounded-r-full w-2/6" onClick={addTodo}>Add</button>
          </form>

          <ul>
            <ul className="lg:w-6/12 mx-auto space-y-4">
              {
                todos.map((todo, index) => (
                  <li
                    key={index}
                    className="border px-4 py-2 rounded flex justify-between items-center">
                    <span
                      className={`text-2xl}`}
                      onClick={() => toggleCompletion(index)}
                    >
                      {
                        todo.completed ? <RiCheckboxBlankCircleFill /> : <RiCheckboxBlankCircleLine />
                      }
                    </span>

                    <span
                      className={`todo-item ${todo.completed ? 'line-through' : ''}`}
                    >{todo.text}</span>

                    <span
                      className='text-red-500 text-3xl'
                      onClick={() => removeTodo(index)}><MdDeleteForever /></span>
                  </li>
                ))
              }
            </ul>
          </ul>
          <p className='my-4'>
            {moment().format('MMMM Do YYYY')}
          </p>
        </div>


      </div>
    </div>
  )
}

export default App

import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])

  const save = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }



  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    settodos(newTodos)
    save()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    settodos(newTodos)
    save()

  }

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    save()
  }

  const handleChange = (e) => {
    settodo(e.target.value)

  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos)
    save()
  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-emerald-200 min-h-[80vh]">
      <div className='font-semibold text-center text-2xl'>v-List:Manage your to-dos at one place</div>
        <div className="addtodo my-4">
          <div className="text-lg font-semibold my-2">Add To-dos</div>
          <input onChange={handleChange} value={todo} type="text" className='w-1/2 rounded-md' />
          <button onClick={handleAdd} disabled={todo.length <= 1} className='bg-emerald-700 hover:bg-emerald-800 hover:font-medium text-white px-3 cursor-pointer rounded-md mx-3'>Add</button>
        </div>

        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <div className='text-lg font-semibold '>Your To-dos</div>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No To-dos to display</div>}

          {todos.map(item => {
            return  <div key={item.id} className={"todo flex  my-3 justify-between w-[65%] flex-col gap-2 md:flex-row"}>
              <div className='flex gap-5'>
                <input onChange={handleCheckbox} type="checkbox" value={item.isCompleted} name={item.id} id="" />
                <div  className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>

              <div className="btn flex h-full mx-5 gap-1 ">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-emerald-700 hover:bg-emerald-800 hover:font-medium text-white px-3 rounded-sm mx-1 p-1'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-emerald-700 hover:bg-emerald-800 hover:font-medium text-white px-3 rounded-sm mx-1 p-1'><AiFillDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>

    </>
  )
}

export default App



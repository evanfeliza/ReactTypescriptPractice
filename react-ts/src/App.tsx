import React, { useState } from 'react'
import InputField from './components/InputField'
import TodoList from './components/TodoList'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { Todo } from './modal.js'

const App: React.FC = ( ) => { 
  const [ todo , setTodo ] = useState<string>('')
  const [ todos , setTodos ] =useState <Todo[]>([])
  const [ completedTodos , setCompletedTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if(todos){  
      setTodos([...todos , {uid: Date.now() , text: todo , isDone: false}])
      setTodo('')
    }
  }

  const onDragEnd =( result:DropResult ) => {
    const { source , destination } = result
    if (!destination) return 
    if (destination.droppableId === source.droppableId && destination.index === source.index) return
  
    let add,
    active = todos ,
    complete = completedTodos
 
    if (source.droppableId === 'TodosList'){
      add = active[source.index]
      active.splice(source.index , 1)
    }else {
      add = complete[source.index]
      complete.splice(source.index , 1 )
    }

    if (destination.droppableId === 'TodosList'){
      active.splice(destination.index , 0 , add)
    }else {
      active.splice(destination.index , 0 , add)
    }

    setCompletedTodos(complete)
    setTodos(active)

  }
    return (
        <React.Fragment>
      <nav className='flex drop-shadow-md bg-slate-400 py-2'>
        <h1 className="text-white text-2xl font-extrabold uppercase mx-auto" >Taskify</h1>
      </nav>
      <DragDropContext onDragEnd={onDragEnd}>
      <section className='flex-wrap h-[100vh] w-[100vw] bg-gradient-to-r from-slate-500 to-blue-400'>
          <InputField 
            todo = {todo} 
            setTodo = {setTodo}
            handleAdd = {handleAdd}
            />
          <div className='p-4'>
            <TodoList setCompletedTodos={setCompletedTodos} completedTodos={completedTodos} todos={todos} setTodos={setTodos}/>
          </div>
          </section> 
      </DragDropContext>
    </React.Fragment>
    )
}

export default App

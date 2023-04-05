import React from 'react'
import { Todo } from '../modal'
import SingleTodo from './SingleTodo'
import { Droppable } from 'react-beautiful-dnd'

interface Props { 
  todos: Todo[] ,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  completedTodos: Todo[],
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = ( { todos ,setTodos ,completedTodos , setCompletedTodos}: Props) => {

  return (
    <section className='sm:flex gap-4'>
      <Droppable droppableId='TodosList'>
        {(provided)=>(
          <ul 
            ref={provided.innerRef} 
            {...provided.droppableProps} 
            className='grid flex-wrap container p-4 rounded-md gap-2 bg-gradient-to-b from-green-600 to-green-700'>{/*ACTIVE TASK*/}
         
          <h1 className='font-extrabold text-lg text-white'>Active Task</h1>
           {todos && todos.map((todo ,index) =>( 
           <SingleTodo index={index} todo={todo} todos={todos} setTodos={setTodos}/>
           ))}
           {provided.placeholder}
          </ul>
          
        )}
      </Droppable>
      <Droppable droppableId='TodosRemove'>
        {(provided) => (      
          <ul 
            ref={provided.innerRef}
            {...provided.innerRef}
            className='grid container p-4 gap-2 rounded-md bg-gradient-to-b from-red-600 to-red-700'> {/*COMPLETED TASK*/}
              <h1 className='font-extrabold text-lg text-white'>Completed Task</h1>
              {completedTodos && completedTodos.map((todo ,index) =>( 
              <SingleTodo 
                index={index}
                todo={todo}  
                todos={completedTodos} 
                setTodos={setCompletedTodos}/>
              ))} 
              {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </section>
  )
}


export default TodoList
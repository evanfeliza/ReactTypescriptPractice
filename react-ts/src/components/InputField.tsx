import React from 'react'

type Props = {
  todo: string, 
  setTodo: React.Dispatch<React.SetStateAction<string>>,
  handleAdd:( e: React.FormEvent ) => void
}

const InputField: React.FC<Props> = ( {todo , setTodo ,handleAdd} ) => {


  return (  
    <form onSubmit={e=>{
      handleAdd(e)}
      } className='flex justify-center p-4 '>
      <input
       value={todo}
       onChange={ e => {
        setTodo(e.target.value)
       }} 
       className='relative rounded-full w-full p-4'
       placeholder='Add a tasks'/> 
      <button className='absolute right-[20px] top-[68px] rounded-full bg-green-500 p-3' type='submit'><span>Go</span></button>
    </form>
  )
}

export default InputField
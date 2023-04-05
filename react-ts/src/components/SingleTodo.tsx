import React, { useState, useRef, useEffect} from "react";
import { Todo } from "../modal";
import {
  AiFillEdit,
  AiFillDelete,
  AiOutlineFileDone,
} from "react-icons/ai";
import { Draggable , } from "react-beautiful-dnd";

type Props = {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo: React.FC<Props> = ({ index, todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.text);
  
  const handleDone = (uid: number) => {
    setTodos(todos.map((todo) =>
    todo.uid === uid ? { ...todo, isDone: !todo.isDone } : todo
    ))
    console.log(todo.isDone)
  }

  const handleDelete = (uid: number) => {
    setTodos(todos.filter((todo) => todo.uid !== uid))
  };

  const handleEdit = (e: React.FormEvent, uid: number) => {
    e.preventDefault();
    setTodos(todos.map((todo) =>
    todo.uid === uid
      ? { ...todo, text: editTodo }
      : todo
    ))
    setEdit(false);
  };

  const editRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    editRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.uid.toString()} index={index}>
        { (provided)=> (
          <React.Fragment>
          <form
            ref={provided.innerRef} 
            {...provided.draggableProps} 
            {...provided.dragHandleProps}
            onSubmit={(e) => handleEdit(e, todo.uid)}
            className="flex gap-2 hover:scale-[101%]  hover:duration-500 justify-between p-2 rounded-md bg-gradient-to-r from-yellow-500 to-yellow-300"
          >
            {edit ? (
              <input
                ref={editRef}
                className="outline-none bg-inherit"
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)}
              />
            ) : todo.isDone ? (
              <s>{todo.text}</s>
            ) : (
              <span>{todo.text}</span>
            )}
            <div className="flex items-center gap-2 ">
              <span
                onClick={() => {
                  if (!edit && !todo.isDone) {
                    setEdit(!edit);
                  }
                }}
                className="mx-auto text-center"
              >
                <AiFillEdit />
              </span>
    
              <span
                onClick={() => handleDelete(todo.uid)}
                className="mx-auto text-center"
              >
                <AiFillDelete />
              </span>
    
              <span
                onClick={() => handleDone(todo.uid)}
                className="mx-auto text-center"
              >
                <AiOutlineFileDone />
              </span>
            </div>
          </form>
        </React.Fragment>
    
        )}  
    </Draggable>
  );
};

export default SingleTodo;

import React, { useState, useRef, useEffect, FC } from 'react';
import ComponentTodoList from './TodoList';
import { TypeTodo } from "./Todo";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

const App: FC = () => {
  const [todos, setTodos] = useState<TypeTodo[]>([]);

  const RefTodoName: any = useRef();
  let RefBtnAddTodo = useRef();

  useEffect(() => {
    let storedTodos = localStorage.getItem("todoApp.todos")
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todoApp.todos", JSON.stringify(todos))
  }, [todos])

  function FuncToggleTodo(id: string) {
    const newTodos = [...todos]
    const todo = newTodos.find((t) => t.id === id)
    if (todo) { todo.completed = !todo.completed };
    setTodos(newTodos)
  }

  let FuncAddTodo = () => {
    const text = RefTodoName.current.value
    if (text === "") return;
    setTodos((prevTodos: TypeTodo[]): TypeTodo[] => {
      return [...prevTodos, { id: uuidv4(), text, completed: false }]
    })
    RefTodoName.current.value = null
  }

  function FuncHandleClearTodos() {
    const newTodos = todos.filter(t => !t.completed)
    setTodos(newTodos)
  }

  const FuncKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      // @ts-ignore
      RefBtnAddTodo.click()
    }
  }

  return (
    <>
      <ComponentTodoList todos={todos} FuncToggleTodo={FuncToggleTodo} />
      <input type="text" ref={RefTodoName} onKeyUp={FuncKeyUp} />
      <br />
      {/* @ts-ignore */}
      <button onClick={FuncAddTodo} ref={node => (RefBtnAddTodo = node)}>Add Todo</button>
      <button onClick={FuncHandleClearTodos}>Clear Completed Todos</button>
      <div>{todos.filter((t: TypeTodo) => !t.completed).length} left Todo</div>
    </>
  )
}

export default App;

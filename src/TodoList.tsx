import React from 'react';
import ComponentTodo, { TypeTodo } from "./Todo";

export default function ComponentTodoList({ todos, FuncToggleTodo }: { todos: TypeTodo[], FuncToggleTodo: (id: string) => void }) {
  return (
    <>
      {
        todos.map(todo => {
          return <ComponentTodo key={todo.id} todo={todo} FuncToggleTodo={FuncToggleTodo} />
        })
      }
    </>
  )
}

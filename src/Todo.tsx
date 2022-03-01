import React from 'react'

export type TypeTodo = {
  id: string,
  text: string,
  completed: boolean
}

export default function ComponentTodo({ todo, FuncToggleTodo }: { todo: TypeTodo, FuncToggleTodo: (id: string) => void }) {

  function FuncHandleTodoClick() {
    FuncToggleTodo(todo.id)
  }

  return (
    <div>
      <label>
        <input type="checkbox" checked={todo.completed} onChange={FuncHandleTodoClick} />
        <span>{todo.text}</span>
      </label>
    </div>
  )
}

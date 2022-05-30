import React, { useEffect, useState } from 'react'
import TodoItem from './components/TodoItem'
import AddTodo from './components/AddTodo'
import axios from 'axios'

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([])

  useEffect(() => {
    axios
    .get('http://localhost:3001/tasks/list')
    .then(res => {
      console.log(res.data)
      setTodos(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

 const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
   e.preventDefault()
   let count : number = todos.length
   const todo: ITodo = {
    _id : count+1,
    name: formData.name,
    description: formData.description,
    status: false,
    tag: formData.tag,
    date: formData.date
  }
   axios.post(
    'http://localhost:3001/tasks/addTask',
    todo
  )
  .then(res => {
    console.log(res);
    setTodos(res.data);
    window.location.reload();
  })
  .catch(err => {
    console.log(err)
  })
}

  const handleUpdateTodo = (todo: ITodo): void => {
    const todoUpdate: ITodo = {
      _id : todo._id,
      name: todo.name,
      description: todo.description,
      status: true,
      tag: todo.tag,
      date: todo.date
    }
     axios.put( 'http://localhost:3001/tasks/'+todo._id, todoUpdate ) 
     .then(res => { console.log(res); setTodos(res.data);window.location.reload(); }) 
     .catch(err => { console.log(err) })
  }
  const handleDeleteTodo = (_id: number): void => {
    console.log(_id)
    let id : number = _id-1
    console.log(id)
    axios.delete(
      `http://localhost:3001/tasks/delete/${id}`
    )
    .then(res => {
      console.log(res.data)
      setTodos(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }
  const conditionTodo = (todo : ITodo): any => {
    if(todo != null){
     return  <TodoItem
          key={todo._id}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={todo}
        />
    }
  }
  return (
    <main className='App'>
      <h1>My Todos</h1>
      <AddTodo saveTodo={handleSaveTodo} />
      {todos.map((todo: ITodo) => (
       conditionTodo(todo)
      ))}
    </main>
  )
}

export default App
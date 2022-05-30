interface ITodo {
    _id: number
    name: string
    description: string
    date?: string
    tag?: string
    status: boolean
}

type TodoProps = {
    todo: ITodo
}

type ApiDataType = {
    message: string
    status: string
    todos: ITodo[]
    todo?: ITodo
  }
  
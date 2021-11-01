import React, {useState} from 'react';
import Todos from '../components/todos/Todos';
import TodoForm from '../components/todos/TodoForm';

const TodoList = () => {

    // const initialState = [
    //     { id: 1, title: "Make coffee", done: false },
    //     { id: 2, title: "read abook", done: true },
    //     { id: 3, title: "watch move", done: false },
    //     { id: 4, title: "Codding", done: true },
    // ];

    const initialState = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];

    const [todos, setTodos] = useState(initialState);
    const [activeTodo, setActiveTodo] = useState({});
    // modes => add || not-done || edit
    const [mode, setMode] = useState("add");

    const setToLocal = (todos) => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }


    
    // change completed todos
    const changeTodoComplete = (id) => {
        const curTodos = [...todos];
        const newTodos = curTodos.map((el) => {
            if (el.id === id) {
                el.done = !el.done;
                return el;
            }
            return el;
        });
        setToLocal(newTodos);
        setTodos(newTodos);
    };
    // delete completed todos 
    const deleteTodo = (id) => {
        const curTodos = [...todos];
        const newTodos = curTodos.filter((el) => el.id !== id);
        setToLocal(newTodos);
        setTodos(newTodos);
    };
    // add new todo
    const addTodoHandler = (title) => {
        if (mode !== "edit") {
            const newTodo = {
                id: Date.now(), // always get unique id
                title: title,
                done: false,
            };
            const newTodos = [...todos, newTodo];
            setToLocal(newTodos);
            setTodos(newTodos);
        } else {
            const curTodos = [...todos];
            const newTodos = curTodos.map((el) => {
                if (el.id === activeTodo.id) {
                    el.title = title;
                    return el;
                }
                return el;
            });
            setToLocal(newTodos);
            setTodos(newTodos);
            setActiveTodo({});
            setMode("add");
       }
    };
    // filter uncompleted todos
    const showUncompleteHandle = () => {
        if (mode === "not-done") {
            setMode("add");
        } else {
            setMode("not-done");
       }
    };
    let currentTodos = [...todos];
    if (mode === "not-done") {
        currentTodos = currentTodos.filter((todo) => !todo.done);
    }

    const editTodo = (todo) => {
        setMode("edit");
        setActiveTodo(todo);
    }


    return (
        <main>
        <div className="container">
            <div className="todos">
                    <TodoForm todos={mode !== "edit" ? currentTodos : [activeTodo]} mode={mode} addTodoHandler={addTodoHandler} showUncompleteHandle={ showUncompleteHandle }/>
                    <Todos todos={mode !== "edit" ? currentTodos : [activeTodo]} changeTodoComplete={changeTodoComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
            </div>
        </div>
        </main>
    )
}

export default TodoList

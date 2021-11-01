import React from 'react';
import Todo from "./Todo";

const Todos = (props) => {
    return (
        <div className="todos-list">
            
            {props.todos.map((todo) => {

                return <Todo todo={todo} key={todo.id} changeTodoComplete={props.changeTodoComplete} deleteTodo={ props.deleteTodo } editTodo={props.editTodo} />
                
            })}
            {props.todos.length === 0 ? (
                <h3 className="no-todos"> there is no mission to do ...</h3>
            ) : null}
        </div>
    );
};

export default Todos

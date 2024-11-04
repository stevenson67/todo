import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleComplete, deleteTodo } from '../slices/todoSlice';

interface TodoItemProps {
    todo: {
        id: string;
        text: string;
        completed: boolean;
    };
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    const dispatch = useDispatch();

    return (
        <li>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleComplete(todo.id))}
            />
            <span>{todo.text}</span>
            <button onClick={() => dispatch(deleteTodo(todo.id))}>Удалить</button>
        </li>
    );
};

export default TodoItem;

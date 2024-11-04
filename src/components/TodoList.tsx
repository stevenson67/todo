import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addTodo, clearAll, clearTrash } from '../slices/todoSlice';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState('all');
    const todos = useSelector((state: RootState) => state.todos.items);
    const dispatch = useDispatch();

    const handleAddTodo = () => {
        if (newTask.trim()) {
            dispatch(addTodo(newTask));
            setNewTask('');
        }
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'current') return !todo.completed && !todo.trashed;
        if (filter === 'completed') return todo.completed && !todo.trashed;
        if (filter === 'trash') return todo.trashed;
        return !todo.trashed;
    });

    return (
        <div className="todo">
            <div className="todo__head">
                <button onClick={handleAddTodo}>Добавить</button>
                <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
                <button onClick={() => dispatch(clearAll())}>Очистить</button>
            </div>

            <div className="todo__content">
                <div className="todo__filter">
                    <button onClick={() => setFilter('all')}>Все задачи</button>
                    <button onClick={() => setFilter('current')}>Текущие задачи</button>
                    <button onClick={() => setFilter('completed')}>Выполненные задачи</button>
                    <button onClick={() => setFilter('trash')}>Корзина</button>
                </div>

                <ul>
                    {filteredTodos.map(todo => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))}
                </ul>
            </div>

            {filter === 'trash' && <button onClick={() => dispatch(clearTrash())}>Очистить корзину</button>}
        </div>
    );
};

export default TodoList;

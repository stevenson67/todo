import { createSlice } from '@reduxjs/toolkit';

interface Todo {
    id: string;
    text: string;
    completed: boolean;
    trashed: boolean;
}

interface TodoState {
    items: Todo[];
}

const initialState: TodoState = {
    items: JSON.parse(localStorage.getItem('todos') || '[]'),
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: new Date().toISOString(),
                text: action.payload,
                completed: false,
                trashed: false,
            };
            state.items.push(newTodo);
            localStorage.setItem('todos', JSON.stringify(state.items));
        },
        toggleComplete: (state, action) => {
            const todo = state.items.find(item => item.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
                localStorage.setItem('todos', JSON.stringify(state.items));
            }
        },
        deleteTodo: (state, action) => {
            const todo = state.items.find(item => item.id === action.payload);
            if (todo) {
                todo.trashed = true;
                localStorage.setItem('todos', JSON.stringify(state.items));
            }
        },
        clearAll: (state) => {
            state.items = [];
            localStorage.removeItem('todos');
        },
        clearTrash: (state) => {
            state.items = state.items.filter(todo => !todo.trashed);
            localStorage.setItem('todos', JSON.stringify(state.items));
        },
    },
});

export const { addTodo, toggleComplete, deleteTodo, clearAll, clearTrash } = todoSlice.actions;
export default todoSlice.reducer;

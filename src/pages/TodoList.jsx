import { useState } from "react";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoIsCompletedMutation,
  useUpdateTodoMutation,
} from "../redux/apiSlice";

const TodoList = () => {
  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();
  const [
    addTodo,
    { isLoading: isAddTodoLoading, isSuccess: isAddTodoSuccess },
  ] = useAddTodoMutation();
  const [
    updateTodo,
    { isLoading: isUpdateTodoLoading, isSuccess: isUpdateTodoSuccess },
  ] = useUpdateTodoMutation();
  const [updateTodoIsCompleted] = useUpdateTodoIsCompletedMutation();
  const [
    deleteTodo,
    { isLoading: isDeleteTodoLoading, isSuccess: isDeleteTodoSuccess },
  ] = useDeleteTodoMutation();

  const [newTodoTitle, setnewTodoTitle] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [editText, setEditText] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;
    const newTodo = { id: Date.now(), title: newTodoTitle, completed: false };
    addTodo(newTodo);
    setnewTodoTitle("");
  };

  const handleDelete = async (id) => {
    deleteTodo(id);
  };

  const handleToggle = async (todo) => {
    updateTodoIsCompleted(todo);
  };

  const startEditing = (todo) => {
    setEditingTodo(todo.id);
    setEditText(todo.title)
  };

  const handleEdit = async (id) => {
    const updatedTodo = todos.find((todo) => todo.id === id);
    updateTodo({ updatedTodo, editText });
    setEditText("");
    setEditingTodo(null);
  };

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (isError)
    return <div className="text-center text-error">Error loading todos</div>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Todo List</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setnewTodoTitle(e.target.value)}
          placeholder="Add new todo"
          className="input input-bordered flex-1"
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={newTodoTitle === "" ? true : false}
        >
          Add
        </button>
      </form>

      <ul className="space-y-4">
        {todos?.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-4 bg-base-200 p-4 rounded-lg"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo)}
              className="checkbox"
            />

            {editingTodo === todo.id ? (
              <div className="flex-1 flex gap-2 items-center">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="input input-bordered flex-1"
                />
                <button
                  onClick={() => handleEdit(todo.id)}
                  className="btn btn-success btn-sm"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingTodo(null)}
                  className="btn btn-active btn-sm"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <span
                  className={`flex-1 ${
                    todo.completed ? "line-through text-base-content/70" : ""
                  }`}
                >
                  {todo.title}
                </span>
                <button
                  onClick={() => startEditing(todo)}
                  className="btn btn-active btn-sm"
                >
                  Edit
                </button>
              </>
            )}

            <button
              onClick={() => handleDelete(todo.id)}
              className="btn btn-error btn-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

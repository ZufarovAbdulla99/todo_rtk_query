import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
        query: () => "/todos",
        providesTags: ["Todos"],
    }),
    addTodo: builder.mutation({
        query: (todo) => ({
            url: "/todos",
            method: "POST",
            body: JSON.stringify(todo),
        }),
        invalidatesTags: ["Todos"]
    }),
    updateTodo: builder.mutation({
        query: ({updatedTodo, editText}) => ({
            url: `/todos/${updatedTodo.id}`,
            method: "PATCH",
            body: JSON.stringify({...updatedTodo, title: editText})
        }),
        invalidatesTags: ["Todos"]
    }),
    updateTodoIsCompleted: builder.mutation({
        query: (todo) => ({
            url: `/todos/${todo.id}`,
            method: "PATCH",
            body: {...todo, completed: !todo.completed}
        }),
        invalidatesTags: ["Todos"]
    }),
    deleteTodo: builder.mutation({
        query: (id) => ({
            url: `/todos/${id}`,
            method: "DELETE",
        }),
        invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useUpdateTodoIsCompletedMutation,
  useDeleteTodoMutation,
} = apiSlice;

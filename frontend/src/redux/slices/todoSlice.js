import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, thunkAPI) => {
  try {
    const response = await axios.get('/todo/tasks');
    return response.data.tasks;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const createTodo = createAsyncThunk('todos/createTodo', async (task, thunkAPI) => {
  try {
    const response = await axios.post('/todo/tasks', task);
    return response.data.task;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id, thunkAPI) => {
  try {
    await axios.delete(`/todo/tasks/${id}`);
    return id; 
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateTodoStatus = createAsyncThunk('todos/updateTodoStatus', async ({ id, status }, thunkAPI) => {
  try {
    const response = await axios.put(`/todo/tasks/${id}`, { status });
    //console.log(response.data.task)
    return response.data.task;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: { tasks: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        //console.log(action.payload)
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.loading = false;
      })
      .addCase(createTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        console.log(state.tasks, action.payload);
        state.tasks = state.tasks.filter(task => task._id !== action.payload); 
        state.loading = false;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })


      .addCase(updateTodoStatus.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateTodoStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTodoStatus.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default todoSlice.reducer;

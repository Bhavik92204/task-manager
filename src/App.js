import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, List, ListItem, Checkbox, FormControlLabel, Box, Container, Typography, Grid, Paper } from '@mui/material';
import './App.css';

// CalendarPage
import CalendarPage from './CalendarPage'; // CalendarPage component

function App() {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTaskText, setNewTaskText] = useState('');

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      // Convert dueDate back to Date object if it's a string
      const tasksWithCorrectDueDate = savedTasks.map(task => ({
        ...task,
        dueDate: task.dueDate ? new Date(task.dueDate) : null,
      }));
      setTasks(tasksWithCorrectDueDate);
    }
  }, []);

  // Save tasks to localStorage whenever the tasks state changes
  useEffect(() => {
    if (tasks.length > 0) {
      const tasksToSave = tasks.map(task => ({
        ...task,
        dueDate: task.dueDate ? task.dueDate.toISOString() : null, // Convert Date to ISO string
      }));
      localStorage.setItem('tasks', JSON.stringify(tasksToSave));
    }
  }, [tasks]);

  const addTask = () => {
    if (task.trim()) {
      const newTask = { 
        id: Date.now(), 
        text: task, 
        completed: false, 
        priority, 
        dueDate: dueDate ? new Date(dueDate) : null // Ensure dueDate is a Date object
      };
      setTasks([...tasks, newTask]);
      setTask('');
      setPriority('medium');
      setDueDate(null);
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map((task) => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setNewTaskText(taskToEdit.text);
    setEditingTaskId(id);
  };

  const updateTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTaskId ? { ...task, text: newTaskText } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setNewTaskText('');
  };

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Separate tasks into two categories: due date and no due date
  const tasksWithDueDate = tasks.filter(task => task.dueDate !== null);
  const tasksWithoutDueDate = tasks.filter(task => task.dueDate === null);

  return (
    <Router>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', marginTop: 4 }}>
          <Typography variant="h3" sx={{ color: '#3f51b5' }}>Task Manager</Typography>

          {/* Side-by-side layout */}
          <Grid container spacing={4} sx={{ marginTop: 2 }}>
            {/* Task Manager Column */}
            <Grid item xs={12} sm={8}>
              {/* Task input */}
              <TextField 
                fullWidth 
                variant="outlined"
                label="Enter Task"
                value={task} 
                onChange={(e) => setTask(e.target.value)} 
                sx={{ marginTop: 2 }}
                InputProps={{
                  style: { borderRadius: 12 }
                }}
              />

              {/* Priority dropdown */}
              <FormControl fullWidth variant="outlined" sx={{ marginTop: 2 }}>
                <InputLabel>Priority</InputLabel>
                <Select 
                  value={priority} 
                  onChange={(e) => setPriority(e.target.value)} 
                  label="Priority"
                  sx={{
                    borderRadius: 12
                  }}
                >
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>

              {/* Date Picker */}
              <DatePicker 
                selected={dueDate} 
                onChange={(date) => setDueDate(date)} 
                placeholderText="Select due date" 
                customInput={
                  <TextField 
                    fullWidth 
                    label="Due Date"
                    variant="outlined"
                    sx={{ marginTop: 2, borderRadius: 12 }}
                  />
                }
              />

              {/* Button container */}
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={addTask} 
                  sx={{
                    marginRight: 1, 
                    ':hover': {
                      backgroundColor: '#3f51b5',
                      transform: 'scale(1.05)',
                    },
                    borderRadius: 20
                  }}
                >
                  Add Task
                </Button>
              </Box>

              {/* Search input */}
              <TextField 
                fullWidth 
                variant="outlined" 
                label="Search Tasks"
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                sx={{ marginTop: 2, borderRadius: 12 }}
              />

              {/* Edit task */}
              {editingTaskId && (
                <Box sx={{ marginTop: 2 }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    label="Edit Task"
                    sx={{ borderRadius: 12 }}
                  />
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={updateTask} 
                    sx={{ marginTop: 2, borderRadius: 20 }}
                  >
                    Save Changes
                  </Button>
                </Box>
              )}

              {/* Tasks without due date */}
              <Typography variant="h6" sx={{ marginTop: 4 }}>Tasks Without Due Date</Typography>
              <List sx={{ marginTop: 2 }}>
                {tasksWithoutDueDate.map((task) => (
                  <ListItem 
                    key={task.id} 
                    sx={{ 
                      backgroundColor: task.completed ? '#d3f8d3' : '#fff', 
                      marginBottom: 2, 
                      borderRadius: 1, 
                      padding: 2, 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      boxShadow: 2
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <FormControlLabel 
                        control={<Checkbox checked={task.completed} onChange={() => toggleComplete(task.id)} />}
                        label={`${task.text} - Priority: ${task.priority}`}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button 
                        variant="outlined" 
                        color="primary" 
                        onClick={() => editTask(task.id)} 
                        sx={{ padding: '6px 12px', borderRadius: 20 }}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="outlined" 
                        color="secondary" 
                        onClick={() => deleteTask(task.id)}
                        sx={{ padding: '6px 12px', borderRadius: 20 }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Grid>

            {/* Calendar Column */}
            <Grid item xs={12} sm={4}>
              <Paper sx={{ padding: 2, borderRadius: 2, boxShadow: 2 }}>
                <CalendarPage tasks={tasksWithDueDate} />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Router>
  );
}

export default App;

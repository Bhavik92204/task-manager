import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Box, Typography, List, ListItem, Checkbox, FormControlLabel } from '@mui/material';

function CalendarPage({ tasks }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Function to handle date selection
  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  // Function to check if a date is valid
  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
  };

  // Filter tasks based on selected date
  useEffect(() => {
    const filtered = tasks.filter(
      (task) => task.dueDate && isValidDate(task.dueDate) && task.dueDate.toLocaleDateString() === selectedDate.toLocaleDateString()
    );
    setFilteredTasks(filtered);
  }, [tasks, selectedDate]);

  // Tasks with a due date, to be displayed below the calendar
  const tasksWithDueDate = tasks.filter(task => task.dueDate && isValidDate(task.dueDate));

  return (
    <Box sx={{ textAlign: 'center', marginTop: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>Task Calendar</Typography>
      
      {/* Large Calendar */}
      <Calendar
        onChange={onDateChange}
        value={selectedDate}
      />

      {/* Display tasks for the selected date */}
      {filteredTasks.length > 0 ? (
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6">Tasks for {selectedDate.toLocaleDateString()}:</Typography>
          <List>
            {filteredTasks.map((task) => (
              <ListItem key={task.id} sx={{ marginTop: 2 }}>
                <FormControlLabel
                  control={<Checkbox checked={task.completed} />}
                  label={task.text}
                  // Apply line-through style if task is completed
                  sx={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? 'gray' : 'inherit'
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        <Typography variant="body1" sx={{ marginTop: 2 }}>No tasks for this date.</Typography>
      )}

      {/* Display all tasks with due dates */}
      <Box sx={{ marginTop: 6 }}>
        <Typography variant="h6">All Tasks With Due Dates:</Typography>
        <List>
          {tasksWithDueDate.length > 0 ? (
            tasksWithDueDate.map((task) => (
              <ListItem key={task.id} sx={{ marginTop: 2 }}>
                <FormControlLabel
                  control={<Checkbox checked={task.completed} />}
                  label={`${task.text} - Due: ${task.dueDate ? task.dueDate.toLocaleDateString() : "No due date"}`}
                  // Apply line-through style if task is completed
                  sx={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? 'gray' : 'inherit'
                  }}
                />
              </ListItem>
            ))
          ) : (
            <Typography variant="body1">No tasks with due dates.</Typography>
          )}
        </List>
      </Box>
    </Box>
  );
}

export default CalendarPage;

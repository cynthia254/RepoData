import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
import { Task } from './src/text'; // Ensure you have a Task interface defined

const Stack = createNativeStackNavigator();

export default function App() {
  const [tasks, setTasks] = useState([]);


  // Function to load tasks from AsyncStorage
  const loadTasks = async () => {
    const storedTasks = await AsyncStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Save tasks function
  const saveTasks = async (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // Handle adding a new task
  const addTask = (newTask: Task) => {
    saveTasks([...tasks, newTask]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Task List">
          {(props) => <TaskList {...props} tasks={tasks} />}
        </Stack.Screen>
        <Stack.Screen name="Add Task">
          {(props) => <AddTask {...props} saveTask={addTask} />}
        </Stack.Screen>
        <Stack.Screen name="Edit Task">
          {(props) => <EditTask {...props} saveTask={saveTasks} tasks={tasks} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

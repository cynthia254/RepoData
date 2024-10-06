// src/components/TaskList.tsx
import React from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
import { Task } from '../src/text'; // Adjust this based on your folder structure

interface TaskListProps {
  tasks: Task[];
  navigation: any; // Use a more specific type if available
}

const TaskList: React.FC<TaskListProps> = ({ tasks, navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Add Task"
        onPress={() => navigation.navigate('Add Task')}
      />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text>{item.name}</Text>
            <Text>{item.dueDate}</Text>
            <Text>{item.status}</Text>
            <Button
              title="Edit"
              onPress={() => navigation.navigate('Edit Task', { task: item })}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  taskItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default TaskList;

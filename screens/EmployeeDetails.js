
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmployeeDetails = ({ route }) => {
  const { employee } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name: {employee.employee_name}</Text>
      <Text style={styles.text}>Salary: {employee.employee_salary}</Text>
      <Text style={styles.text}>Age: {employee.employee_age}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default EmployeeDetails;
            
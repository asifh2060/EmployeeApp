import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EmployeeList = ({ navigation }) => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedEmployees = await AsyncStorage.getItem("employees");
        if (cachedEmployees) {
          setEmployees(JSON.parse(cachedEmployees));
          setFilteredEmployees(JSON.parse(cachedEmployees));
        } else {
          const response = await fetch(
            "https://dummy.restapiexample.com/api/v1/employees"
          );
          const data = await response.json();
          setEmployees(data.data);
          setFilteredEmployees(data.data);
          await AsyncStorage.setItem("employees", JSON.stringify(data.data));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = text => {
    setSearch(text);
    if (text) {
      const newData = employees.filter(item => {
        const employeeName = item.employee_name
          ? item.employee_name.toUpperCase()
          : '';
        const employeeSalary = item.employee_salary
          ? item.employee_salary.toString().toUpperCase()
          : '';
        const employeeAge = item.employee_age
          ? item.employee_age.toString().toUpperCase()
          : '';
        const itemData = `${employeeName} ${employeeSalary} ${employeeAge}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredEmployees(newData);
    } else {
      setFilteredEmployees(employees);
    }
  };


  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        value={search}
        onChangeText={(text) => handleSearch(text)}
        style={styles.searchInput}
      />
      <FlatList
        data={filteredEmployees}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("EmployeeDetails", { employee: item })
            }
          >
            <Text style={styles.itemText}>{item.employee_name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  searchInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10
  },
  itemText: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc"
  }
});

export default EmployeeList;

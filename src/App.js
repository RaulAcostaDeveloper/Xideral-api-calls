import React, { createContext, useEffect, useState } from 'react';
import './output.css';
import { EmpleadosPage } from './Pages/EmpleadosPage';
import { AgregarEmpleadoPage } from './Pages/AgregarEmpleadosPage';
import { DetallesDelEmpleadoPage } from './Pages/DetallesDelEmpleadoPage';
import { EditarEmpleadoPage } from './Pages/EditarEmpleadosPage';
import { getAllEmployees, getAllUsers } from './ApiCalls/Getters';

export const DataContext = createContext();

function App() {
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  // Todo el objeto de empleados
  const [employees, setEmployees] = useState();
  // Todo el objeto de usuarios
  const [users, setUsers] = useState();
  // Actual employee data
  const [empleadoActual, setEmpleadoActual] = useState();
  // Actual user data
  const [userActual, setUserActual] = useState();

  // Es necesario saber el último id para ponerlo consecutivo en la creación de los empleados o usuarios
  const [ultimoIdEmpleado, setUltimoIdEmpleado] = useState(0);
  const [ultimoIdUsuario, setUltimoIdUsuario] = useState(0);

  // Manejar estados de la petición
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(()=>{
    // Obtener la data de employees
    (async()=>{
      setIsLoading(true);
      setIsError(false);
      const response = await getAllEmployees();
      setIsLoading(false);
      if (response) {
        console.log('get employees: ', response);
        setEmployees(response);
        if (response.length >= 1) {
          setUltimoIdEmpleado(Number(response[response.length -1].id));
        } else {
          setUltimoIdEmpleado(0);
        }
      } else {
        setIsError(true);
      }
    })();
    // Obtener la data de users
    (async()=>{
      const response = await getAllUsers();
      if (response) {
        console.log('get users: ',response);
        setUsers(response);
        if (response.length >= 1) {
          setUltimoIdUsuario(Number(response[response.length -1].id));
        }else {
          setUltimoIdUsuario(0);
        }
      }
    })();
  },[]);

  const setPage = (nPage) => {
    // npage == 1 = EmpleadosPage (main page)
    // npage == 2 = AgregarEmpleadoPage (nuevo empleado)
    // npage == 3 = DetallesDelEmpleadoPage (ver detalles del empleado)
    // npage == 4 = EditarEmpleadoPage (ver y editar datos del empleado)
    setCurrentPage(nPage);
  }

  const handleReturnToMain = () => {
    setPage(1);
  }

  const handleAddEmployeePage = () => {
    setEmpleadoActual(undefined);
    setPage(2);
  }

  const handleOpenDetailsPage = (idEmpleado) => {
    getEmployeeAndUserData(idEmpleado);
    setPage(3);
  }

  const handleOpenEditPage = (idEmpleado) => {
    getEmployeeAndUserData(idEmpleado); 
    setPage(4);
  }

  const getEmployeeAndUserData = (idEmpleado) => {
    // Get by id
    let actualEmpleadoData;
    if (employees) {
      actualEmpleadoData = employees.filter(emp => emp.id === idEmpleado);
    }
    // response
    if (actualEmpleadoData) {
      if (actualEmpleadoData[0]) {
        setEmpleadoActual(actualEmpleadoData[0]);
        // if employee is an user
        getUserActual(actualEmpleadoData[0].empSystemAccess, actualEmpleadoData[0].id);
      } else {
        setEmpleadoActual(undefined);
        // show error
        displayError();
      }
    }
  }

  const getUserActual = (haveAccess, idEmpleado) => {
    if (haveAccess) {
      const userActual = users.filter((user) => user.employeeId === (idEmpleado));
      if (userActual[0]) {
        setUserActual(userActual[0]);
      }
    }
  }

  const displayError = () => {
    console.log('Ocurrió un error en la petición');
  }

  return (
    <div className="App">
      {/* Uso de Context */}
      <DataContext.Provider
        value={{ 
          employees, 
          ultimoIdEmpleado, 
          ultimoIdUsuario, 
          empleadoActual, 
          userActual, 
          isLoading, 
          isError, 
          setIsLoading, 
          setIsError}}>

        { currentPage === 1 &&
          <EmpleadosPage
            handleAddEmployeePage = { handleAddEmployeePage }
            handleOpenDetailsPage = { handleOpenDetailsPage }
            handleOpenEditPage = { handleOpenEditPage }/>}

        { currentPage === 2 &&
          <AgregarEmpleadoPage
            handleReturnToMain = { handleReturnToMain }/>}

        { currentPage === 3 && empleadoActual &&
          <DetallesDelEmpleadoPage
            handleReturnToMain = { handleReturnToMain }
            handleOpenEditPage = { handleOpenEditPage }/>}

        { currentPage === 4 && empleadoActual &&
          <EditarEmpleadoPage
            handleReturnToMain = { handleReturnToMain }/>}

      </DataContext.Provider>
    </div>
  );
}

export default App;

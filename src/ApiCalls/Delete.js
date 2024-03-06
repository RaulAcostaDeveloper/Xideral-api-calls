import { EmployeesAPI, UsersAPI } from "../Constants/Urls";

export const deleteEmployee = async (id) => {
    try {
        const response = await fetch(EmployeesAPI + '/' + id, {
        method: 'DELETE',
    });
  
    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }
  
        console.log('Empleado eliminado con éxito');
        alert('Se ha eliminado un EMPLEADO de la base de datos');
        window.location.reload(true);
    } catch (error) {
        console.error('Hubo un problema al eliminar el empleado:', error);
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await fetch(UsersAPI + '/' + id, {
        method: 'DELETE',
    });
  
    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }
  
        console.log('Usuario eliminado con éxito');
        alert('Se ha eliminado un USUARIO de la base de datos');
        window.location.reload(true);
    } catch (error) {
        console.error('Hubo un problema al eliminar el usuario:', error);
    }
}
  
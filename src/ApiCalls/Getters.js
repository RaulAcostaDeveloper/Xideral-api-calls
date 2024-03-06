import { EmployeesAPI, UsersAPI } from "../Constants/Urls";

export const getAllUsers = async() => {
    try {
        // Simula  tiempo de espera para que se vea el loading
        await new Promise( resolve => setTimeout(resolve, 500));
        const response = await fetch(UsersAPI);
        if (!response.ok) {
            // Ejemplo de manejo de códigos de error
            switch (response.status) {
                case 404:
                    console.error(response.status + ': No se encontró ' + UsersAPI);
                    break;
                default:
                    break;
            }
            throw new Error('La petición fetch getAllUsers falló con el estado:' + response.status);
        } else {
            const data = await response.json(); 
            return data;
        }
    } catch (error) {
        console.error('Error in fetch: ', error);
    }
}
export const getAllEmployees = async() => {
    try {
        // Simula 1 segundo de tiempo de espera para que se vea el loading
        await new Promise( resolve => setTimeout(resolve, 1000));
        const response = await fetch(EmployeesAPI);
        if (!response.ok) {
            // Ejemplo de manejo de códigos de error
            switch (response.status) {
                case 404:
                    console.error(response.status + ': No se encontró ' + EmployeesAPI);
                    break;
                default:
                    break;
            }
            throw new Error('La petición fetch getAllEmployees falló con el estado:' + response.status);
        } else {
            const data = await response.json(); 
            return data;
        }
    } catch (error) {
        console.error('Error in fetch: ', error);
    }
}
import { EmployeesAPI, UsersAPI } from "../Constants/Urls";

export const postEmployee = async(datos) => {
    try {
        // Simula  tiempo de espera para que se vea el loading
        await new Promise( resolve => setTimeout(resolve, 1000));
        const respuesta = await fetch(EmployeesAPI, {
        method: 'POST', // Método HTTP
        headers: {
            'Content-Type': 'application/json', // Indicamos el tipo de contenido
            //Añadir autenticación y tokens si es necesario
        },
            body: JSON.stringify(datos) // Convertimos los datos del objeto a cadena JSON
        });
    
        if (!respuesta.ok) {
            throw new Error('La solicitud falló con el estado ' + respuesta.status);
        }
    
        // Procesamos la respuesta del servidor
        const resultado = await respuesta.json();
        console.log('Respuesta del servidor:', resultado);
        alert('Se ha añadido un EMPLEADO a la base de datos');
        window.location.reload(true);
    } catch (error) {
            console.error('Error durante la solicitud:', error);
    }
}

export const postUser = async(datos) => {
    try {
        const respuesta = await fetch(UsersAPI, {
        method: 'POST', // Método HTTP
        headers: {
            'Content-Type': 'application/json', // Indicamos el tipo de contenido
            //Añadir autenticación y tokens si es necesario
        },
            body: JSON.stringify(datos) // Convertimos los datos del objeto a cadena JSON
        });
    
        if (!respuesta.ok) {
            throw new Error('La solicitud falló con el estado ' + respuesta.status);
        }
    
        // Procesamos la respuesta del servidor
        const resultado = await respuesta.json();
        console.log('Respuesta del servidor:', resultado);
        alert('Se ha añadido un USUARIO a la base de datos');
        window.location.reload(true);
    } catch (error) {
            console.error('Error durante la solicitud:', error);
    }
}
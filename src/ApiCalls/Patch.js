import { EmployeesAPI, UsersAPI } from "../Constants/Urls";

export const patchUsuario = async(id, datosActualizacion) => {
    try {
      const respuesta = await fetch(UsersAPI +'/' + id, {
        method: 'PATCH', // o 'PUT' si necesitas reemplazar todo el recurso
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosActualizacion) // Datos que quieres actualizar
        // Procesamos la respuesta del servidor
    });
    
    if (!respuesta.ok) {
        throw new Error('La solicitud falló con el estado ' + respuesta.status);
    }
  
      // Procesamos la respuesta del servidor
      const resultado = await respuesta.json();
      console.log('Respuesta del servidor:', resultado);
      alert('Se ha editado un USUARIO de la base de datos');
      window.location.reload(true);
    } catch (error) {
      console.error('Error durante la solicitud patchUsuario :', error);
    }
}

export const patchEmployee = async(id, datosActualizacion) => {
    try {
      const respuesta = await fetch(EmployeesAPI +'/' + id, {
        method: 'PATCH', // o 'PUT' si necesitas reemplazar todo el recurso
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosActualizacion) // Datos que quieres actualizar
        // Procesamos la respuesta del servidor
    });
    
    if (!respuesta.ok) {
        throw new Error('La solicitud falló con el estado ' + respuesta.status);
    }
  
      // Procesamos la respuesta del servidor
      const resultado = await respuesta.json();
      console.log('Respuesta del servidor:', resultado);
      alert('Se ha editado un EMPLEADO de la base de datos');
      window.location.reload(true);
    } catch (error) {
      console.error('Error durante la solicitud patchUsuario :', error);
    }
}
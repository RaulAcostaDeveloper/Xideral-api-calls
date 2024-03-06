import React, { useContext } from 'react';
import { DataDetails } from "../Components/DataDetails/DataDetails";
import { DataDetailsCard } from "../Components/DataDetails/DataDetailsCard";
import { Header } from "../Components/Header/Header";
import { useState } from "react";
import { AreasAsociadasForm } from "../Components/Forms/AreasAsociadasForm";
import { patchUsuario } from '../ApiCalls/Patch';
import { DataContext } from '../App';

export const DetallesDelEmpleadoPage = ({ handleReturnToMain, handleOpenEditPage }) => {

    // Extracción de data from useContext
    const { empleadoActual, userActual, setIsLoading } = useContext(DataContext);

    // Para editar las Areas asociadas se usó un modal emergente
    const [isOpenEditAreasAsociadas, setIsOpenEditAreasAsociadas] = useState(false);

    // Toma el arreglo y devuelve un string para mostrarlo en pantalla
    const stringifyAreas = ()=> {
        let stringAreas = '';
        if (userActual && userActual.usrAreas) {
            const areasStrings = userActual.usrAreas.map(nArea => 'Area ' + nArea);
            stringAreas = areasStrings.join(', ');
        }
        return stringAreas;
    }

    const handleOpenAreasAsociadas = () => {
        setIsOpenEditAreasAsociadas(true);
    }

    const handleCloseAreasAsociadas = () => {
        setIsOpenEditAreasAsociadas(false);
    }

    // Aquí edita las areas del usuario.
    const handleUpdateAreasAsociadas = async(usrAreas) => {
        const objUsuario = {
            usrAreas,
        }
        // Patch
        setIsLoading(true);
        await patchUsuario(userActual.id, objUsuario);
        setIsLoading(false);
        setIsOpenEditAreasAsociadas(false);
    }
    
    return (
        <div className="DetallesDelEmpleadoPage">
            <Header title="Detalles del empleado"/>
            <div className="detallesContainer">
                <DataDetails title="Nombre" info={ empleadoActual.empName }/>
                <DataDetails title="Apellido paterno" info={ empleadoActual.empFirstName }/>
                <DataDetails title="Apellido materno" info={ empleadoActual.empLastName }/>
                <DataDetails title="Fecha de nacimiento" info={ empleadoActual.empBirthDate }/>
                <DataDetails title="Acceso al sistema" info={ empleadoActual.empSystemAccess ? 'Si': 'No' }/>
                {/* Si el employee tiene acceso, (o en otras palabras, está ligado a un usuario) se muestra la carta con info de su usuario*/}
                { empleadoActual.empSystemAccess && userActual &&
                    <DataDetailsCard 
                        handleOpenEditPage = { handleOpenEditPage }
                        handleOpenAreasAsociadas = { handleOpenAreasAsociadas }>
                        <DataDetails title="Nombre de usuario" info={ userActual.usrName }/>
                        <DataDetails title="Correo" info= { userActual.usrEmail }/>
                        {/* Aquí toma el arreglo de permisos y lo convierte en un string con Area 1, Area 2, etc */}
                        <DataDetails title="Areas" info={ stringifyAreas() }/>
                    </DataDetailsCard>
                }
                <div className="containerButtonCerrar">
                    <button onClick={ handleReturnToMain }>Cerrar</button>
                </div>
            </div>
            {/* Modal para editar áreas asociadas */}
            { isOpenEditAreasAsociadas && userActual &&
                <AreasAsociadasForm
                    handleClose = { handleCloseAreasAsociadas }
                    handleUpdateAreasAsociadas = { handleUpdateAreasAsociadas }/>
            }
        </div>
    )
}
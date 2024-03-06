import React from 'react';
import { Header } from "../Components/Header/Header"
import { AddAndEditForm } from "../Components/Forms/AddAndEditForm"
export const EditarEmpleadoPage = ({ handleReturnToMain }) => {
    return (
        <div>
            <Header title="Editar empleado"/>
            <AddAndEditForm handleCloseForm = { handleReturnToMain }/>
        </div>
    )
}
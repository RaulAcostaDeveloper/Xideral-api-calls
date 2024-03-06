import React from 'react';
import { Header } from "../Components/Header/Header";
import { AddAndEditForm } from "../Components/Forms/AddAndEditForm";

export const AgregarEmpleadoPage = ({ handleReturnToMain }) => {
    return (
        <div className="AgregarEmpleadoPage">
            <Header title="Agregar empleado"/>
            <AddAndEditForm
                handleCloseForm = { handleReturnToMain }/>
        </div>
    )
}
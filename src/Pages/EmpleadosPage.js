import React from 'react';
import { Header } from "../Components/Header/Header";
import { BotonAgregarEmpleado } from "../Components/Botones/BotonAgregarEmpleado";
import { UserTable } from "../Components/Tablas/UserTable";

export const EmpleadosPage = ({ handleAddEmployeePage, handleOpenDetailsPage, handleOpenEditPage }) => {
  return (
    <div className="EmpleadosPage">
        <Header title="Empleados"/>
        <BotonAgregarEmpleado handleAddEmployeePage = { handleAddEmployeePage }/>
        <UserTable 
          handleOpenDetailsPage = { handleOpenDetailsPage }
          handleOpenEditPage = { handleOpenEditPage }/>
    </div>
  )
}
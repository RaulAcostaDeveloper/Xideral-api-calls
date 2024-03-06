import React, { useContext } from 'react';
import { BotonEditarAreasAsociadas } from "../Botones/BotonEditarAreasAsociadas";
import { BotonEditarEmpleado } from "../Botones/BotonEditarEmpleado";
import { DataContext } from '../../App';

export const DataDetailsCard = ({ children, handleOpenEditPage, handleOpenAreasAsociadas }) => {
    // Extracción de data from useContext
    const { empleadoActual } = useContext(DataContext);
    
    const handleEdit = () => {
        handleOpenEditPage(empleadoActual.id);
    };

    return (
        <div className="DataDetailsCard">
            <div className="headerCard">
                <BotonEditarAreasAsociadas  handleEdit={ handleOpenAreasAsociadas }/>
                <BotonEditarEmpleado handleEdit={ () => handleEdit() }/>
            </div>
            <div className="contentCard">
                <div className="titleCard">
                    <h4>Usuario</h4>
                </div>
                { children }
            </div>
        </div>
    )
}
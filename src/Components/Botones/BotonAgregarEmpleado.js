import React from 'react';

export const BotonAgregarEmpleado = ({ handleAddEmployeePage }) => {
    return (
        <div className="BotonAgregarEmpleado">
            <button onClick={ handleAddEmployeePage }>Agregar</button>
        </div>
    )
}
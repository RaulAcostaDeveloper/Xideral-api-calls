import React from 'react';
import EditIcon from '@mui/icons-material/Edit';

export const BotonEditarEmpleado = ({ handleEdit }) => {
    return (
        <div className='botonEditarEmpleadoContainer'>
            <button className='botonEditarEmpleado' onClick={ handleEdit }>
                <EditIcon />
            </button>
        </div>
    )
}
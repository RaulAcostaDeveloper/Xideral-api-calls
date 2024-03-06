import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility'; // Importar el icono de ojo

export const BotonVerEmpleado = ({ handleView }) => {
    return (
        <div className='botonVerEmpleadoContainer'>
            <button className='botonVerEmpleado' onClick={ handleView }>
                <VisibilityIcon />
            </button>
        </div>
    )
}
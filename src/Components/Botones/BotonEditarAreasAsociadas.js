import React from 'react';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

export const BotonEditarAreasAsociadas = ({ handleEdit }) => {
    return (
        <div className='botonVerEmpleadoContainer'>
            <button className='botonVerEmpleado' onClick={ handleEdit }>
                <AccountTreeIcon />
            </button>
        </div>
    )
}
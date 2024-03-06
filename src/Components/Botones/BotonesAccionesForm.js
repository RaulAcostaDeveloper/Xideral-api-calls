import React from 'react';

export const BotonesAccionesForm = ({ isValidationComplete, handleCancelar, handleGuardar }) => {
    return (
        <div className="botonesAccionesForm">
            <button 
                className="cancelar" 
                onClick={ handleCancelar }>Cancelar</button>
            <button 
                className={`guardar ${ isValidationComplete ? '' : 'disabledButton' }`}
                onClick={ handleGuardar }
                disabled = { !isValidationComplete }>Guardar</button>
        </div>
    )
}
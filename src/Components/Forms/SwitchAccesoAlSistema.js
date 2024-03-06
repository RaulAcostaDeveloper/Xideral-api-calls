import React from 'react';
import { Switch } from "@mui/material"

export const SwitchAccesoAlSistema = ({ setAcceso, acceso }) => {
    const handleChange = (event) => {
        setAcceso(event.target.checked);
    };    
    return (
        <div className="switchAccesoAlSistema">
            <span>¿Acceso al sistema?</span>
            <div>
                <span>No</span>
                <Switch checked={ acceso } onChange={ handleChange } className={`${acceso ? '':'notAccess'}`}/>
                <span>Si</span>
            </div>
        </div>
    )
}
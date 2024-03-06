import React, { useContext } from 'react';
import { useEffect, useState } from "react";
import { TextField } from "@mui/material"
import { SwitchAccesoAlSistema } from "./SwitchAccesoAlSistema"
import { BotonesAccionesForm } from "../Botones/BotonesAccionesForm";
import { postEmployee, postUser } from '../../ApiCalls/Post';
import { patchEmployee, patchUsuario } from '../../ApiCalls/Patch';
import { deleteUser } from '../../ApiCalls/Delete';
import { DataContext } from '../../App';

// Este formulario sirve tanto para editar como para añadir un empleado.
// En este componente se encuentran los métodos más pesados.
// Son las validaciones (línea 59) y el manejo del envío de datos (línea 120)
export const AddAndEditForm = ({ handleCloseForm }) => {

    // Extracción de data from useContext
    const { 
        ultimoIdEmpleado, 
        ultimoIdUsuario, 
        empleadoActual, 
        userActual, 
        setIsLoading, } = useContext(DataContext);
    
    // Permite determinar si el formulario está correctamente llenado
    const [isValidationComplete, setIsValidationComplete] = useState(true);
    // Si el usuario tiene o no acceso (es decir, si hay un user asociado al empleado)
    const [userHasAcceso, setUserHasAcceso] = useState(false);

    // valores del form
    const [nameForm, setNameForm] = useState('');
    const [firstApellidoForm, setFirstApellidoForm] = useState('');
    const [secondApellidoForm, setSecondApellidoForm] = useState('');
    const [dataBirth, setDataBirth] = useState('');

    // Valores del User
    const [userNameForm, setUserNameForm] = useState('');
    const [userEmailForm, setUserEmailForm] = useState('');
    const [userPasswordForm, setUserPasswordForm] = useState('');

    useEffect(()=>{
        // Inicializa los valores del form si se trata de una edición de datos del empleado (y por lo tanto se pasó el argumento)
        if (empleadoActual) {
            setUserHasAcceso(empleadoActual.empSystemAccess);
            setNameForm(empleadoActual.empName);
            setFirstApellidoForm(empleadoActual.empFirstName);
            setSecondApellidoForm(empleadoActual.empLastName);
            setDataBirth(empleadoActual.empBirthDate);
        }
        if (userActual) {
            setUserNameForm(userActual.usrName);
            setUserEmailForm(userActual.usrEmail);
            setUserPasswordForm(userActual.usrPassword);
        }
    },[]);

    // ------ useEffect para controlar la valides del formulario. -------
    // Para cada caso puede arrojar un mensaje de error
    // (pero hoy no tengo tanto tiempo como para manejar vistas de errores independientes en el formulario)
    useEffect(()=>{
        // Debe pasar todas las validaciones antes de activar el botón de enviar
        let isValid = false;
        // Validaciones para los campos de employee
        const isValidPersonalInfo = 
            nameForm.length > 3 && 
            firstApellidoForm.length > 3 && 
            secondApellidoForm.length > 3 && 
            dataBirth.length === 10;

        // Inicialmente, establecer isValidationComplete basado en la información del employee
        isValid = isValidPersonalInfo;

        // Si está evaluando datos del user
        if (userHasAcceso) {
            // Validaciones para los campos del usuario
            // Este es una expresión regular para validar emails
            const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
            const isValidUserInfo = 
                userNameForm.length > 3 && 
                emailRegex.test(userEmailForm) && 
                userPasswordForm.length > 3;

            // Actualiza la validez en base a los dos resultados (cuando evaluamos también a user)
            isValid = isValid && isValidUserInfo;
        }
        setIsValidationComplete(isValid);
    // Escucha todos los campos del form
    },[nameForm, firstApellidoForm, secondApellidoForm, dataBirth, userNameForm, userEmailForm, userPasswordForm, userHasAcceso]);

    // Validaciones en línea de datos de employee (para inputs)
    const handleNameChange = (value) => {
        setNameForm(value);
    };
    const handleFirstApellidoChange = (value) => {
        setFirstApellidoForm(value);
    };
    const handleSecondApellidoChange = (value) => {
        setSecondApellidoForm(value);
    };
    const handleDataBirthChange = (value) => {
        setDataBirth(value);
    };

    // Validaciones en línea de datos de user (para inputs)
    const handleUserNameChange = (value) => {
        setUserNameForm(value);
    };
    const handleUserEmailChange = (value) => {
        setUserEmailForm(value);
    };
    const handleUserPasswordChange = (value) => {
        setUserPasswordForm(value);
    };
    
    // Controla si el usuario está ligado a un usuario
    const handleSetAcceso = (toggle) => {
        setUserHasAcceso(toggle);
    }

    // Enviar datos. (Esta es la parte de código más complicada)
    const handleSendData = () => {
        // Solo envía la data si la validación de todos los elementos está completa
        if (!isValidationComplete) {
            console.log('No se pasaron todas las validaciones');
            return;
        }
        empleadoActual ? handlePatchData() : handlePostData();
        handleCloseForm();
    }

    const handlePostData = async () => {
        console.log('POST Data');
        const uniqueIDEmpl = (ultimoIdEmpleado + 1).toString(); // Los id son string, no números, pero se enumeran como números
        const objEmployee = {
            id: uniqueIDEmpl,
            empName: nameForm,
            empFirstName: firstApellidoForm,
            empLastName: secondApellidoForm,
            empBirthDate: dataBirth,
            empSystemAccess: userHasAcceso,
        }
        // Post nuevo empleado
        setIsLoading(true);
        await postEmployee(objEmployee);
        setIsLoading(false);
        // Si tiene acceso, se crea también el usuario
        if (userHasAcceso) {
            const uniqueIDUser = (ultimoIdUsuario + 1).toString();
            const objUser = {
                id: uniqueIDUser,
                employeeId: uniqueIDEmpl,
                usrEmail: userEmailForm,
                usrName: userNameForm,
                usrPassword: userPasswordForm,
                usrAreas: ["1"], // 1 es el area por default en este caso
            }
            setIsLoading(true);
            await postUser(objUser);
            setIsLoading(false);
        }
    }

    const handlePatchData = async () => {
        console.log('PATCH Data');
        const objEmployee = {
            empName: nameForm,
            empFirstName: firstApellidoForm,
            empLastName: secondApellidoForm,
            empBirthDate: dataBirth,
            empSystemAccess: userHasAcceso,
        }
        // Patch
        await patchEmployee(empleadoActual.id, objEmployee);
        // si userHasAcceso entonces entramos en temas de usuario
        if (userHasAcceso) {
            if (userActual) { // si existe userActual, entonces ese usuario ya está asignado a ese empleado, no hace falta pasarle su id
                const objUser = {
                    usrEmail: userEmailForm,
                    usrName: userNameForm,
                    usrPassword: userPasswordForm,
                }
                // Patch
                setIsLoading(true);
                await patchUsuario(userActual.id, objUser);
                setIsLoading(false);
            } else {// si no existe userActual, entonces hay que crearlo y asignarlo a ese usuario
                const uniqueIDUser = (ultimoIdUsuario + 1).toString();
                const objUser = {
                    id: uniqueIDUser,
                    employeeId: (empleadoActual.id).toString(),
                    usrEmail: userEmailForm,
                    usrName: userNameForm,
                    usrPassword: userPasswordForm,
                    usrAreas: ["1"], // 1 es el area por default en este caso
                }
                // Post. Se crea nuevo usuario aunque se está parchando un empleado en el proceso
                setIsLoading(true);
                await postUser(objUser);
                setIsLoading(false);
            }
        } else {
            // Si !userHasAcceso y existe userActual, significa que hay que borrar el usuario porque el empleado ya no tiene acceso
            if (userActual) {
                setIsLoading(true);
                await deleteUser(userActual.id);
                setIsLoading(false);
            }
        }
    }

    return (
        <div className="addAndEditForm">
            <div className="containerDataForm">
                <TextField
                    id="outlined-basic"
                    label="Nombre"
                    variant="outlined"
                    value={ nameForm }
                    onChange={ (e)=>handleNameChange(e.target.value) }/>
                <TextField
                    id="outlined-basic"
                    label="Apellido paterno"
                    variant="outlined"
                    value={ firstApellidoForm }
                    onChange={ (e)=>handleFirstApellidoChange(e.target.value) }/>
                <TextField
                    id="outlined-basic"
                    label="Apellido materno"
                    variant="outlined" value={ secondApellidoForm }
                    onChange={ (e)=>handleSecondApellidoChange(e.target.value) }/>
                <TextField
                    id="outlined-basic"
                    label="Fecha de nacimiento"
                    variant="outlined"
                    value={ dataBirth }
                    onChange={ (e)=>handleDataBirthChange(e.target.value) }/>
                <SwitchAccesoAlSistema acceso = { userHasAcceso } setAcceso = { handleSetAcceso }/>
                { userHasAcceso &&
                <>
                    <TextField
                        id="outlined-basic"
                        label="Nombre de usuario"
                        variant="outlined"
                        value = { userNameForm }
                        onChange={ (e)=>handleUserNameChange(e.target.value) }/>
                    <TextField
                        id="outlined-basic"
                        label="Correo"
                        variant="outlined"
                        value={ userEmailForm }
                        onChange={ (e)=>handleUserEmailChange(e.target.value) }/>
                    <TextField
                        id="outlined-basic"
                        label="Contraseña"
                        variant="outlined"
                        type="password"
                        value={ userPasswordForm }
                        onChange={ (e)=>handleUserPasswordChange(e.target.value) }/>
                </>
                }
                { !isValidationComplete &&
                    <div className='msgError'>Nota: Llena los campos correspondientes antes de continuar</div>
                }
                <BotonesAccionesForm
                    isValidationComplete = { isValidationComplete }
                    handleCancelar = { handleCloseForm }
                    handleGuardar={ handleSendData }/>
            </div>
        </div>
    )
}
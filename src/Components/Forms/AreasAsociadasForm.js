import React, { useContext } from 'react';
import { useEffect, useState } from "react";
import { BotonesAccionesForm } from "../Botones/BotonesAccionesForm";
import { Header } from "../Header/Header";
import Checkbox from '@mui/material/Checkbox';
import { DataContext } from '../../App';

export const AreasAsociadasForm = ({ handleClose, handleUpdateAreasAsociadas }) => {
  // Extracción de data from useContext
  const { userActual } = useContext(DataContext);

  const [isValidationComplete, setIsValidationComplete] = useState(true);
  // Valores del form
  const [area1Checked, setArea1Checked] = useState(false);
  const [area2Checked, setArea2Checked] = useState(false);
  const [area3Checked, setArea3Checked] = useState(false);

  useEffect(()=>{
    // Asigna los valores a los checkboxes
    userActual.usrAreas.forEach(area => {
      switch (area) {
        case "1":
          setArea1Checked(true);
          break;
        case "2":
          setArea2Checked(true);
          break;
        case "3":
          setArea3Checked(true);
          break;
        default:
          break;
      }
    });
  },[]);

  useEffect(()=>{
    let count = 0;
    if (area1Checked) count ++;
    if (area2Checked) count ++;
    if (area3Checked) count ++;
    if (count > 0) {
      setIsValidationComplete(true);
    } else {
      setIsValidationComplete(false);
    }
  },[area1Checked, area2Checked, area3Checked]);

  const changeArea = (value, nArea) => {
    switch (nArea) {
      case 1:
        setArea1Checked(value);
        break;
      case 2:
        setArea2Checked(value);
        break;
      case 3:
        setArea3Checked(value);
        break;
      default:
        break;
    }
  }

  const handleSendData = () => {
    // Transforma los estados a un arreglo
    const areas = [];
    if (area1Checked) areas.push("1");
    if (area2Checked) areas.push("2");
    if (area3Checked) areas.push("3");
    if (areas.length > 0 && isValidationComplete) {
      handleUpdateAreasAsociadas(areas);
      handleClose();
    } else {
      console.log('Debe al menos seleccionar 1 area');
    }
  }
  
  return (
      <div className="AreasAsociadasForm">
          <div className="inner">
              <button className="headerBotonClose" onClick={ handleClose }>X</button>
              <Header title="Áreas Asociadas"/>
              <div className="contentInside">
                  <div className="areaBox">
                      <div className="title">Area 1</div>
                      <div className="checkbox"><Checkbox checked = { area1Checked } onChange={ (e)=>changeArea(e.target.checked, 1) }/></div>
                  </div>
                  <div className="areaBox">
                      <div className="title">Area 2</div>
                      <div className="checkbox"><Checkbox checked = { area2Checked } onChange={ (e)=>changeArea(e.target.checked, 2) }/></div>
                  </div>
                  <div className="areaBox">
                      <div className="title">Area 3</div>
                      <div className="checkbox"><Checkbox checked = { area3Checked } onChange={ (e)=>changeArea(e.target.checked, 3) }/></div>
                  </div>
                  { !isValidationComplete && 
                    <div className='msgError'>Nota: Un usuario debe tener al menos 1 area asignada</div>
                  }
                  <BotonesAccionesForm
                      isValidationComplete = { isValidationComplete }
                      handleCancelar = { handleClose }
                      handleGuardar={ handleSendData }/>
              </div>
          </div>
      </div>
  )
}
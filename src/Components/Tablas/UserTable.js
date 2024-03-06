import React, { useContext, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, TablePagination } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { BotonVerEmpleado } from '../Botones/BotonVerEmpleado';
import { BotonEditarEmpleado } from '../Botones/BotonEditarEmpleado';
import { DataContext } from '../../App';
import { Loading } from '../Loadings/Loading';
import { ErrorScreen } from '../Loadings/ErrorScreen';

export const UserTable = ({ handleOpenDetailsPage, handleOpenEditPage }) => {

  // Extracción de data from useContext
  const { employees, isLoading, isError } = useContext(DataContext);

  // Estados para manejar la paginación de la tabla
  const [pageTable, setPageTable] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPageTable(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPageTable(0);
  };

  // Abrir la página "Detalles del empleado"
  const handleView = (id) => {
    handleOpenDetailsPage(id);
  };

  // Abrir la página "Editar empleado"
  const handleEdit = (id) => {
    handleOpenEditPage(id);
  };

  return (
    <div className='UserTableContainer'>
      { isLoading ?
        <Loading/>
        :
        <>
          { isError ? 
            <ErrorScreen/>
            :
            <TableContainer component={ Paper }>
              <Table aria-label="simple table" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Apellido Materno</TableCell>
                    <TableCell>Apellido Paterno</TableCell>
                    <TableCell>Fecha de Nacimiento</TableCell>
                    <TableCell>Ver</TableCell>
                    <TableCell>Editar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Arreglo obtenido de la API */}
                  {/* Soporta que no haya registros en la bd */}
                  { employees && employees.length === 0 ? 
                    <TableRow>
                    <TableCell>---</TableCell>
                    <TableCell>---</TableCell>
                    <TableCell>---</TableCell>
                    <TableCell>--/-/--</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" disabled><VisibilityIcon /></Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="secondary" disabled><EditIcon /></Button>
                    </TableCell>
                  </TableRow> 
                  :
                  <>
                  {/* Filtra resultados por página de la tabla */}
                  { employees &&
                    <>
                      { employees
                        .slice(pageTable * rowsPerPage, pageTable * rowsPerPage + rowsPerPage)
                        .map((employee) => (
                          <TableRow key={ employee.id }>
                            <TableCell>{ employee.empName }</TableCell>
                            <TableCell>{ employee.empFirstName }</TableCell>
                            <TableCell>{ employee.empLastName }</TableCell>
                            <TableCell>{ employee.empBirthDate }</TableCell>
                            <TableCell>
                              <BotonVerEmpleado handleView={ () => handleView(employee.id) }/>
                            </TableCell>
                            <TableCell>
                              <BotonEditarEmpleado handleEdit={ () => handleEdit(employee.id) }/>
                            </TableCell>
                          </TableRow>
                        ))}
                    </>
                  }
                  </>
                  }
                </TableBody>
              </Table>
              {/* Componente que controla la paginación de la tabla */}
              <TablePagination
                rowsPerPageOptions={ [5, 10, 20] }
                component="div"
                count={ employees ? employees.length : 0 }
                rowsPerPage={ rowsPerPage }
                page={ pageTable }
                onPageChange={ handleChangePage }
                onRowsPerPageChange={ handleChangeRowsPerPage }/>
            </TableContainer>
          }
        </>
      }
    </div>
  );
};

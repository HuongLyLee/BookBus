import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { collection, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import AddDataCar from '../CarManage/AddDataCar';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditingDataCar from './EditingDataCar';

export default function CarManagement() {

  const [carData, setCarData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(8)

  const [selectedCar, setSelectedCar] = useState(null);


  const handleAddNew = () => {
    setSelectedCar(null);
    setOpenDialog(true);
  };

  const handleEdit = (car) => {
    setSelectedCar(car);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedCar(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.valur, 10));
    setPage(0);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carsCollectionRef = collection(db, 'cars');
        const carsSnapshot = await getDocs(carsCollectionRef);

        if (carsSnapshot.size === 0) {
          await setDoc(carsCollectionRef.doc(), {
            licensePlate: '',
            carCategory: '',
            seats: '',
            driverInfo: '',
          });
          console.log('Đã tạo collection "cars" và thêm dữ liệu mẫu.');
        }

        // Lấy dữ liệu từ collection "cars"
        const carsData = carsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCarData(carsData);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>

      <button className='border border-solid bg-teal-600 p-2 rounded-lg float-right text-white' onClick={handleAddNew}>
        Thêm mới
      </button>
      <AddDataCar
        openDialog={openDialog}
        setCarData={setCarData}
        handleDialogClose={handleDialogClose}
        selectedCar={selectedCar}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">

          <TableHead>
            <TableRow>
              <TableCell> Biển số xe </TableCell>
              <TableCell align="right"> Loại xe </TableCell>
              <TableCell align="right"> Số ghế </TableCell>
              <TableCell align="right"> Thông tin tài xế </TableCell>
              <TableCell align="right"> Cập nhật </TableCell>
              <TableCell align="right"> Xoá </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? carData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : carData
            ).map((car) => (
              <TableRow
                key={car.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row"> {car.licensePlate} </TableCell>
                <TableCell align="right">{car.carCategory}</TableCell>
                <TableCell align="right">{car.seats}</TableCell>
                <TableCell align="right">{car.driverInfo}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleEdit(car)}> <EditIcon /> </Button>
                  <EditingDataCar openDialog={openDialog} setCarData={setCarData} handleDialogClose={handleDialogClose} />
                </TableCell>
                <TableCell align="right">
                  <Button onClick={''}> <DeleteIcon /> </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[8, 16, 24]}
        component="div"
        count={carData.length}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage={<p>Số hàng mỗi trang</p>}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div >

  );
}
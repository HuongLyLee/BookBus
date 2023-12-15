import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { collection, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import AddDataCar from './AddDataCar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';


export default function CarManagement() {

  const [carData, setCarData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

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

  const handleAddNew = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    console.log(123);
    setOpenDialog(false);
  };

  return (
    <div>

      <button className='border border-solid bg-teal-600 p-2 rounded-lg float-right'
        onClick={handleAddNew}
      >
        Thêm mới
      </button>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle> Thêm thông tin xe </DialogTitle>
        <DialogContent>
          <AddDataCar setCarData={setCarData} handleDialogClose={handleDialogClose}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}> Hủy </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">

          <TableHead>
            <TableRow>
              <TableCell> Biển số xe </TableCell>
              <TableCell align="right"> Loại xe </TableCell>
              <TableCell align="right"> Số ghế </TableCell>
              <TableCell align="right"> Thông tin tài xế </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {carData.map((car) => (
              <TableRow key={car.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row"> {car.licensePlate} </TableCell>
                <TableCell align="right">{car.carCategory}</TableCell>
                <TableCell align="right">{car.seats}</TableCell>
                <TableCell align="right">{car.driverInfo}</TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </div >

  );
}
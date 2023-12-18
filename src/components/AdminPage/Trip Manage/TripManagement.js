import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import AddDataTrip from './AddDataTrip';
import { collection, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';


export default function TripManagement() {

  const [tripData, setTripData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddNew = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const fetchData = async() => {
      try {
        const tripsCollectionRef = collection(db, 'trips');
        const tripsSnapshot = await getDocs(tripsCollectionRef);

        if(tripsSnapshot.size === 0) {
          await setDoc(tripsCollectionRef.doc(), {
            time: '',
            departure: '',
            destination: '',
            ticketPrice:'',
            vehicleType:'',
            road:'',
          });
          console.log('Đã tạo collection "trips" và thêm dữ liệu mẫu.');
        }

        const tripsData = tripsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTripData(tripsData)
      } catch (error) {
        console.log('Lỗi khi lấy dữ liệu:', error);
      }
    }

    fetchData();
  }, [])


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
          <AddDataTrip setTripData={setTripData} handleDialogClose={handleDialogClose} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}> Hủy </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">

          <TableHead>
            <TableRow>
              <TableCell> Thời gian </TableCell>
              <TableCell align="right"> Điểm xuất phát </TableCell>
              <TableCell align="right"> Điểm cuối </TableCell>
              <TableCell align="right"> Giá vé </TableCell>
              <TableCell align="right"> Đường đi </TableCell>
            </TableRow>
          </TableHead>

          <TableBody> 
            {tripData.map((trip) => (
              <TableRow
                key={trip.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{trip.time}</TableCell>
                <TableCell align="right">{trip.departure}</TableCell>
                <TableCell align="right">{trip.destination}</TableCell>
                <TableCell align="right">{trip.ticketPrice}</TableCell>
                <TableCell align="right">{trip.road}</TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </div>

  );
}
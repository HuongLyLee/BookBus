import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddDataTrip from './AddDataTrip';
import { collection, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';


export default function TripManagement() {

  const [tripData, setTripData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);


  const handleAddNew = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripsCollectionRef = collection(db, 'trips');
        const tripsSnapshot = await getDocs(tripsCollectionRef);

        if (tripsSnapshot.size === 0) {
          await setDoc(tripsCollectionRef.doc(), {
            time: '',
            departure: '',
            destination: '',
            ticketPrice: '',
            vehicleType: '',
            road: '',
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
      <button className='border border-solid bg-teal-600 p-2 rounded-lg float-right' onClick={handleAddNew}>
        Thêm mới
      </button>
      <AddDataTrip openDialog={openDialog} setTripData={setTripData} handleDialogClose={handleDialogClose} />


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
            {(rowsPerPage > 0
              ? tripData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : tripData
            ).map((trip) => (
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

      <TablePagination
        rowsPerPageOptions={[8, 16, 24]}
        component="div"
        count={tripData.length}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage={<p>Số hàng mỗi trang</p>}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
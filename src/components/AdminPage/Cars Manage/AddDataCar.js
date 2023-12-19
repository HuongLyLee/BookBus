import React, { useState } from 'react';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const AddDataCar = ({ openDialog, setCarData, handleDialogClose }) => {
  const [newCarData, setNewCarData] = useState({
    licensePlate: '',
    carCategory: '',
    seats: '',
    driverInfo: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCarData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      const carsCollectionRef = collection(db, 'cars');
      const newCarRef = await addDoc(carsCollectionRef, newCarData);

      const newCarDoc = await getDocs(carsCollectionRef);
      const data = newCarDoc.docs.map(doc => doc.data());

      setCarData(data)

      setNewCarData({
        licensePlate: '',
        carCategory: '',
        seats: '',
        driverInfo: '',
      });
      handleDialogClose()
    } catch (error) {
      console.error('Lỗi khi thêm xe mới:', error);
    }
  };

  return (
    <Dialog open={openDialog} onClose={handleDialogClose}>
      <DialogTitle> Thêm thông tin xe </DialogTitle>
      <DialogContent>
        <div className='block m-4'>
          <div>
            <input type="text" placeholder="Biển số xe" name="licensePlate"
              value={newCarData.licensePlate}
              onChange={handleInputChange}
              className='border border-black rounded-lg p-2'
            />
            <input type="text" name="carCategory" placeholder="Loại xe"
              value={newCarData.carCategory}
              onChange={handleInputChange}
              className='border border-black rounded-lg p-2 m-2'
            />
            <input type="text" name="seats" placeholder="Số ghế"
              value={newCarData.seats}
              onChange={handleInputChange}
              className='border border-black rounded-lg p-2'
            />
            <input type="text" name="driverInfo" placeholder="Thông tin tài xế"
              value={newCarData.driverInfo}
              onChange={handleInputChange}
              className='border border-black rounded-lg p-2 m-2'
            />
          </div>

          <button className='border border-solid bg-teal-600 p-2 rounded-lg float-right' onClick={handleSubmit}> Thêm mới </button>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}> Hủy </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDataCar;

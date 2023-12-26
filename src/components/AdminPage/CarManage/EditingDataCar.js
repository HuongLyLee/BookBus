import React, { useState, useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Button } from '@mui/material';

const EditingDataCar = ({ openDialog, setCarData, handleDialogClose, selectedCar }) => {
  const [editedCar, setEditedCar] = useState({
    licensePlate: '',
    carCategory: '',
    seats: '',
    driverInfo: '',
  });

  useEffect(() => {
    if (selectedCar) {
      setEditedCar(selectedCar);
    }
  }, [selectedCar])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCar((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const carDocRef = doc(db, 'cars', selectedCar.id);
      await updateDoc(carDocRef, editedCar)

      //Cập nhật dữ liệu trong state
      setCarData((prevData) =>
        prevData.map((car) => (car.id === selectedCar.id ? { ...car, ...editedCar } : car))
      )

      handleDialogClose();
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin xe:', error);
    }
  };

  return (
    <Dialog open={openDialog} onClose={handleDialogClose}>
      <DialogTitle> Sửa thông tin xe </DialogTitle>
      <DialogContent>
        <div className='block m-4'>
          <div>
            <input type="text" placeholder="Biển số xe" name="licensePlate"
              value={editedCar.licensePlate}
              onChange={handleInputChange}
              className='border border-black rounded-lg p-2'
            />
            <input type="text" name="carCategory" placeholder="Loại xe"
              value={editedCar.carCategory}
              onChange={handleInputChange}
              className='border border-black rounded-lg p-2 m-2'
            />
            <input type="text" name="seats" placeholder="Số ghế"
              value={editedCar.seats}
              onChange={handleInputChange}
              className='border border-black rounded-lg p-2'
            />
            <input type="text" name="driverInfo" placeholder="Thông tin tài xế"
              value={editedCar.driverInfo}
              onChange={handleInputChange}
              className='border border-black rounded-lg p-2 m-2'
            />
          </div>

          <button className='border border-solid bg-teal-600 p-2 rounded-lg float-right' onClick={handleSave}> Lưu </button>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}> Hủy </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditingDataCar;

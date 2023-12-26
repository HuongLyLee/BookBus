import React, { useState } from 'react';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const AddDataTrip = ({ openDialog, setTripData, handleDialogClose }) => {
    const [newTripData, setNewTripData] = useState({
        time: '',
        departure: '',
        destination: '',
        ticketPrice: '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTripData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        try {
            const tripsCollectionRef = collection(db, 'trips');
            const newTripRef = await addDoc(tripsCollectionRef, newTripData);

            const newTripDoc = await getDocs(tripsCollectionRef)
            const data = newTripDoc.docs.map(doc => doc.data())

            setTripData(data)

            setNewTripData({
                time: '',
                departure: '',
                destination: '',
                ticketPrice: '',
                road: '',
            });
            handleDialogClose()
        } catch (error) {
            console.error('Lỗi khi thêm thông tin', error);
        }
    }

    return (
        <Dialog open={openDialog} onClose={handleDialogClose}>
            <DialogTitle> Thêm thông tin xe </DialogTitle>
            <DialogContent>
                <div className='block m-4'>
                    <div>
                        <input type="time" name="time" placeholder="Thời gian"
                            value={newTripData.time}
                            onChange={handleInputChange}
                            className='border border-black rounded-lg p-2'
                        />
                        <input type="text" name="departure" placeholder="Điểm xuất phát"
                            value={newTripData.departure}
                            onChange={handleInputChange}
                            className='border border-black rounded-lg p-2 m-2'
                        />
                        <input type="text" name="destination" placeholder="Điểm cuối"
                            value={newTripData.destination}
                            onChange={handleInputChange}
                            className='border border-black rounded-lg p-2'
                        />
                        <input type="text" name="ticketPrice" placeholder="Giá vé"
                            value={newTripData.ticketPrice}
                            onChange={handleInputChange}
                            className='border border-black rounded-lg p-2 m-2'
                        />
                        <input type="text" name="road" placeholder="Đường đi"
                            value={newTripData.road}
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
    )
}

export default AddDataTrip;
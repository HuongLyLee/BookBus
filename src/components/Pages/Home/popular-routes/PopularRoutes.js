import React from 'react';
import Heading from "../../../common/Heading";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function PopularRoutes() {
  return (
    <div className='bg-[#c3f3f8] '>
      <div className='p-4 text-center'>
        <Heading
          title='TUYẾN PHỔ BIẾN'
          subtitle='Được khách hàng tin tưởng và lựa chọn'
        />
      </div>

      <div className='flex p-[60px] justify-around'>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              className='h-[200px]' 
              image="./images/HaiPhong.jpeg"  alt=""
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Tuyến xe từ Hải Phòng
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              className='h-[200px]' 
              image="./images/HaNoi.jpeg" alt=""
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                 Tuyến xe từ Thanh Hoá
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  )
}

export default PopularRoutes
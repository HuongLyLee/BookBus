import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import UserManagement from './User Manage/UserManagement';
import TripManagement from './Trip Manage/TripManagement';
import CarManagement from './Cars Manage/CarManagement';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function AdminPage() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className='min-h-[600px] m-6'>

            <h1> <HomeIcon/> Trang chủ Admin </h1>

            <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    <Tab label="Tài khoản" {...a11yProps(0)} />
                    <Tab label="Lịch trình" {...a11yProps(1)} />
                    <Tab label="Thông tin xe" {...a11yProps(2)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <UserManagement />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TripManagement />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <CarManagement />
                </TabPanel>

            </Box>
        </div>

    );
}

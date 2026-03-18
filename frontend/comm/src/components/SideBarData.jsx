
import React from 'react'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import EventIcon from '@mui/icons-material/Event';
import CallToActionIcon from '@mui/icons-material/CallToAction';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import EmergencyIcon from '@mui/icons-material/Emergency';
import LogoutIcon from '@mui/icons-material/Logout';
export const SideBarData = [
    {
        title: "DashBoard",
        icon: <DashboardCustomizeIcon />,
        link: "/apartment"
    },
    {
        title: "RequestServices",
        icon: <ManageAccountsIcon  />,
        link: "/requestser"
    },
    {
        title: "Complaints",
        icon: <BrandingWatermarkIcon />,
        link: "/complaints"
    },
    {
        title: "Events",
        icon: <EventIcon />,
        link: "/eve"
    },
    {
        title: "Notices",
        icon: <CallToActionIcon  />,
        link: "/notices"
    },
    {
        title: "Posts",
        icon: <CallToActionIcon />,
        link: "/eve"
    },
    {
        title: "Parkings",
        icon: <LocalParkingIcon />,
        link: "/parkings"
    },
    {
        title: "Emergency Contacts",
        icon: <EmergencyIcon />,
        link: "/emergencycontacts"
    },
    {
        title: "Billings",
        icon: <EmergencyIcon />,
        link: "/billings"
    },
    {
        title: "Logout",
        icon: <LogoutIcon />,
        link: "/logout"
    }
];
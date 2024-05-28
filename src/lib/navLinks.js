import { MdDashboard } from "react-icons/md";
import { FaPeopleGroup, FaWarehouse, FaCar } from "react-icons/fa6";

export const NavLinkList = [
    {
        id: '1',
        icon: MdDashboard,
        tooltip: 'Dashboard',
        link: '/dashboard',
    },
    {
        id: '2',
        icon: FaPeopleGroup,
        tooltip: 'Drivers',
        link: '/drivers',
    },
    {
        id: '3',
        icon: FaWarehouse,
        tooltip: 'Fleets',
        link: '/fleets',
    },
    {
        id: '4',
        icon: FaCar,
        tooltip: 'Vehicles',
        link: '/vehicles',
    }
];

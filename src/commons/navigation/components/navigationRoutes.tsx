import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AddIcon from '@material-ui/icons/Add';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import AssignmentIcon from '@material-ui/icons/Assignment';
import HomeIcon from '@material-ui/icons/Home';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PeopleIcon from '@material-ui/icons/People';
import RestaurantIcon from '@material-ui/icons/Restaurant';

export default [
  {
    title: 'Pages',
    pages: [
      {
        title: 'Home',
        href: '/home',
        icon: HomeIcon,
      },
      {
        title: 'Orders',
        href: '/orderList',
        icon: AssignmentIcon,
      },
      {
        title: 'Menu',
        href: '/menu',
        icon: RestaurantIcon,
        children: [
          {
            title: 'Products',
            href: '/menu/productList',
            icon: AddIcon,
          },
          {
            title: 'Menu List',
            href: '/menu/menuList',
            icon: AddIcon,
          },
        ],
      },
      {
        title: 'Customers',
        href: '/customerList',
        icon: PeopleIcon,
      },
      {
        title: 'Storages',
        href: '/storageList',
        icon: AllInboxIcon,
      },
      {
        title: 'Finance',
        href: '/financeList',
        icon: MonetizationOnIcon,
      },
      {
        title: 'Users',
        href: '/userList',
        icon: AccountBoxIcon,
      },
    ],
  },
];

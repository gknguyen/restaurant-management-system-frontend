import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AddIcon from '@material-ui/icons/Add';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import AssignmentIcon from '@material-ui/icons/Assignment';
import HomeIcon from '@material-ui/icons/Home';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PeopleIcon from '@material-ui/icons/People';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import { UserTypeName } from '../../../configs/inputType';
import { getdUserInfo } from '../../../configs/localStore';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

const userInfo = getdUserInfo();

let navRoutes: any[] = [];

if (userInfo.role === UserTypeName.admin)
  navRoutes = [
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
          title: 'Employees',
          href: '/EmployeeList',
          icon: AssignmentIndIcon,
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
else if (userInfo.role === UserTypeName.manager)
  navRoutes = [
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
          title: 'Employees',
          href: '/employeeList',
          icon: AssignmentIndIcon,
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
      ],
    },
  ];
else if (userInfo.role === UserTypeName.employee)
  navRoutes = [
    {
      title: 'Pages',
      pages: [
        {
          title: 'Home',
          href: '/home',
          icon: HomeIcon,
        },
      ],
    },
  ];

export default navRoutes;

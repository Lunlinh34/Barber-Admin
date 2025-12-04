import config from '~/config';
import Dashboard from '~/Pages/Dashboard';
import Role from '~/Pages/Role';
import ModelAddRole from '~/components/feature/ModalsRole';
import { ModalEditRole } from '~/components/feature/ModalsRole';
import User from '~/Pages/User';
import Customer from '~/Pages/Customer';
import Employee from '~/Pages/Employee';
import Service from '~/Pages/Service';
import ServiceCategory from '~/Pages/ServiceCategory';
import Booking from '~/Pages/Booking';
import Producer from '~/Pages/Producer';
import Product from '~/Pages/Product';
import ModalAddProduct from '~/components/feature/ModalProduct';
import { ModalEdit } from '~/components/feature/ModalProduct';
import Category from '~/Pages/Category';
import Order from '~/Pages/Order';
import ProductOrder from '~/Pages/ProductOrder';
import Payment from '~/Pages/Payment/Payment';
import Store from '~/Pages/Store';
import Warehouse from '~/Pages/Warehouse';
import WorkingHour from '~/Pages/WorkingHour';
import ServiceManagement from '~/Pages/ServiceManagement';
import Notification from '~/Pages/Notification';
import Evaluate from '~/Pages/Evaluate';
import LocationStore from '~/Pages/LocationStore';
import Country from '~/Pages/Country';
import City from '~/Pages/City';
import Address from '~/Pages/Address';
import RevenueStatisticPage from '../Pages/RevenueStatisticPage';
import BookingOrderStatisticPage from '../Pages/BookingOrderStatisticPage';
import WarehousePage from '../Pages/WarehousePage';
import StoreManagementPage from '../Pages/StoreManagementPage';
import LoginNew from '../Pages/LoginNew';
import AdminStoreRequestsPage from '../Pages/StoreRequest/AdminStoreRequestsPage';
import UserManagement from '../Pages/UserManagement/UserManagement';

const publicRoutes = [
    { path: config.routes.home, exact: true, name: 'Home' },
    { path: config.routes.dashboard, name: 'Dashboard', element: Dashboard },
    { path: config.routes.role, name: 'Role', element: Role },
    { path: config.routes.addRole, name: 'AddRole', element: ModelAddRole },
    { path: config.routes.editRole, name: 'EditRole', element: ModalEditRole },
    { path: config.routes.user, name: 'User', element: User },
    { path: config.routes.customer, name: 'Customer', element: Customer },
    { path: config.routes.employee, name: 'Employee', element: Employee },
    { path: config.routes.serviceCategory, name: 'ServiceCategory', element: ServiceCategory },
    { path: config.routes.service, name: 'Service', element: Service },
    { path: config.routes.booking, name: 'Booking', element: Booking },
    { path: config.routes.producer, name: 'Producer', element: Producer },
    { path: config.routes.product, name: 'Product', element: Product },
    { path: config.routes.addProduct, name: 'AddProduct', element: ModalAddProduct },
    { path: config.routes.editProduct, name: 'EditProduct', element: ModalEdit },
    { path: config.routes.categoryProduct, name: 'Category', element: Category },
    { path: config.routes.order, name: 'Order', element: Order },
    { path: config.routes.productOrder, name: 'ProductOrder', element: ProductOrder },
    { path: config.routes.payment, name: 'Payment', element: Payment },
    { path: config.routes.store, name: 'Store', element: Store },
    { path: config.routes.warehouse, name: 'Warehouse', element: Warehouse },
    { path: config.routes.workingHour, name: 'WorkingHour', element: WorkingHour },
    { path: config.routes.serviceManagement, name: 'ServiceManagement', element: ServiceManagement },
    { path: config.routes.notification, name: 'Notification', element: Notification },
    { path: config.routes.evaluate, name: 'Evaluate', element: Evaluate },
    { path: config.routes.locationStore, name: 'LocationStore', element: LocationStore },
    { path: config.routes.country, name: 'Country', element: Country },
    { path: config.routes.city, name: 'City', element: City },
    { path: config.routes.address, name: 'Address', element: Address },
        { path: config.routes.AdminStoreRequestsPage, name: 'AdminStoreRequestsPage', element: AdminStoreRequestsPage },
    
    {
  path: config.routes.revenueStatistic,
  name: 'RevenueStatistic',
  element: RevenueStatisticPage, // <-- KHÔNG để <RevenueStatisticPage />
}
, {
  path: config.routes.bookingOrderStatistic,
  name: 'RevenueStatistic',
  element: BookingOrderStatisticPage, // <-- KHÔNG để <RevenueStatisticPage />
}
, {
  path: config.routes.WarehousePage,
  name: 'WarehousePage',
  element: WarehousePage, // <-- KHÔNG để <RevenueStatisticPage />
}
, {
  path: config.routes.StoreManagementPage,
  name: 'StoreManagementPage',
  element: StoreManagementPage, // <-- KHÔNG để <RevenueStatisticPage />
}
, {
  path: config.routes.LoginNew,
  name: 'LoginNew',
  element: LoginNew, // <-- KHÔNG để <RevenueStatisticPage />
},
 {
  path: config.routes.UserManagement,
  name: 'UserManagement',
  element: UserManagement, // <-- KHÔNG để <RevenueStatisticPage />
}
];

//Login open
const privateRoutes = [];

export { publicRoutes, privateRoutes };

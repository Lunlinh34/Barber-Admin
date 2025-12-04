// import classNames from 'classnames/bind';
// import { useState, useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
// import styles from './StoreManagement.module.scss';

// // Component table custom
// import CustomTable from '~/components/common/CustomTable/CustomTable';

// // Service
// import * as storeServices from '~/services/storeServices';
// import * as addressServices from '~/services/addressServices';
// import * as countryServices from '~/services/ountryService';
// import * as cityServices from '~/services/cityService';
// import * as workingHourServices from '~/services/workingHourServices';

// const cx = classNames.bind(styles);

// function StoreManagement({ userID }) {
//   const [stores, setStores] = useState([]);
//   const [countries, setCountries] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [workingHours, setWorkingHours] = useState([]);
//   const [addresses, setAddresses] = useState([]);

//   const [showModal, setShowModal] = useState(false);
//   const [showWorkingHourModal, setShowWorkingHourModal] = useState(false);
//   const [editingStore, setEditingStore] = useState(null);
//   const [creatingNewAddress, setCreatingNewAddress] = useState(false);

//   const [form, setForm] = useState({
//     storeName: '',
//     numberphone: '',
//     workingHourID: '',
//     addressID: '',
//     currentAddress: '',
//     subDistrict: '',
//     district: '',
//     cityID: '',
//   });

//   const [newWorkingHourStart, setNewWorkingHourStart] = useState('');
//   const [newWorkingHourEnd, setNewWorkingHourEnd] = useState('');

//   useEffect(() => {
//     fetchStores();
//     fetchCountries();
//     fetchWorkingHours();
//     fetchAddresses();
//   }, []);

//   const fetchStores = async () => {
//     const result = await storeServices.getStore();
//     if (result) setStores(result);
//   };

//   const fetchCountries = async () => {
//     const result = await countryServices.getCountries();
//     if (result) setCountries(result);
//   };

//   const fetchCities = async (countryID) => {
//     const result = await cityServices.getCitiesByCountry(countryID);
//     if (result) setCities(result);
//   };

//   const fetchWorkingHours = async () => {
//     const result = await workingHourServices.getWorkingHour();
//     if (result) setWorkingHours(result);
//   };

//   const fetchAddresses = async () => {
//     const result = await addressServices.getAddress();
//     if (result) {
//       const userAddresses = result.filter(a => a.userID === Number(userID));
//       setAddresses(userAddresses);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));

//     if (name === 'cityID') {
//       fetchCities(value);
//       setForm(prev => ({ ...prev, district: '' }));
//     }
//   };

//   const handleShowAdd = () => {
//     setEditingStore(null);
//     setCreatingNewAddress(false);
//     setForm({
//       storeName: '',
//       numberphone: '',
//       workingHourID: '',
//       addressID: '',
//       currentAddress: '',
//       subDistrict: '',
//       district: '',
//       cityID: '',
//     });
//     setShowModal(true);
//   };

//   const handleShowEdit = (store) => {
//     setEditingStore(store);
//     setCreatingNewAddress(false);
//     setForm({
//       storeName: store.storeName,
//       numberphone: store.numberphone,
//       workingHourID: store.workingHourID,
//       addressID: store.addressID,
//       currentAddress: '',
//       subDistrict: '',
//       district: '',
//       cityID: '',
//     });
//     setShowModal(true);
//   };

//   const handleClose = () => setShowModal(false);

//   const handleWorkingHourSelect = (e) => {
//     const value = e.target.value;
//     if (value === 'new') {
//       setShowWorkingHourModal(true);
//       setNewWorkingHourStart('');
//       setNewWorkingHourEnd('');
//     } else {
//       setForm(prev => ({ ...prev, workingHourID: value }));
//     }
//   };

//   const handleAddWorkingHour = async () => {
//     if (!newWorkingHourStart || !newWorkingHourEnd) {
//       alert('Vui lòng nhập đủ giờ bắt đầu và kết thúc!');
//       return;
//     }

//     const exists = workingHours.find(
//       wh => wh.startTime === newWorkingHourStart && wh.endTime === newWorkingHourEnd
//     );
//     if (exists) {
//       alert('Giờ làm việc đã tồn tại!');
//       setForm(prev => ({ ...prev, workingHourID: exists.workingHourID }));
//       setShowWorkingHourModal(false);
//       return;
//     }

//     const res = await workingHourServices.createWorkingHour(newWorkingHourStart, newWorkingHourEnd);
//     if (res?.workingHourID) {
//       fetchWorkingHours();
//       setForm(prev => ({ ...prev, workingHourID: res.workingHourID }));
//       setShowWorkingHourModal(false);
//       alert('Thêm giờ làm việc mới thành công!');
//     } else {
//       alert('Có lỗi khi thêm giờ làm việc!');
//     }
//   };

//   const handleAddressSelect = (e) => {
//     const value = e.target.value;
//     if (value === 'new') {
//       setCreatingNewAddress(true);
//       setForm(prev => ({ ...prev, addressID: '' }));
//     } else {
//       setCreatingNewAddress(false);
//       setForm(prev => ({ ...prev, addressID: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       let addressID = form.addressID;

//       if (creatingNewAddress) {
//         const newAddress = {
//           currentAddress: form.currentAddress,
//           subDistrict: form.subDistrict,
//           district: form.district,
//           cityID: Number(form.cityID),
//           userID: Number(userID),
//         };
//         const addressRes = await addressServices.createAddress(newAddress);
//         addressID = addressRes?.addressID;
//         if (!addressID) throw new Error('Tạo địa chỉ thất bại!');
//         fetchAddresses();
//       }

//       if (editingStore) {
//         await storeServices.updateStore(
//           editingStore.storeID,
//           form.storeName,
//           form.numberphone,
//           Number(form.workingHourID),
//           Number(addressID)
//         );
//         alert('Cập nhật cửa hàng thành công!');
//       } else {
//         await storeServices.createStore(
//           form.storeName,
//           form.numberphone,
//           Number(form.workingHourID),
//           Number(addressID)
//         );
//         alert('Thêm cửa hàng thành công!');
//       }

//       handleClose();
//       fetchStores();
//     } catch (error) {
//       console.error(error);
//       alert('Có lỗi xảy ra khi lưu dữ liệu!');
//     }
//   };

//   const handleDelete = async (storeID) => {
//     if (window.confirm('Bạn có chắc muốn xóa cửa hàng này?')) {
//       await storeServices.deleteStore(storeID);
//       fetchStores();
//       alert('Xóa thành công!');
//     }
//   };

//   // 🔹 Dữ liệu cho CustomTable
//   const headers = ['Mã cửa hàng', 'Tên cửa hàng', 'SĐT', 'Giờ làm việc', 'Address ID'];
//   const tableData = stores.map((s) => ({
//     storeID: s.storeID,
//     storeName: s.storeName,
//     numberphone: s.numberphone,
//     workingHourName: s.workingHourName,
//     addressID: s.addressID,
//   }));

//   return (
//     <div className={cx('store-management')}>
//       <div className={cx('header')}>
//         <h3>Danh Sách Cửa Hàng</h3>
//         <Button variant="success" onClick={handleShowAdd}>
//           ➕ Thêm mới
//         </Button>
//       </div>

//       <CustomTable
//         headers={headers}
//         data={tableData}
//         variant="light"
//         renderActions={(item) => (
//           <>
//             <Button variant="info" size="sm" onClick={() => handleShowEdit(item)}>
//               Sửa
//             </Button>
//             <Button
//               variant="danger"
//               size="sm"
//               style={{ marginLeft: '6px' }}
//               onClick={() => handleDelete(item.storeID)}
//             >
//               Xóa
//             </Button>
//           </>
//         )}
//       />

//       {/* Modal Thêm/Sửa cửa hàng */}
//       <Modal show={showModal} onHide={handleClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>{editingStore ? 'Sửa Cửa Hàng' : 'Thêm Cửa Hàng'}</Modal.Title>
//         </Modal.Header>
//         <Form onSubmit={handleSubmit}>
//           <Modal.Body>
//             <Form.Group className="mb-3">
//               <Form.Label>Tên cửa hàng</Form.Label>
//               <Form.Control type="text" name="storeName" value={form.storeName} onChange={handleChange} required />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Số điện thoại</Form.Label>
//               <Form.Control type="text" name="numberphone" value={form.numberphone} onChange={handleChange} required />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Giờ làm việc</Form.Label>
//               <Form.Select value={form.workingHourID} onChange={handleWorkingHourSelect} required>
//                 <option value="">-- Chọn giờ làm việc --</option>
//                 {workingHours.map(w => (
//                   <option key={w.workingHourID} value={w.workingHourID}>
//                     {w.startTime} - {w.endTime}
//                   </option>
//                 ))}
//                 <option value="new">➕ Thêm giờ làm việc mới</option>
//               </Form.Select>
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Địa chỉ</Form.Label>
//               <Form.Select value={creatingNewAddress ? 'new' : form.addressID} onChange={handleAddressSelect}>
//                 <option value="">-- Chọn địa chỉ có sẵn --</option>
//                 {addresses.map(a => (
//                   <option key={a.addressID} value={a.addressID}>
//                     {a.currentAddress}, {a.district}
//                   </option>
//                 ))}
//                 <option value="new">➕ Thêm địa chỉ mới</option>
//               </Form.Select>
//             </Form.Group>

//             {creatingNewAddress && (
//               <>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Quốc gia</Form.Label>
//                   <Form.Select name="cityID" value={form.cityID} onChange={handleChange} required>
//                     <option value="">-- Chọn quốc gia --</option>
//                     {countries.map(c => (
//                       <option key={c.countryID} value={c.countryID}>{c.countryName}</option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Quận/Huyện</Form.Label>
//                   <Form.Select name="district" value={form.district} onChange={handleChange} required>
//                     <option value="">-- Chọn quận/huyện --</option>
//                     {cities.map(c => (
//                       <option key={c.cityID} value={c.cityName}>{c.cityName}</option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Địa chỉ hiện tại</Form.Label>
//                   <Form.Control type="text" name="currentAddress" value={form.currentAddress} onChange={handleChange} required />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Phường/Xã</Form.Label>
//                   <Form.Control type="text" name="subDistrict" value={form.subDistrict} onChange={handleChange} required />
//                 </Form.Group>
//               </>
//             )}
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleClose}>Hủy</Button>
//             <Button variant="primary" type="submit">{editingStore ? 'Cập nhật' : 'Thêm mới'}</Button>
//           </Modal.Footer>
//         </Form>
//       </Modal>

//       {/* Modal thêm giờ làm việc */}
//       <Modal show={showWorkingHourModal} onHide={() => setShowWorkingHourModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Thêm giờ làm việc mới</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group className="mb-3">
//             <Form.Label>Giờ bắt đầu</Form.Label>
//             <Form.Control type="time" value={newWorkingHourStart} onChange={e => setNewWorkingHourStart(e.target.value)} required />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Giờ kết thúc</Form.Label>
//             <Form.Control type="time" value={newWorkingHourEnd} onChange={e => setNewWorkingHourEnd(e.target.value)} required />
//           </Form.Group>
//           <Button variant="primary" onClick={handleAddWorkingHour}>Thêm</Button>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

// export default StoreManagement;
  import classNames from 'classnames/bind';
  import { useState, useEffect, useRef } from 'react';
  import Button from 'react-bootstrap/Button';
  import Modal from 'react-bootstrap/Modal';
  import Form from 'react-bootstrap/Form';
  import styles from './StoreManagement.module.scss';

  // Component table custom
  import CustomTable from '~/components/common/CustomTable/CustomTable';

  // Service
  import * as storeServices from '~/services/storeServices';
  import * as addressServices from '~/services/addressServices';
  import * as countryServices from '~/services/ountryService';
  import * as cityServices from '~/services/cityService';
  import * as workingHourServices from '~/services/workingHourServices';
  import * as bookingServices from '~/services/bookServices';
  import * as orderServices from '~/services/orderServices';
  import * as ProductOrder from '~/services/productOrderServices';
  import * as productServices from '~/services/productServices';
  import * as warehouseServices from '~/services/warehouseServices';
  import * as services from '~/services/serviceServices'; // import service để lấy giá dịch vụ

  const cx = classNames.bind(styles);

  function StoreManagement({ userID }) {
    const [stores, setStores] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [workingHours, setWorkingHours] = useState([]);
  const [addresses, setAddresses] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showWorkingHourModal, setShowWorkingHourModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [editingStore, setEditingStore] = useState(null);
  const [creatingNewAddress, setCreatingNewAddress] = useState(false);

  const [form, setForm] = useState({
    storeName: '',
    numberphone: '',
    workingHourID: '',
    addressID: '',
    currentAddress: '',
    subDistrict: '',
    district: '',
    cityID: '',
  });

  const [newWorkingHourStart, setNewWorkingHourStart] = useState('');
  const [newWorkingHourEnd, setNewWorkingHourEnd] = useState('');

  const [selectedStoreID, setSelectedStoreID] = useState(null);
  const [storeBookings, setStoreBookings] = useState([]);
  const [detailedOrders, setDetailedOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalBookingRevenue, setTotalBookingRevenue] = useState(0);

  const isFetchingRef = useRef(false);

  // ------------------- HELPERS -------------------
  const getField = (obj, candidates = []) => {
    if (!obj) return undefined;
    for (const c of candidates) {
      if (Object.prototype.hasOwnProperty.call(obj, c)) return obj[c];
    }
    return undefined;
  };

  const norm = (v) => {
    if (v === undefined || v === null) return '';
    return String(v).trim();
  };

  const getWorkingHourName = (workingHourID) => {
    const wh = workingHours.find(w => norm(w.workingHourID) === norm(workingHourID));
    return wh ? `${wh.startTime} - ${wh.endTime}` : '';
  };

  // ------------------- INITIAL FETCH -------------------
  useEffect(() => {
    fetchStoresWithFullAddress();
    fetchCountries();
    fetchWorkingHours();
    fetchAddresses();
  }, []);

  const fetchStoresWithFullAddress = async () => {
    try {
      const storesData = await storeServices.getStore();
      const addressesData = await addressServices.getAddress();
      const citiesData = await cityServices.getCities();
      const countriesData = await countryServices.getCountries();

      const storesWithAddress = storesData.map(store => {
        const address = addressesData.find(a => norm(a.addressID) === norm(store.addressID));
        if (!address) return { ...store, fullAddress: '' };

        const city = citiesData.find(c => norm(c.cityID) === norm(address.cityID)) || {};
        const country = countriesData.find(c => norm(c.countryID) === norm(city.countryID)) || {};

        const fullAddress = `${address.currentAddress || ''}, ${address.subDistrict || ''}, ${address.district || ''}, ${city.cityName || ''}, ${country.countryName || ''}`;
        return { ...store, fullAddress };
      });

      setStores(storesWithAddress);
    } catch (err) {
      console.error('Lỗi fetchStoresWithFullAddress:', err);
      alert('Không thể tải dữ liệu cửa hàng!');
    }
  };

  const fetchCountries = async () => {
    try {
      const result = await countryServices.getCountries();
      if (result) setCountries(result);
    } catch (err) {
      console.error('Lỗi fetchCountries:', err);
    }
  };

  const fetchCities = async (countryID) => {
    try {
      const result = await cityServices.getCitiesByCountry(countryID);
      if (result) setCities(result);
    } catch (err) {
      console.error('Lỗi fetchCities:', err);
    }
  };

  const fetchWorkingHours = async () => {
    try {
      const result = await workingHourServices.getWorkingHour();
      if (result) setWorkingHours(result);
    } catch (err) {
      console.error('Lỗi fetchWorkingHours:', err);
    }
  };

  const fetchAddresses = async () => {
    try {
      const result = await addressServices.getAddress();
      if (result) {
        const userAddresses = result.filter(a => norm(a.userID) === norm(userID));
        setAddresses(userAddresses);
      }
    } catch (err) {
      console.error('Lỗi fetchAddresses:', err);
    }
  };

  // ------------------- FORM HANDLERS -------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (name === 'cityID') {
      fetchCities(value);
      setForm(prev => ({ ...prev, district: '' }));
    }
  };

  const handleShowAdd = () => {
    setEditingStore(null);
    setCreatingNewAddress(false);
    setForm({
      storeName: '',
      numberphone: '',
      workingHourID: '',
      addressID: '',
      currentAddress: '',
      subDistrict: '',
      district: '',
      cityID: '',
    });
    setShowModal(true);
  };

  const handleShowEdit = (store) => {
    setEditingStore(store);
    setCreatingNewAddress(false);
    setForm({
      storeName: store.storeName,
      numberphone: store.numberphone,
      workingHourID: store.workingHourID,
      addressID: store.addressID,
      currentAddress: '',
      subDistrict: '',
      district: '',
      cityID: '',
    });
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleWorkingHourSelect = (e) => {
    const value = e.target.value;
    if (value === 'new') {
      setShowWorkingHourModal(true);
      setNewWorkingHourStart('');
      setNewWorkingHourEnd('');
    } else {
      setForm(prev => ({ ...prev, workingHourID: value }));
    }
  };

  const handleAddWorkingHour = async () => {
    if (!newWorkingHourStart || !newWorkingHourEnd) {
      alert('Vui lòng nhập đủ giờ bắt đầu và kết thúc!');
      return;
    }

    try {
      const exists = workingHours.find(
        wh => wh.startTime === newWorkingHourStart && wh.endTime === newWorkingHourEnd
      );
      if (exists) {
        alert('Giờ làm việc đã tồn tại!');
        setForm(prev => ({ ...prev, workingHourID: exists.workingHourID }));
        setShowWorkingHourModal(false);
        return;
      }

      const res = await workingHourServices.createWorkingHour(newWorkingHourStart, newWorkingHourEnd);
      if (res?.workingHourID) {
        fetchWorkingHours();
        setForm(prev => ({ ...prev, workingHourID: res.workingHourID }));
        setShowWorkingHourModal(false);
        alert('Thêm giờ làm việc mới thành công!');
      } else {
        alert('Có lỗi khi thêm giờ làm việc!');
      }
    } catch (err) {
      console.error('Lỗi handleAddWorkingHour:', err);
      alert('Có lỗi khi thêm giờ làm việc!');
    }
  };

  const handleAddressSelect = (e) => {
    const value = e.target.value;
    if (value === 'new') {
      setCreatingNewAddress(true);
      setForm(prev => ({ ...prev, addressID: '' }));
    } else {
      setCreatingNewAddress(false);
      setForm(prev => ({ ...prev, addressID: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let addressID = form.addressID;

      if (creatingNewAddress) {
        const newAddress = {
          currentAddress: form.currentAddress,
          subDistrict: form.subDistrict,
          district: form.district,
          cityID: Number(form.cityID),
          userID: Number(userID),
        };
        const addressRes = await addressServices.createAddress(newAddress);
        addressID = addressRes?.addressID;
        if (!addressID) throw new Error('Tạo địa chỉ thất bại!');
        fetchAddresses();
      }

      if (editingStore) {
        await storeServices.updateStore(
          editingStore.storeID,
          form.storeName,
          form.numberphone,
          Number(form.workingHourID),
          Number(addressID)
        );
        alert('Cập nhật cửa hàng thành công!');
      } else {
        await storeServices.createStore(
          form.storeName,
          form.numberphone,
          Number(form.workingHourID),
          Number(addressID)
        );
        alert('Thêm cửa hàng thành công!');
      }

      handleClose();
      fetchStoresWithFullAddress();
    } catch (error) {
      console.error('Lỗi handleSubmit:', error);
      alert('Có lỗi xảy ra khi lưu dữ liệu!');
    }
  };

  const handleDelete = async (storeID) => {
    if (window.confirm('Bạn có chắc muốn xóa cửa hàng này?')) {
      try {
        await storeServices.deleteStore(storeID);
        fetchStoresWithFullAddress();
        alert('Xóa thành công!');
      } catch (err) {
        console.error('Lỗi handleDelete:', err);
        alert('Xóa thất bại!');
      }
    }
  };

    // ------------------- FETCH BOOKINGS & ORDERS -------------------
  const fetchBookingsByStore = async (storeID) => {
    try {
      const bookings = await bookingServices.getBook();
      const storeBookingList = bookings.filter(b => norm(b.storeID) === norm(storeID));

      // Lấy tất cả dịch vụ
      const allServices = await services.getService();
      const serviceMap = {};
      (allServices || []).forEach(s => {
        const id = getField(s, ['serID', 'serviceID', 'id']);
        serviceMap[norm(id)] = getField(s, ['serName', 'serviceName', 'name']) || 'Không xác định';
      });

      // Map booking để hiển thị tên dịch vụ và thời gian
      const mappedBookings = storeBookingList.map(b => ({
        ...b,
        serviceName: serviceMap[norm(b.serID)] || 'Không xác định',
        displayDateTime: `${b.startDate || ''} ${b.startTime || ''}`
      }));

      setStoreBookings(mappedBookings);

      // Tính tổng doanh thu booking
      let bookingRevenue = 0;
      for (const b of mappedBookings) {
        const servicePrice = allServices.find(s => norm(s.serID) === norm(b.serID))?.serPrice || 0;
        bookingRevenue += Number(servicePrice);
      }
      setTotalBookingRevenue(bookingRevenue);

    } catch (err) {
      console.error('Lỗi fetchBookingsByStore:', err);
      alert('Có lỗi khi tải booking!');
    }
  };


    const fetchOrdersByStore = async (storeID) => {
      if (!storeID || isFetchingRef.current) return;

      isFetchingRef.current = true;
      setLoadingOrders(true);
      setDetailedOrders([]);
      setTotalRevenue(0);

      try {
        const [
          allWarehouses,
          allProducts,
          allProductOrders,
          allOrders,
        ] = await Promise.all([
          warehouseServices.getWarehouse(),
          productServices.getProduct(),
          ProductOrder.getProductOrder(),
          orderServices.getOrder(),
        ]);

        const matchedWarehouses = (allWarehouses || []).filter(w => {
          const wStoreId = getField(w, ['storeID', 'storeId', 'store']);
          return norm(wStoreId) === norm(storeID);
        });

        const storeWarehouseIDs = matchedWarehouses.map(w => {
          const wid = getField(w, ['warehouseID', 'warehouseId', 'id', 'wareHouseID']);
          return norm(wid);
        }).filter(Boolean);

        const storeProducts = (allProducts || []).filter(p => {
          const pWid = getField(p, ['warehouseID', 'warehouseId', 'wareHouseID']);
          return storeWarehouseIDs.includes(norm(pWid));
        });

        const productMap = {};
        storeProducts.forEach(p => {
          const pid = getField(p, ['productID', 'proID', 'proId', 'id']);
          productMap[norm(pid)] = p;
        });
        const storeProductIDs = Object.keys(productMap);

        const storeProductOrders = (allProductOrders || []).filter(po => {
          const poPid = getField(po, ['productID', 'proID', 'proId', 'productId']);
          return storeProductIDs.includes(norm(poPid));
        });

        const orderToProductOrders = {};
        storeProductOrders.forEach(po => {
          const poOrderId = getField(po, ['orderID', 'orderId', 'order_id', 'id']);
          const poProdId = getField(po, ['productID', 'proID', 'proId', 'productId']);
          const keyOrder = norm(poOrderId);
          const keyProd = norm(poProdId);
          if (!orderToProductOrders[keyOrder]) orderToProductOrders[keyOrder] = [];
          orderToProductOrders[keyOrder].push({
            orderID: keyOrder,
            productID: keyProd,
            quantity: Number(getField(po, ['quantity', 'qty', 'proOrderQuantity'])) || 0,
            raw: po,
          });
        });

        const storeOrderIDs = Object.keys(orderToProductOrders);
        const finalOrders = (allOrders || []).filter(o => {
          const oId = getField(o, ['orderID', 'orderId', 'id', 'order_id']);
          return storeOrderIDs.includes(norm(oId));
        }).map(o => {
          const oIdNorm = norm(getField(o, ['orderID', 'orderId', 'id', 'order_id']));
          const items = orderToProductOrders[oIdNorm] || [];
          const productsList = items.map(it => {
            const prod = productMap[it.productID] || {};
            const name = getField(prod, ['productName', 'proName', 'name']) || '';
            const price = Number(getField(prod, ['price', 'proPrice'])) || 0;
            const quantity = it.quantity || 0;
            return {
              productID: it.productID,
              productName: name,
              quantity,
              price,
              total: quantity * price,
            };
          });

          return {
            orderID: oIdNorm,
            customerName: getField(o, ['customerName', 'customer', 'buyerName']) || (getField(o, ['customerID']) ? `#${getField(o, ['customerID'])}` : 'Khách lạ'),
            date: getField(o, ['date', 'createDate', 'orderDate']) || '',
            status: getField(o, ['status', 'orderStatus']) || '',
            products: productsList,
            raw: o,
          };
        });

        setDetailedOrders(finalOrders);
        setStoreBookings([]);

        const revenue = finalOrders.reduce((sum, order) => {
          const orderTotal = order.products.reduce((s, p) => s + (p.total || 0), 0);
          return sum + orderTotal;
        }, 0);
        setTotalRevenue(revenue);

      } catch (error) {
        console.error('Lỗi fetchOrdersByStore (final):', error);
        alert('Có lỗi khi tải đơn hàng!');
      } finally {
        setLoadingOrders(false);
        isFetchingRef.current = false;
      }
    };

    // ------------------- TABLE DATA -------------------
   const headers = [
  'Mã cửa hàng',
  'Tên cửa hàng',
  'SĐT',
  'Giờ làm việc',
  'Địa chỉ',
  'Sửa',
  'Xóa',
  'Xem Lịch Đặt',
  'Xem Đơn Hàng'
];

  const tableData = stores.map((s) => ({
  storeID: s.storeID,
  storeName: s.storeName,
  numberphone: s.numberphone,
  workingHourName: getWorkingHourName(s.workingHourID),
  fullAddress: s.fullAddress,
  editAction: (
    <div className={cx('button-cell')}>
      <button className="edit" onClick={() => handleShowEdit(s)}>Sửa</button>
    </div>
  ),
  deleteAction: (
    <div className={cx('button-cell')}>
      <button className="delete" onClick={() => handleDelete(s.storeID)}>Xóa</button>
    </div>
  ),
  bookingAction: (
    <div className={cx('button-cell')}>
      <button className="booking" onClick={async () => {
        setSelectedStoreID(s.storeID);
        setDetailedOrders([]);
        setTotalRevenue(0);
        await fetchBookingsByStore(s.storeID);
        setShowDetailsModal(true);
      }}>Xem Lịch Đặt</button>
    </div>
  ),
  orderAction: (
    <div className={cx('button-cell')}>
      <button
        className="order"
        onClick={async () => {
          setSelectedStoreID(s.storeID);
          setDetailedOrders([]);
          setTotalRevenue(0);
          await fetchOrdersByStore(s.storeID);
          setShowDetailsModal(true);
        }}
        disabled={isFetchingRef.current}
      >
        {isFetchingRef.current ? 'Đang tải...' : 'Xem Đơn Hàng'}
      </button>
    </div>
  )
}));
    return (
      <div className={cx('store-management')}>
        <div className={cx('header')}>
          <h3>Danh Sách Cửa Hàng</h3>
          <Button variant="success" onClick={handleShowAdd}>➕ Thêm mới</Button>
        </div>

        <CustomTable
          headers={headers}
          data={tableData}
          variant="light"
         
        />

        {/* ----------------- MODAL CHI TIẾT ----------------- */}
        <Modal
          show={showDetailsModal}
          onHide={() => setShowDetailsModal(false)}
          size="lg"
          scrollable
        >
          <Modal.Header closeButton>
            <Modal.Title>Chi tiết cửa hàng #{selectedStoreID}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Giờ làm việc:</strong> {getWorkingHourName(
              stores.find(s => norm(s.storeID) === norm(selectedStoreID))?.workingHourID
            )}</p>

            {storeBookings.length > 0 && (
              <div className={cx('store-bookings-modal')}>
                <h5>Lịch Đặt</h5>
                <p><strong>Tổng doanh thu booking:</strong> {totalBookingRevenue.toLocaleString()} VNĐ</p>
                <CustomTable
    headers={['BookingID', 'Khách hàng', 'Dịch vụ', 'Ngày giờ', 'Trạng thái']}
    data={storeBookings.map(b => ({
      BookingID: b.bookingID,
      KhachHang: b.customerID || 'Khách lạ',
      DichVu: b.serviceName,
      NgayGio: b.displayDateTime,
      TrangThai: b.status || '',
    }))}
  />

              </div>
            )}

            {detailedOrders.length > 0 && (
              <div className={cx('store-orders-modal')}>
                <h5>Đơn Hàng</h5>
                <p><strong>Tổng doanh thu đơn hàng:</strong> {totalRevenue.toLocaleString()} VNĐ</p>
                {detailedOrders.map(o => (
                  <div key={o.orderID} className={cx('order-item')}>
                    <h6>Order #{o.orderID} - {o.customerName} - {o.date}</h6>
                    <CustomTable
                      headers={['Product', 'Số lượng', 'Giá', 'Tổng']}
                      data={o.products.map(p => ({
                        Product: p.productName,
                        SoLuong: p.quantity,
                        Gia: p.price.toLocaleString(),
                        Tong: p.total.toLocaleString(),
                      }))}
                    />
                  </div>
                ))}
              </div>
            )}
          </Modal.Body>
        </Modal>

        {/* ----------------- MODAL THÊM/SỬA ----------------- */}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{editingStore ? 'Sửa cửa hàng' : 'Thêm cửa hàng'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Tên cửa hàng</Form.Label>
                <Form.Control
                  type="text"
                  name="storeName"
                  value={form.storeName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>SĐT</Form.Label>
                <Form.Control
                  type="text"
                  name="numberphone"
                  value={form.numberphone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Giờ làm việc</Form.Label>
                <Form.Select name="workingHourID" value={form.workingHourID} onChange={handleWorkingHourSelect} required>
                  <option value="">-- Chọn giờ làm việc --</option>
                  {workingHours.map(w => (
                    <option key={w.workingHourID} value={w.workingHourID}>
                      {w.startTime} - {w.endTime}
                    </option>
                  ))}
                  <option value="new">+ Thêm giờ mới</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Select value={form.addressID || (creatingNewAddress ? 'new' : '')} onChange={handleAddressSelect} required>
                  <option value="">-- Chọn địa chỉ --</option>
                  {addresses.map(a => (
                    <option key={a.addressID} value={a.addressID}>
                      {a.currentAddress}, {a.subDistrict}, {a.district}
                    </option>
                  ))}
                  <option value="new">+ Thêm địa chỉ mới</option>
                </Form.Select>
              </Form.Group>

              {creatingNewAddress && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Địa chỉ cụ thể</Form.Label>
                    <Form.Control type="text" name="currentAddress" value={form.currentAddress} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Phường/Xã</Form.Label>
                    <Form.Control type="text" name="subDistrict" value={form.subDistrict} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Quận/Huyện</Form.Label>
                    <Form.Control type="text" name="district" value={form.district} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Tỉnh/Thành phố</Form.Label>
                    <Form.Select name="cityID" value={form.cityID} onChange={handleChange} required>
                      <option value="">-- Chọn tỉnh/thành --</option>
                      {countries.map(c => (
                        <option key={c.countryID} value={c.countryID}>{c.countryName}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </>
              )}
              <Button variant="primary" type="submit">
                {editingStore ? 'Cập nhật' : 'Thêm'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        {/* ----------------- MODAL THÊM GIỜ LÀM VIỆC ----------------- */}
        <Modal show={showWorkingHourModal} onHide={() => setShowWorkingHourModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Thêm giờ làm việc</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Giờ bắt đầu</Form.Label>
              <Form.Control type="time" value={newWorkingHourStart} onChange={(e) => setNewWorkingHourStart(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Giờ kết thúc</Form.Label>
              <Form.Control type="time" value={newWorkingHourEnd} onChange={(e) => setNewWorkingHourEnd(e.target.value)} />
            </Form.Group>
            <Button variant="success" onClick={handleAddWorkingHour}>Thêm</Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }

  export default StoreManagement;

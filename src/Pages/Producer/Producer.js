import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import styles from './Producer.module.scss';

import CustomTable from '~/components/common/CustomTable/CustomTable';

// Services
import * as producerServices from '~/services/producerServices';
import * as addressServices from '~/services/addressServices';
import * as countryServices from '~/services/ountryService';
import * as cityServices from '~/services/cityService';

const cx = classNames.bind(styles);

function Producer({ adminUserID }) {
  const [producers, setProducers] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProducer, setEditingProducer] = useState(null);
  const [creatingNewAddress, setCreatingNewAddress] = useState(false);

  const [form, setForm] = useState({
    producerName: '',
    numberphone: '',
    addressID: '',
    currentAddress: '',
    subDistrict: '',
    district: '',
    cityID: '',
  });

  useEffect(() => {
    fetchProducers();
    fetchAddresses();
    fetchCountries();
  }, []);

  const fetchProducers = async () => {
    const result = await producerServices.getProducer();
    if (result) setProducers(result);
  };

  const fetchAddresses = async () => {
    const result = await addressServices.getAddress();
    if (result) {
      setAddresses(result.filter(a => Number(a.userID) === Number(adminUserID)));
    }
  };

  const fetchCountries = async () => {
    const result = await countryServices.getCountries();
    if (result) setCountries(result);
  };

  const fetchCities = async (countryID) => {
    const result = await cityServices.getCitiesByCountry(countryID);
    if (result) setCities(result);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (name === 'cityID') {
      fetchCities(value);
      setForm(prev => ({ ...prev, district: '' }));
    }
  };

  const handleShowAdd = () => {
    setEditingProducer(null);
    setCreatingNewAddress(false);
    setForm({
      producerName: '',
      numberphone: '',
      addressID: '',
      currentAddress: '',
      subDistrict: '',
      district: '',
      cityID: '',
    });
    setShowModal(true);
  };

  const handleShowEdit = (producer) => {
    setEditingProducer(producer);
    setCreatingNewAddress(false);
    setForm({
      producerName: producer.producerName,
      numberphone: producer.numberphone,
      addressID: producer.addressID,
      currentAddress: '',
      subDistrict: '',
      district: '',
      cityID: '',
    });
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

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
          userID: Number(adminUserID),
        };
        const addressRes = await addressServices.createAddress(newAddress);
        addressID = addressRes?.addressID;
        if (!addressID) throw new Error('Tạo địa chỉ thất bại!');
      }

      if (editingProducer) {
        await producerServices.updateProducer(
          editingProducer.producerID,
          form.producerName,
          form.numberphone,
          Number(addressID)
        );
        alert('Cập nhật nhà cung cấp thành công!');
      } else {
        await producerServices.createProducer(
          form.producerName,
          form.numberphone,
          Number(addressID)
        );
        alert('Thêm nhà cung cấp thành công!');
      }

      handleClose();
      fetchProducers();
      fetchAddresses();
    } catch (error) {
      console.error(error);
      alert('Có lỗi xảy ra khi lưu dữ liệu!');
    }
  };
  const handleCancel = () => {
    setEditingProducer(null);
    setCreatingNewAddress(false);
    setForm({
      producerName: '',
      numberphone: '',
      addressID: '',
      currentAddress: '',
      subDistrict: '',
      district: '',
      cityID: '',
    });
  };

  const handleDelete = async (producerID) => {
    if (window.confirm('Bạn có chắc muốn xóa nhà cung cấp này?')) {
      await producerServices.deleteProducer(producerID);
      fetchProducers();
      alert('Xóa thành công!');
    }
  };

  const headers = ['Mã nhà cung cấp', 'Tên nhà cung cấp', 'SDT', 'Address ID', 'Hành động'];
  const tableData = producers.map(p => ({
    producerID: p.producerID,
    producerName: p.producerName,
    numberphone: p.numberphone,
    addressID: p.addressID,
    action: (
      <>
        <Button variant="info" size="sm" onClick={() => handleShowEdit(p)}>Sửa</Button>
        <Button variant="danger" size="sm" style={{ marginLeft: 5 }} onClick={() => handleDelete(p.producerID)}>Xóa</Button>
      </>
    )
  }));

  return (
    <div className={cx('container')}>
      <div className={cx('list-user')}>
        <span>{editingProducer ? '✏️ Sửa Nhà Cung Cấp' : '➕ Thêm Nhà Cung Cấp'}</span>
        {editingProducer && <Button variant="secondary" onClick={handleCancel}>Hủy</Button>}
      </div>

      {/* Form thêm/sửa hiển thị trực tiếp */}
      <Form onSubmit={handleSubmit} className={cx('form-direct')}>
        <Form.Group className="mb-3">
          <Form.Label>Tên nhà cung cấp</Form.Label>
          <Form.Control type="text" name="producerName" value={form.producerName} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control type="text" name="numberphone" value={form.numberphone} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Select value={creatingNewAddress ? 'new' : form.addressID} onChange={handleAddressSelect}>
            <option value="">-- Chọn địa chỉ có sẵn --</option>
            {addresses.map(addr => (
              <option key={addr.addressID} value={addr.addressID}>
                {`${addr.currentAddress}, ${addr.subDistrict}, ${addr.district}`}
              </option>
            ))}
            <option value="new">➕ Thêm địa chỉ mới</option>
          </Form.Select>
        </Form.Group>

        {creatingNewAddress && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Quốc gia</Form.Label>
              <Form.Select name="cityID" value={form.cityID} onChange={handleChange} required>
                <option value="">-- Chọn quốc gia --</option>
                {countries.map(c => (
                  <option key={c.countryID} value={c.countryID}>{c.countryName}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quận/Huyện</Form.Label>
              <Form.Select name="district" value={form.district} onChange={handleChange} required>
                <option value="">-- Chọn quận/huyện --</option>
                {cities.map(c => (
                  <option key={c.cityID} value={c.cityName}>{c.cityName}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Địa chỉ hiện tại</Form.Label>
              <Form.Control type="text" name="currentAddress" value={form.currentAddress} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phường/Xã</Form.Label>
              <Form.Control type="text" name="subDistrict" value={form.subDistrict} onChange={handleChange} required />
            </Form.Group>
          </>
        )}

        <Button variant="primary" type="submit">{editingProducer ? 'Cập nhật' : 'Thêm mới'}</Button>
      </Form>

      {/* Bảng dữ liệu */}
      <CustomTable headers={headers} data={tableData} />
    </div>
  );
}

export default Producer;

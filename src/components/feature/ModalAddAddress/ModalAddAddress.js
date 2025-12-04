import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import * as addressServices from '~/services/addressServices';
import * as countryServices from '~/services/ountryService';
import * as cityServices from '~/services/cityService';

function ModalAddAddress({ show, handleClose, userID, onAddAddress }) {
  const [formData, setFormData] = useState({
    currentAddress: '',
    subDistrict: '',
    district: '',
    cityID: '',     // sẽ set tự động khi chọn district
    countryID: '',  // chọn quốc gia
    userID: userID || 0,
  });

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (show) {
      fetchCountries();
      setFormData({
        currentAddress: '',
        subDistrict: '',
        district: '',
        cityID: '',
        countryID: '',
        userID: userID || 0,
      });
    }
  }, [show, userID]);

  const fetchCountries = async () => {
    try {
      const res = await countryServices.getCountries();
      if (res) setCountries(res);
    } catch (err) {
      console.error('Lỗi lấy country:', err);
    }
  };

  const fetchCities = async (countryID) => {
    try {
      const res = await cityServices.getCitiesByCountry(countryID);
      if (res) setCities(res);
    } catch (err) {
      console.error('Lỗi lấy city:', err);
      setCities([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'countryID') {
      fetchCities(value);
      setFormData(prev => ({ ...prev, district: '', cityID: '' }));
    }

    if (name === 'district') {
      // Tìm cityID tương ứng với district được chọn
      const selectedCity = cities.find(c => c.cityName === value);
      if (selectedCity) {
        setFormData(prev => ({ ...prev, cityID: selectedCity.cityID }));
      }
    }
  };

  const handleSubmit = async () => {
    if (!formData.cityID || !formData.currentAddress || !formData.subDistrict || !formData.district) {
      alert('Vui lòng điền đầy đủ thông tin và chọn country/district!');
      return;
    }

    try {
      const newAddress = {
        currentAddress: formData.currentAddress,
        subDistrict: formData.subDistrict,
        district: formData.district,
        cityID: formData.cityID,
        userID: formData.userID,
      };

      const res = await addressServices.createAddress(newAddress);
      onAddAddress(res);
      handleCloseModal();
    } catch (err) {
      console.error('Lỗi thêm địa chỉ:', err);
    }
  };

  const handleCloseModal = () => {
    handleClose();
    setFormData({
      currentAddress: '',
      subDistrict: '',
      district: '',
      cityID: '',
      countryID: '',
      userID: userID || 0,
    });
  };

  return (
    <Modal show={show} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Thêm Địa Chỉ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Quốc gia</Form.Label>
            <Form.Select name="countryID" value={formData.countryID} onChange={handleChange}>
              <option value="">-- Chọn quốc gia --</option>
              {countries.map(c => (
                <option key={c.countryID} value={c.countryID}>{c.countryName}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Quận/Huyện</Form.Label>
            <Form.Select name="district" value={formData.district} onChange={handleChange}>
              <option value="">-- Chọn quận/huyện --</option>
              {cities.map(c => (
                <option key={c.cityID} value={c.cityName}>{c.cityName}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Địa chỉ hiện tại</Form.Label>
            <Form.Control name="currentAddress" value={formData.currentAddress} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Phường/Xã</Form.Label>
            <Form.Control name="subDistrict" value={formData.subDistrict} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>Hủy</Button>
        <Button variant="success" onClick={handleSubmit}>Thêm</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAddAddress;

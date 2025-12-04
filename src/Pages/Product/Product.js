import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Product.module.scss';
import Image from '~/components/common/Image';
import Button from 'react-bootstrap/Button';

import CustomTable from '~/components/common/CustomTable/CustomTable';
import { ModalDelete } from '~/components/feature/ModalProduct';

//Service
import * as productServices from '~/services/productServices';

const cx = classNames.bind(styles);

function Product() {
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataProductDelete, setDataProductDelete] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      const result = await productServices.getProduct();
      if (result) setProducts(result);
    };
    fetchApi();
  }, []);

  const handleAddProduct = () => {
    navigate('/booking/product/addProduct');
  };

  const handleEdit = (product) => {
    navigate(`/booking/product/editProduct`, { state: { product } });
  };

  const handleClose = () => setIsShowModalDelete(false);

  const handleDelete = (product) => {
    setIsShowModalDelete(true);
    setDataProductDelete(product);
  };

  // Chuẩn bị dữ liệu cho CustomTable
  const headers = [
    'Mã SP',
    'Tên SP',
    'Hình',
    'Giá',
    'Số lượng',
    'Mô tả',
    'Mã NSX',
    'Mã Kho',
    'Mã Loại SP',
    'Chức Năng',
  ];

  const tableData = products.map((p) => ({
    proID: p.proID,
    proName: p.proName,
    proImage: <Image src={p.proImage} alt={p.proName} width="120" height="100" />,
    price: p.price,
    quantity: p.quantity,
    proDescription: p.proDescription,
    producerID: p.producerID,
    warehouseID: p.warehouseID,
    cateID: p.cateID,
    action: (
      <>
        <Button variant="outline-info" size="sm" onClick={() => handleEdit(p)}>
          Edit
        </Button>
        <Button variant="outline-danger" size="sm" style={{ marginLeft: 5 }} onClick={() => handleDelete(p)}>
          Delete
        </Button>
      </>
    ),
  }));

  return (
    <div>
      <div className={cx('list-user')}>
        <span>Danh Sách Sản Phẩm</span>
        <Button variant="success" onClick={handleAddProduct} style={{ marginLeft: '15px' }}>
          Thêm Product
        </Button>
      </div>

      <CustomTable headers={headers} data={tableData} />

      <ModalDelete
        show={isShowModalDelete}
        handleClose={handleClose}
        dataProductDelete={dataProductDelete}
        setProducts={setProducts}
      />
    </div>
  );
}

export default Product;

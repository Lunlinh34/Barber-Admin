// import React from 'react';
// import Table from 'react-bootstrap/Table';
// import classNames from 'classnames/bind';
// import styles from './CustomTable.module.scss';

// const cx = classNames.bind(styles);

// /**
//  * CustomTable - bảng dùng Bootstrap + CSS style WarehousePage
//  * 
//  * @param {Array} headers - Tiêu đề cột
//  * @param {Array} data - Dữ liệu (mảng object)
//  * @param {Function} renderActions - Hàm render nút hành động (tùy chọn)
//  * @param {String} variant - Màu nền bảng ('light', 'dark'...)
//  */
// function CustomTable({ headers = [], data = [], renderActions, variant = 'light' }) {
//   return (
//     <div className={cx('table-wrapper')}>
//       <Table bordered hover responsive className={cx('custom-table', variant)}>
//         <thead>
//           <tr>
//             {headers.map((header, idx) => (
//               <th key={idx}>{header}</th>
//             ))}
//             {renderActions && <th className={cx('action-header')}>Thao tác</th>}
//           </tr>
//         </thead>
//         <tbody>
//           {data.length > 0 ? (
//             data.map((item, index) => (
//               <tr key={index}>
//                 {Object.values(item).map((value, i) => (
//                   <td key={i}>{value}</td>
//                 ))}
//                 {renderActions && <td className={cx('action-cell')}>{renderActions(item)}</td>}
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={headers.length + (renderActions ? 1 : 0)} className={cx('no-data')}>
//                 Không có dữ liệu
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </Table>
//     </div>
//   );
// }

// export default CustomTable;
import React from 'react';
import Table from 'react-bootstrap/Table';
import classNames from 'classnames/bind';
import styles from './CustomTable.module.scss';

const cx = classNames.bind(styles);

/**
 * CustomTable - bảng dùng Bootstrap + SCSS module
 * @param {Array} headers - tiêu đề cột
 * @param {Array} data - dữ liệu (mảng object)
 * @param {Function} renderActions - hàm render nút hành động
 * @param {String} variant - 'light' | 'dark'
 */
function CustomTable({ headers = [], data = [], renderActions, variant = 'light' }) {
  return (
    <div className={cx('table-wrapper')}>
      <Table
        bordered
        hover
        responsive
        className={cx('custom-table', variant)}
      >
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx}>{header}</th>
            ))}
            {renderActions && <th className={cx('action-header')}>Thao tác</th>}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                {Object.values(item).map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
                {renderActions && (
                  <td className={cx('action-cell')}>{renderActions(item)}</td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length + (renderActions ? 1 : 0)}
                className={cx('no-data')}
              >
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default CustomTable;

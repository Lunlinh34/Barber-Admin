import React, { useState, useEffect } from 'react';
import {
  LineChart, Line,
  BarChart, Bar,
  PieChart, Pie, Cell,
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import './Dashboard.scss'; // thêm style riêng nếu muốn

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Thay bằng API call thực tế nếu có
    const fetchData = async () => {
      const demoData = [
        { name: 'Tháng 1', sales: 4000, orders: 2400, customers: 1200 },
        { name: 'Tháng 2', sales: 3000, orders: 1398, customers: 1100 },
        { name: 'Tháng 3', sales: 2000, orders: 9800, customers: 1500 },
        { name: 'Tháng 4', sales: 2780, orders: 3908, customers: 900 },
        { name: 'Tháng 5', sales: 1890, orders: 4800, customers: 1000 },
      ];
      setData(demoData);
    };
    fetchData();
  }, []);

  const pieData = [
    { name: 'Khách hàng mới', value: 400 },
    { name: 'Khách hàng cũ', value: 300 },
    { name: 'Khách hàng VIP', value: 300 },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="dashboard">
      <h2>Dashboard Thống Kê</h2>
      
      <div className="chart-row">
        {/* Biểu đồ cột */}
        <div className="chart-card">
          <h3>Doanh số theo tháng</h3>
          <BarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" />
            <Bar dataKey="orders" fill="#82ca9d" />
          </BarChart>
        </div>

        {/* Biểu đồ đường */}
        <div className="chart-card">
          <h3>Đơn hàng theo tháng</h3>
          <LineChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="orders" stroke="#8884d8" />
            <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
          </LineChart>
        </div>
      </div>

      <div className="chart-row">
        {/* Biểu đồ hình tròn */}
        <div className="chart-card">
          <h3>Phân loại khách hàng</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Biểu đồ vùng */}
        <div className="chart-card">
          <h3>Khách hàng theo tháng</h3>
          <AreaChart width={500} height={300} data={data}>
            <defs>
              <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Area type="monotone" dataKey="customers" stroke="#8884d8" fillOpacity={1} fill="url(#colorCustomers)" />
          </AreaChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

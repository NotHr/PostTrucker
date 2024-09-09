import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';  // Import chart.js itself
import './Dashboard.css';

const Dashboard = () => {
  const [trucks, setTrucks] = useState([]);
  const [user, setUser] = useState({
    id: 0,
    username: "ni",
    email: "",
    first_name: "",
    last_name: "",
    user_type: "",
    phone_number: ""
  });
  
  const [stats, setStats] = useState({
    totalTrucks: 0,
    onTimeDeliveries: 0,
    delayedDeliveries: 0,
    pendingTasks: 0,
  });

  useEffect(() => {
    const truckData = [
      { id: 1, number: 'TN-01-A-1234', arrival: '10:30 AM', status: 'On-Time' },
      { id: 2, number: 'AP-02-B-5678', arrival: '11:00 AM', status: 'Delayed' },
      { id: 3, number: 'KA-05-C-9101', arrival: '12:00 PM', status: 'On-Time' },
      { id: 4, number: 'MH-10-D-1111', arrival: '01:30 PM', status: 'Delayed' },
      { id: 5, number: 'DL-12-E-2222', arrival: '02:00 PM', status: 'On-Time' },
      { id: 6, number: 'RJ-07-F-3333', arrival: '03:30 PM', status: 'On-Time' },
      { id: 7, number: 'WB-09-G-4444', arrival: '04:00 PM', status: 'Delayed' },
    ];

    const newStats = {
      totalTrucks: truckData.length,
      onTimeDeliveries: truckData.filter(truck => truck.status === 'On-Time').length,
      delayedDeliveries: truckData.filter(truck => truck.status === 'Delayed').length,
      pendingTasks: 7, // Example pending task count
    };

    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setTrucks(truckData);
    setStats(newStats);
  }, []);

  const deliveryData = {
    labels: ['On-Time', 'Delayed'],
    datasets: [
      {
        label: 'Deliveries',
        data: [stats.onTimeDeliveries, stats.delayedDeliveries],
        backgroundColor: ['#4CAF50', '#F44336'],
      },
    ],
  };

  const taskData = {
    labels: ['Pending Tasks'],
    datasets: [
      {
        data: [stats.pendingTasks],
        backgroundColor: ['#FFA726'],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome {user.username}</h1>
      <div className="dashboard-grid">
        {/* Incoming Trucks Section */}
        <div className="section trucks-section">
          <h2>Incoming Trucks</h2>
          <div className="trucks-scrollable">
            {trucks.map(truck => (
              <div
                key={truck.id}
                className={`dashboard-card ${truck.status === 'Delayed' ? 'truck-issue' : ''}`}
              >
                <h3>Truck Number: {truck.number}</h3>
                <p>Arrival Time: {truck.arrival}</p>
                <p className={truck.status === 'On-Time' ? 'on-time' : 'delayed'}>
                  Status: {truck.status}
                </p>
                <button>Manage</button>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Stats Section */}
        <div className="section stats-section">
          <h2>Delivery Stats</h2>
          <div className="dashboard-card">
            <h3>Total Trucks Today: {stats.totalTrucks}</h3>
            <p>On-Time Deliveries: {stats.onTimeDeliveries}</p>
            <p>Delayed Deliveries: {stats.delayedDeliveries}</p>
            <p>Pending Tasks: {stats.pendingTasks}</p>
          </div>

          {/* Bar Chart for On-Time vs Delayed Deliveries */}
          <div className="chart-container">
            <h3>Deliveries Overview</h3>
            <Bar data={deliveryData} />
          </div>

          {/* Pie Chart for Pending Tasks */}
          <div className="chart-container">
            <h3>Pending Tasks</h3>
            <Pie data={taskData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
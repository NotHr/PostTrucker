import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './Dashboard.css';

const Dashboard = () => {
  const [trucks, setTrucks] = useState([]);
  const [outgoingTrucks, setOutgoingTrucks] = useState([]);
  const [filteredTrucks, setFilteredTrucks] = useState([]);
  const [driverForm, setDriverForm] = useState({
    size: '',
    weight: '',
    destination: ''
  });

  const [stats, setStats] = useState({
    totalTrucks: 0,
    onTimeDeliveries: 0,
    delayedDeliveries: 0,
    pendingTasks: 0,
  });

  useEffect(() => {
    const truckData = [
      { id: 1, number: 'TN-01-A-1234', arrival: '10:30 AM', status: 'On-Time', sos: false },
      { id: 2, number: 'AP-02-B-5678', arrival: '11:00 AM', status: 'Delayed', sos: true },
      { id: 3, number: 'KA-05-C-9101', arrival: '12:00 PM', status: 'On-Time', sos: false },
      { id: 4, number: 'MH-10-D-1111', arrival: '01:30 PM', status: 'Delayed', sos: false },
      { id: 5, number: 'DL-12-E-2222', arrival: '02:00 PM', status: 'On-Time', sos: true },
      { id: 6, number: 'RJ-07-F-3333', arrival: '03:30 PM', status: 'On-Time', sos: false },
      { id: 7, number: 'WB-09-G-4444', arrival: '04:00 PM', status: 'Delayed', sos: false },
    ];

    const outgoingTruckData = [
      { id: 8, number: 'KL-14-H-5555', departure: '11:00 AM', status: 'On-Time', sos: false },
      { id: 9, number: 'GJ-01-I-6666', departure: '01:00 PM', status: 'Delayed', sos: false },
    ];

    const newStats = {
      totalTrucks: truckData.length,
      onTimeDeliveries: truckData.filter(truck => truck.status === 'On-Time').length,
      delayedDeliveries: truckData.filter(truck => truck.status === 'Delayed').length,
      pendingTasks: 7,
    };

    setTrucks(truckData);
    setOutgoingTrucks(outgoingTruckData);
    setStats(newStats);
  }, []);

  const handleFilterTrucks = () => {
    const filtered = trucks.filter(truck => {
      return (
        (!driverForm.size || truck.size === driverForm.size) &&
        (!driverForm.weight || truck.weight <= driverForm.weight) &&
        (!driverForm.destination || truck.destination === driverForm.destination)
      );
    });
    setFilteredTrucks(filtered);
  };

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
      <h1>Truck Monitoring Dashboard</h1>
      <div className="dashboard-grid">

        {/* Incoming Trucks Section */}
        <div className="section trucks-section">
          <h2>Incoming Trucks</h2>
          <div className="trucks-scrollable">
            {trucks.map(truck => (
              <div
                key={truck.id}
                className={`dashboard-card ${truck.status === 'Delayed' ? 'truck-issue' : ''} ${truck.sos ? 'truck-sos' : ''}`}
              >
                <h3>Truck Number: {truck.number}</h3>
                <p>Arrival Time: {truck.arrival}</p>
                <p className={truck.status === 'On-Time' ? 'on-time' : 'delayed'}>
                  Status: {truck.status}
                </p>
                {truck.sos && <p className="sos-alert">SOS Alert!</p>}
                <button>Manage</button>
              </div>
            ))}
          </div>
        </div>

        {/* Outgoing Trucks Section */}
        <div className="section trucks-section">
          <h2>Outgoing Trucks</h2>
          <div className="trucks-scrollable">
            {outgoingTrucks.map(truck => (
              <div
                key={truck.id}
                className={`dashboard-card ${truck.status === 'Delayed' ? 'truck-issue' : ''} ${truck.sos ? 'truck-sos' : ''}`}
              >
                <h3>Truck Number: {truck.number}</h3>
                <p>Departure Time: {truck.departure}</p>
                <p className={truck.status === 'On-Time' ? 'on-time' : 'delayed'}>
                  Status: {truck.status}
                </p>
                {truck.sos && <p className="sos-alert">SOS Alert!</p>}
                <button>Manage</button>
              </div>
            ))}
          </div>
        </div>

        {/* Get Driver Form */}
        <div className="section driver-form-section">
          <h2>Get Driver</h2>
          <div className="dashboard-card">
            <label>Size: </label>
            <input type="text" value={driverForm.size} onChange={(e) => setDriverForm({ ...driverForm, size: e.target.value })} />
            <label>Weight: </label>
            <input type="number" value={driverForm.weight} onChange={(e) => setDriverForm({ ...driverForm, weight: e.target.value })} />
            <label>Destination: </label>
            <input type="text" value={driverForm.destination} onChange={(e) => setDriverForm({ ...driverForm, destination: e.target.value })} />
            <button onClick={handleFilterTrucks}>Find Trucks</button>
          </div>

          <div className="filtered-trucks-section">
            <h3>Available Trucks</h3>
            {filteredTrucks.map(truck => (
              <div key={truck.id} className="dashboard-card">
                <h3>Truck Number: {truck.number}</h3>
                <p>Status: {truck.status}</p>
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

          <div className="chart-container">
            <h3>Deliveries Overview</h3>
            <Bar data={deliveryData} />
          </div>

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

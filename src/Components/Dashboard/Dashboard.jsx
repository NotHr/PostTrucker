import React from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import Tracking from './Tracking';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <TopNavbar />
        <div className="content-section">
          <Tracking />
          <div className="truck-section">
            {/* Truck Image */}
            <img src="https://via.placeholder.com/200" alt="Truck" />
            <p>Volkswagen Transporter</p>
          </div>
          <div className="map-section">
            {/* Map placeholder */}
            <img src="https://via.placeholder.com/400x200" alt="Map" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

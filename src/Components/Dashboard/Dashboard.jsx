import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [trucks, setTrucks] = useState([]);
  const [outgoingTrucks, setOutgoingTrucks] = useState([]);
  const [msgDriver, setmsgDriver] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [driverForm, setDriverForm] = useState({
    weight: 0,
    destination: '',
  });

  const [stats, setStats] = useState({
    totalTrucks: 0,
    onTimeDeliveries: 0,
    delayedDeliveries: 0,
    pendingTasks: 0,
  });

  useEffect(() => {
    // Initialize truck and stats data
    // const truckData = [
    //   { id: 1, number: 'TN-01-A-1234', arrival: '10:30 AM', status: 'On-Time', sos: false },
    //   { id: 2, number: 'AP-02-B-5678', arrival: '11:00 AM', status: 'Delayed', sos: true },
    //   { id: 3, number: 'KA-05-C-9101', arrival: '12:00 PM', status: 'On-Time', sos: false },
    //   { id: 4, number: 'MH-10-D-1111', arrival: '01:30 PM', status: 'Delayed', sos: false },
    //   { id: 5, number: 'DL-12-E-2222', arrival: '02:00 PM', status: 'On-Time', sos: true },
    //   { id: 6, number: 'RJ-07-F-3333', arrival: '03:30 PM', status: 'On-Time', sos: false },
    //   { id: 7, number: 'WB-09-G-4444', arrival: '04:00 PM', status: 'Delayed', sos: false },
    // ];

    const outgoingTruckData = [
      { id: 8, number: 'KL-14-H-5555', departure: '11:00 AM', status: 'On-Time', sos: false },
      { id: 9, number: 'GJ-01-I-6666', departure: '01:00 PM', status: 'Delayed', sos: false },
    ];

    // const newStats = {
    //   totalTrucks: truckData.length,
    //   onTimeDeliveries: truckData.filter(truck => truck.status === 'On-Time').length,
    //   delayedDeliveries: truckData.filter(truck => truck.status === 'Delayed').length,
    //   pendingTasks: 7,
    // };

    // setOutgoingTrucks(outgoingTruckData);
    // setStats(newStats);

    // Fetch destinations from the API
    const fetchDestinations = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage
        const response = await axios.get('http://172.26.49.82:8000/api/get_post_offices/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDestinations(response.data); // Update state with the fetched destinations
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };

    const fetchIncoming = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage
        const response = await axios.get('http://172.26.49.82:8000/api/incoming_trucks/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTrucks(response.data.incoming_trucks); // Update state with the fetched destinations
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };
    const fetchoutgoing = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage
        const response = await axios.get('http://172.26.49.82:8000/api/outgoing_trucks/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOutgoingTrucks(response.data.outgoing_trucks); // Update state with the fetched destinations
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };
    fetchoutgoing();
    fetchIncoming();
    fetchDestinations();
  }, []);

  const handleDriverRequest = async () => {
    try {
      const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage
      const response = await axios.post(
        'http://172.26.49.82:8000/api/find_driver/',
        {
          capacity: Number(driverForm.weight),
          destination: driverForm.destination,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(response.status === 500){
        setmsgDriver(response.data.message)
      }
      setmsgDriver(response.data.message); // Display the message returned from the server
    } catch (error) {
      console.error('Error finding driver:', error);
    }
  };


  return (
    <div className="dashboard-container">
      <button className="RegisterBtn1" onClick={() => navigate('/dashboard/consignment')}>Register New Driver</button>
      <button className="RegisterBtn" onClick={() => navigate('/dashboard/trucks')}>All Trucks</button>

      <h1 className="title">PostTrucker <span className="dashboard-highlight">Dashboard</span></h1>
      <div className="dashboard-grid">
  
        {/* Left Side: Trucks Section */}
        <div className="section trucks-section">
          <div className="incoming-trucks-section">
            <h2>Incoming Trucks</h2>
            <div className="trucks-scrollable">
              {trucks.map(truck => (
                <div
                  key={truck.truck_id}
                  className={`dashboard-card ${truck.status === 'Delayed' ? 'truck-issue' : ''} ${truck.sos ? 'truck-sos' : ''}`}
                >
                  <p className="truck-number">Truck Number: {truck.truck_plate}</p>
                  <p>Distance to Here: {truck.distance_to_post_office}</p>
                  <p className={truck.status === 'On-Time' ? 'on-time' : 'delayed'}>
                    Status: {truck.status}
                  </p>
                  {truck.sos && <p className="sos-alert">SOS Alert!</p>}
                  <button
                    onClick={() => {
                      navigate('/dashboard/truckdetails');
                      localStorage.setItem("truckKey", truck.truck_id);
                    }}
                  >
                    Manage
                  </button>
                </div>
              ))}
            </div>
          </div>
  
          <div className="outgoing-trucks-section">
            <h2>Outgoing Trucks</h2>
            <div className="trucks-scrollable">
              {outgoingTrucks.map(truck => (
                <div
                  key={truck.truck_id}
                  className={`dashboard-card ${truck.status === 'Delayed' ? 'truck-issue' : ''} ${truck.sos ? 'truck-sos' : ''}`}
                >
                  <p className="truck-number">Truck Number: {truck.truck_plate}</p>
                  <p>Departure Time: {truck.departure}</p>
                  <p className={truck.status === 'On-Time' ? 'on-time' : 'delayed'}>
                    Status: {truck.status}
                  </p>
                  {truck.sos && <p className="sos-alert">SOS Alert!</p>}
                  <button
                    onClick={() => {
                      navigate('/dashboard/truckdetails');
                      localStorage.setItem("truckKey", truck.truck_id);
                    }}
                  >
                    Manage
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {/* Right Side: Driver Form Section */}
        <div className="section driver-form-section">
          <h2>Get Driver</h2>
          <div className="dashboard-card driver-form">
            <label>Weight: </label>
            <input
              type="number"
              value={driverForm.weight}
              onChange={(e) => setDriverForm({ ...driverForm, weight: e.target.value })}
              placeholder="Max Weight"
            />
            <label>Destination: </label>
            <select
              value={driverForm.destination}
              onChange={(e) => setDriverForm({ ...driverForm, destination: e.target.value })}
            >
              <option value="">Select Destination</option>
              {destinations.map((destination) => (
                <option key={destination.id} value={destination.name}>
                  {destination.name}
                </option>
              ))}
            </select>
            <button onClick={handleDriverRequest}>Find Trucks</button>
            
            {/* Display message */}
            {msgDriver && <p className="route-message">{msgDriver}</p>}
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Dashboard;

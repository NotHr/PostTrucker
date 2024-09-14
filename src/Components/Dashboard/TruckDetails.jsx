import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import truckIMG from './box-truck.png'; // Truck icon for map marker
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import axios from 'axios';

// Custom Truck Icon
const truckIcon = new L.Icon({
  iconUrl: truckIMG,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function TruckDetails() {
  const [truck, setTruck] = useState({
    license_plate: '9380930',
    make: 'Benz',
    model: '2004',
    year: 2012,
    max_capacity: 10,
    capacity: 2,
    latitude: 17.5539,
    longitude: 78.4772,
    driver: 2,
  });
  const [chatMessages, setChatMessages] = useState([
    { sender: 'System', message: 'Truck has departed from Nagpur.' },
    { sender: 'System', message: 'Truck is on route to Mumbai.' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [quantity, setQuantity] = useState(''); // State for quantity input

  // Handle sending a new chat message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, { sender: 'User', message: newMessage }]);
      setNewMessage(''); // Clear the input after sending
    }
  };

  const updateTruckCapacity = async (action, amount) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.put(
        'http://172.26.49.82:8000/api/truck/2/update_capacity/',
        {
          action: action,   // Send either 'add' or 'delete'
          capacity: amount, // Send the capacity amount to add/delete
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Truck capacity updated:', response.data);
      setTruck((prevTruck) => ({
        ...prevTruck,
        capacity: response.data.capacity, // Update truck capacity based on API response
      }));
      setQuantity(''); // Clear input after successful operation
    } catch (error) {
      console.error('Error updating truck capacity:', error);
    }
  };

  // Handle Onload action
  const handleOnload = () => {
    const loadAmount = parseInt(quantity, 10);
    if (!isNaN(loadAmount) && loadAmount > 0) {
      updateTruckCapacity('add', loadAmount); // Send 'add' request to API
    } else {
      alert('Please enter a valid number for Onload.');
    }
  };

  // Handle Offload action
  const handleOffload = () => {
    const unloadAmount = parseInt(quantity, 10);
    if (!isNaN(unloadAmount) && unloadAmount > 0) {
      updateTruckCapacity('delete', unloadAmount); // Send 'delete' request to API
    } else {
      alert('Please enter a valid number for Offload.');
    }
  };

  return (
    <div style={styles.container}>
      {/* Left Half: Truck Location Map */}
      <div style={styles.mapContainer}>
        <h3>Truck Location</h3>
        <MapContainer center={[truck.latitude, truck.longitude]} zoom={6} style={styles.map}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[truck.latitude, truck.longitude]} icon={truckIcon}>
            <Tooltip>
              <div>
                <strong>Truck Plate:</strong> {truck.license_plate}<br />
                <strong>Current Location</strong>
              </div>
            </Tooltip>
          </Marker>
        </MapContainer>
      </div>

      {/* Right Half: Truck Details & Chat */}
      <div style={styles.detailsContainer}>
        <div style={styles.detailsSection}>
          <h3>Truck Details</h3>
          <p><strong>License Plate:</strong> {truck.license_plate}</p>
          <p><strong>Make:</strong> {truck.make}</p>
          <p><strong>Model:</strong> {truck.model}</p>
          <p><strong>Year:</strong> {truck.year}</p>
          <p><strong>Current Capacity:</strong> {truck.capacity} tons</p>
          <p><strong>Max Capacity:</strong> {truck.max_capacity} tons</p>

          {/* Quantity Input and Onload/Offload Buttons */}
          <div style={styles.capacityControls}>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity..."
              style={styles.truckActionInput}
            />
            <button onClick={handleOnload} style={styles.actionButton}>Onload</button>
            <button onClick={handleOffload} style={styles.actionButton}>Offload</button>
          </div>
        </div>

        <div style={styles.chatSection}>
          <h3>Updates / Chat</h3>
          <div style={styles.chatBox}>
            {chatMessages.map((msg, index) => (
              <div key={index} style={msg.sender === 'User' ? styles.userMessage : styles.systemMessage}>
                <strong>{msg.sender}: </strong>{msg.message}
              </div>
            ))}
          </div>

          <div style={styles.chatInputContainer}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              style={styles.chatInput}
            />
            <button onClick={handleSendMessage} style={styles.sendButton}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// CSS-in-JS styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',  // Full-screen height
    width: '100vw',   // Full-screen width
  },
  mapContainer: {
    width: '50%',  // Takes 50% of the screen width
    padding: '20px',
    backgroundColor: '#f8f9fa',
    height: '100%', // Ensures the map container takes full height
  },
  map: {
    height: '85vh',  // Adjust the map height to take up most of the full screen
    width: '100%',
    borderRadius: '10px',
  },
  detailsContainer: {
    width: '50%',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderLeft: '2px solid #e0e0e0',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',  // Ensures the details container takes full height
  },
  detailsSection: {
    marginBottom: '20px',
  },
  chatSection: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  chatBox: {
    flexGrow: 1,
    border: '1px solid #e0e0e0',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '10px',
    overflowY: 'scroll',
    backgroundColor: '#f8f9fa',
  },
  systemMessage: {
    padding: '5px',
    backgroundColor: '#d1e7dd',
    borderRadius: '10px',
    marginBottom: '5px',
    textAlign: 'left',
  },
  userMessage: {
    padding: '5px',
    backgroundColor: '#e2e3e5',
    borderRadius: '10px',
    marginBottom: '5px',
    textAlign: 'left',
  },
  chatInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatInput: {
    flexGrow: 1,
    padding: '10px',
    borderRadius: '10px',
    border: '1px solid #e0e0e0',
    marginRight: '10px',
  },
  sendButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  truckActionInput: {
    padding: '10px',
    marginBottom: '10px',
    width: '100%',
    borderRadius: '10px',
    border: '1px solid #e0e0e0',
  },
  capacityControls: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  actionButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    margin: '0 5px',
  },
};

export default TruckDetails;

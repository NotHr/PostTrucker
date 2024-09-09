import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import truckIMG from './box-truck.png'; // Correct image path
import pinIMG from './placeholder.png'
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

// Custom truck icon
const truckIcon = new L.Icon({
  iconUrl: truckIMG, // Use the imported image directly here
  iconSize: [40, 40], // Adjust the size of the truck icon
  iconAnchor: [20, 40], // Anchor the icon at the bottom center for proper placement
});

const placeholder = new L.Icon({
  iconUrl: pinIMG,
  iconSize: [40,40],
  iconAnchor: [20,20]
})

// Haversine Formula for distance calculation between two points
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance.toFixed(2); // Return distance in kilometers
};

// Example truck data with 11 locations
const initialTrucks = [
  { id: 'T001', lat: 28.7041, lng: 77.1025, start: 'Delhi', end: 'Mumbai', eta: '24 hrs', driver: 'Ravi Kumar', startLat: 28.7041, startLng: 77.1025, endLat: 19.0760, endLng: 72.8777 },
  { id: 'T002', lat: 19.0760, lng: 72.8777, start: 'Mumbai', end: 'Ahmedabad', eta: '8 hrs', driver: 'Manoj Singh', startLat: 19.0760, startLng: 72.8777, endLat: 23.0225, endLng: 72.5714 },
  { id: 'T003', lat: 22.5726, lng: 88.3639, start: 'Kolkata', end: 'Bhubaneswar', eta: '10 hrs', driver: 'Anil Sharma', startLat: 22.5726, startLng: 88.3639, endLat: 20.2961, endLng: 85.8189 },
  { id: 'T004', lat: 13.0827, lng: 80.2707, start: 'Chennai', end: 'Bangalore', eta: '6 hrs', driver: 'Suresh Reddy', startLat: 13.0827, startLng: 80.2707, endLat: 12.9716, endLng: 77.5946 },
  { id: 'T005', lat: 17.3850, lng: 78.4867, start: 'Hyderabad', end: 'Nagpur', eta: '12 hrs', driver: 'Rajesh Verma', startLat: 17.3850, startLng: 78.4867, endLat: 21.1458, endLng: 79.0882 },
  { id: 'T006', lat: 15.3173, lng: 75.7139, start: 'Hubli', end: 'Goa', eta: '4 hrs', driver: 'Mukesh Kumar', startLat: 15.3173, startLng: 75.7139, endLat: 15.2993, endLng: 74.1240 },
  { id: 'T007', lat: 25.3176, lng: 82.9739, start: 'Varanasi', end: 'Lucknow', eta: '8 hrs', driver: 'Santosh Gupta', startLat: 25.3176, startLng: 82.9739, endLat: 26.8467, endLng: 80.9462 },
  { id: 'T008', lat: 26.8467, lng: 80.9462, start: 'Lucknow', end: 'Kanpur', eta: '2 hrs', driver: 'Vivek Mishra', startLat: 26.8467, startLng: 80.9462, endLat: 26.4499, endLng: 80.3319 },
  { id: 'T009', lat: 30.7333, lng: 76.7794, start: 'Chandigarh', end: 'Amritsar', eta: '4 hrs', driver: 'Harjeet Singh', startLat: 30.7333, startLng: 76.7794, endLat: 31.5497, endLng: 74.3436 },
  { id: 'T010', lat: 11.0168, lng: 76.9558, start: 'Coimbatore', end: 'Kochi', eta: '3 hrs', driver: 'Ramesh Nair', startLat: 11.0168, startLng: 76.9558, endLat: 9.9312, endLng: 76.2673 },
  { id: 'T011', lat: 23.2599, lng: 77.4126, start: 'Bhopal', end: 'Indore', eta: '2 hrs', driver: 'Ashok Tiwari', startLat: 23.2599, startLng: 77.4126, endLat: 22.7196, endLng: 75.8577 },
];

function TruckTracking() {
  const [trucks, setTrucks] = useState(initialTrucks);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter trucks based on the search term
  const filteredTrucks = trucks.filter(truck =>
    truck.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div style={styles.container}>
      {/* Search Bar */}
      <div style={styles.searchBar}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search trucks..."
          style={styles.input}
        />
      </div>

      {/* OpenStreetMap with Leaflet */}
      <MapContainer
        center={[20.5937, 78.9629]} // Center map to India's coordinates
        zoom={5}
        style={styles.mapContainer}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Markers and paths for trucks */}
        {filteredTrucks.map((truck) => {
          const distance = calculateDistance(truck.lat, truck.lng, truck.endLat, truck.endLng);
          return (
            <React.Fragment key={truck.id}>
              {/* Marker for the current location */}
              <Marker
                position={[truck.lat, truck.lng]}
                icon={truckIcon} // Use the truck icon
              >
                <Tooltip>
                  <div>
                    <strong>Truck ID:</strong> {truck.id}<br />
                    <strong>Start Location:</strong> {truck.start}<br />
                    <strong>End Location:</strong> {truck.end}<br />
                    <strong>ETA:</strong> {truck.eta}<br />
                    <strong>Driver:</strong> {truck.driver}<br />
                    <strong>Distance to Destination:</strong> {distance} km
                  </div>
                </Tooltip>
              </Marker>

              {/* Marker for the end location */}
              <Marker
                position={[truck.endLat, truck.endLng]}
                icon={placeholder} // Use the truck icon
              >
                <Tooltip>
                  <div>
                    <strong>Truck ID:</strong> {truck.id}<br />
                    <strong>Start Location:</strong> {truck.start}<br />
                    <strong>End Location:</strong> {truck.end}<br />
                    <strong>ETA:</strong> {truck.eta}<br />
                    <strong>Driver:</strong> {truck.driver}<br />
                    <strong>Distance from Start:</strong> {distance} km
                  </div>
                </Tooltip>
              </Marker>

              {/* Polyline to show the path between the current location and the destination */}
              <Polyline
                positions={[
                  [truck.lat, truck.lng], // Current location
                  [truck.endLat, truck.endLng], // Destination
                ]}
                color="blue"
                weight={4}
              />
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
}

// CSS-in-JS styles
const styles = {
  container: {
    position: 'relative',
    height: '100vh',
    width: '100vw',
  },
  searchBar: {
    position: 'absolute',
    top: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  },
  input: {
    width: '300px',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #d1d9e6',
  },
  mapContainer: {
    width: '100%',
    height: '100%',
  },
};

export default TruckTracking;

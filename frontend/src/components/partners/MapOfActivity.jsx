import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Tooltip,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapOfActivity = ({ locations }) => (
  <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 shadow-md lg:col-span-2 lg:row-span-2">
    <h2 className="text-2xl font-semibold mb-4">Map of LGA Activities</h2>
    <div className="h-96 rounded-lg overflow-hidden">
      <MapContainer
        center={[12.5, 5.5]}
        zoom={7}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, index) => (
          <Marker key={index} position={location.coordinates}>
            <Popup>{location.name}</Popup>
            <Tooltip>
              {`Location: ${location.name}\n` +
                `Total Projects: ${location.totalProjects}\n` +
                `Organizations: ${location.organizations.join(', ')}`}
            </Tooltip>
          </Marker>
        ))}
        {locations.map((location, index) => (
          <Circle
            key={`circle-${index}`}
            center={location.coordinates}
            radius={10000} // Adjust radius as needed
            pathOptions={{
              fillColor: '#6366F1',
              color: '#6366F1',
              fillOpacity: 0.3,
            }}
          >
            <Tooltip>{`${location.name} Activity Area`}</Tooltip>
          </Circle>
        ))}
      </MapContainer>
    </div>
  </div>
);

export default MapOfActivity;

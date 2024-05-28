"use client";
import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Polyline,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ routePoints }) => {
  const mapRef = useRef(null);
  const [routes, setRoutes] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRoutes = async () => {
      // setLoading(true);
      const newRoutes = [];

      for (const { startPoint, endPoint } of routePoints) {
        try {
          const response = await axios.get(
            `http://router.project-osrm.org/route/v1/driving/${startPoint[1]},${startPoint[0]};${endPoint[1]},${endPoint[0]}?overview=full`
          );

          if (
            response.data &&
            response.data.code === "Ok" &&
            response.data.routes &&
            response.data.routes.length > 0 &&
            response.data.routes[0].geometry
          ) {
            const routeCoordinates = decodePolyline(
              response.data.routes[0].geometry
            );
            newRoutes.push(routeCoordinates);
          } else {
            console.error("No route found or invalid response");
            newRoutes.push([]);
          }
        } catch (error) {
          console.error("Error fetching route:", error);
          newRoutes.push([]);
        }
      }

      setRoutes(newRoutes);
      // setLoading(false);
    };
    if (routePoints) {
      fetchRoutes();
    }
  }, [routePoints]);

  // Function to decode polyline geometry
  const decodePolyline = (encoded) => {
    let index = 0;
    let len = encoded.length;
    let lat = 0;
    let lng = 0;
    const routeCoordinates = [];

    while (index < len) {
      let b;
      let shift = 0;
      let result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      routeCoordinates.push([lat / 1e5, lng / 1e5]);
    }
    return routeCoordinates;
  };

  // Fetch user's location
  // useEffect(() => {
  //   const fetchUserLocation = () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           const { latitude, longitude } = position.coords;
  //           setUserLocation([latitude, longitude]);
  //         },
  //         (error) => {
  //           console.error("Error getting user location:", error);
  //         }
  //       );
  //     } else {
  //       console.error("Geolocation is not supported by this browser.");
  //     }
  //   };

  //   // Fetch user's location initially and then every 10 seconds
  //   fetchUserLocation();
  //   const intervalId = setInterval(fetchUserLocation, 10000);

  //   return () => clearInterval(intervalId);
  // }, []);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // const response = await axiosInstance.get('/get_all_driver_details');
      const response = await axios.get("/api/");
      console.log(response.data.location);
      setUserLocation(response.data);
    } catch (error) {
      // showErrorNotification('Server ERROR');
      console.error("Error getting user location:", error);
    }
  };

  // Custom marker icon
  const markerIcon = L.icon({
    iconUrl: "/marker-icon.png",
    iconSize: [25, 41], // Size of the icon
    iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
  });
  console.log("userLocation", userLocation);
  return (
      <MapContainer
        center={[12.9716, 77.5946]} // Default center for Bangalore
        zoom={9}
        className="h-full w-full z-10"
        ref={mapRef}
      >
        <TileLayer
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {userLocation && (
          <Marker position={userLocation.location} icon={markerIcon}>
            <Popup>
              Device : {userLocation?.device_id}
              <br />
              Updated on :{userLocation?.time}
            </Popup>
          </Marker>
        )}
        {/* <Marker position={[1.150796, 1.303396]} icon={markerIcon} /> */}
        {/* {loading && <div className="loading-overlay">Loading...</div>} */}
        {/* {loading && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="text-white">Loading...</div>
                </div>
            )} */}

        {/* Render the route as a Polyline */}
        {routes &&
          routes.map((route, index) => (
            <Polyline
              key={index}
              pathOptions={{ color: "blue" }}
              positions={route}
            />
          ))}
      </MapContainer>
  );
};

export default MapComponent;

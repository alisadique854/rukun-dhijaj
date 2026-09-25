"use client";

import { useEffect, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polygon,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface DeliveryMapProps {
  customerCoords?: {
    latitude: number;
    longitude: number;
  } | null;
}

// Chicken Corner shop
const SHOP_LOCATION: [number, number] = [21.588682, 39.206681];

// Delivery area points
const DELIVERY_POINTS: [number, number][] = [
  [21.588675, 39.206459],
  [21.597151, 39.203554],
  [21.60225, 39.201889],
  [21.605113, 39.211084],
  [21.607636, 39.220684],
  [21.601422, 39.223236],
  [21.596795, 39.224881],
  [21.585095, 39.227304],
  [21.577072, 39.228973],
  [21.575684, 39.222662],
  [21.573533, 39.210234],
  [21.580349, 39.208589],
  [21.585628, 39.207319],
];

// Fix Leaflet's default marker icons
const shopIcon = new L.Icon({
  iconUrl: "/logo.png",
  iconSize: [44, 44],
  iconAnchor: [22, 44],
  popupAnchor: [0, -44],
});

function FitDeliveryArea() {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds([
      ...DELIVERY_POINTS,
      SHOP_LOCATION,
    ]);

    map.fitBounds(bounds, {
      padding: [25, 25],
    });
  }, [map]);

  return null;
}

export default function DeliveryMap({
  customerCoords,
}: DeliveryMapProps) {
  const customerPosition = useMemo<[number, number] | null>(() => {
    if (
      !customerCoords ||
      typeof customerCoords.latitude !== "number" ||
      typeof customerCoords.longitude !== "number"
    ) {
      return null;
    }

    return [
      customerCoords.latitude,
      customerCoords.longitude,
    ];
  }, [customerCoords]);

  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-[#111214]">
      <MapContainer
        center={SHOP_LOCATION}
        zoom={14}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polygon
          positions={DELIVERY_POINTS}
          pathOptions={{
            color: "#d925ca",
            weight: 3,
            fillColor: "#d925ca",
            fillOpacity: 0.33,
          }}
        />

        <Marker
          position={SHOP_LOCATION}
          icon={shopIcon}
        >
          <Popup>
            <strong>Chicken Corner</strong>
            <br />
            ركن الدجاج
          </Popup>
        </Marker>

        {customerPosition && (
          <>
            <CircleMarker
              center={customerPosition}
              radius={9}
              pathOptions={{
                color: "#ffffff",
                weight: 3,
                fillColor: "#4285F4",
                fillOpacity: 1,
              }}
            >
              <Popup>
                <strong>You are here</strong>
              </Popup>
            </CircleMarker>

            <CircleMarker
              center={customerPosition}
              radius={18}
              pathOptions={{
                color: "#4285F4",
                weight: 1,
                fillColor: "#4285F4",
                fillOpacity: 0.15,
              }}
            />
          </>
        )}

        <FitDeliveryArea />
      </MapContainer>

      <div className="pointer-events-none absolute bottom-3 left-3 right-3 z-[1000] flex flex-wrap gap-2">
        <div className="rounded-full border border-[#D4AF37]/30 bg-[#0F0F10]/90 px-3 py-1.5 text-[11px] text-white backdrop-blur">
          <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#D4AF37]" />
          Delivery Area
        </div>

        <div className="rounded-full border border-[#D4AF37]/30 bg-[#0F0F10]/90 px-3 py-1.5 text-[11px] text-white backdrop-blur">
          <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#D4AF37]" />
          Chicken Corner
        </div>

        {customerPosition && (
          <div className="rounded-full border border-blue-400/30 bg-[#0F0F10]/90 px-3 py-1.5 text-[11px] text-white backdrop-blur">
            <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-blue-500" />
            You are here
          </div>
        )}
      </div>
    </div>
  );
}
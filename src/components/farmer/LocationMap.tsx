import { useState } from "react";
import { MapContainer, TileLayer, Polygon, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../../styles/farmer/FarmerForm.css";

// Fix default marker icon issue for Vite
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

interface LocationMapProps {
    initialPoints?: [number, number][];
    onChange?: (points: [number, number][]) => void;
}

export const LocationMap = ({ initialPoints = [], onChange }: LocationMapProps) => {
    const [points, setPoints] = useState<[number, number][]>(initialPoints);

    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                if (points.length >= 4) return; // محدود کردن به حداکثر ۴ نقطه
                const newPoint: [number, number] = [e.latlng.lat, e.latlng.lng];
                const updatedPoints = [...points, newPoint];
                setPoints(updatedPoints);
                if (onChange) onChange(updatedPoints);
            },
        });
        return null;
    };

    const handleRemovePoint = (index: number) => {
        const updatedPoints = points.filter((_, i) => i !== index);
        setPoints(updatedPoints);
        if (onChange) onChange(updatedPoints);
    };

    return (
        <div className="location-map">
            <MapContainer
                center={[35.7, 51.4]} // مرکز ایران
                zoom={6}
                scrollWheelZoom
                style={{ height: "400px", width: "100%", borderRadius: "12px", overflow: "hidden" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapClickHandler />

                {points.map((point, index) => (
                    <Marker key={index} position={point}>
                        <Popup>
                            نقطه {index + 1} <br />
                            <button className="remove-point-btn" onClick={() => handleRemovePoint(index)}>
                                حذف
                            </button>
                        </Popup>
                    </Marker>
                ))}

                {points.length >= 3 && (
                    <Polygon positions={points} pathOptions={{ color: "#328E6E", fillOpacity: 0.3 }} />
                )}
            </MapContainer>

            <div className="map-instruction">
                <p>برای ثبت محدوده زمین، روی نقشه کلیک کنید. (حداقل ۳ و حداکثر ۴ نقطه)</p>
            </div>
        </div>
    );
};

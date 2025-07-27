import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

function MapView({ vehicles }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef({});

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: [28.0473, -26.2041],
      zoom: 10
    });
  }, []);

  useEffect(() => {
    if (!map.current || !vehicles) return;

    vehicles.forEach((v) => {
      const pos = [v.longitude, v.latitude];
      console.log("Vehicle:", v); //Log each vehicle object

      if (markers.current[v.id]) {
        markers.current[v.id].setLngLat(pos);
      } else {
        const el = document.createElement('div');
        el.className = 'vehicle-marker';
        el.style.backgroundColor = 'blue';
        el.style.width = '14px';
        el.style.height = '14px';
        el.style.borderRadius = '50%';
        el.style.border = '2px solid white';
        el.style.boxShadow = '0 0 5px #000';
        el.style.cursor = 'pointer';

        const popupContent = `
          <div style="font-size: 14px;">
            <strong>ID:</strong> ${v.id ?? 'N/A'}<br/>
            <strong>Speed:</strong> ${v.speed ?? 'N/A'} km/h<br/>
            <strong>Fuel:</strong> ${v.fuel ?? 'N/A'}%
          </div>
        `;

        const marker = new maplibregl.Marker(el)
          .setLngLat(pos)
          .setPopup(new maplibregl.Popup({ offset: 25 }).setHTML(popupContent))
          .addTo(map.current);

        markers.current[v.id] = marker;
        marker.togglePopup(); // Auto-open for testing
      }
    });
  }, [vehicles]);

  return <div ref={mapContainer} style={{ height: '600px', width: '100%' }} />;
}

export default MapView;

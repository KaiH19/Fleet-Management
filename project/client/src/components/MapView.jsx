import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

function MapView({ vehicles }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef({});

  useEffect(() => {
    if (map.current) return; // initialize only once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json', // OSM basemap
      center: [28.0473, -26.2041], // Johannesburg
      zoom: 10
    });
  }, []);

  useEffect(() => {
    if (!map.current || !vehicles) return;

    vehicles.forEach((v) => {
      const pos = [v.longitude, v.latitude];

      if (markers.current[v.id]) {
        markers.current[v.id].setLngLat(pos);
      } else {
        const el = document.createElement('div');
        el.className = 'vehicle-marker';
        el.style.backgroundColor = 'blue';
        el.style.width = '12px';
        el.style.height = '12px';
        el.style.borderRadius = '50%';

        const marker = new maplibregl.Marker(el).setLngLat(pos).addTo(map.current);
        markers.current[v.id] = marker;
      }
    });
  }, [vehicles]);

  return <div ref={mapContainer} style={{ height: '600px', width: '100%' }} />;
}

export default MapView;

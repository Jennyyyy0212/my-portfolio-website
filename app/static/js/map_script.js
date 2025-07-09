document.addEventListener('DOMContentLoaded', function () {
  mapboxgl.accessToken = window.mapboxToken;

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-80.5167, 43.4668],
    zoom: 4,
    attributionControl: false  
  });

  const locations = window.mapLocations;

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    new mapboxgl.Marker({ color: '#7c3aed' })
      .setLngLat(loc.coords)
      .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(loc.title))
      .addTo(map);
    bounds.extend(loc.coords);
  });

  map.fitBounds(bounds, { padding: 50 });
});
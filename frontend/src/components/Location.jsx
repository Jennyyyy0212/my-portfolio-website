import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import '../static/styles/location.css'; // if using custom styles

const Location = ({ map }) => {
    const mapContainerRef = useRef(null);

    useEffect(() => {
        if (!map?.token || !map?.locations) return;
        mapboxgl.accessToken = map.token;

        const mapInstance = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [-117.8265, 33.6846],
            zoom: 4,
            attributionControl: false
        });

        const bounds = new mapboxgl.LngLatBounds();

        map.locations.forEach(loc => {
            new mapboxgl.Marker({ color: '#7c3aed' }) // purple marker
                .setLngLat(loc.coords)
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 }).setHTML(
                        `<div style="color: black;">${loc.title}</div>`
                    )
                )
                .addTo(mapInstance);
            bounds.extend(loc.coords);
        });

        mapInstance.on('load', () => {
            mapInstance.fitBounds(bounds, { padding: 50 });

            // Optional: after a few seconds, fly to Irvine
            setTimeout(() => {
                mapInstance.flyTo({
                    center: [-117.8265, 33.6846],
                    zoom: 8,
                    speed: 1.5
                });
            }, 2000);
        });

        return () => mapInstance.remove();
    }, [map]);

    return (
        <section class="section-map">
            <div className="container">
                <div className="title-wrapper">
                    <h2 className="section-title">Locations</h2>
                    <p className="section-subtitle text-gray-500 dark:text-gray-400">
                        The places I have visited
                    </p>
                </div>
                <div class="map-wrapper">
                    <div ref={mapContainerRef} className="map-container" />
                    <div class="map-label">
                        <p class="text-sm font-medium">Currently study in Irvine</p>
                    </div>
                </div>
                <div class="map-attribution">
                    <p>
                        Map data © <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a>,
                        imagery © <a href="https://www.mapbox.com/" target="_blank">Mapbox</a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Location;

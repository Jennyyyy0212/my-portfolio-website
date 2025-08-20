import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import '../static/styles/location.css'; // if using custom styles

const Location = ({ map }) => {
    const mapContainerRef = useRef(null);
    const mobileRef = useRef(null);
    const desktopRef = useRef(null);
    const mapRef = useRef(null);
    const mapboxRef = useRef(null);

    useEffect(() => {
        if (!map?.token || !map?.locations || !mapRef.current) return;

        mapboxgl.accessToken = map.token;

        const mapInstance = new mapboxgl.Map({
            container: mapRef.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [-117.8265, 33.6846],
            zoom: 4,
            attributionControl: false
        });

        const bounds = new mapboxgl.LngLatBounds();
        mapboxRef.current = mapInstance;

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
        <section className="section-map">
            <div className="block md:hidden w-full">
                <div className="title-wrapper">
                    <h2
                        className="
              inline-block                /* shrink to content */
              dark:text-white text-gray-600      /* label background + text color */
              text-base font-bold        /* smaller, label-style text */
              px-3 py-1                    /* padding inside label */
              rounded-full                 /* pill/label shape */
              tracking-wide uppercase      /* optional: uppercase style */
              ml-4
            "
                    >
                        Location
                    </h2>
                </div>

            </div>
            <div className="hidden md:!block location-desktop">
                <div className="container">
                    <div className="title-wrapper">
                        <h2 className="section-title">Locations</h2>
                        <p className="section-subtitle text-gray-500 dark:text-gray-400">
                            The places I have visited
                        </p>
                    </div>
                </div>
            </div>
            <div className="max-w-[80rem] mx-auto pl-2 pr-2 md:">
                {/* one responsive container for both mobile & desktop */}
                <div className="
                relative w-[90%] md:w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden max-w-[66rem] 
                mx-auto my-6 md:my-12 bg-white shadow">
                    <div ref={mapRef} className="w-full h-full" />
                    <div className="map-label">
                        <p className="text-sm font-medium">Currently study in Irvine</p>
                    </div>
                </div>

                <div className="map-attribution">
                    <p>
                        Map data © <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a>, imagery © <a href="https://www.mapbox.com/" target="_blank">Mapbox</a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Location;

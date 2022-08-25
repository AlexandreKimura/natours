/* eslint-disable no-undef */
// eslint-disable

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYWxleGFuZHJlbWtpbXVyYSIsImEiOiJja3NsYnozYncxOWk5MnZwYzk2bWdvNzJ5In0.gN75apmBc4RMJ77gF5slLA';

  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/alexandremkimura/cl72n5l8a001q15qpv6hluszm', // style URL
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};

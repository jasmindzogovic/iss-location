"use strict";

const map = L.map("map");

let marker, circle;

const tile = L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.{ext}",
  {
    minZoom: 0,
    maxZoom: 20,
    attribution:
      '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: "png",
  }
).addTo(map);

const geoLocation = setInterval(async () => {
  const res = await fetch(`http://api.open-notify.org/iss-now.json`);
  const data = await res.json();

  const { latitude: lat, longitude: lng } = data.iss_position;

  map.setView([`${lat}`, `${lng}`], 3);
  if (marker) {
    map.removeLayer(marker);
    map.removeLayer(circle);
  }

  marker = L.marker([lat, lng]).addTo(map);
  circle = L.circle([lat, lng]).addTo(map);

  marker.bindTooltip(
    `These are the current coordinates of the ISS: Latitude ${(+lat).toFixed(
      5
    )}, Longitude ${(+lng).toFixed(5)}`,
    {
      permanent: true,
      className: "my-label",
      offset: [0, 0],
    }
  );
}, 2000);

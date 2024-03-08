import Map from "esri/Map.js";
import SceneView from "esri/views/SceneView.js";

const map = new Map({
  basemap: "topo" // You can use other basemaps like "streets", "satellite", etc.
});

const view = new SceneView({
  container: "viewDiv", // HTML element where the view should be rendered
  map: map,
  camera: {
    position: [-75.1652, 39.9526, 8000], // Set initial camera position [longitude, latitude, altitude]
    heading: 0,
    tilt: 10
  }
});

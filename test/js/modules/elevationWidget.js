// Setting up the camera info.
define([
    "esri/Map",
  "esri/views/SceneView",
  "esri/geometry/Point",
    "esri/Camera",
    "esri/widgets/Expand",
    "esri/layers/ElevationLayer"
  ], function(Map, SceneView, Camera, Expand, Point, ElevationLayer) {
    return {
        setupElevation: function(map, mapView) {
            mapView.on("pointer-move", function(event) {
                mapView.hitTest(event).then(function(response) {
                  const result = response.results[0];
                  if (result && result.mapPoint) {
                    const elevationLayer = new ElevationLayer({
                      url: "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer"
                    });
              
                    const elevationPoint = result.mapPoint.clone();
                    elevationLayer.queryElevation(elevationPoint).then(function(result) {
                      const terrainHeight = result.geometry.z;
                      const elevationError = 0; // Elevation error in meters
                      const heightAboveTerrain = elevationPoint.z - terrainHeight - elevationError;
                      // Display the elevation information in zElement
                      document.getElementById("cameraZ").innerHTML = `Height above terrain: ${heightAboveTerrain.toFixed(2)} meters`;
                    });
                  }
                });
              });
      },
    };
  });
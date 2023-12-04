// Setting up the camera info.
define(["esri/layers/ElevationLayer",], function(ElevationLayer) {
  return {
      setupMouseElevation: function(mapView) {

      //code for creating zElement (popup bottom right with elevation)
      const zElement = document.createElement("div");
      zElement.id = "mouseZ";
      zElement.style.position = "absolute";
      zElement.style.bottom = "20px";
      zElement.style.right = "5px"; //left = "20px"
      zElement.style.backgroundColor = "#fffb";
      zElement.style.padding = "5px";
      zElement.style.zIndex = "1000";
      zElement.style.fontSize = "12px";
      document.getElementById("viewDiv").appendChild(zElement); 

      // Create an ElevationLayer
      const elevationLayer = new ElevationLayer({
          url: "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer"
      });

      function updateHeightInfo(mouse) {
        // Get the map point with mouse coordinates
        const mapPoint3D = mapView.toMap(mouse);
        // Query elevation
        elevationLayer.queryElevation(mapPoint3D).then(function(result){
          const terrainHeight = result.geometry.z;
          zElement.innerHTML = `Hæð: ${terrainHeight.toFixed(2)} metrar`;
        });
      }
      mapView.on("pointer-move", updateHeightInfo);

    },
  };
});
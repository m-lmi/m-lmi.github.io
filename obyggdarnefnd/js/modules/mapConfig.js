// mapConfig.js  Define the webScene and setting the environment

define([
  "esri/WebScene",
  "esri/views/SceneView"
], function(WebScene, SceneView) {
  return {
    setupScene: function() {

      const scene = new WebScene({
        portalItem: {
          id: "f3b79c16e4a84c278ab69d94a938f49e"
        },
      });

      const mapView = new SceneView({
        map: scene,
        container: "viewDiv",
        qualityProfile: "high",
       // padding: {left: 49}, //for the case that I will add side bar to the left not right and will not be docked in the mapView container
        environment: {
          weather: {
            type: "cloudy",
            cloudCover: 0.2
          },
          atmosphere: {
            quality: "high"
          },
          lighting: {
            waterReflectionEnabled: true,
            ambientOcclusionEnabled: true
          }
        }
      });
      
      // Read URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const x = parseFloat(urlParams.get('x'));
      const y = parseFloat(urlParams.get('y'));
      const z = parseFloat(urlParams.get('z'));
      const tilt = parseFloat(urlParams.get('tilt'));
      const heading = parseFloat(urlParams.get('heading'));

      // If x, y, and z are valid, set the camera
      if (x && y && z) {
        mapView.when(() => {
          mapView.camera = {
            position: {
              x: x,
              y: y,
              z: z,
              spatialReference: mapView.spatialReference
            },
            tilt: tilt || 0,  // Default to 0 if not provided
            heading: heading || 0  // Default to 0 if not provided
          };
        });
      }
      
      return mapView;
    }    
  };
});

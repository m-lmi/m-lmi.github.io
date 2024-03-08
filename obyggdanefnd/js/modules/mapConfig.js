// mapConfig.js 
/***********************************
* Define the webScene and setting the environment
***********************************/
// author:Landmælingar Íslands
define([
  "esri/views/SceneView",
  ], function(
    SceneView,
    ) {
    return {
      setupScene: function(map) {
      // The clipping extent for the scene
      const drangaExtent = {
        xmax: -21,
        xmin: -23.5,
        ymax: 66.5,
        ymin: 65.5,
        spatialReference: {wkid: 4326},
      };
  
      // Make new 3D SceneView
      const view = new SceneView({
        container: "viewDiv",
        map: map,
        viewingMode: "global", 
        extent: drangaExtent,
        camera: {
          position: [-21.9, 65.65, 30000],
          heading: 0,
          tilt: 55
        },
        environment: {
          weather: {
            type: "cloudy",
            cloudCover: 0.2
          },
          atmosphere: {
            quality: "high"
          },
        }
      });
        
        return view;
      }    
    };
  });
  
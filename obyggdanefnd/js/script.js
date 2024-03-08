/***********************************
* Initalize all the widgets and scripts
***********************************/
// author:Landmælingar Íslands
require([
  "modules/mapConfig",
  "modules/basicWidgets",
  "modules/weatherDaylight",
  "modules/measurementWidget",
  "modules/loadLayers",
  //"modules/layerEditor",
  "modules/searchWidget",
  "modules/mouseElevation",
  "modules/splashScreen",
], (
  MapConfig,
  BasicWidgets,
  WeatherDaylight,
  MeasurementWidget,
  LoadLayers,
  //LayerEditor,
  SearchWidget,
  MouseElevation,
  SplashScreen,
) => {
  
  // Initialize the map, widgets, etc.
  const map = LoadLayers.setupLayers(); // define all layers in the map
  const view = MapConfig.setupScene(map); // Insert map and Capture the returned view
  WeatherDaylight.setupWeatherDaylight(view);
  MeasurementWidget.setupMeasurementWidget(view);
  SearchWidget.setupSearchWidgets(map, view); 
  BasicWidgets.setupBasicWidgets(view);  
  //LayerEditor.editLayer(map,view);     
  MouseElevation.setupMouseElevation(view);
  SplashScreen.showSplashScreen(view);


  let activePanel = null;

  // Event listeners
  document.getElementById("basemapsBtn").addEventListener("click", function() {
      togglePanel("basemapsPanel");
    });
    
    document.getElementById("layersBtn").addEventListener("click", function() {
      togglePanel("layersPanel");
    });

    document.getElementById("searchBtn").addEventListener("click", function() {
      togglePanel("searchPanel");
    });      

  document.getElementById("distanceBtn").addEventListener("click", function() {
      togglePanel("distancePanel");
    });

  document.getElementById("areaBtn").addEventListener("click", function() {
      togglePanel("areaPanel");
  });

  document.getElementById("clearDistanceBtn").addEventListener("click", function() {
    togglePanel("distancePanel");
  });
  
  document.getElementById("clearAreaBtn").addEventListener("click", function() {
    togglePanel("areaPanel");
  });

  document.getElementById("weatherBtn").addEventListener("click", function() {
      togglePanel("weatherPanel");
    });

  document.getElementById("daylightBtn").addEventListener("click", function() {
      togglePanel("daylightPanel");
  });
  
  /*document.getElementById("editorBtn").addEventListener("click", function() {
    togglePanel("editorPanel");
  });*/

  // Toggle pannels
  function togglePanel(panelId) {
      if (activePanel) {
          document.getElementById(activePanel).style.display = "none";
      }
      
      if (activePanel !== panelId) {
          document.getElementById(panelId).style.display = "block";
          activePanel = panelId;
      } else {
          activePanel = null;
      }
      }
});
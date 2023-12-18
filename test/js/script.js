//import setupMouseElevation from "./modules/mouseElevation"
require([
    "modules/mapConfig",
    "modules/basicWidgets",
    "modules/weatherDaylight",
    "modules/measurementWidget",
    "modules/loadLayers",
    "modules/layerEditor",
    "modules/searchWidget",
    "modules/mouseElevation",
    "modules/splashScreen",
    "modules/wfsConnector",
    "esri/config",
    "esri/WebMap",
    "esri/views/SceneView",
    "esri/Map",
    "esri/WebScene",
    //"esri/widgets/Search",
    "esri/widgets/Legend",
    "esri/widgets/Home",
    "esri/widgets/Weather",
    "esri/widgets/Daylight",
    "esri/widgets/LayerList", //Layer list to turn on/off layers visibility
    //"esri/widgets/DirectLineMeasurement3D",
    //"esri/widgets/AreaMeasurement3D",
    //"esri/widgets/TimeSlider",
    "esri/widgets/Expand",
    "esri/widgets/Editor",
    //"esri/core/promiseUtils",
    //"esri/core/reactiveUtils",
    //"esri/geometry/ElevationLayer"  
    "esri/layers/GeoJSONLayer", //Map and GeoJSON layer is needed for my experiment with adding Json layers.....
    //"esri/layers/SceneLayers",
    "esri/layers/FeatureLayer",
  ], (
    MapConfig,
    BasicWidgets,
    WeatherDaylight,
    MeasurementWidget,
    LoadLayers,
    LayerEditor,
    SearchWidget,
    MouseElevation,
    SplashScreen,
    wfsConnector,
    esriConfig,
    WebMap,
    SceneView,
    Map,
    WebScene, 
    //Search,
    Legend,
    Home,
    Weather, 
    Daylight, 
    LayerList,
    //DirectLineMeasurement3D,
    //AreaMeasurement3D,
    //TimeSlider,
    Expand,
    Editor,
    //promiseUtils,
    //reactiveUtils,
    //ElevationLayer    
    GeoJSONLayer,
    //SceneLayers,
    FeatureLayer,
  ) => {
    
      // Initialize the map, widgets, etc.
    const map = LoadLayers.setupLayers(); // define all layers in the map
    const mapView = MapConfig.setupScene(map); // Insert map and Capture the returned mapView
    WeatherDaylight.setupWeatherDaylight(mapView);
    MeasurementWidget.setupMeasurementWidget(mapView);
    BasicWidgets.setupBasicWidgets(mapView);
    SearchWidget.setupSearchWidgets(map, mapView);
    LayerEditor.editLayer(map, mapView);
    MouseElevation.setupMouseElevation(mapView);
    SplashScreen.showSplashScreen(mapView);
    wfsConnector.setupWFSConnections(map, mapView)


    ////// Import example
    //const zElement = setupMouseElevation(mapView);
    //document.getElementById("viewDiv").appendChild(zElement);


    /////////////// IDEAS TO ADD ///////////////
    //https://developers.arcgis.com/javascript/latest/sample-code/sketch-3d/
    //https://developers.arcgis.com/javascript/latest/sample-code/widgets-elevation-profile/
    //https://developers.arcgis.com/javascript/latest/sample-code/overview-map/
    //https://developers.arcgis.com/javascript/latest/sample-code/views-switch-2d-3d/
    //https://developers.arcgis.com/javascript/latest/sample-code/layers-featurelayer-shapefile/
    //https://developers.arcgis.com/javascript/latest/sample-code/sandbox/?sample=layers-featurelayer-large-collection/


    let activePanel = null;

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

    document.getElementById("editorBtn").addEventListener("click", function() {
      togglePanel("editorPanel");
    });

    document.getElementById("wfsconnectionBtn").addEventListener("click", function() {
      togglePanel("wfsconnectionPanel");
    });

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

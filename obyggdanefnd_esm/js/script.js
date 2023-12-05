import MapConfig from "./modules/mapConfig.js";
import BasicWidgets from "./modules/basicWidgets.js";
import WeatherDaylight from "./modules/weatherDaylight.js";
import MeasurementWidget from "./modules/measurementWidget.js";
import LoadLayers from "./modules/loadLayers.js";
import LayerEditor from "./modules/layerEditor.js";
import SearchWidget from "./modules/searchWidget.js";
import MouseElevation from "./modules/mouseElevation.js";
import esriConfig from "https://js.arcgis.com/4.28/esri/config.js";
import WebMap from "https://js.arcgis.com/4.28/esri/WebMap.js";
import SceneView from "https://js.arcgis.com/4.28/esri/views/SceneView.js";
import Map from "https://js.arcgis.com/4.28/esri/Map.js";
import WebScene from "https://js.arcgis.com/4.28/esri/WebScene.js";
import Search from "https://js.arcgis.com/4.28/esri/widgets/Search.js";
import Legend from "https://js.arcgis.com/4.28/esri/widgets/Legend.js";
import Home from "https://js.arcgis.com/4.28/esri/widgets/Home.js";
import Weather from "https://js.arcgis.com/4.28/esri/widgets/Weather.js";
import Daylight from "https://js.arcgis.com/4.28/esri/widgets/Daylight.js";
import LayerList from "https://js.arcgis.com/4.28/esri/widgets/LayerList.js";
//import DirectLineMeasurement3D from "https://js.arcgis.com/4.28/esri/widgets/DirectLineMeasurement3D.js";
//import AreaMeasurement3D from "https://js.arcgis.com/4.28/esri/widgets/AreaMeasurement3D.js";
//import TimeSlider from "https://js.arcgis.com/4.28/esri/widgets/TimeSlider.js";
import Expand from "https://js.arcgis.com/4.28/esri/widgets/Expand.js";
import Editor from "https://js.arcgis.com/4.28/esri/widgets/Editor.js";
//import promiseUtils from "https://js.arcgis.com/4.28/esri/core/promiseUtils.js";
//import reactiveUtils from "https://js.arcgis.com/4.28/esri/core/reactiveUtils.js";
//import ElevationLayer "https://js.arcgis.com/4.28/esri/geometry/ElevationLayer"  
import GeoJSONLayer from "https://js.arcgis.com/4.28/esri/layers/GeoJSONLayer.js";
//import SceneLayers from "https://js.arcgis.com/4.28/esri/layers/SceneLayers.js";
import FeatureLayer from "https://js.arcgis.com/4.28/esri/layers/FeatureLayer.js";
  
    // Initialize the map, widgets, etc.
  const map = LoadLayers.setupLayers(); // define all layers in the map
  const mapView = MapConfig.setupScene(map); // Insert map and Capture the returned mapView
  WeatherDaylight.setupWeatherDaylight(mapView);
  MeasurementWidget.setupMeasurementWidget(mapView);
  BasicWidgets.setupBasicWidgets(mapView);  
  LayerEditor.editLayer(map, mapView);     
  MouseElevation.setupMouseElevation(mapView);

  SearchWidget.setupSearchWidget(mapView);   

  /////////////// IDEAS TO ADD ///////////////
  //https://developers.arcgis.com/javascript/latest/sample-code/sketch-3d/
  //https://developers.arcgis.com/javascript/latest/sample-code/widgets-elevation-profile/
  //https://developers.arcgis.com/javascript/latest/sample-code/overview-map/
  //https://developers.arcgis.com/javascript/latest/sample-code/views-switch-2d-3d/
  //https://developers.arcgis.com/javascript/latest/sample-code/layers-featurelayer-shapefile/

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

document.getElementById("weatherBtn").addEventListener("click", function() {
    togglePanel("weatherPanel");
  });

document.getElementById("daylightBtn").addEventListener("click", function() {
    togglePanel("daylightPanel");
});

document.getElementById("editorBtn").addEventListener("click", function() {
  togglePanel("editorPanel");
});

// Toggle pannels, except that problematic measurements buttons
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
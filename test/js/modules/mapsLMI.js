       /***********************************
* Add Basemap gallery to allow for additional basemaps
***********************************/
// author:Landmælingar Íslands
define([
    "esri/layers/WMSLayer",
    "esri/widgets/LayerList",
  ], function(WMSLayer, LayerList) {
    return {
      setupMapsLMI: function(map, view) {
       // Print the names of all sublayers used for rendering.
       const wmsImagery = new WMSLayer({
        url: "https://gis.lmi.is/mapcache/web-mercator/wms?service=WMS&version=1.1.0",
        title: "Landmælingar Íslands Kortar",
        copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",
        visible: true, 
        sublayers: [{
            name: "Bathymetry", // layer to filter out from WMS
            title: "Bathymetry", // title for in legend
            visible: false,
            copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",}, // Url for legend image as png
            {
            name: "Ferdakort_750", // Layer to filter out from WMS
            title: "Ferðakort 1:750.000", // title for in legend
            visible: false,
            copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",}, // Url for legend image as png
            {
            name: "LMI_Island_einfalt", // Layer to filter out from WMS
            title: "LMÍ, Ísland, einfalt", // title for in legend
            visible: false,
            copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",}, // Url for legend image as png
            {
            name: "LMI_Kort", // Layer to filter out from WMS
            title: "LMI Kort", // title for in legend
            visible: false,
            copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",}, // Url for legend image as png
            {
            name: "AMS", // Layer to filter out from WMS
            title: "AMS 1:50.000", // title for in legend
            visible: false,
            copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",}, // Url for legend image as png
            {
            name: "LMI_raster:atlas", // Layer to filter out from WMS
            title: "Atlas 1:100.000", // title for in legend
            visible: false,
            copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",}, // Url for legend image as png
            {
            name: "LMI_raster:Atlas_50", // Layer to filter out from WMS
            title: "Herforingjaráðskort Dana, 1:50.000", // title for in legend
            visible: false,
            copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",}, // Url for legend image as png
            {
            name: "DEM", // Layer to filter out from WMS
            title: "IslandsDEM", // title for in legend
            visible: false,
            copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",}, // Url for legend image as png
            {
            name: "IslandsDEMDaylight", // Layer to filter out from WMS
            title: "IslandsDEM Daylight", // title for in legend
            visible: false,
            copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",}, // Url for legend image as png
            {
            name: "LMI_Landslag", // Layer to filter out from WMS
            title: "LMI_Landslag", // title for in legend
            visible: false,
            copyright: "<a href='https://www.lmi.is/'>Landmælingar Íslands</a>",}, // Url for legend image as png
        ]}); 
        map.add(wmsImagery,0)

      const mapsList = new LayerList({
        view: view,
        selectionEnabled: true,
        container: "maps-container"
      });
      mapsList.operationalItems.push(wmsImagery)
      const layerListContainer = document.getElementById("maps-list");
      },
    };
  });
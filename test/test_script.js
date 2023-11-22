require([
    "esri/config",
    "esri/WebMap",
    "esri/views/SceneView",
    "esri/Map",
    "esri/WebScene",
    "esri/widgets/Legend",
    "esri/widgets/Home",
    //"esri/widgets/Weather",
    //"esri/widgets/Daylight",
    "esri/widgets/LayerList", //Layer list to turn on/off layers visibility
    //"esri/widgets/DirectLineMeasurement3D",
    //"esri/widgets/AreaMeasurement3D",
    //"esri/widgets/TimeSlider",
    //"esri/widgets/Expand",
    //"esri/core/promiseUtils",
    //"esri/core/reactiveUtils",
    "esri/layers/GeoJSONLayer", //Map and GeoJSON layer is needed for my experiment with adding Json layers.....
    //"esri/layers/SceneLayers",
    "esri/layers/FeatureLayer",
    //"esri/geometry/ElevationLayer"
  ], (
    esriConfig,
    WebMap,
    SceneView,
    Map,
    WebScene, 
    Legend,
    Home,
    //Weather, 
    //Daylight, 
    LayerList,
    //DirectLineMeasurement3D,
    //AreaMeasurement3D,
    //TimeSlider,
    //Expand,
    //promiseUtils,
    //reactiveUtils,
    GeoJSONLayer,
    //SceneLayers,
    FeatureLayer,
    //ElevationLayer
  ) => {

    // Load a basemap from https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap-id
    const map = new Map({
      basemap: "satellite"
    });

    // load webscene from ArcGIS Online
    
    const terrain3d = new WebScene({
      portalItem: {
        id: "7029fb60158543ad845c7e1527af11e4"
      }
    });

    
    // The clipping extent for the scene
    const icelandExtent = {
      // autocasts as new Extent()
      xmax: -11.4946155548096,
      xmin: -26.5326824188232,
      ymax: 67.5664443969727,
      ymin: 62.295768737793,
      spatialReference: {
        // autocasts as new SpatialReference()
        wkid: 4326
      }
    };

    const view = new SceneView({
      container: "viewDiv",
      map: map,
      // Indicates to create a local scene
      viewingMode: "global", //opion "global"
      // Use the exent defined in clippingArea to define the bounds of the scene
      clippingArea: icelandExtent,
      extent: icelandExtent,
      // or define center
      //center: [-18.80500, 65.02700],
      //zoom: 7
      // Turns off atmosphere and stars settings
      environment: {
        atmosphereEnabled: true,
        starsEnabled: true
      }
    });

    const morkSveitarfelag = new GeoJSONLayer({
    url: "https://gis.lmi.is/geoserver/IS_50V/mork_sveitarf_flakar/wfs?request=GetFeature&service=WFS&version=1.1.0&typeName=IS_50V:mork_sveitarf_flakar&outputFormat=json",
    copyright: "Landmælingar Íslands IS50V",
    visible: true, 
    //popupTemplate: template,
    //renderer: renderer_morkSveitarfelag,
    title: "Mörk Sveitarfelag",
    orderBy: {
      field: "nrsveitarfelags"
    }
    });
    map.add(morkSveitarfelag);

    //https://developers.arcgis.com/javascript/latest/sample-code/timeslider-filter/
    // Earthquakes Iceland.
    /*
    // set the timeInfo on GeoJSONLayer at the time initialization
    const layer = new GeoJSONLayer({
        url: "https://luk.vedur.is/arcgis/rest/services/skjalftar/skjalftar_isn93/FeatureServer/1?f=pjson",
        copyright: "Vedurstofa",
        title: "Iceland Earthquakes",
        // set the CSVLayer's timeInfo based on the date field
        timeInfo: {
        startField: "time", // name of the date field
        interval: {
            // set time interval to one day
            unit: "days",
            value: 1
        }
        },
        orderBy: {
        field: "mag"
        },
        renderer: {
        type: "simple",
        field: "mag",
        symbol: {
            type: "simple-marker",
            color: "orange",
            outline: null
        },
        visualVariables: [
            {
            type: "size",
            field: "mag",
            stops: [
                {
                value: 1,
                size: "5px"
                },
                {
                value: 2,
                size: "15"
                },
                {
                value: 3,
                size: "35"
                }
            ]
            },
            {
            type: "color",
            field: "depth",
            stops: [
                {
                value: 2.5,
                color: "#F9C653",
                label: "<2km"
                },
                {
                value: 3.5,
                color: "#F8864D",
                label: "3km"
                },
                {
                value: 4,
                color: "#C53C06",
                label: ">4km"
                }
            ]
            }
        ]
        },
        popupTemplate: {
        title: "{title}",
        content: [
            {
            type: "fields",
            fieldInfos: [
                {
                fieldName: "place",
                label: "Location",
                visible: true
                },
                {
                fieldName: "mag",
                label: "Magnitude",
                visible: true
                },
                {
                fieldName: "depth",
                label: "Depth",
                visible: true
                }
            ]
            }
        ]
        }
    });
    */


    const featureLayer = new FeatureLayer({
        url: "https://luk.vedur.is/arcgis/rest/services/skjalftar/skjalftar_isn93/FeatureServer/1"
    });

    map.add(featureLayer);

  // Add legend
    const legend = new Legend ({
        view: view
    });
    view.ui.add(legend, "top-right");

    // Create home button 
    const homeBtn = new Home({
    view: view
    });
    view.ui.add(homeBtn, "top-left"); //I want home button on the left
});
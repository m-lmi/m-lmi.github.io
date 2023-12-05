// Setting up the search widget
import Search from "https://js.arcgis.com/4.28/esri/widgets/Search.js";
import GeoJSONLayer from "https://js.arcgis.com/4.28/esri/layers/GeoJSONLayer.js";

const setupSearchWidget = (mapView) => {

  const ornefniPunktar = new GeoJSONLayer({
      url: "https://gis.lmi.is/geoserver/IS_50V/ornefni_punktar/wfs?request=GetFeature&service=WFS&version=1.1.0&typeName=IS_50V:ornefni_punktar&outputFormat=json",
  });
  const ornefniLinur = new GeoJSONLayer({
      url: "https://gis.lmi.is/geoserver/IS_50V/ornefni_linur/wfs?request=GetFeature&service=WFS&version=1.1.0&typeName=IS_50V:ornefni_linur&outputFormat=json",
  });
  const ornefniFlakar = new GeoJSONLayer({
      url: "https://gis.lmi.is/geoserver/IS_50V/ornefni_flakar/wfs?request=GetFeature&service=WFS&version=1.1.0&typeName=IS_50V:ornefni_flakar&outputFormat=json",
  });

  // Initialize the Search widget
  const search = new Search({
    view: mapView,
    container: "search-container",
    includeDefaultSources: true,
    sources: [ // add örnefni layers to search through
      {
          layer: ornefniPunktar,
          searchFields: ["ornefni"],
          displayField: "ornefni",
          exactMatch: false,
          outFields: ["ornefni"],
          name: "Örnefni punktar",
        },
      {
        layer: ornefniLinur,
        searchFields: ["ornefni"],
        displayField: "ornefni",
        exactMatch: false,
        outFields: ["ornefni"],
        name: "Örnefni línur",
      },
      {
          layer: ornefniFlakar,
          searchFields: ["ornefni"],
          displayField: "ornefni",
          exactMatch: false,
          outFields: ["ornefni"],
          name: "Örnefni flákar",
        },
    ]
    });
}
export default setupSearchWidget
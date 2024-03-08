/*Add to style.css
   /*///////////////////////*/
  /*    WFS connection     */
 /*///////////////////////*/
/*
 #panelItem {
    width: 300px;
    height: 400x;
  }
  
  #listArea {
    height: 300px;
    overflow: scroll;
  }
  
  .floating-wfsconnection {
    position: absolute;
    z-index: 100;
    top: 65px;
    right: 0px;
    width: 300px;
    height: 400px;
    background-color: white;
    border: 1px solid #ccc;
    display: none;
    overflow: auto;
  }
*/

/* Add to index.html
          <calcite-action
          id="wfsconnectionBtn"
          data-action-id="wfsconnection"
          text="WFS tenging"
          text-enabled
          icon="gis-server">
          <calcite-tooltip slot="tooltip" reference-element="info-action" overlay-positioning="fixed" placement="bottom">WFS tenging</calcite-tooltip>
        </calcite-action>

        <div id="wfsconnectionPanel" class="floating-wfsconnection">
          <div id="wfsconnection-container"></div>
          <div style="padding: 12px">
            <calcite-label status="idle" scale="s">
              OGC WFS endpoint
              <calcite-input
                id="endpoint"
                type="text"
                status="idle"
                value="https://gis.is/geoserver/ows"
              ></calcite-input>
            </calcite-label>
            <calcite-button scale="s" slot="input-action" id="getCapabilities"> GetCapabilities </calcite-button>
          </div>
          <calcite-loader id="loader" type="indeterminate" hidden="true"></calcite-loader>
          <calcite-notice id="warning" kind="warning" icon="exclamation-mark-triangle" width="full">
            <div slot="title">Unsupported WFS</div>
            <div slot="message">The WFS service must support WFS 2.0.0 and have GeoJSON output format enabled.</div>
          </calcite-notice>
          <div id="listArea"></div>
        </div>
*/

/* Add to script.js
require(["modules/wfsConnector"], (wfsConnector)

 wfsConnector.setupWFSConnections(map, mapView)
*/

// Setting up the WFS connection widget
define([
    "esri/layers/WFSLayer",
    "esri/layers/ogc/wfsUtils",
    "esri/widgets/LayerList",
  ], function(WFSLayer, wfsUtils, LayerList) {
    return {
      setupWFSConnections: function(map, view) {

        let wfsCapabilities;
        let lastAddedLayer;

        // add UI panel to the top-right of the view
        const panel = document.getElementById("wfsconnectionPanel");
        view.ui.add(panel, "wfsconnection-container");


        const wfsEndpoint = document.getElementById("endpoint"); // input value containing WFS endpoint url
        const listArea = document.getElementById("listArea");
        const warning = document.getElementById("warning");
        const loader = document.getElementById("loader"); // create loader icon to display while featuretypes are loading
        const capabilitiesBtn = document.getElementById("getCapabilities");
        capabilitiesBtn.addEventListener("click", getCapabilities);

        function getCapabilities() {
          listArea.innerHTML = ""; // clear the list of featuretypes when a new GetCapabilites request is execute
          loader.hidden = false;
          const url = wfsEndpoint.value;
          if (url) {
            // call get capabilities request on the WFS endpoint
            wfsUtils
              .getCapabilities(url)
              .then((capabilities) => {
                warning.open = false;
                wfsCapabilities = capabilities;
                // create list of featuretypes from the capabilities result
                createLayerList(wfsCapabilities.featureTypes);
              })
              .catch((error) => {
                warning.open = true;
              });
          }
        }

        // create a list from the featureTypes available in the service
        function createLayerList(featureTypes) {
          const list = document.createElement("calcite-pick-list");
          list.filterEnabled = true;
          featureTypes.forEach((feature) => {
            const listitem = document.createElement("calcite-pick-list-item");
            listitem.label = feature.title;
            listitem.value = feature.name;
            list.appendChild(listitem);
          });
          listArea.appendChild(list);
          loader.hidden = true; // stop loading
          list.addEventListener("calciteListChange", updateSelectedLayer);
        }

        // get information about the selected feature type and add the wfslayer to the map
        function updateSelectedLayer(event) {
          view.closePopup();
          // get the layer name from the clicked item
          const layerName = event.detail.keys().next().value;
          // get layer info for the feature type that was clicked
          wfsUtils.getWFSLayerInfo(wfsCapabilities, layerName).then((wfsLayerInfo) => {
            // remove existing layers from the map
            map.layers.remove(lastAddedLayer); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Need to change this to not remove all layers and only the specific one
            // create a WFSLayer from the layer info
            const layer = WFSLayer.fromWFSLayerInfo(wfsLayerInfo);
            lastAddedLayer = layer
            map.add(layer);
            layer.when(() => {
              // zoom to the layer's extent once it loads
              view.goTo(layer.fullExtent);
            });
          });
        }
      },
    };
  });
  
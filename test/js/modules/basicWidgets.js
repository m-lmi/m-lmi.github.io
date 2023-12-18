// Setting up the basic map widgets  like the home button, scale bar, zoom, and basemap gallery.
define([
    "esri/widgets/Home",
    "esri/layers/WebTileLayer",
    "esri/geometry/SpatialReference",
    "esri/layers/support/TileInfo",
    "esri/Basemap",
    "esri/widgets/BasemapGallery",
    "esri/widgets/LayerList",
    "esri/widgets/Search",
    "esri/widgets/ScaleBar",
  ], function(Home, WebTileLayer, SpatialReference, TileInfo, Basemap, BasemapGallery, LayerList, Search, ScaleBar) {
    return {
      setupBasicWidgets: function(mapView) {
        const homeBtn = new Home({
          view: mapView  
        });
  
        mapView.ui.add(homeBtn, "top-left");
        mapView.ui.move("zoom", "top-left"); //bottom-right

        // Web TIle Layer Loftmyndir
        const tileInfo = new TileInfo({
          spatialReference: {
            wkid: 3057 // Set the WKID for EPSG:3057 projection
          },
          /*origin: {
            x: -161616,
            y: -72.00000049173832
          },*/
          lods: [
            { level: 0, resolution: 4096 },
            { level: 1, resolution: 2048 },
            { level: 2, resolution: 1024},
            { level: 3, resolution: 512 },
            { level: 4, resolution: 256 },
            { level: 5, resolution: 128 },
            { level: 6, resolution: 64 },
            { level: 7, resolution: 32 },
            { level: 8, resolution: 16 },
            { level: 9, resolution: 8 },
            { level: 10, resolution: 4 },
            { level: 11, resolution: 2 },
            { level: 12, resolution: 1 },
            { level: 13, resolution: 0.5 },
            { level: 14, resolution: 0.25 },
            { level: 15, resolution: 0.125 },
            { level: 16, resolution: 0.0625 },
            // Add other levels as per your requirement
          ],
          size: [512, 512] // Tile size
        });
        
        const loftmyndirLayer = new WebTileLayer({
          urlTemplate: "https://ms.map.is/mapcache/tms/1.0.0/myndkort_512@isn93_512/{z}/{x}/{-y}.jpg",
          copyright: 'Map data from &copy; <a href="https://www.loftmyndir.is/" target="_blank">Loftmyndir</a>',
          spatialReference: {
            wkid: 3057 // Set the WKID for EPSG:3057 projection
          },
          tileInfo: tileInfo, // Set the custom tile information
          crossOrigin: null, // Set the cross-origin policy
          // Define the extent if needed
          // extent: {
          //   xmin: 0,
          //   ymin: 0,
          //   xmax: 39913400.685578495,
          //   ymax: 40074944.685578
          // }
        });

        // Add the Loftmyndir Basemap to the BasemapGallery
        const loftmyndirBasemap = new Basemap({
          baseLayers: [loftmyndirLayer],
          title: "Loftmyndir",
          id: "loftmyndir",
          thumbnailUrl: "https://atlas.lmi.is/logo/kortmynd_loftmyndir_thumbnail.png"
        });

        let basemaps = new BasemapGallery({
          view: mapView,
          container: "basemaps-container",
          source: {
            query: {
            },
            updateBasemapsCallback: function(items) {
              // Create a basemap using the WebTileLayer
              let loftmyndirBasemap = new Basemap({
                baseLayers: [loftmyndirLayer],
                title: "Loftmyndir",
                id: "loftmyndir",
                thumbnailUrl: "https://atlas.lmi.is/logo/kortmynd_loftmyndir_thumbnail.png"
              });
              items.push(loftmyndirBasemap);
              return items;
            }
          }
       });

        const layerList = new LayerList({
          view: mapView,
          selectionEnabled: true,
          container: "layers-container"
        }); 

        /*const scaleBar = new ScaleBar({
          view: mapView,
          unit: "dual"
        });
        mapView.ui.add(scaleBar, "bottom-right");*/

        // Assuming you have defined your rendererObyggdanefnd previously
const layerListContainer = document.getElementById("layer-list");
  
  

      },
    };
  });
  
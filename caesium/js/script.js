// An ArcGIS Access Token is required to authenticate requests to an ArcGIS Image Tile service.
// To access secure ArcGIS resources, you need to create an ArcGIS developer account at https://developers.arcgis.com/,
// then implement an authentication method to obtain an access token. See https://developers.arcgis.com/documentation/mapping-apis-and-services/security

// The access token can be assigned globally:
// Cesium.ArcGisMapService.defaultAccessToken = <token>;
// or as a token parameter when creating the ArcGisMapServeImageryProvider.
/*
const viewer = new Cesium.Viewer("cesiumContainer", {
   baseLayer: Cesium.ImageryLayer.fromProviderAsync(
     Cesium.ArcGisMapServerImageryProvider.fromBasemapType(
       Cesium.ArcGisBaseMapType.SATELLITE, {
         token: "AAPK204084556a4049dc92c580d6becce491qPJ2dtl2wmVAaRBbZHg7oSq6mkUYVBdGv6ulpoMVyJzoDE5V1P5hIGIsQsiUvwJH"
   })),
 });*/

const viewer = new Cesium.Viewer("cesiumContainer", {
    baseLayer: Cesium.ImageryLayer.fromProviderAsync(
      Cesium.ArcGisMapServerImageryProvider.fromBasemapType(
        Cesium.ArcGisBaseMapType.SATELLITE
        // other supported styles include:
        // Cesium.ArcGisMapServerImageryProvider.HILLSHADE
        // Cesium.ArcGisMapServerImageryProvider.OCEANS
      )
    ),
  });
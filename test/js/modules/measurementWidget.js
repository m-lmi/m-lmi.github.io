/***********************************
* Add measurement widget
***********************************/
//

define(["esri/widgets/Measurement"], function(Measurement,) {
    return {
      setupMeasurementWidget: function(mapView) {
  // Set the activeView to the 2D MapView
  let activeView = mapView;

  // Create new instance of the Measurement widget
  const measurement = new Measurement({
    view: activeView,
  });

  // Set-up event handlers for buttons and click events
  const distanceButton = document.getElementById('distanceBtn');
  const areaButton = document.getElementById('areaBtn');
  const clearButtonD = document.getElementById('clearDistanceBtn');
  const clearButtonA = document.getElementById('clearAreaBtn');


  distanceButton.addEventListener("click", () => {
    document.getElementById("distancePanel").appendChild(clearButtonD);
    distanceMeasurement();
    activeView.ui.add(measurement, "distance-container");
  });

  areaButton.addEventListener("click", () => {
    document.getElementById("areaPanel").appendChild(clearButtonA);
    areaMeasurement();
    activeView.ui.add(measurement, "area-container");
  });

  clearButtonD.addEventListener("click", () => {
    clearMeasurements();
  });
  clearButtonA.addEventListener("click", () => {
    clearMeasurements();
  });

  // Call the appropriate DistanceMeasurement2D or DirectLineMeasurement3D
  function distanceMeasurement() {
    measurement.activeTool = "direct-line";
    measurement.container = "distance-container";
    distanceButton.classList.add("active");
    areaButton.classList.remove("active");
  }

  // Call the appropriate AreaMeasurement2D or AreaMeasurement3D
  function areaMeasurement() {
    measurement.activeTool = "area";
    measurement.container = "area-container";
    distanceButton.classList.remove("active");
    areaButton.classList.add("active");
  }

  // Clears all measurements
  function clearMeasurements() {
    distanceButton.classList.remove("active");
    areaButton.classList.remove("active");
    measurement.clear();
  }
      }
    };
  }); //the end of measurementWidgets.js  
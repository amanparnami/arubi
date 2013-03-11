/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var myAppController =
        {
            geoObject: null,
            cube: null,
            createContent: function()
            {
                var cubeGeometry, cubeMaterial;
                cubeGeometry = new THREE.CubeGeometry(100, 100, 100, 2, 2, 2);
                cubeMaterial = new THREE.MeshLambertMaterial({color: 0xFFFF00, shading: THREE.FlatShading, overdraw: true});

                cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
                cube.position.x = 0;
                cube.position.y = 0;
                cube.position.z = 0;
                cube.scale.x = 10;
                cube.scale.y = 10;
                cube.scale.z = 10;

                var ori = new THREE.Object3D();
                ori.position.x = 0;
                ori.position.y = 0;
                ori.position.z = 500.0;
                ori.scale.x = 1;
                ori.scale.y = 1;
                ori.scale.z = 1;

                geoObject = ARGON.createGeoObject(33.7772722222222, -84.3895361111111, 0);
                geoObject.add(cube);

                ARGON.World.add(geoObject);
            },
            onArgonReady: function()
            {
                myAppController.createContent();
                ARGON.loadDataset("http://argon.gatech.edu/demos/StonesAndChips.xml");
            },
            onDataSetLoaded: function(event)
            {
                var dataset, stonesTarget, trackedObject;
                var redCube, redMaterial, redGeometry;

                dataset = event.dataset;
                stonesTarget = dataset.targets["stones"];

                if (stonesTarget)
                {
                    trackedObject = new ARGON.TrackedObject();
                    trackedObject.name = "AttachedToStonesTarget";

                    trackedObject.autoHideAfterFrames = 1;
                    trackedObject.setTarget(stonesTarget);

                    redGeometry = new THREE.CubeGeometry(100, 100, 100, 2, 2, 2);
                    redMaterial = new THREE.MeshLambertMaterial({color: 0xFF0000, shading: THREE.FlatShading, overdraw: true});
                    redCube = new THREE.Mesh(redGeometry, redMaterial);
                    redCube.position.z = 50.0;

                    var divEl = document.createElement('div');
                    divEl.id = "cssContent";
                    divEl.style.width = "100px";
                    divEl.style.height = "100px";
                    divEl.style.backgroundColor = "red";
                    divEl.style.position = 'absolute';
                    divEl.style.fontSize = "16px";
                    divEl.innerText = "AR + HTML5";

                    var cssObject;
                    cssObject = new THREE.CSSObject(divEl);
                    cssObject.width = 100;
                    cssObject.height = 100;
                    cssObject.position.x = 0.0;
                    cssObject.position.y = 0.0;
                    cssObject.position.z = 50.0;
                    cssObject.visible = false;

                    redCube.add(cssObject);

                    trackedObject.add(redCube);
                }
            }
        };

document.addEventListener("AR.DataSetLoadedEvent", myAppController.onDataSetLoaded);
document.addEventListener("AR.ArgonReadyEvent", myAppController.onArgonReady);


$(document).ready(function() {

    var container = document.getElementsByClassName("container");



    $("#page1").show();
    $("#page2").hide();

    Hammer(container).on("swiperight", function() {
        $("#page2").hide();
        $("#page1").show();

    });

    Hammer(container).on("swipeleft", function() {
        $("#page1").hide();
        $("#page2").show();

    });

//   $(".container").hammer().on("swiperight", function (event) { 
////       alert("swiped right");
//       $("#page2").hide();
//       $("#page1").show();
////       $("#page1").animate({"left":"800px"},"fast");
////       $("#page2").animate({"left":"1600px"},"fast");
//   });

//   $("#page1").on("click", function (event) {
//       
//           $("#page1").animate({"left":"800px"},"fast");
//       $("#page2").animate({"left":"1600px"},"fast");
//   });

    $(".container").hammer().on("swipeleft", function(event) {
//       alert("swiped left");
        $("#page1").hide();
        $("#page2").show();

//       $("#page1").animate({"left":"0px"},"fast");
//       $("#page2").animate({"left":"800px"},"fast");
    });
});
var app = {
    trackedObjects: null,
    trackedObject24: null,
    trackedObject25: null,
    trackedObject26: null,
    devices: null,
    //Functon to handle devicesJSOn
    _devicesArrayHandler: function(devicesJSON) {
        devices = devicesJSON;

        //Create an empty associate array, aka object in js
        trackedObjects = {};

        //Iterate through devices        
        devices.forEach(function(device) {

            console.log("device id=" + device.id + " is " + device.name);

            var frameMarker;
            var trackedObject;

            /** create a FrameMarker **/
            frameMarker = new ARGON.FrameMarkerTarget(device.id, "device " + device.id, 50);

            /** create a TrackedObject **/
            trackedObject = new ARGON.TrackedObject();

            /** bind TrackedObject to FrameMarkerTarget **/
            trackedObject.setTarget(frameMarker);

            trackedObjects[device.id] = trackedObject;
            /** add the CSSObject to the TrackedObject, centered on the Target **/

        });

    },
    //Check which framemarker is visible and do thing with its related device
    _checkVisibleDevices: function() {
        if (trackedObjects != null)
            devices.forEach(function(device) {
                //If a trackedObject.trackingTargt relating to a specific device is visible, then show it's device panel, otherwise, hide it
                if (trackedObjects[device.id].trackingTarget._visible) {
                    console.log("device " + device.id + " is visible");
                    
                    //Show the device with the same id with the framemark
//                    showDevice(device.id);
                    if(device.id === "1"){
                        $(".device-container").show();
                        console.log("device 1 detected");
                    }
                    else if (device.id === "5"){
                        $(".output-device-container").show();
                        console.log("device 5 detected");
                    }

                } else hideDevice(device.id);


            });

    },
    //Create trackedObject with target
    _createTrackedObjectWithTarget: function(target)
    {
        var trackedObject;
        trackedObject = new ARGON.TrackedObject();
        if (target != null)
            trackedObject.setTarget(target);
        return trackedObject;
    },
    onArgonReady: function() {
        //Get devices' json and create trackedObjects accordingly
        getDevicesJson(app._devicesArrayHandler);

    }
};

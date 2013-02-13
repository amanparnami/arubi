			

function ar_init(){
    var externalScriptArray = new Array(
            //"http://code.jquery.com/mobile/1.0.1/jquery.mobile-1.0.1.min.js",
            
            "http://code.jquery.com/jquery-1.9.1.min.js",
            "js/app.js"
	       ); 
			
    headTag= document.getElementsByTagName('head')[0];
    linktag = document.createElement("link");
    linktag.setAttribute("rel", "stylesheet");
    linktag.setAttribute("type", "text/css");
    linktag.setAttribute("href", "css/UI.css");
    headTag.appendChild(linktag);

    loadExternalScripts(externalScriptArray);	  
}

function loadExternalScripts(scriptArray){
    insertScriptTagIntoDOM(scriptArray.shift(), function(){ 
    if(scriptArray.length > 0){loadExternalScripts(scriptArray);}
    else{initialize();} 
    });
}

function insertScriptTagIntoDOM(url, onloadHandler)
{
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = onloadHandler;
    document.body.appendChild(script);
}
	        
function initialize(){

    motherOfAllOverlays = document.getElementById("myScreenOverlay").parentNode;
    motherOfAllOverlays.style.position = "fixed";	


}

function loaded() {

}
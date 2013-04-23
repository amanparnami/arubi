/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

window.notification = {
    me: $("#notification")[0],
    opacity: 0,
    hide: function(callback) {
        $(this.me).animate({opacity: 0}, 250, function() {
            window.notification.opacity = 0;
            if (callback)
                callback();
        });
    },
    show: function(callback) {
        $(this.me).animate({opacity: 1}, 250, function() {
            window.notification.opacity = 1;
            if (callback)
                callback();
        });
    },
    log: function(logStr) {
        if (this.opacity == 0)
            this.show(function() {
                window.notification.log(logStr);
                return;
            });

//        $("#notification p").css("opacity", 0).animate({opacity: 0}, 100,function (){
        $("#notification p").html(logStr);
        $("#notification p").animate({opacity: 1}, 250, function () {
            console.log("about to hide");
            window.setTimeout(function () {
                window.notification.hide();
            }, 3000)
        });


//        });



    }
}

window.notification.hide();
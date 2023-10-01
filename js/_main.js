$.fn.anime = function(options, duration = 1000, delay = 0) {
    anime({
        targets: $(this).get(),
        easing: "cubicBezier(0.65, 0, 0.35, 1)",
        duration,
        delay,
        ...options
    })

    return new Promise(res => setTimeout(res, duration))
}

window.revealinfo = function() {
    $("#hero").attr("src", "assets/img/artists/" + window.event_info.img).css("opacity", 0)
    
    $("#info-bio").html(window.event_info.bio).css("opacity", 0)
    $("#info-links").html(window.event_info.links).css("opacity", 0)
    $("#info-oneline").html(window.event_info.oneline).css("opacity", 0)
    $("#info-event").html("")
    
    $("#info").anime({ top: 0 }, 800).then(() => {        
        new TypeIt("#info-event", {
            strings: window.event_info.title,
            speed: 100
        }).go();

        $("#info-bio").anime({ "opacity": 1 })
        $("#info-links").anime({ "opacity": 1 })
        $("#info-oneline").anime({ "opacity": 1 })

        $("#block").css("left", 0)
        $("#block").anime({ "width": "100%" }, 500).then(() => {
            $("#hero").css("opacity", 1)
            $("#block").anime({ "width": 0, "left": "100%" }, 500)
        })
    })
}

window.hideinfo = function() {
    $("#info").anime({ top: "100%" }, 800).then(() => {
        $("#hero").attr("src", "")
    })
}

window.moreinfo = function(path) {
    $.getJSON("assets/info/" + path, data => {
        window.event_info = data
        window.revealinfo()
    })
}

$(document).keyup(e => {
    if (e.key === "Escape") {
        window.hideinfo()
    }
})

$(document).ready(() => {
    console.log("never gonna give you up");

    new TypeIt("#tagline", {
        strings: "four days of electronic music for the masses",
        cursor: false,
        speed: 100
    }).go();

    $("#title").mgGlitch();
    $("#electric").text("ELECTRIC");

    $("#open-schedule").on("click tap", () => {
        $("#background").anime({ translateY: "-32%" })
        $(".title").anime({ top: "12vmin" })
        $("#tagline").anime({ opacity: 0, translateY: "-100%" }).then(() => $("#tagline").remove())
        // $("#schedule").css("display", "flex").anime({ opacity: 1, bottom: 0 })

        $("#open-schedule").on("click", () => {
            window.location.href = "https://www.electricspring.co.uk/assets/ES23-programme.pdf"
        })
    })

    $()
    
    $("#open-tickets").one("click tap", () => {
        $("#open-tickets").glitch({
            chars: "abcdefghijklmnopqrstuvwxyz",
            charTime: 8,
            finalText: "coming soon"
        })

    })
});


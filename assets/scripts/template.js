/*  ================================================
    GENERAL CONFIGURATION
============================================= */
window.MUSIC = {
        'url': "https://gracianatasha.github.io/yeckliveswithgrace/assets/music/song.mp3",
        'box': '#music-box'
    };
window.EVENT = 1670641200;
window.BOOKS = [{"bank":"Bank Central Asia (BCA)","number_account":"6195026886"}];

// ---------- Start Your Journey (Function) --------------------------------------------------
function startTheJourney() {
    $('html, body').animate({ scrollTop: $('#start').offset().top }, 'slow');
    $('.top-cover').eq(0).addClass('hide');
    $('#gift-form').hide();
    $('body').eq(0).css('overflow', 'visible');

    if (typeof playMusicOnce === 'function') playMusicOnce();

    setTimeout(function() {
        // Looping the aos animate
        $('.aos-animate').each(function(i, el){
            // If the parent is not 'Top Cover'
            if ($(el).closest('.top-cover').length == 0) {
                // Remove 'aos-animate' class
                $(el).removeClass('aos-animate');
                setTimeout(function(){
                    // Add 'aos-amimate' class
                    $(el).addClass('aos-animate');
                }, 1000);
            }
        });
    }, 100);

    setTimeout(function(){
        $('.top-cover').eq(0).remove();
    }, 3000);
}

// ---------- ALERT --------------------------------------------------
var $alert = $('#alert');                           // alert
var $alertClose = $('#alert .alert-close');         // alert close
var $alertText = $('#alert .alert-text');           // Alert Text

// ---------- Hide Alert (Function) --------------------------------------------------
function hideAlert() {
    $alert.removeClass();           // Remove All Class
    $alert.addClass('alert hide');                                        // hiding alert
}

// ---------- Show Alert (Function) --------------------------------------------------
function showAlert(message, status) {
    if (status != '') {
        $alert.removeClass();     // Remove All Class
        $alert.addClass('alert show ' + status);
        $alertText.text(message);
        setTimeout(hideAlert, 3000);
    }
}

// ---------- Copy to  (Function) --------------------------------------------------
function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". â€“ Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    showAlert('Successfully Copied to Clipboard', 'success');
}

// ---------- Copy Account [ON CLICK] ---------------------------------------------------------------
$(document).on('click', '.copy-account', function(e){
    e.preventDefault();
    var book = $(this).closest('.book');
    var number = $(book).find('.account-number');
    copyToClipboard(number.html());
});

// ---------- Wedding gift ---------------------------------------------------------------------------
giftOpened = false;
$('#gift-btn').on('click', function(e){
    e.preventDefault();
    if (!giftOpened) {
        $('#gift-form').show();
        $('#gift-form').removeClass('aos-animate');
        setTimeout(function() {
            $('#gift-form').addClass('aos-animate');
        }, 400);
        giftOpened = true;
    } else {
        $('#gift-form').hide();
        $('#gift-form').addClass('aos-animate');
        setTimeout(function() {
            $('#gift-form').removeClass('aos-animate');
        }, 400);
        giftOpened = false;
    }
    
});

// ---------- Disabled Dragging an image [ON DRAGSTART] -----------------------------------------------
$('img').on('dragstart', function(e){
    e.preventDefault();
});

/*  ==============================
        CALLING
============================== */

function sendComment(data) {
    $("div.overlay").addClass("show");
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://yeckliveswithgrace-8306.restdb.io/rest/wishes",
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "x-apikey": "65240b6f688854a7680c03cf",
        "cache-control": "no-cache"
      },
      "processData": false,
      "data": JSON.stringify(data)
    }

    $.ajax(settings).done(function (response) {
        $('#send-comment').text('Send');
        $("div.overlay").removeClass("show");
        getComments();
        showAlert('Successfully Submitted', 'success');
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // Handle the error
        $('#send-comment').text('Send');
        $("div.overlay").removeClass("show");
        showAlert('Error: ' + errorThrown, 'error');
    });
}

function getComments() {
    var settings = {
      "async": false,
      "crossDomain": true,
      "url": 'https://yeckliveswithgrace-8306.restdb.io/rest/wishes?q={}&h={"$orderby": {"date": -1}}',
      "method": "GET",
      "headers": {
        "content-type": "application/json",
        "x-apikey": "65240b6f688854a7680c03cf",
        "cache-control": "no-cache"
      }
    }

    $.ajax(settings).done(function (response) {
        $('#name').val('');
        $('#wishes').val('');
        $("input[name='attend_attend']:checked").prop("checked", false);
        $("input[name='guests_guests']:checked").prop("checked", false);
        $('.comment').each(function(){
            $(this).remove();
        });
        for (idx in response) {
            comment = response[idx];
            if (comment.wishes != null && comment.wishes != "") {
                jsDate = new Date(comment.date);
                options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
                $('section.comment-outer .comments')
                .append('<div class="comment aos-init aos-animate" data-aos="fade-up" data-aos-duration="1000"><div class="comment-head"><p><strong>' 
                    + comment.name 
                    + '</strong></p></div><div class="comment-body"><p>' 
                    + comment.wishes 
                    + '</p></div></div>');
            }
        }
    });
}

/*  ================================================
    SAVE THE DATE
============================================= */
// ----------- COUNTDOWN (Function) ------------------------------------------------------
(function countdown(){
    var schedule = new Date("2023-11-18"),
            event = new Date(schedule).getTime(),
            start = setInterval(rundown, 1000);

        // Rundown
        function rundown() {
            var now = new Date().getTime(),
                distance = event - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24)),                            // days
                hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),      // hours
                minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),              // minutes
                seconds = Math.floor((distance % (1000 * 60)) / 1000);                          // seconds

            if (distance < 0) {
                clearInterval(start);
                $('.count-day').text('0');
                $('.count-hour').text('0');
                $('.count-minute').text('0');
                $('.count-second').text('0');
            } else {
                $('.count-day').text(days);
                $('.count-hour').text(hours);
                $('.count-minute').text(minutes);
                $('.count-second').text(seconds);
            }
        }
}());

/*  ==============================
        WEDDING WISH
============================== */
$(document).ready(function(){
    getComments();
});

$('#send-comment').click(function(e){
    e.preventDefault();
    var data = {};
    var isValid = true;
    $('.form-data').each(function(idx, value){
        var names = value.name.split('_');
        if ((names[0] == "name") && (value.value == "" || value.value == null)) {
            showAlert(names[1] + ' should be filled', 'error');
            isValid = false;
            return false;
        }   
        data[names[0]] = value.value;
    });
    if (document.querySelector('input[name="attend_attend"]:checked')) {
        data['attend'] = document.querySelector('input[name="attend_attend"]:checked').value;    
    }
    
    if (document.querySelector('input[name="guests_guests"]:checked') != null) {
        data['guests'] = document.querySelector('input[name="guests_guests"]:checked').value;    
    }
    
    data['url_name'] = getUrlParameter('name');
    if (isValid) {
        data['date'] = Date();
        $('#send-comment').text('Sending');
        sendComment(data);
    }
});

/*  ==============================
        MUSIC
============================== */
var isMusicAttemptingToPlay = false,
    isMusicPlayed           = false,
    playBoxAnimation,
    pauseBoxAnimation,
    pauseMusic,
    playMusic;

// Background Music
(function backgroundMusic() {
    if (typeof window.MUSIC != 'undefined') {
        var url = window.MUSIC.url,
            box = window.MUSIC.box;

        // if url is not empty and the box so
        if (url != '') {
            var backgroundMusic = document.createElement("audio");    // Background Music
            backgroundMusic.autoplay = true;
            backgroundMusic.muted = true;
            backgroundMusic.loop = true;
            backgroundMusic.load();
            backgroundMusic.src = url;

            // Playing Box Animation
            playBoxAnimation = function() {
                if (!$(box).hasClass('playing')) {
                    $(box).addClass('playing');
                }

                if ($(box).css('animationPlayState') != 'running') {
                    $(box).css('animationPlayState', 'running');
                }
            }

            // Pause Box Animation
            pauseBoxAnimation = function() {
                if ($(box).hasClass('playing')) {
                    if ($(box).css('animationPlayState') == 'running') {
                        $(box).css('animationPlayState', 'paused');
                    }
                }
            }

            // Pause Music
            pauseMusic = function() {
                backgroundMusic.pause();
                pauseBoxAnimation();

                isMusicAttemptingToPlay = true;
                isMusicPlayed = false;
            };

            // Play Music
            playMusic = function() {
                isMusicAttemptingToPlay = false;
                backgroundMusic.muted = false;
                var promise = backgroundMusic.play();

                if (promise !== undefined) {
                    promise.then(_ => {
                        isMusicPlayed = true;
                        // console.log('Audio berhasil diputar');
                        playBoxAnimation();
                    }).catch(error => {
                        isMusicPlayed = false;
                        // console.log('Tidak dapat memutar audio');
                        pauseBoxAnimation();
                        // console.log(error);
                    });
                }
            };

            // Music Box
            $(document).on('click', box, function(e) {
                e.preventDefault();

                if (isMusicPlayed) {
                    pauseMusic();
                } else {
                    playMusic();
                }
            });

            // Pause Audio When Click Video Button
            $(document).on('click', '.play-btn, .play-youtube-video', function(e){
                e.preventDefault();
                if (isMusicPlayed) return pauseMusic();
            });

            // Is Box Hidden?
            var prevScrollpos = window.pageYOffset;
            var isBoxHidden = false;
            var boxTimeout;

            // Show Music Box
            var showMusicBox = function() {
                // Show Music Box
                $(box).removeClass('hide');                     // Showing the box
                isBoxHidden = false;                            // Box is not hidden

                clearTimeout(boxTimeout);                       // Clear Timeout
            }

            // Hide Music Box
            var hideMusicBox = function() {
                // Hide Music Box
                $(box).addClass('hide');                        // Hiding the box
                isBoxHidden = true;                             // Box is hidden

                clearTimeout(boxTimeout);                       // Clear Timeout
                boxTimeout = setTimeout(showMusicBox, 5000);    // Set Timeout
            }

            // Window On Scroll
            $(window).on('scroll', function(){
                var currentScrollPos = window.pageYOffset;

                if (prevScrollpos > currentScrollPos) {
                    if (isBoxHidden) showMusicBox();
                } else {
                    if (!isBoxHidden) hideMusicBox();
                }

                prevScrollpos = currentScrollPos;
            });

        }
    }
}());

// ---------- Play Music Once --------------------------------------------------
function playMusicOnce() {
    // Play Music is defined
    if (typeof playMusic === 'function') {
        // Is music NOT attemp to play && Music NOT played yet
        if (!isMusicAttemptingToPlay && !isMusicPlayed) {
            setTimeout(playMusic, 500);
        }
    }
}

// Window On Load
$(window).on("load click scroll", function(e) {
    // Play Music Once
    playMusicOnce();
});

// Trigger Music to play when document is scroled or clicked
$(document).on("click scroll", function(e) {
    // Play Music Once
    playMusicOnce();
});

// Document is ready!
$(document).ready(function(){
    var responder = getUrlParameter('name');
    $('.greetings h1').text(responder);
    $('p.responder').text(responder);
    setTimeout(() => {
        $('body').trigger('click');
    }, 1000);

//    css calculation
    var div = $('section.save-date');
    var width = div.width();

    div.css('height', width * 0.666);
});

/*  ==============================
        OTHERS
============================== */
// ---------- Modal Video ---------------------------------------------------------------
var modal_video_options = {
    youtube: {
        autoplay: 1,
        cc_load_policy: 1,
        color: null,
        controls: 1,
        disableks: 0,
        enablejsapi: 0,
        end: null,
        fs: 1,
        h1: null,
        iv_load_policy: 1,
        // list: null,
        listType: null,
        loop: 0,
        modestbranding: null,
        mute: 0,
        origin: null,
        // playlist: null,
        playsinline: null,
        rel: 0,
        showinfo: 1,
        start: 0,
        wmode: 'transparent',
        theme: 'dark',
        nocookie: false,
    }
};


$('.play-btn').modalVideo(modal_video_options);
$('.play-youtube-video').modalVideo(modal_video_options);


// ---------- AOS (Animation) ------------------------------------------------------
var AOSOptions = {
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 0, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 0, // the delay on throttle used while scrolling the page (advanced)

    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 10, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
}

// Run AOS on Load
$(window).on('load', function () {
    AOS.refresh();
});

$(function() {
    AOS.init(AOSOptions);
});

$(window).on("scroll", function () {
    AOS.init(AOSOptions);
});

// ---------- LIGHT GALLERY --------------------------------------------------
$(function(){
    lightGallery(document.getElementById('lightGallery'), {
        download: false,
    });
});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

// data
var galleryImages = [
//BALI
{'id':'1NCoF_z1p3RIFVGNPMA1At8Jy00V7WfdB', 'name':'D421920'},
{'id':'1vyM-SfoiLmFvZ598u2XiA6LJL8tVzLn4', 'name':'D461920'},
{'id':'1-iOP8rWMzFwqVrUVKRKClP5XmBV_fOV6', 'name':'D681920'},
{'id':'136V-CijTKcmeMrzcJhGniKekO1NCrzAS', 'name':'D1141920'},
{'id':'1GIymXdehs7waDfoWCTRdO6tIKEpuoHXW', 'name':'D1271920'},
//DRONE
{'id':'1p5ub_C8qZUJEs5I52byk8kKKaJZ1KU54', 'name':'DJI_0595'},
//PINK
{'id':'18LrQXjBTLKP3twpMDCUv1PrYt2nnbr15', 'name':'IMG_3535'},
{'id':'1oADEjqj_bTTL0GueAz1q-k7jvvoGBQzU', 'name':'IMG_3467'},
{'id':'1WEdkmJUFzqkM40gRGxBbNCj7-6ngVe3D', 'name':'IMG_3545'},
{'id':'1DvmnGsiP__kq13TFNxOAUQZ2XvRuCcks', 'name':'IMG_3486'},
{'id':'1Kl3kQzpjKF9RXWqKpvifYPTQkRKhuN4L', 'name':'IMG_3554'},
//RED
{'id':'1hXqx2iB22GEqg6akluqOJW-qX5oyqQ-N', 'name':'IMG_3854'},
{'id':'1pQCFPLwmOP_Pci-5ef3aMMp7IcURXRz4', 'name':'IMG_3887'},
{'id':'1OUNQVaYQsLVtb45G-UL9O_V7att_6Va4', 'name':'IMG_3846'},
//ROOM
{'id':'1CvT3_ORimq75XY2B8aDtLFhhVvdr05Sb', 'name':'IMG2692'},
{'id':'1E-TmfmWFjgQwbUJiaMnKJBrmWwOcDESk', 'name':'IMG2720'},
{'id':'1F2LS-hQvlAV-Y8WmjYCvvs32QggGNStB', 'name':'IMG2775'},
{'id':'1ozMrAS6qVl4c1ydJY748bQfjVUrLV1op', 'name':'IMG2827'},
//WHITE
{'id':'1l6wMsQZvaCT4I02vDg53zth-nhTMCqdW', 'name':'IMG3588'},
{'id':'1Qix4QytIjMmqlYiRFa3C5qZTwcUoMZBv', 'name':'IMG3626'},
{'id':'1F6NROsXMNY5KDwu0EAOf5Nu3VBi-5q_B', 'name':'IMG3630'},
{'id':'17mysJwKvmNRn8rNziQamJQODfCmouer5', 'name':'IMG3639'},
{'id':'13CrLv3YmT0ZnJHQ2Kn6MuNz9Y7B7IzGr', 'name':'IMG3703'},
{'id':'1oKeAbCjkGVGK9iNgTkmPV8YkntqkT6uw', 'name':'IMG3707'},
{'id':'1ok5pp3QDnaBI7yxxnWyNwOJP9p5p5ATy', 'name':'IMG3741'},
{'id':'1EMkHw29jhnBwFA6odAJ6SS7IgbcukBie', 'name':'IMG3751'},
//PINK
{'id':'1JxW9uJWaB4RBhGuk-ln7CoIt0nFPhIcz', 'name':'IMG_3269'},
{'id':'1tVNVQZQtppAWjaHKOaYs0niwR0XBIJuX', 'name':'IMG_3258'},
{'id':'1VVBSOADPV_k0OJGUpq0CDs1C0z5cOuBb', 'name':'IMG_3156'},
{'id':'1Leo79J9fbkCWNxd4HLEf4h4nusXG1U0O', 'name':'IMG_3137'},
//RED FIREWORK
{'id':'1mpm6m9bVgjXcdPZqBVGRxlDAF775pGog', 'name':'IMG_3945'},
{'id':'1fC5Zebhe8qtkeJQkK5fIO-L-PEVRBaIH', 'name':'IMG_3942'},
{'id':'1qi6SlXH77ChXD3F2DbxHavKREu-QQRo8', 'name':'IMG_3905'},
//NIGHT
{'id':'1lsNoHIvrvfDPSlqJpljAKfjdf8UH5UCm', 'name':'IMG_2946'},
{'id':'1e2EC7bhkrIk7plr8K9UVkeOaYdsamsf2', 'name':'IMG_2973'},
{'id':'1Lv_DvIfWvif19mBUoImeQgihyM9IhYDk', 'name':'IMG_3035'},
//LIGHTROOM
{'id':'1fCCXwrSz8Y9_wpjEssZu_lUv7e-9LB8L', 'name':'IMG2845'},
{'id':'1H5Ot3yZMYxmUjagbobEa_vNDcsdWmAv9', 'name':'IMG2889'},
{'id':'1eCQs-Wg8_Ze7fEaaXEGxVC_OjRV0YqR1', 'name':'IMG2878'},
];
initImage(0);

function initImage(idx){
    setTimeout(function(){
        if (idx < galleryImages.length) {
            $('#lightGallery').append('<a href="https://drive.google.com/uc?export=view&id='+galleryImages[idx].id+'" target="_blank"><img src="./assets/galleries/' + galleryImages[idx].name + '.jpg" alt=""></a>');
            if (idx == galleryImages.length -1) {
                lightGallery(document.getElementById('lightGallery'), {
                    download: false,
                });
            }
            initImage(++idx);
        }
    }, 250);
}

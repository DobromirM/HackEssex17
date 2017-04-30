var width = 320;
var height = 240;
var topDist = '0px';
var leftDist = '0px';

var setup = function ()
{
    var video = document.getElementById('webgazerVideoFeed');
    video.style.display = 'block';
    video.style.position = 'absolute';
    video.style.top = topDist;
    video.style.left = leftDist;
    video.width = width;
    video.height = height;
    video.style.margin = '0px';

    webgazer.params.imgWidth = width;
    webgazer.params.imgHeight = height;

    var overlay = document.createElement('canvas');
    overlay.id = 'overlay';
    overlay.style.position = 'absolute';
    overlay.width = width;
    overlay.height = height;
    overlay.style.top = topDist;
    overlay.style.left = leftDist;
    overlay.style.margin = '0px';

    document.body.appendChild(overlay);

    var cl = webgazer.getTracker().clm;

    $('#webgazerVideoFeed').toggle();
    $('#overlay').toggle();

    function drawLoop()
    {
        requestAnimFrame(drawLoop);
        overlay.getContext('2d').clearRect(0, 0, width, height);
        if (cl.getCurrentPosition())
        {
            cl.draw(overlay);
        }
    }

    drawLoop();
};

setTimeout(checkIfReady, 100);

function checkIfReady()
{
    if (webgazer.isReady())
    {
        setup();
    } else
    {
        setTimeout(checkIfReady, 100);
    }
}
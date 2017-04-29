window.onload = function ()
{

    var xprediction;
    var yprediction;

    //This is the webGaze initial setup
    webgazer.setRegression('ridge') /* currently must set regression and tracker */
        .setTracker('clmtrackr')
        .setGazeListener(function (data, clock)
        {
            //   console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
            //   console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
            if (data == null)
            {
                return;
            }

            xprediction = data.x;
            yprediction = data.y;
            console.log("x = " + xprediction);
            console.log("y = " + yprediction);
        }).begin()
        .showPredictionPoints(true);
    /* shows a square every 100 milliseconds where current prediction is */

    //Stop webGaze
    $(".test").click(function ()
    {
        webgazer.pause();
        console.log("Final x = " + xprediction);
        console.log("Final y = " + yprediction);
    });
};

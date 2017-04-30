window.onload = function ()
{

    var index = -1000;
    var left = 0;
    var right = 0;
    var xprediction = [];
    var yprediction = [];
    var time;
    var fav = [];

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

            xprediction.push(data.x);
            yprediction.push(data.y);
            time = clock;
        }).begin()
        .showPredictionPoints(false);
    /* shows a square every 100 milliseconds where current prediction is */

    //Stop webGaze
    $(".test").click(function ()
    {
        webgazer.pause();
    });


    $(".start").click(function ()
    {
        $(".init").css("display", "none");
        $(".mainApp").css("display", "block");
        index = 1;
        reset();
    });

    setTimeout(drawPrediction, 2000);

    function drawPrediction()
    {
        var sumX = 0;
        var sumY = 0;
        for (var i = 0; i < xprediction.length; i++)
        {
            sumX = sumX + parseInt(xprediction[i], 10); //don't forget to add the base
            sumY = sumY + parseInt(yprediction[i], 10); //don't forget to add the base
        }

        var avgX = sumX / xprediction.length;
        var avgY = sumY / yprediction.length;

        // console.log("Final x = " + avgX);
        // console.log("Final y = " + avgY);

        xprediction = [];
        yprediction = [];

        var size = 10;

        $(".prediction").append(
            $('<div></div>')
                .css('position', 'absolute')
                .css('top', avgY + 'px')
                .css('left', avgX + 'px')
                .css('width', size)
                .css('height', size)
                .css('background-color', 'green')
                .css("z-index", "1000")
        );

        if(avgX < 425)
        {
            left++;
            $('.leftCount').html(left);
        }
        else
        {
            right++;
            $('.rightCount').html(right);
        }

        if(left + right == 15)
        {
            if(left > right)
            {
                fav.push('left');
            }
            else
            {
                fav.push('right');
            }
            reset();
            index++;
            $(".left > img ").attr("src", "img/left_" + index + ".jpg");
            $(".right > img ").attr("src", "img/right_" + index + ".jpg");
        }

        if(index == 5 )
        {
            $('.mainApp').toggle();
            createStat();
            $('.stat').toggle();
            index++;
        }

        setTimeout(drawPrediction, 2000);
    }

    function reset()
    {
        left = 0;
        right = 0;
    }

    function createStat()
    {
        for(var i = 0; i < 5; i++)
        {
            var divId = "#line_" + i;
            $(divId).attr("src", "img/" + fav[i] + "_" + i+1 + ".jpg")
        }
    }

    $(document).keypress(function(e) {
        if(e.which == 13)
        {

            $('#webgazerVideoFeed').toggle();
            $('#overlay').toggle();
            $('.prediction').toggle();
        }
    });

    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#ffffff";
    ctx.font = "25px Arial";
    ctx.fillText("1", 5, 50);
    ctx.beginPath();
    ctx.arc(25, 40, 3, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    var i = 1;
    $('#myCanvas').click(function (e)
    {
        var clickedX = e.pageX - this.offsetLeft;
        var clickedY = e.pageY - this.offsetTop;
        if ((i == 1) && (Math.abs(clickedX - 5) < 25) && (Math.abs(clickedY - 50) < 15))
        {
            ctx.fillText("2", 285, 150);
            ctx.beginPath();
            ctx.arc(295, 160, 3, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            i++;
        }
        if ((i == 2) && (Math.abs(clickedX - 290) < 15) && (Math.abs(clickedY - 150) < 15))
        {
            ctx.moveTo(30, 40);
            ctx.lineTo(295, 160);
            ctx.stroke();
            ctx.fillText("3", 485, 35);
            ctx.beginPath();
            ctx.arc(495, 40, 3, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            i++;
        }
        if ((i == 3) && (Math.abs(clickedX - 490) < 15) && (Math.abs(clickedY - 35) < 15))
        {
            ctx.moveTo(295, 160);
            ctx.lineTo(495, 40);
            ctx.stroke();
            ctx.fillText("4", 750, 35);
            ctx.beginPath();
            ctx.arc(750, 40, 3, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            i++;
        }
        if ((i == 4) && (Math.abs(clickedX - 750) < 15) && (Math.abs(clickedY - 35) < 15))
        {
            ctx.moveTo(495, 40);
            ctx.lineTo(750, 40);
            ctx.stroke();
            ctx.fillText("5", 950, 150);
            ctx.beginPath();
            ctx.arc(950, 160, 3, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            i++;
        }
        if ((i == 5) && (Math.abs(clickedX - 950) < 15) && (Math.abs(clickedY - 150) < 15))
        {
            ctx.moveTo(750, 40);
            ctx.lineTo(950, 160);
            ctx.stroke();
            ctx.fillText("6", 1225, 55);
            ctx.beginPath();
            ctx.arc(1220, 40, 3, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            i++;
        }
        if ((i == 6) && (Math.abs(clickedX - 1220) < 25) && (Math.abs(clickedY - 55) < 25))
        {
            ctx.moveTo(950, 160);
            ctx.lineTo(1220, 40);
            ctx.stroke();
            ctx.fillText("7", 1230, 575);
            ctx.beginPath();
            ctx.arc(1230, 580, 3, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            i++;
        }
        if ((i == 7) && (Math.abs(clickedX - 1230) < 15) && (Math.abs(clickedY - 580) < 15))
        {
            ctx.moveTo(1230, 40);
            ctx.lineTo(1230, 580);
            ctx.stroke();
            ctx.fillText("8", 950, 510);
            ctx.beginPath();
            ctx.arc(950, 480, 3, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            i++;
        }
        if ((i == 8) && (Math.abs(clickedX - 950) < 25) && (Math.abs(clickedY - 500) < 25))
        {
            ctx.moveTo(950, 480);
            ctx.lineTo(1225, 580);
            ctx.stroke();
            ctx.fillText("9", 750, 625);
            ctx.beginPath();
            ctx.arc(750, 600, 3, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            i++;
        }
        if ((i == 9) && (Math.abs(clickedX - 750) < 25) && (Math.abs(clickedY - 600) < 25))
        {
            ctx.moveTo(750, 600);
            ctx.lineTo(950, 480);
            ctx.stroke();
            ctx.fillText("10", 465, 625);
            ctx.beginPath();
            ctx.arc(495, 600, 3, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            i++;
        }
        if ((i == 10) && (Math.abs(clickedX - 475) < 25) && (Math.abs(clickedY - 595) < 25))
        {
            ctx.moveTo(495, 600);
            ctx.lineTo(750, 600);
            ctx.stroke();
            ctx.fillText("11", 285, 510);
            ctx.beginPath();
            ctx.arc(295, 480, 3, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            i++;
        }
        if ((i == 11) && (Math.abs(clickedX - 285) < 25) && (Math.abs(clickedY - 500) < 25))
        {
            ctx.moveTo(295, 480);
            ctx.lineTo(495, 600);
            ctx.stroke();
            ctx.fillText("12", 0, 625);
            ctx.beginPath();
            ctx.arc(25, 600, 3, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            i++;
        }
        if ((i == 12) && (Math.abs(clickedX) < 35) && (Math.abs(clickedY - 595) < 25))
        {
            ctx.moveTo(25, 40);
            ctx.lineTo(25, 600);
            ctx.moveTo(25, 600);
            ctx.lineTo(295, 480);
            ctx.stroke();
            i++;
        }
        if(i == 13)
        {
            $(".start").css("display", "inline-block");
        }
    });
    ctx.stroke();
};

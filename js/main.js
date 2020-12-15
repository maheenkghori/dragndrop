$(document).ready(function () {

    var time = 120000;
    var UserTimer;


    function addPoint() {
        $('#points').html(parseInt($('#points').html()) + 5)
    }




    function removeBlur() {
        $('.image-done').removeClass("image-done");
    }




    function addDrag() {
        $(".source").draggable('enable');
    }




    function nextLevel() {
        var levels = document.getElementById('level');
        // levels.innerHTML = parseInt(levels.innerHTML) + 1;
        $('#level').html(parseInt($('#level').html()) + 1)
        clearInterval(UserTimer);
        alert('Welcome to the next Level');
        UserTimer = setTimer(parseInt(time) - (parseInt(levels.innerHTML) * 10000));
        removeBlur();
        addDrag();
        rearrangeDestination();
        rearrangeSources();
    }
    



    function levelEnded() {
        if ($('.dest').length + $('.source').length > $('.image-done').length) {
            return false;
        }
        return true;
    }




    $(".source").draggable({
        revert: true
      });



    $(".destDiv").droppable({
        drop: function (event, ui) {
            // event.preventDefault();
            // var data = event.dataTransfer.getData("source");
            console.log($( this )[0].childNodes[0].id);
            console.log(ui.draggable.attr("id"));
            if (ui.draggable.attr("id")[1] == $( this )[0].childNodes[0].id[1]) {
                addPoint();
                clap();
                var image1 = document.getElementById(ui.draggable.attr("id"));
                var image2 = document.getElementById($( this )[0].childNodes[0].id);
                // image1.removeAttribute('ondragstart');
                $("#"+ui.draggable.attr("id")).draggable("disable");
                image1.classList.add("image-done");
                image2.classList.add("image-done");
                if (levelEnded()) {
                    nextLevel();
                }
            }
            else {
                wrong();
            }
        }
    });


    function swapPositions(arr, a, b) {
        [arr[a], arr[b]] = [arr[b], arr[a]]
    }



    function rearrangeSources() {
        var array = document.getElementsByClassName('sourceDiv');

        for (var i = 0; i < 8; i++) {
            swapPositions(array, getRandomInt(5), getRandomInt(5));
        }

        var sources = document.getElementById('source');
        for (var i = 0; i < array.length; i++) {
            sources.appendChild(array[i])
        }


    }




    function rearrangeDestination() {
        var array2 = document.getElementsByClassName('destDiv');

        for (var i = 0; i < 10; i++) {
            swapPositions(array2, getRandomInt(5), getRandomInt(5));
            swapPositions(array2, getRandomInt(5), getRandomInt(5));
        }

        var destination = document.getElementById('destination');
        for (var i = 0; i < array2.length; i++) {
            destination.appendChild(array2[i])
        }
    }



    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }



    function setTimer(time) {
        console.log(time);
        var countDownDate = new Date().getTime();
        countDownDate = countDownDate + time;
        var x = setInterval(function () {

            var now = new Date().getTime();

            var distance = countDownDate - now;

            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("timer").innerHTML = days + "d " + hours + "h "
                + minutes + "m " + seconds + "s ";

            if (distance < 0) {
                clearInterval(x);
                document.getElementById("timer").innerHTML = "EXPIRED";
                gameOver()
            }
        }, 1000);
        return x;
    }



    $( "#reset" ).click(function() {
        removeBlur();
        addDrag();
        rearrangeSources();
        rearrangeDestination();
        $('#level').html(1);
        $('#points').html(0);
        clearInterval(UserTimer);
        UserTimer = setTimer(time);
    });



    function gameOver() {
        reset();
        alert("Game Over, timeout");
        clearInterval(UserTimer);
        UserTimer = setTimer(time);
    }



    function clap() {
       // var snd = new Audio("audio/clap.wav");
        //snd.play();
    }



    function wrong() {
        //var wrong = new Audio("audio/wrong.mp3");
        //wrong.play();

    }

    UserTimer = setTimer(time);

});
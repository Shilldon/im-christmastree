$(window).on('load',function(){
  $('#instructionsModal').modal('show');
});
$(document).ready(function () {  
  outside = true;
  /*Each chest of decorations is dynamically populated on page load*/
  populateIconTable();
  
  /*Ensure that the snowfall gif has been hidden on page load so it can be turned on
  by the snow button*/
  $(".snow").css("background-image", "none");

  /*Ensure the carollers mouths are return to the starting background image position*/
  mouth("REST");

  /*Apply the slider parameters to the slide switch to enable the overlay opacity to be adjusted
  correctly*/
  $(function() {
    $("#slider").slider({
      step: 0.1,
      max:1,
      min:0,
      value:1,
      orientation: "vertical",
      change: function(event, ui) {
      $(".night").css("opacity", 1-ui.value);
    }
  });
});

  $(function () {
    $('.snow').droppable({
      accept: '.draggable-icon, .created-icon',
      drop: function (event, ui) {
      }
     
    });

    /*droppable event added to "snow" div to enable baubles dragged off the tree to be removed*/
    $('.snow').on('drop',  function (event, ui) {
      /*outside variable is set if a bauble is dragged outside of the tree area and reset if
      the bauble is dragged back in. 
      If a bauble is dropped outside of the tree area it is hidden*/
      if (outside) {
         if(ui.helper) {
          setTimeout(function () { ui.helper.css("display", "none");}, 500);
          ui.helper.detach();
        }
      }
    })

    /*initial set up for all icons with draggable icon class*/
    $(".draggable-icon").draggable({
      containment: "window",
      revert: 'invalid',
      helper: 'clone',
    });

    /*created icon class is applied on a bauble being removed from the chest.
    This is required because of the need to clone draggable icons*/
    $(".created-icon").draggable({
      containment: "window",
    })

    /*event triggered by draggable-icon or created-icon being dropped in a droppable area/
    On dropping the icon a clone is created and attached to the droppable area. The ui-helper is removed*/
    $(".droppable").droppable({
      accept: ".draggable-icon, .created-icon",
      drop: function (event, ui) {
        var uiLeft = ui.offset.left;
        var uiTop = ui.offset.top;
        if(ui.helper.hasClass("draggable-icon")) {
          ui.helper.removeClass("draggable-icon");
          ui.helper.addClass("created-icon");
        }
        clone = ui.helper.clone();
        clone.css({ "left": uiLeft, "top": uiTop });
        clone.addClass("dropped");
        clone.css("filter", "")
        $(this).append(clone);
        if (ui) {
          ui.helper.css("display", "none");
        }
      },
      out: function () {
        outside = true;
      },
      over: function () {
        outside = false;
      }
    });

    /*To enable reposition of dropped decorations double clicking highlights the decoration
    with dropshadow and icon is detached from the dropped area*/
    $(document).on("dblclick", ".dropped", function (event) {
      $(".decoration-icon").each(function () {
        $(this).css("filter", "");
      });
      $(this).css("filter", "drop-shadow(2px 0px 0px white) drop-shadow(-2px 0px 0px white) drop-shadow(0px 2px 0px white) drop-shadow(0px -2px 0px white)");
      var uiLeft = $(this)[0].offsetLeft;
      var uiTop = $(this)[0].offsetTop;
      $(this).detach().css({ "left": uiLeft, "top": uiTop }).appendTo("body");
      $(this).removeClass("dropped");
      $(this).focus();
      $(this).draggable();
    });

    /*Switch events to control on off status of buttons and to call associated functions*/
    $(".switch").click(function () {
      //restart switch to reload the page (no on off status)
      if($(this).hasClass("restart-switch")) {
        restart();
      }     
      //all other buttons have on off status
      //status set to off
      else if ($(this).attr("on") == 1) {
        /*NB play switch (that shows the carollers) off status is set during animation
        This is to prevent the play switch being set to off halfway through the animation 
        causing issues on restarting the animation at that point.*/
        if(!$(this).hasClass("play-switch")) { 
          $(this).attr("on", 0);
          //switch to control lighting effects
          if ($(this).hasClass("light-switch")) {
            $(this).find("img").attr("src", "graphics/controls/switch-off.png");
            switchOffLights(); 
          }
          //switch to control snow animation
          else if ($(this).hasClass("snow-switch")) {
            $(".snow").css("background-image", "none");
            $(this).css("filter", "none");
          } 
          //switch to show and hide decorations menu
          else if ($(this).hasClass("ornaments-menu")) {
            hideDecorationsMenu();
          }       
        }  
      }
      else {
        //status set to on and call relevant functions
        $(this).attr("on", 1);
        //switch to control lighting effects
        if ($(this).hasClass("light-switch")) {
          $(this).find("img").attr("src", "graphics/controls/switch-on.png");
          switchOnLights();
        }
         //switch to control snow animation
        else if ($(this).hasClass("snow-switch")) {
          $(".snow").css("background-image", "");
          $(this).css("filter", "drop-shadow(2px 0px 0px white) drop-shadow(-2px 0px 0px white) drop-shadow(0px 2px 0px white) drop-shadow(0px -2px 0px white)");
        }
        //Switch to show the carollers
        else if($(this).hasClass("play-switch")) {
          startCarolling();
        }  
        //switch to show and hide decorations menu   
        else if ($(this).hasClass("ornaments-menu")) {
          showDecorationsMenu();
        }     
        //switch to hide the carollers
        else if($(this).hasClass("cancel-carollers")) {
          hideCarollers();
          $(this).css("display","none");
        }                      
      }
    });
  });

  //Chest control button - to play the open or close animation
  $(".chest-button").click(function () {
    if ($(".chest").attr("chest-open") == 1) {
      $(".chest").addClass("chest-closed");
      $(".chest").removeClass("chest-open");
      restartAnimation($('.chest-closed'));
      $(".chest").attr("chest-open", 0);
    } else {
      $(".chest").removeClass("chest-closed");
      $(".chest").addClass("chest-open");
      restartAnimation($('.chest-open'))
      $(".chest").attr("chest-open", 1);
    }
  })

  /*Each decorations tab click will hide any chest already shown
  and show its associated decorations chest*/
  $(".tab-in").click(function () {
    var chestName = $(this).attr("chest");
    var $chest = $("." + chestName + "-chest");
    /*once a decorations chest has been selected - hide the decorations menu*/
    hideDecorationsMenu();
    /*if the selected decorations chest is already showing then hide it*/
    if ($(this).attr("showing") == 1) {
      $chest.removeClass("show-chest");      
      $chest.addClass("hide-chest");
      $(this).attr("showing", 0);
      $chest.css("transition", "ease-in-out");
      $chest.css("transition-duration", "1s");
      setTimeout(function () {
        $chest.css("transition", "");
        $chest.css("transition-duration", "");
      }, 1000);
    }
    /*otherwise hide any other chests that are showing and show the selected chest*/
    else {
      $(".chest").each(function () {
        if (!$(this).hasClass(chestName + "-chest")) {
          $(this).css("transition", "ease-in-out");
          $(this).css("transition-duration", "1s");
          $(this).removeClass("show-chest");      
          $(this).addClass("hide-chest");
        }
      })

      $chest.addClass("show-chest");      
      $chest.removeClass("hide-chest");
      $(this).attr("showing", 1);
      $chest.css("transition", "ease-in-out");
      $chest.css("transition-duration", "1s");
      setTimeout(function () {
        $chest.css("transition", "");
        $chest.css("transition-duration", "");
      }, 1000);
    }
  })

  /*On a chest being displayed and opened the list of decorations will slide up
  out of the chest. A delay is required before displaying the list of decorations
  to enable time for the chest opening animation to complete*/
  $('[data-delayed-toggle="collapse"]').on('click', function (e) {
    var delay = $(this).data('delay') || 500;
    var $target = $($(this).attr("href"));
    if ($target.hasClass('show')) {
      $target.collapse('hide');
    } else {
      window.setTimeout(function () {
        $target.collapse('show');
      }, delay);
    }
  })

})

/*Function to dynamically populate each of the decorations boxes with the appropriate images*/
function populateIconTable() {
  var decorations = { "baubles": 13, "lights": 16, "stars": 4, "candy-canes": 6, "ornaments": 4, "presents": 10 };
  $.each(decorations, function (key, value) {
    var additionalClass = "";
    var tableContent = "<tbody>";
    for (i = 1; i <= value; i++) {
      var additionalClass = "";
      var gfx = "png";
      switch(key) {
        case "stars": tableDecorationWidth = 1; break;
        case "baubles": tableDecorationWidth = 3; break;
        case "lights": tableDecorationWidth = 3; break;
        case "candy-canes": tableDecorationWidth = 3; break;
        case "ornaments": tableDecorationWidth = 2; break;
        case "presents" : tableDecorationWidth = 2; break;
        default: tableDecorationWidth = 3; break;
      }
      if (i == 1) {
        tableContent = tableContent + "<tr>";
      }
      /*If the decoration item requires an animation add the relevant extra class
      Lights - animation adjusts opacity and applies a drop shadow to simulate flashing
      Stars - animation adjusts a drop shadow to simulate twinkling 
      Most decorations are static png files some are animated gifs - appropriate
      file suffix is applied to ensure correct image is loaded to page*/
      if (key == "lights") {
        additionalClass = "light";
      }
      else if (key == "stars") {
        additionalClass = "star";
        if(i == 4) {
          gfx = "gif";
        }
        else {
          gfx = "png";
        }
      }
      else if ((key == "ornaments") && (i == 1)) {
        gfx = "gif";
        additionalClass = "candle";
      }
      var decorationClass = key.slice(0,-1);
      /*Build the contents of the chest by adding HTML code*/
      tableContent = tableContent + `<td><img class="draggable-icon created-icon ui-widget-content decoration-container decoration ${decorationClass} ${additionalClass}" src='graphics/${key}/${key.slice(0, -1)}-${i}.${gfx}'></td>`;
      if (i % tableDecorationWidth === 0) {
        tableContent = tableContent + "</tr>";
      }
    }
    tableContent = tableContent + "</tbody>"

    $("#" + key + "-collection").html(tableContent);
  })
}

/*Function to animate christmas lights*/
function switchOnLights() {
  var time = 0;
  $(".light").each(function () {
    /*check to see if the light has been dropped on the tree and if so, only then apply the addLight css
    animation.
    A delay is set to each the class being added to each light to ensure that the lights flash in 
    a sequence, otherwise all lights will flash on and off at the same time.
    The check for the dropped class ensure that lights  'in the decoration box' are not flashing.*/
    if ($(this).hasClass("dropped")) {
      time += 150;
      if (time > 1000) {
        time = 0;
      }
      $(this).addClass("addLight");
      $(this).css("animation-delay", time + "ms");
    }
  });

  /*If a star decoration has been added to the tree and has the dropped class apply the 
  css addStarLight animation to simulate twinkling.
  The check for the dropped class ensure that stars 'in the decoration box' are not twinkling.*/
  $(".star").each(function () {
    if ($(this).hasClass("dropped")) {
      $(this).addClass("addStarlight");
    }
  })
}

/*Function to remove opacity and drop shadow css animations from lights and stars.*/
function switchOffLights() {
  $(".star").each(function () {
    var time = 0;
    if ($(this).hasClass("dropped")) {
      $(this).removeClass("addStarlight")
    }
  })
  $(".light").each(function () {
    var time = 0;
    if ($(this).hasClass("dropped")) {
      $(this).removeClass("addLight")
    }
  })
}

var resetHelperImages = {};

function restartAnimation(elem) {
  elem = $(elem);
  for (var i = 0; i < elem.length; i++) {
    var element = elem[i];
    // code part from: http://stackoverflow.com/a/14013171/1520422
    var style = element.currentStyle || window.getComputedStyle(element, false);
    // var bgImg = style.backgroundImage.slice(4, -1).replace(/"/g, '');
    var bgImg = style.backgroundImage.match(/url\(([^\)]+)\)/)[1].replace(/"/g, '');
    // edit: Suggestion from user71738 to handle background-images with additional settings

    var helper = resetHelperImages[bgImg]; // we cache our image instances
    if (!helper) {
      helper = $('<img>')
        .attr('src', bgImg)
        .css({
          position: 'absolute',
          left: '-5000px'
        }) // make it invisible, but still force the browser to render / load it
        .appendTo('body')[0];
      resetHelperImages[bgImg] = helper;
      setTimeout(function () {
        helper.src = bgImg;
      }, 10);
      // the first call does not seem to work immediately (like the rest, when called later)
      // i tried different delays: 0 & 1 don't work. With 10 or 100 it was ok.
      // But maybe it depends on the image download time.
    } else {
      // code part from: http://stackoverflow.com/a/21012986/1520422
      helper.src = bgImg;
    }
  }
  // force repaint - otherwise it has weird artefacts (in chrome at least)
  // code part from: http://stackoverflow.com/a/29946331/1520422
  elem.css("opacity", .99);
  setTimeout(function () {
    elem.css("opacity", 1);
  }, 20);
}

function restart() {
  location.reload();
}

/*function to animate the carollers mouths operated by timed function calls*/
function mouth(letter) {
  var xMouth;
  var yMouth;
  /*The mouth image is a background image containing 12 images of mouth positions. 
  By adjusting the background position by specific amounts will show the relevant mouth
  position associated with the appropriate phonic.*/
  switch(letter) {
    case "A": xMouth = 0; yMouth = 0;
    break;
    case "O": xMouth = 33.33; yMouth = 0;
    break;
    case "L": xMouth = -66.66; yMouth = 0;
    break;    
    case "C": xMouth = -33.33; yMouth = 0;
    break;      
    case "J": xMouth = 0; yMouth = 50;
    break;   
    case "F": xMouth = 33.33; yMouth = 50;
    break;      
    case "E": xMouth = -66.66; yMouth = 50;
    break;        
    case "B": xMouth = -33.33; yMouth = 50;
    break;    
    case "Q": xMouth = 0; yMouth = -50;
    break;
    case "R": xMouth = 33.33; yMouth = -50;
    break;
    case "U": xMouth = -66.66; yMouth = -50;
    break;    
    case "I": xMouth = -33.33; yMouth = -50;
    break;         
 
  }
  /*REST argument ensures the mouth will be hidden before and after animation*/
  if(letter=="REST") {
    $(".mouth").hide();
  }
  else {
    $(".mouth").fadeIn(0);
    $(".mouth").css("background-position",`${xMouth}% ${yMouth}%`);       
  }
}

/*function to animate carollers onto the screen when the play button is pressed*/
function showCaroller(caroller,i) {
  setTimeout(function() {
    caroller.css("opacity","1");
    caroller.addClass("bounce-in");
  }, i*50);
}

/*function to remove carollers from the screen when the reset button is pressed*/
function hideCarollers() {
  $("audio").trigger("stop");
  $(".caroller").removeClass("bounce-in");
  $(".caroller").css("opacity",0);
}

/*function to set up and play the caroller animation*/
function startCarolling() {
  //hide the menus
  $("#menucollapse").collapse('hide');
  hideDecorationsMenu();
  $(".menu-button").fadeOut(500);

  //switch the lights on
  if ($(".light-switch").attr("on")!=1) {
    $(".light-switch").find("img").attr("src", "graphics/controls/switch-on.png");
    switchOnLights();
    $(".light-switch").attr("on",1);
  }  

  //hide any decoration chests that are out
  //close any chests that are showing
  $(".chest").each(function () {
    if ($(this).attr("chest-open") == 1) {
      $(this).addClass("chest-closed");
      $(this).removeClass("chest-open");
      restartAnimation($('.chest-closed'))
      $(this).attr("chest-open", 0);
      var $target = $($(this).find("button").attr("href"));
      if ($target.hasClass('show')) {
        $target.collapse('hide');
      }
    }
  });

  //check if any of the tabs are marked as showing a chest, if so, reset and hide chest
  //with a delay to allow time for the chest to close
  //then add the 'remove carollers' option to the menu
  setTimeout(function() {
    $(".tab-in").each(function() { 
      var chestName = $(this).attr("chest");
      var $chest = $("." + chestName + "-chest");
      if ($(this).attr("showing") == 1) {
        $chest.removeClass("show-chest");      
        $chest.addClass("hide-chest");     
        $(this).attr("showing", 0);
        $chest.css("transition", "ease-in-out");
        $chest.css("transition-duration", "1s");
        setTimeout(function () {
          $chest.css("transition", "");
          $chest.css("transition-duration", "");
        }, 1000);
      }{

      }
    });
    /*show the menu button to enable the carollers to be removed from the scene*/
    $(".cancel-carollers").css("display","inline-block");
  },1000);

  
  /*Ensure all the carollers are hidden from view before starting the animation to show them*/
  var i=0;
  hideCarollers();
  $(".caroller").each(function() {
    i++;
    showCaroller($(this),i);
  });

  /*play the audio then call function to adjust mouth position at relevant timed points during 
  audio*/
  $("audio").trigger("play");
  time = 11800;
  setTimeout(function() { mouth("E")},time); //WE
  time += 500; //12300
  setTimeout(function() { mouth("I")},time); //WISH   
  time +=350; //12750
  setTimeout(function() { mouth("O")},time); //YOU
  time+=350; //13100
  setTimeout(function() { mouth("A")},time); //A   
  time+=200; //13300 
  setTimeout(function() { mouth("E")},time); //MERRY
  time+=400; //13500
  setTimeout(function() { mouth("C")},time); //CHRIST 
  time+=300; //13900
  setTimeout(function() { mouth("A")},time); //MAS 

  time+=400; //14300

  setTimeout(function() { mouth("E")},time); //WE
  time += 500; //14800
  setTimeout(function() { mouth("I")},time); //WISH   
  time +=550; //15350
  setTimeout(function() { mouth("O")},time); //YOU
  time+=350; //15700
  setTimeout(function() { mouth("A")},time); //A   
  time+=200; //15900 
  setTimeout(function() { mouth("E")},time); //MERRY
  time+=400; //16300
  setTimeout(function() { mouth("C")},time); //CHRIST 
  time+=300; //16600
  setTimeout(function() { mouth("A")},time); //MAS   

  time+=400; //17000

  setTimeout(function() { mouth("E")},time); //WE
  time += 500; //17500
  setTimeout(function() { mouth("I")},time); //WISH   
  time +=550; //18050
  setTimeout(function() { mouth("O")},time); //YOU
  time+=350; //18300
  setTimeout(function() { mouth("A")},time); //A   
  time+=200; //18500 
  setTimeout(function() { mouth("E")},time); //MERRY
  time+=400; //18700
  setTimeout(function() { mouth("C")},time); //CHRIST 
  time+=300; //19200
  setTimeout(function() { mouth("A")},time); //MAS        

  time+=500; //20000
  setTimeout(function() { mouth("Q")},time); //AND   
  time+=350; // 20500
  setTimeout(function() { mouth("A")},time); //A
  time+=250; // 20800
  setTimeout(function() { mouth("L")},time); //HA   
  time+=450; // 20800
  setTimeout(function() { mouth("E")},time); //PPY      
  time+=500; //21500
  setTimeout(function() { mouth("A")},time); //NEW     
  time+=450; //22000
  setTimeout(function() { mouth("C")},time); //YEAR   

  time+=950; //23750
  setTimeout(function() { mouth("Q")},time); //GOOD    
  time+=450;
  setTimeout(function() { mouth("O")},time); //Ti 
  time+=600;
  setTimeout(function() { mouth("C")},time); //DINGS 
  time+=350;
  setTimeout(function() { mouth("E")},time); //WE  
  time+=400;
  setTimeout(function() { mouth("C")},time); //BRING  
  time+=600;
  setTimeout(function() { mouth("Q")},time); //TO
  time+=600;
  setTimeout(function() { mouth("O")},time); //YOU 
  time+=500;
  setTimeout(function() { mouth("A")},time); //AND 
  time+=400;
  setTimeout(function() { mouth("O")},time); //YOUR        
  time+=450;
  setTimeout(function() { mouth("J")},time); //KIN

  time+=900; //17100

  setTimeout(function() { mouth("E")},time); //WE
  time += 500; //17500
  setTimeout(function() { mouth("I")},time); //WISH   
  time +=550; //18050
  setTimeout(function() { mouth("O")},time); //YOU
  time+=350; //18300
  setTimeout(function() { mouth("A")},time); //A   
  time+=200; //18500 
  setTimeout(function() { mouth("E")},time); //MERRY
  time+=400; //18700
  setTimeout(function() { mouth("C")},time); //CHRIST 
  time+=300; //19200
  setTimeout(function() { mouth("A")},time); //MAS        

  time+=500; //20000
  setTimeout(function() { mouth("Q")},time); //AND   
  time+=350; // 20500
  setTimeout(function() { mouth("A")},time); //A
  time+=250; // 20800
  setTimeout(function() { mouth("L")},time); //HA   
  time+=450; // 20800
  setTimeout(function() { mouth("E")},time); //PPY      
  time+=500; //21500
  setTimeout(function() { mouth("A")},time); //NEW     
  time+=450; //22000
  setTimeout(function() { mouth("C")},time); //YEAR   
  
  time+=1000;
  setTimeout(function() { mouth("REST")},time); //REST 
  time+=500;      

  /*At end of carol display merry Christmas sign and revert the caroller play switch to off
  so the animation can be played again by pressin gthe button*/
  setTimeout(function() { 
    $(".play-switch").attr("on", 0);
    $(".christmas-sign").fadeIn(0);
    $(".christmas-sign").css("transform","scale(1,1) translate(-50%,-50%)");
  }, time);
  time+=1000;
  setTimeout(function() {
    $(".christmas-text").attr("src","./graphics/backgrounds/christmas-text.gif");
  }, time);

  /*Add snow, light and nighttime effects (if not already on) and play gentle jingle bells*/
  time+=5000;
  setTimeout(function() {
    $("audio").attr("src","./sounds/jinglebells.wav"); 
    $("audio").trigger("play");    
    //make it snow
    if ($(".snow-switch").attr("on")!=1) {
      $(".snow").css("background-image", "");
      $(".snow-switch").css("filter", "drop-shadow(2px 0px 0px white) drop-shadow(-2px 0px 0px white) drop-shadow(0px 2px 0px white) drop-shadow(0px -2px 0px white)");
      $(".snow-switch").attr("on",1);
    }    

    //make it nighttime
    $("#slider").slider({value :0.25});
    $(".night").css("opacity", 0.75);
  }, time);

  time+=8000;
  setTimeout(function() {
    $(".christmas-sign").fadeOut(1000);
    $(".menu-button").fadeIn(500);    
  }, time); 

}

/*On click button to show decorations - function to slide deoration options from top of page*/
function showDecorationsMenu() {
  $(".ornaments-menu").find("img").attr("src","./graphics/controls/ornaments-menu-open.png");
  $(".tab-in").addClass("slide-down");
  /*if any chests with decorations are currently show, animate close and hide the chest*/
  $(".chest").each(function () {
    if ($(this).attr("chest-open") == 1) {
      $(this).addClass("chest-closed");
      $(this).removeClass("chest-open");
      restartAnimation($('.chest-closed'))
      $(this).attr("chest-open", 0);
      var $target = $($(this).find("button").attr("href"));
      if ($target.hasClass('show')) {
        $target.collapse('hide');
      }
    }
  })
}

/*On click of the decorations menu for a second time, slide the decorations menu back up above sreen*/
function hideDecorationsMenu() {
  $(".ornaments-menu").attr("on", 0);
  $(".ornaments-menu").find("img").attr("src","./graphics/controls/ornaments-menu.png");
  $(".tab-in").removeClass("slide-down"); 
}



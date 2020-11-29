
$(window).on('load',function(){
  $('#instructionsModal').modal('show');
});
$(document).ready(function () {  
  outside = true;
  populateIconTable();

  
  $(".snow").css("background-image", "none");
  mouth("REST");
  $("body").on("keydown", function(ev) {
    console.log(String.fromCharCode(ev.which));
    mouth(String.fromCharCode(ev.which));
  })

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

    $('.snow').on('drop',  function (event, ui) {
      if (outside) {
        var newPositionLeft = $("#baubles-collection").position().left - ui.helper.position().left;
        var newPositionTop = $("#baubles-collection").position().top - ui.helper.position().top;
        if(ui.helper) {
          //ui.helper.css("transition-duration", "0.5s");
          //ui.helper.css({ "-webkit-transform": "translate(" + newPositionLeft + "px," + newPositionTop + "px)" });
          setTimeout(function () { ui.helper.css("display", "none");}, 500);
          ui.helper.detach();
        }
      }
    })

    $(".draggable-icon").draggable({
      containment: "window",
      revert: 'invalid',
      helper: 'clone',
    });

    $(".created-icon").draggable({
      containment: "window",
    })

    $(".droppable").droppable({
      accept: ".draggable-icon, .created-icon",
      drop: function (event, ui) {
        var uiLeft = ui.offset.left;
        var uiTop = ui.offset.top;
        var treeLeft = $(this)[0].offsetLeft;
        var treeTop = $(this)[0].offsetTop;
        var moveUiLeft = uiLeft - treeLeft;
        var moveUiTop = uiTop - treeTop;
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

    $(document).on("dblclick", ".dropped", function (event) {
      $(".decoration-icon").each(function () {
        $(this).css("filter", "");
      })
      
      $(this).css("filter", "drop-shadow(2px 0px 0px white) drop-shadow(-2px 0px 0px white) drop-shadow(0px 2px 0px white) drop-shadow(0px -2px 0px white)");
      var uiLeft = $(this)[0].offsetLeft;
      var uiTop = $(this)[0].offsetTop;
      var treeLeft = $(".tree-container")[0].offsetLeft;
      var treeTop = $(".tree-container")[0].offsetTop;
      var moveUiLeft = uiLeft + treeLeft;
      var moveUiTop = uiTop + treeTop;
      //$(this).css("filter", "drop-shadow(0px 0px 25px white)");
      $(this).detach().css({ "left": uiLeft, "top": uiTop }).appendTo("body");
      $(this).removeClass("dropped");
      $(this).focus();
      $(this).draggable();

    })
/*
    $(".draggable-tree").draggable({
      containment: "window",
      drag: function (event, ui) {
      }
    });*/

    $(".switch").click(function () {
    if($(this).hasClass("restart-switch")) {
        restart();
      }      
      else if ($(this).attr("on") == 1) {
        if(!$(this).hasClass("play-switch")) { 
          $(this).attr("on", 0);
          if ($(this).hasClass("light-switch")) {
            $(this).find("img").attr("src", "graphics/controls/switch-off.png");
            switchOffLights(); 
          }
          else if ($(this).hasClass("snow-switch")) {
            $(".snow").css("background-image", "none");
            $(this).css("filter", "none");
          } 
        }  
      }
      else {
        $(this).attr("on", 1);
        if ($(this).hasClass("light-switch")) {
          $(this).find("img").attr("src", "graphics/controls/switch-on.png");
          switchOnLights();
        }
        else if ($(this).hasClass("snow-switch")) {
          $(".snow").css("background-image", "");
          $(this).css("filter", "drop-shadow(2px 0px 0px white) drop-shadow(-2px 0px 0px white) drop-shadow(0px 2px 0px white) drop-shadow(0px -2px 0px white)");
        }
        else if($(this).hasClass("play-switch")) {
          startCarolling();
        }           
      }
    })
  })
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

  $(".tab-container").mouseover(function () {
    $(".tab-in").css("transform", "translate(0px,77px)");
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
  })

  $(".tab-container").mouseout(function () {
    $(".tab-in").css("transform", "translate(0px,-77px)");
  })

  $(".tab-container-bottom").mouseover(function () {
    $(".switch-container").css("transform", "translate(-320px,0)");
  })

  $(".tab-container-bottom").mouseout(function () {
    $(".switch-container").css("transform", "translate(0px,0)");
  })

  $(".tab-in").click(function () {
    var chestName = $(this).attr("chest");
    var $chest = $("." + chestName + "-chest");
    if ($(this).attr("showing") == 1) {
      $chest.css("transform", "translate(-25vw,0)");
      $(this).attr("showing", 0);
      $chest.css("transition", "ease-in-out");
      $chest.css("transition-duration", "1s");
      setTimeout(function () {
        $chest.css("transition", "");
        $chest.css("transition-duration", "");
      }, 1000);
    }
    else {
      $(".chest").each(function () {
        if (!$(this).hasClass(chestName + "-chest")) {
          $(this).css("transition", "ease-in-out");
          $(this).css("transition-duration", "1s");
          $(this).css("transform", "translate(-25vw,0)");
        }
      })
      $chest.css("transform", "translate(25vw,0)");
      $(this).attr("showing", 1);
      $chest.css("transition", "ease-in-out");
      $chest.css("transition-duration", "1s");
      setTimeout(function () {
        $chest.css("transition", "");
        $chest.css("transition-duration", "");
      }, 1000);
    }
  })

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

function populateIconTable() {
  var decorations = { "baubles": 13, "lights": 16, "stars": 4, "candy-canes": 6, "ornaments": 4, "presents": 10 };
  $.each(decorations, function (key, value) {
    var additionalClass = "";
    var tableContent = "<tbody>";
    for (i = 1; i <= value; i++) {
      var additionalClass = "";
      var gfx = "png";
      if (i == 1) {
        tableContent = tableContent + "<tr>";
      }
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
      tableContent = tableContent + `<td><img class="draggable-icon created-icon ui-widget-content decoration-container decoration ${additionalClass}" src='graphics/${key}/${key.slice(0, -1)}-${i}.${gfx}'></td>`;
      if (i % 5 === 0) {
        tableContent = tableContent + "</tr>";
      }
    }
    tableContent = tableContent + "</tbody>"

    $("#" + key + "-collection").html(tableContent);
  })
}

function switchOnLights() {
  var time = 0;
  $(".light").each(function () {
    if ($(this).hasClass("dropped")) {
      time += 150;
      if (time > 1000) {
        time = 0;
      }
      $(this).addClass("addLight");
      $(this).css("animation-delay", time + "ms");
    }
  });

  $(".star").each(function () {
    if ($(this).hasClass("dropped")) {
      $(this).addClass("addStarlight");
    }
  })
}

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

function setupDecorations(id) {
  var treeInfo = localStorage.getItem("treePosition-"+id);
  var treePosition = JSON.parse(treeInfo);
  if(treeInfo!=null) {
  $(".draggable-tree").css({"position":"absolute", "top":treePosition.top, "left":treePosition.left});
  var setupDecorations = localStorage.getItem("decorations-"+id);
  var decorationsInfo = JSON.parse(setupDecorations);  
  for(i=0;i<=decorationsInfo.length-1;i++) {
    decoration=$('<img />', { 
      src:decorationsInfo[i]["source"]
    }).appendTo($("body"))
    decoration.addClass("created-icon decoration decoration-container dropped")
    if(decorationsInfo[i]["star"]==true) {
      decoration.addClass("star");      
    }
    if(decorationsInfo[i]["light"]==true) {
      decoration.addClass("light");      
    }    
    if(decorationsInfo[i]["candle"]==true) {
      decoration.addClass("candle");      
    }        
    decoration.css("position","absolute")
    decoration.detach().css({ "left": decorationsInfo[i]["position-x"], "top": decorationsInfo[i]["position-y"] }).appendTo(".tree-container");
  }
}
}

function restart() {
  location.reload();
}

function mouth(letter) {
  var xMouth;
  var yMouth;
  /*
  switch(letter) {
    case "A": xMouth = 0; yMouth = 0;
    break;
    case "O": xMouth = -9.076; yMouth = 0;
    break;
    case "L": xMouth = -18.152; yMouth = 0;
    break;    
    case "C": xMouth = 9.076; yMouth = 0;
    break;      
    case "J": xMouth = 0; yMouth = -6.23;
    break;   
    case "F": xMouth = -9.076; yMouth = -6.23;
    break;      
    case "E": xMouth = -18.152; yMouth = -6.23;
    break;        
    case "B": xMouth = 9.076; yMouth = -6.23;
    break;    
    case "Q": xMouth = 0; yMouth = 6.23;
    break;
    case "R": xMouth = -9.076; yMouth = 6.23;
    break;
    case "U": xMouth = -18.152; yMouth = 6.23;
    break;    
    case "I": xMouth = -9.076; yMouth = 6.23;
    break;         
 
  }
  if(letter=="REST") {
    console.log(letter)
    $(".mouth").hide();
  }
  else {
    $(".mouth").fadeIn(0);
    $(".mouth").css("background-position",`${xMouth}vh ${yMouth}vh`);       
    console.log(letter)
  }
*/
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
  if(letter=="REST") {
    console.log(letter)
    $(".mouth").hide();
  }
  else {
    $(".mouth").fadeIn(0);
    $(".mouth").css("background-position",`${xMouth}% ${yMouth}%`);       
    console.log(letter)
  }
}

function showCaroller(caroller,i) {
  
  setTimeout(function() {
    caroller.css("opacity","1");
    caroller.addClass("bounce-in");
  }, i*50);
}

function hideCarollers() {
  $("audio").trigger("stop");
  $(".caroller").removeClass("bounce-in");
  $(".caroller").css("opacity",0);
}

function startCarolling() {

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
})

//check if any of the tabs are marked as showing a chest, if so, reset and hide chest
//with a delay to allow time for the chest to close
setTimeout(function() {
  $(".tab-in").each(function() { 
    var chestName = $(this).attr("chest");
    var $chest = $("." + chestName + "-chest");
    if ($(this).attr("showing") == 1) {
      $chest.css("transform", "translate(-25vw,0)");
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
},1000)




  
  var i=0;
  hideCarollers();
  $(".caroller").each(function() {
    i++;
    showCaroller($(this),i);
  })

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
  time+=400;
  setTimeout(function() { mouth("O")},time); //Ti 
  time+=650;
  setTimeout(function() { mouth("C")},time); //DINGS 
  time+=350;
  setTimeout(function() { mouth("E")},time); //WE  
  time+=400;
  setTimeout(function() { mouth("C")},time); //BRING  
  time+=600;
  setTimeout(function() { mouth("Q")},time); //TO
  time+=500;
  setTimeout(function() { mouth("O")},time); //YOU 
  time+=550;
  setTimeout(function() { mouth("A")},time); //AND 
  time+=400;
  setTimeout(function() { mouth("O")},time); //YOUR        
  time+=350;
  setTimeout(function() { mouth("J")},time); //KIN

  time+=1000; //17100

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
  setTimeout(function() { 
    $(".play-switch").attr("on", 0);
    $(".christmas-sign").fadeIn(0);
    $(".christmas-sign").css("transform","scale(1,1) translate(-50%,-50%)");
  }, time);
  time+=1000;
  setTimeout(function() {
    $(".christmas-text").attr("src","./graphics/backgrounds/christmas-text.gif");
  }, time);

  time+=5000;
  setTimeout(function() {
    $(".christmas-sign").css("transform","scale(.25,.25) translate(-400%,-300%)");
  }, time); 

  time+=1000;
  setTimeout(function() {
    $("audio").attr("src","./sounds/jinglebells.wav"); 
    $("audio").trigger("play");    
    //make it snow
    if ($(".snow-switch").attr("on")!=1) {
      $(".snow").css("background-image", "");
      $(this).css("filter", "drop-shadow(0px 0px 20px #ffffff)");
      $(".snow-switch").attr("on",1);
    }    

    //make it nighttime
    $("#slider").slider({value :0.25});
    $(".night").css("opacity", 0.75);
  }, time);



}



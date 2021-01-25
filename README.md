# CV

## Overview

### Brief
This frontend webpage was created for a competition to create 'something Christmassy'. No parameters were set for the design and it was up to participants to design anything (Which included physical objects, drawings and was not exlusively related to coding)

The objectives are to:<br>
1 - provide an engaging and entertaining experience for the user;<br>
2 - promote a clear Christmas theme;<br>
3 - be fun to use;<br>
4 - encourage participation by making the experience customisable;<br>
5 - be easy to use.<br>

### User Stories
As well as accommodating the objectives above consideration was been given to the needs of prospective users of the website:

#### Site Users
- I would like to:
    - quickly understand how to use the website<br>
    - understand what I need to do on the website<br>
    - create my own theme from the website<br>
    - easily find the tools to engage with the website<br>

### Purpose
This website is designed as a front-end only website to achieve the above, while meeting the objectives of the competition, namely to be Christmassy. The site contains 1 page with a menu button in the top right that brings up further options. An instructions modal appears when a user loads the site which can be dismissed and reshown by selecting the appropriate menu item. <br>

### Style
A simple Christmas theme has been adopted of decorating a Christmas tree. To avoid detracting from the experience a plain snowy background was chosen so the user can focus on the main objective of interacting with the decorations for the tree.<br>
Christmas colours; reds and greens are prevalent through the page to promote the festive experience.<br> 

### How does it work?
The site is styled using downloaded bundled **Bootstrap** as it was possible that the site might require access by the judges offline.<br>
The base page in **HTML5** with **jQuery** scripting to control the menus, button animations and drag and drop features of the tree and baubles.<br>
The main menu options are set out below a collapsible menu icon (shown as a star and holly to keep with the Christmas theme) in the top right of the page.<br>
Clicking the menu icon brings up the following options:<br>
1 - Access decorations menu<br>
2 - Switch on or off lighting effects<br>
3 - Switch on or off snow effect<br>
4 - Change background brightness<br>
5 - Animate carollers<br>
6 - Clear tree and reset page<br>
7 - Show instructions<br>

#### Main Menu
1 - Access decorations menu<br>
Selecting this option displays a menu across the top of the page enabling the user to access different types of decorations for the tree. When selected the decorations appear in the bottom left by an animated chest sliding on screen.<br>
2 - Lighting effects<br>
If the user has added lights or a star to the tree selecting this option applies an animated drop shadow effect to the star and/or a drop shadow and opacity effect to the lights on the tree. This gives the appearance that the star is twinkling and the lights flashing.<br>
3 - Snow effect<br>
By selecting this option a transparent gif of snow falling superimposed over the image is shown or hidden.<br>
4 - Background brightness<br>
Adjusting this slider increases or decreases the opacity of a superimposed black layer to simulate different stages of the day.<br>
5 - Carollers<br>
To instill an element of fun, by selecting this option cartoon versions of the members of the site designer's team are animated on the page to the tune of "We wish you a merry Christmas".<br>
6 - Reset<br>
Reloads the page.<br>
7 - Instructions<br>
Displays the main instructions modal.<br>

#### Decorating the tree
Decoration icons can be dragged from the chest in the bottom right of the screen and dropped on to the area occupied by the tree image.<br>
Once dropped into the tree area the decorations will remain static unless double clicked, enabling them to be repositioned or dragged off the tree altogether.<br>
Drag and drop functionality was achieved using the **droppable API** and the relevant classes for the API applied to the draggable items on the page.<br>
Modification to the **droppable API** code was required in order to clone Christmas baubles from the chest to the tree and to enable decorations to remain in a fixed position once dropped and to be selected by double click and moved again.<br>

## Features

### Existing 
- Clear Christmas theme;
- Responsive page design for different screen sizes;
- Drag and droppable icons;
- Animated menus;
- Clear instructions modal.

## Technical Information
- Languages used:
    - HTML5
    - SCSS
    - jQuery
    - Javascript

## Testing
Code was written through VSCode Studio.
The website has been tested on IE, Google Chrome, Safari and Opera browsers.

## Deployment
A repository was created through the GitHub console under folder im-christmastree.<br>
The project, developed through VSCode was then commited to the GitHub repository using standard terminal commit and push commands.<br>
The code was developed on a local machine with local version control. The final project was comitted to the GitHub repository.<br>
The project was then deployed to GitHub pages through the GitHub online console using the following steps:<br>
- Through the console settings tab the master branch was set to the default branch<br>
- The master branch was then selected as the source for GitHub pages and the settings saved<br>

To edit/run the code locally it is necessary to pull the code from the GitHub repository. This can be achieved through the GitHub console using the following steps: 
- Navigate to the main page of the repository
- Click 'clone/download' under the repository name
- To clone with HTTPS click the copy icon to copy the URL for the repository
- Locally open Git Bash and navigate the working directory to the location where the repository should be cloned
- Use the git clone command and paste the cloned URL.
<br>
- Alternatively, directly through Git Bash type the command:<br>
      $git clone https://github.com/Shilldon/im-christmastree.git

There are no differences between the development and deployed versions.<br>
Other than a standard browser no further software or implementation is required and a link is provided on GitHub Pages.<br>

## Credits

### Code
Droppable API - JS Foundation - https://jqueryui.com/droppable/ 

### Media
#### Images
All images licensed for personal use/Creative Commons licence.
Snow Background - Clipart Library - 1001christianclipart.com
Christmas tree - Image by <a href="https://pixabay.com/users/clker-free-vector-images-3736/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=296830">Clker-Free-Vector-Images</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=296830">Pixabay</a>
Menu buttons - https://www.vectorstock.com/royalty-free-vector/christmas-web-buttons-set-winter-web-buttons-vector-12002804
Merry CHristmas Sign - https://www.kindpng.com/imgv/hJJhxJi_christmas-stickers-with-labels-clipart-png-download-santa/
Baubles - https://www.vectorstock.com/royalty-free-vector/christmas-ball-bauble-flat-design-icons-vector-4783161
Carollers - http://cliparts.co/clipart/2722415
Chest - https://gifer.com/en/Lceh
Scroll - https://www.clipartmax.com/middle/m2H7i8G6d3b1d3d3_there-is-a-long-sheet-of-paper-scroll-icon/
Star and holly - https://www.subpng.com/png-mglcau/
PLay button - https://pixabay.com/vectors/play-icon-free-wallpaper-vector-1173551/
Restart button - https://www.cleanpng.com/png-arrow-animated-film-clip-art-4156870/
Snowflake - http://clipart-library.com/clipart/snowflake-cliparts_7.htm
Switch - https://www.gograph.com/clipart/rocker-switch-gg56235411.html
Star - http://clipart-library.com/xmas-star-cliparts.html

### Framework
Bootstrap v3.3.7 - https://getbootstrap.com/<br>

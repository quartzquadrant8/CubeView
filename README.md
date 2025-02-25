Ensure NPM is installed locally with virtual environment for build
Run npm init -y 
Select appropriate CDN for three.js or install local npm three module (remmeber import as THREE
Utilize Webpack, cli and dev for serving to bundle
The Public and Source Directory builds should be fetched here, but ensure a package-lock.json and package.json file exists as well. 
If three.js does NOT render, confirm that ./lib/three.min.js is included as a script src tag for the index.html file and a local "lib" folder directory is included to continue the project
<meta name ="viewport" declaration absolutely  essential or three.js will NOT render. 

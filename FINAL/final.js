var volume = new KVS.LobsterData();
var screen = new KVS.THREEScreen();
screen.init( volume, {
  width: window.innerWidth * 0.75,
  height: window.innerHeight * 0.75,
  targetDom: document.getElementById("display"),
  enableAutoResize: false
});
var isovalue = 125;
var shader = 'Lamber';
var color = 120;
var colormap = [1.0,1.0,0.5];
var counter=0;
var slider = document.getElementById("isovalue");
var apply = document.getElementById("isovalue");
var text = document.getElementById("textoutput");
var color_text = document.getElementById("textcolor");
var color_slider = document.getElementById("colorsize");

var surfaces = Isosurfaces( volume, isovalue, screen, shader, color, colormap);
var bounds = Bounds( volume );


function OnButtonClick(){
  isovalue = slider.value;
  screen.scene.remove(surfaces);
  surfaces = Isosurfaces(volume, isovalue,screen,shader, color, colormap);
  screen.scene.add( surfaces );
}

function OnLamberClick(){
  shader = 'Lamber';
  screen.scene.remove(surfaces);
  surfaces = Isosurfaces(volume, isovalue,screen,shader, color, colormap);
  screen.scene.add( surfaces );
}

function OnPhongClick(){
  shader = 'Phong';
  screen.scene.remove(surfaces);
  surfaces = Isosurfaces(volume, isovalue,screen,shader, color, colormap);
  screen.scene.add( surfaces );
}

function OnBlinnPhongClick(){
  shader = 'BlinnPhong';
  screen.scene.remove(surfaces);
  surfaces = Isosurfaces(volume, isovalue,screen,shader, color, colormap);
  screen.scene.add( surfaces );
}


function OnRainbowClick(){
  color = color_slider.value;
  colormap = [1.0,1.0,0.5]
  screen.scene.remove(surfaces);
  surfaces = Isosurfaces(volume, isovalue,screen,shader, color, colormap);
  screen.scene.add( surfaces );
}
function OnRedClick(){
  color = color_slider.value;
  colormap = [0.0,0.0,0.0]
  screen.scene.remove(surfaces);
  surfaces = Isosurfaces(volume, isovalue,screen,shader, color, colormap);
  screen.scene.add( surfaces );
}
function OnBoundsClick(){
  counter++;
  if(counter%2==0){
    bounds = Bounds( volume );
    screen.scene.add( bounds );
  }else{
    screen.scene.remove(bounds);
  }
  console.log(counter);
}

function main()
{

  screen.scene.add( surfaces );

  screen.scene.add( bounds );

  slider.addEventListener("input", function() {
    text.innerHTML= 'isovalue:'+slider.value;
  }, false);

  color_slider.addEventListener("input", function() {
    color_text.innerHTML= 'color:'+color_slider.value;
  }, false);

  document.addEventListener( 'mousemove', function() {
      screen.light.position.copy( screen.camera.position );
  });

  window.addEventListener( 'resize', function() {
      screen.resize( [ window.innerWidth*0.8 ,window.innerHeight ] );
  });


  screen.loop();
}

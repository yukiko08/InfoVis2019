function main()
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();
    var isovalue = 125;

    screen.init( volume, {
        width: window.innerWidth * 0.8,
        height: window.innerHeight,
        targetDom: document.getElementById("display"),
        enableAutoResize: false
    });

    var bounds = Bounds( volume );
    screen.scene.add( bounds );


    var elem = document.getElementById('isovalue');
      var target = document.getElementById('textoutput');
      var rangeValue = function (elem, target) {
        return function(evt){
          target.innerHTML = elem.value;
        }
      }

    elem.addEventListener('input', rangeValue(elem, target));


    isovalue = elem.value * 125;
    var surfaces = Isosurfaces( volume, isovalue );
    screen.scene.add( surfaces );

    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth*0.8 ,window.innerHeight ] );
    });


    screen.loop();
}

function main()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );


    var renderer = new THREE.WebGLRenderer({
      antialias: true,
      depth: true
    });
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var geometry = new THREE.ConeBufferGeometry( 0.5, 1, 10 );
    var material = new THREE.MeshLambertMaterial( {
      color: 0xff6699
    } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    var light = new THREE.PointLight(0xffffff,2);
    light.position.set(2,2,3);
    scene.add(light);


    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        cube.rotation.x += 0.05;
        cube.rotation.y += 0.05;
        cube.rotation.z += 0.05;
        renderer.render( scene, camera );
    }
}

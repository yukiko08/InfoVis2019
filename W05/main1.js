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
    camera.position.set( 0, 0, 10 );
    scene.add( camera );


    var renderer = new THREE.WebGLRenderer({
      antialias: true,
      depth: true
    });
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );
//Geometry
    //triangle
    var vertices = [
      [-1,1,0],
      [-1,-1,0],
      [1,-1,0],
      [1,1,0],
      [-1,1,-2],
      [-1,-1,-2],
      [1,-1,-2],
      [1,1,-2]

    ];
    var faces  = [
      [0,1,2],
      [0,2,3],
      [4,6,5],
      [4,7,6],
      [0,4,5],
      [0,5,1],
      [3,6,7],
      [3,2,6],
      [4,0,3],
      [4,3,7],
      [5,2,1],
      [5,6,2]
    ];


    var geometry = new THREE.Geometry();
    for(i=0;i<vertices.length;i++){
      geometry.vertices.push(new THREE.Vector3().fromArray(vertices[i]));
    }

    for(i=0;i<faces.length;i++){
      var id = faces[i];
      geometry.faces.push( new THREE.Face3(id[0],id[1],id[2]) ); //三角形 verticesの０、１、２を使うよ
    }

    var material = new THREE.MeshBasicMaterial();
    material.vertexColors = THREE.FaceColors;
    for(i=0;i<faces.length;i++){
      geometry.faces[i].color = new THREE.Color( 1, 0, 0 );
    }
    geometry.computeFaceNormals();
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    //
    var light = new THREE.PointLight(0xffffff,2);
    light.position.set(2,2,3);
    scene.add(light);


    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render( scene, camera );
    }
}

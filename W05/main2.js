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

    var material = new THREE.MeshLambertMaterial();
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

    document.addEventListener('mousedown',mousedown_event);
    function mousedown_event(event)
    {
      //マウス位置
      var x_win = event.clientX;
      var y_win = event.clientY;
      //windows
      var vx = renderer.domElement.offsetLeft;
      var vy = renderer.domElement.offsetTop;
      var vw = renderer.domElement.width;
      var vh = renderer.domElement.height;
      var x_NDC = 2 * ( x_win - vx ) / vw - 1;//-1~1に正規化
      var y_NDC = -( 2 * ( y_win - vy ) / vh - 1 );
      var p_NDC = new THREE.Vector3( x_NDC, y_NDC, 1 );
      var p_wld = p_NDC.unproject( camera );  //2d

      var origin = camera.position;
      var direction = p_NDC.sub(origin).normalize();

      var raycaster = new THREE.Raycaster( origin, direction ); //クリックを調べる
      var intersects = raycaster.intersectObject(cube);//光線とぶつかったブジェクト
      if ( intersects.length > 0 )
      {
      intersects[0].face.color.setRGB( 2, 1, 0 );
      intersects[0].object.geometry.colorsNeedUpdate = true;
      }
    }

    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        cube.rotation.x += 0.03;
        cube.rotation.y += 0.01;
        renderer.render( scene, camera );
    }


}

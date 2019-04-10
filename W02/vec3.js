//Constructor
Vec3 = function(x,y,z)
{
	this.x = x;
	this.y = y;
	this.z = z;
}
//内積
function nai(a,b)
{
	var len = a.x*b.x+a.y*b.y+a.z*b.z;
	return len;
}
//Add method
Vec3.prototype.add = function( v )
{
	this.x += v.x;
	this.y += v.y;
	this.z += v.z;
	return this;
}
//Sum method
Vec3.prototype.sum = function()
{
	return this.x + this.y + this.z;
}
//minimum
Vec3.prototype.min = function()
{
	var min;
	min = this.x;
	if(min>this.y){
		min = this.y
	}
	if(min>this.z){
		min = this.z
	}
	return min;
}
//midium
Vec3.prototype.mid = function()
{
	var mid;
	var min = this.min();
	var max = this.max();
	var sum = this.sum();
	mid = sum - min - max;
	return mid;

}
//maximum
Vec3.prototype.max = function()
{
	var max;
	max = this.x;
	if(this.y>max){
		max = this.y;
	}
	if(this.z>max){
		max = this.z;
	}
	return max;

}
//底辺
function bot(a,b)
{

	var x = a.x-b.x;
	var y = a.y-b.y;
	var z = a.z-b.z;

	var t = new Vec3(x,y,z);

	return t;

}
//長さ
function gaiseki(a,b)
{
	var x = a.y*b.z-a.z*b.y;
	var y = a.z*b.x-a.x*b.z;
	var z = a.x*b.y-a.y*b.x;
	var t = new Vec3(x,y,z);

	var x1 = Math.pow(t.x,2);
	var y1 = Math.pow(t.y,2);
	var z1 = Math.pow(t.z,2);

	var nagasa = new Vec3(x1,y1,z1)
	var sum = nagasa.sum();
	var len = Math.sqrt(sum);
	return len;
}

//
function AreaOfTriangle(a,b,c)
{
	var i = bot(a,b);
	var j = bot(a,c);


	var menseki = gaiseki(i,j);
	return menseki/2;
}

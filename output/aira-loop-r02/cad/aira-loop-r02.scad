// AIRA Loop R02 | mm | Parametric feasibility concept, NOT production release.
// Open in OpenSCAD. F5 preview; F6 render; export STL for selected part.
// This source has NOT been compiled in the authoring environment.
// Do not treat the planning electronics as supplier-verified component models.
$fn=72;
part="assembly"; // [assembly,lower,upper,window]
explode=0; // [0:20]
W=27; L=48; H=13; R=6; wall=1.4; floor=1.2; lid=1.2;

module rr(w,l,r,h) {
 linear_extrude(height=h) offset(r=r) square([w-2*r,l-2*r],center=true);
}
module optical_opening(h=4) { rr(8,12,2,h); }
module strap_lug(s) {
 translate([0,s*25,4]) difference(){
  rr(25,6,1,3);
  translate([0,0,-1]) rr(22.4,2.5,.6,5);
 }
}
module lower(){
 difference(){
  union(){ rr(W,L,R,H-lid); strap_lug(-1); strap_lug(1); }
  translate([0,0,floor]) rr(W-2*wall,L-2*wall,R-wall,H);
  translate([0,0,-1]) optical_opening();
  translate([0,0,.4]) rr(10.4,14.4,2.7,H); // Optical insert recess, 0.2 radial clearance
  // Two charging pin bores. Add suppliers' seals and contact shoulders later.
  for(x=[-3,3]) translate([x,-18,-1]) cylinder(d=1.7,h=4);
 }
}
module upper(){
 difference(){
  union(){
   rr(W,L,R,lid);
   // Alignment lip: 0.20 mm nominal radial clearance to lower cavity.
   translate([0,0,-1]) difference(){
    rr(W-2*wall-.4,L-2*wall-.4,R-wall-.2,1.05);
    translate([0,0,-.1]) rr(W-2*wall-1.6,L-2*wall-1.6,R-wall-.8,1.3);
   }
  }
  for(y=[15]) translate([0,y,-2]) cylinder(d=1,h=5);
  translate([-7,0,-2]) rr(1,8,.4,5); // light-pipe opening
  translate([8,0,-2]) rr(2.7,9.2,.7,5); // slider access opening
 }
}
module window(){ rr(10,14,2.5,.8); }
module electronics(){
 color("seagreen") translate([0,0,3.4+explode*2]) rr(23,42,4,.8);
 color("silver") translate([0,-1,6.8+explode*3]) rr(18,28,1.4,4);
 color("black") translate([0,0,1.3+explode]) rr(10,14,2,1.8);
}
if(part=="lower") lower();
if(part=="upper") translate([0,0,1]) upper();
if(part=="window") window();
if(part=="assembly") {
 color([.26,.35,.30,.7]) lower();
 color([.77,.70,.57,.9]) translate([0,0,H-lid+explode*5]) upper();
 color([.10,.18,.18,.7]) translate([0,0,.4]) window();
 electronics();
}

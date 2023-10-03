import * as THREE from 'three';
import "/src/index.css"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import gsap from 'gsap';

const scene =new THREE.Scene();

const geometry= new THREE.SphereGeometry(3,64,64);

const material= new THREE.MeshStandardMaterial({
  color:"#00ff83",
  roughness:0.5,
})
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

const sizes={
  width:window.innerWidth,
  height:window.innerHeight,
}
const light= new THREE.PointLight(0Xffffff,90,100)
light.position.set(0,10,10)

scene.add(light)


// camera

const camera= new THREE.PerspectiveCamera(45,sizes.width/sizes.height)
camera.position.z=15
scene.add(camera)




const canvas= document.querySelector(".webgl");
const renderer= new THREE.WebGLRenderer({canvas});

renderer.setSize(sizes.width,sizes.height)
renderer.render(scene,camera);
renderer.setPixelRatio(2)

window.addEventListener('resize',()=>{
  //console.log(window.innerWidth)
  sizes.width=window.innerWidth
  sizes.height=innerHeight
  camera.updateProjectionMatrix()
  camera.aspect=sizes.width/sizes.height
  renderer.setSize(sizes.width,sizes.height)
})


const controls= new OrbitControls(camera,canvas)
controls.enableDamping=true
controls.enablePan=false
controls.enableZoom=false
//controls.removeEventListener=true


const loop=() =>{
  controls.update()
  renderer.render(scene,camera);
  window.requestAnimationFrame(loop)

}
loop()

const tl= gsap.timeline({defaults:{duration:1}})
  tl.fromTo(mesh.scale,{z:0,x:0,y:0},{z:1,x:1,y:1})
  tl.fromTo('nav',{y:'-100%'},{y:'0%'})
  tl.fromTo(".title",{opacity:0},{opacity:0.8})


  let mouseDown=false
  let rgb=[];

  window.addEventListener("mousedown",()=>(mouseDown=true))
  window.addEventListener("mouseup",()=>(mouseUp=false))


  window.addEventListener('mousemove',(e)=>{
    if(mouseDown){
      rgb=[
        Math.round((e.pageX/sizes.width)*255),
        Math.round((e.pageY/sizes.height)*255),
        150,
      ]
      let newcolor= new THREE.Color(`rgb(${rgb.join(",")})`)
      
      gsap.to(mesh.material.color,{r:newcolor.r, g:newcolor.g,b:newcolor.b})

    }

  })
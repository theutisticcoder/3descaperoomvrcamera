const room = "3d-escape-room-v1"
const assets = [
	"deep_rock_galactic_pickaxe.glb",
	"dirt.jpg",
	"grass.jpg",
	"icetext.jpg",
	"fence.png",
	"sky2.jpg",
	"aquarium.jpg",
	"mu_jetpack.glb",
	"obsidian.jpg",
  "index.html",
	"lava.jpg",
	"1.html",
	"2.html",
	"3.html",
	"4.html", 
	"5.html",
	"6.html",
	"author.html",
	"Boom.mp3",
	"choose.jpg",
	"Dirt.jpg", 
	"elements.jpeg",
	"explosion.png",
	"extensions.html",
	"Goomba.png",
	"Grass1.png",
	"Heart.png", 
	"hydrangea.jpg",
	"Ice.png",
	"ice.png",
	"elements.png",
	"Jetpack.png",
	"Level1.png",
	"Level2.png",
	"Level3.png",
	"Level4.png",
	"manefest.json",
	"metal.png",
	"ocean.jpeg",
	"pickaxe.glb",
	"Pickaxe.png",
	"Sky.jpg",
	"Snowflake.jpeg",
	"soldier.glb",
	"Valentines.html",
	"Winter.html",
];
self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(room).then(cache => {
      cache.addAll(assets)
    })
  )
})
self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})
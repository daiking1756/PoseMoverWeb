playParticlesAnimation(false);

function playParticlesAnimation(isDetect){
    var speed = (isDetect) ? 2.0 : 0.5;
    var sizeVariations = (isDetect) ? 80 : 20;
    var color = (isDetect) ? ['#ffbbdd', '#404B69', '#cccccc'] : ['#00bbdd', '#404B69', '#cccccc']

    Particles.init({
        selector: '.background',
        sizeVariations: sizeVariations,
        speed: speed,
        color: color,
        minDistance: 120,
        connectParticles: true
    });
}

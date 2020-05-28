import * as d3 from "d3";
export default function Particles(data, target, width, height) {
  const pALib = {};

  let particles = data.users.map((u) => {
    u.x = Math.random() * width;
    u.y = Math.random() * height;
    u.vx = 0;
    u.vy = 0;
    return u;
  });

  const radius = 5;
  const distanceFactor = data.distanceFactor;
  const maxDistance = 60;
  const minDistance = 40;
  const minDistance2 = minDistance * minDistance;
  let maxDistance2 =
    (maxDistance * maxDistance * (distanceFactor || 150)) / particles.length;
  const canvas = d3
    .select(target)
    .append("canvas")
    .attr("width", width)
    .attr("height", height);

  const context = canvas.node().getContext("2d");

  pALib.addUsers = (users) => {
    users.forEach((u) => {
      if (!particles.map((p) => p.id).includes(u.id))
        particles.push({
          ...u,
          x: Math.random() * width,
          y: Math.random() * height,
          vx: 0,
          vy: 0,
        });
    });

    maxDistance2 =
      (maxDistance * maxDistance * (distanceFactor || 150)) / particles.length;
  };

  pALib.removeUser = (userId) => {
    console.log("me piden sacar del grafo al usuario", {
      userId: userId,
      particles: particles,
    });
    particles = particles.filter((p) => p.id != userId);
    maxDistance2 =
      (maxDistance * maxDistance * (distanceFactor || 150)) / particles.length;
  };

  setInterval(() => {
    context.save();
    context.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; ++i) {
      const p = particles[i];
      p.x += p.vx;
      if (p.x < -maxDistance) p.x += width + maxDistance * 2;
      else if (p.x > width + maxDistance) p.x -= width + maxDistance * 2;
      p.y += p.vy;
      if (p.y < -maxDistance) p.y += height + maxDistance * 2;
      else if (p.y > height + maxDistance) p.y -= height + maxDistance * 2;
      p.vx += 0.5 * (Math.random() - 0.5) - 0.01 * p.vx;
      p.vy += 0.5 * (Math.random() - 0.5) - 0.01 * p.vy;

      // if (p.x >= width || p.x <= 0) p.vx = -p.vx;
      // if (p.y >= height || p.y <= 0) p.vy = -p.vy;
      context.beginPath();
      context.arc(p.x, p.y, radius, 0, 2 * Math.PI);
      context.fillStyle = "rgba(255,255,255,0.3)";
      context.fillText(p.name, p.x + 5, p.y + 10);
      context.fill();
    }

    for (let i = 0; i < particles.length; ++i) {
      for (let j = i + 1; j < particles.length; ++j) {
        const pi = particles[i];
        const pj = particles[j];
        const dx = pi.x - pj.x;
        const dy = pi.y - pj.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < maxDistance2) {
          context.globalAlpha =
            d2 > minDistance2
              ? (maxDistance2 - d2) / (maxDistance2 - minDistance2)
              : 1;
          context.beginPath();
          context.moveTo(pi.x, pi.y);
          context.lineTo(pj.x, pj.y);
          context.strokeStyle = "rgba(255,255,255,0.1)";
          context.stroke();
        }
      }
    }

    context.restore();
  }, 60);

  return pALib;
}

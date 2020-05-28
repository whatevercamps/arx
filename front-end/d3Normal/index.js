/* global d3 */

export function particles(users, target, width, height) {
  const pa = {};
  const radius = 5;
  const n = users.length;
  const maxDistance = Math.max(40, 4000 / users.length);
  const minDistance = 40;
  const minDistance2 = minDistance * minDistance;
  const maxDistance2 = maxDistance * maxDistance;

  const canvas = d3
    .select(target)
    .append("canvas")
    .attr("width", width)
    .attr("height", height);

  const context = canvas.node().getContext("2d");

  const particles = users.map((u) => {
    u.x = Math.random() * width;
    u.y = Math.random() * height;
    u.vx = 0;
    u.vy = 0;
    return u;
  });

  setInterval(() => {
    context.save();
    context.clearRect(0, 0, width, height);

    for (let i = 0; i < n; ++i) {
      const p = particles[i];
      p.x += p.vx;
      if (p.x < -maxDistance) p.x += width + maxDistance * 2;
      else if (p.x > width + maxDistance) p.x -= width + maxDistance * 2;
      p.y += p.vy;
      if (p.y < -maxDistance) p.y += height + maxDistance * 2;
      else if (p.y > height + maxDistance) p.y -= height + maxDistance * 2;
      p.vx += 0.1 * (Math.random() - 0.5) - 0.01 * p.vx;
      p.vy += 0.1 * (Math.random() - 0.5) - 0.01 * p.vy;
      context.beginPath();
      context.arc(p.x, p.y, radius, 0, 2 * Math.PI);
      context.fillStyle = "blue";
      context.fillText(p.name + " is here", p.x + 5, p.y + 10);
      context.fillStyle = "black";
      context.fill();
    }

    for (let i = 0; i < n; ++i) {
      for (let j = i + 1; j < n; ++j) {
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
          context.stroke();
        }
      }
    }

    context.restore();
  }, 10);

  return pa;
}

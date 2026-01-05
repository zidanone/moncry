// Placeholder for future API integration
console.log("Menu layout loaded");

// Example interaction
document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', () => {
    alert(item.innerText + " clicked");

  });
});
const ctx = document.getElementById("dogeChart").getContext("2d");

let labels = [];
let prices = [];

const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: labels,
    datasets: [{
      label: "DOGE/USDT",
      data: prices,
      borderWidth: 2,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    animation: false,
    scales: {
      x: { display: false }
    }
  }
});

// Binance WebSocket (LIVE)
const socket = new WebSocket(
  "wss://stream.binance.com:9443/ws/dogeusdt@trade"
);

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  const price = parseFloat(data.p);
  const time = new Date(data.T).toLocaleTimeString();

  document.getElementById("price").innerText =
    `Price: ${price}`;

  labels.push(time);
  prices.push(price);

  // limit points
  if (labels.length > 50) {
    labels.shift();
    prices.shift();
  }

  chart.update();
};
// Day selection logic
document.querySelectorAll('.days button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.days button')
      .forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// CTA
document.querySelector('.cta').addEventListener('click', () => {
  alert("Investment flow coming next.");
});


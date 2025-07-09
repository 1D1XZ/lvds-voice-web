let interval = null;

function startSending() {
  const gamertag = document.getElementById("gamertag").value;
  const serverUrl = document.getElementById("serverUrl").value;
  const dimension = document.getElementById("dimension").value;

  if (!gamertag || !serverUrl) {
    alert("Falta gamertag o servidor");
    return;
  }

  if (interval) clearInterval(interval);

  interval = setInterval(async () => {
    const x = parseFloat(document.getElementById("x").value);
    const y = parseFloat(document.getElementById("y").value);
    const z = parseFloat(document.getElementById("z").value);

    const body = {
      gamertag,
      position: { x, y, z },
      dimension
    };

    try {
      const res = await fetch(`${serverUrl}/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      const list = document.getElementById("nearbyList");
      list.innerHTML = "";

      data.nearby?.forEach(player => {
        const li = document.createElement("li");
        li.textContent = `${player.gamertag} (Vol: ${(player.volume * 100).toFixed(0)}%)`;
        list.appendChild(li);
      });
    } catch (err) {
      console.error("Error:", err);
    }
  }, 1000);
}

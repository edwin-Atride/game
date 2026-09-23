"use strict";

const $ = id => document.getElementById(id);
const state = { players: [], index: 0, phase: "life", spinning: false, shown: false, items: [], angle: 0, selected: null };
const SEGMENTS = 16;
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const randomInt = max => Math.floor(Math.random() * max);
const plural = (n, word) => `${n} ${word}${n > 1 && !word.endsWith("s") ? "s" : ""}`;

// Les unités sont tirées directement : « 48 mois » n'est jamais converti en « 4 ans ».
// Chaque unité a sa place dans les tirages, y compris les petites durées.
function randomLife() {
  const roll = randomInt(100);
  if (roll < 25) return { amount: randomInt(31) + 1, unit: "jour" };
  if (roll < 50) return { amount: randomInt(52) + 1, unit: "semaine" };
  if (roll < 75) return { amount: randomInt(120) + 1, unit: "mois" };
  if (roll < 90) return { amount: randomInt(1080) + 121, unit: "mois" };
  return { amount: randomInt(100) + 1, unit: "an" };
}
const lifeText = life => plural(life.amount, life.unit);
const shortLife = life => `${life.amount} ${({jour:"j",semaine:"sem",mois:"mois",an:"ans"})[life.unit]}`;
const lifeYears = life => life.amount * ({jour: 1 / 365, semaine: 7 / 365, mois: 1 / 12, an: 1})[life.unit];
// Une vie qui se termine dans quelques jours ne peut pas se conclure « de vieillesse ».
function eligibleDeaths() {
  return lifeYears(state.players[state.index].life) >= 60 ? DEATHS : DEATH_GROUPS.slice(1, -1).flat();
}

function renderPlayers() {
  const list = $("player-list");
  list.replaceChildren();
  state.players.forEach((player, i) => {
    const chip = document.createElement("span"); chip.className = "player-chip";
    const name = document.createElement("span"); name.textContent = player.name;
    const remove = document.createElement("button"); remove.type = "button"; remove.textContent = "×";
    remove.setAttribute("aria-label", `Retirer ${player.name}`);
    remove.addEventListener("click", () => { state.players.splice(i, 1); renderPlayers(); });
    chip.append(name, remove); list.append(chip);
  });
  $("player-count").textContent = plural(state.players.length, "joueur");
  $("start-button").disabled = state.players.length < 2;
}

$("player-form").addEventListener("submit", event => {
  event.preventDefault();
  const input = $("player-name"); const name = input.value.trim().replace(/\s+/g, " ");
  const error = $("form-error"); error.hidden = true;
  if (!name) return;
  if (state.players.length >= 20) { error.textContent = "20 joueurs maximum pour une partie."; error.hidden = false; return; }
  if (state.players.some(p => p.name.toLocaleLowerCase("fr") === name.toLocaleLowerCase("fr"))) { error.textContent = "Ce prénom est déjà dans la partie."; error.hidden = false; return; }
  state.players.push({ name, life: null, death: null }); input.value = ""; input.focus(); renderPlayers();
});

function setWheel(items, labels) {
  const wheel = $("wheel");
  wheel.replaceChildren();
  const colors = ["#f6c783", "#e58680", "#d3abdf", "#a4d0c7"];
  const step = 360 / SEGMENTS;
  wheel.style.background = `conic-gradient(${items.map((_, i) => `${colors[i % colors.length]} ${i * step}deg ${(i + 1) * step}deg`).join(",")})`;
  labels.forEach((label, i) => {
    const node = document.createElement("span"); node.className = "wheel-label" + (i % 4 === 1 ? " light" : "");
    node.textContent = label;
    node.style.transform = `rotate(${i * step + step / 2 - 90}deg) translateX(clamp(42px, 6vw, 62px))`;
    wheel.append(node);
  });
  wheel.style.transition = "none";
  wheel.style.transform = `rotate(${state.angle}deg)`;
}

function prepareWheel() {
  const deathPhase = state.phase === "death";
  const pool = deathPhase ? eligibleDeaths() : null;
  const chosen = deathPhase ? pool[randomInt(pool.length)] : randomLife();
  const items = deathPhase ? Array.from({length: SEGMENTS}, () => pool[randomInt(pool.length)]) : Array.from({length: SEGMENTS}, randomLife);
  const winnerIndex = randomInt(SEGMENTS);
  items[winnerIndex] = chosen;
  state.items = items; state.selected = winnerIndex;
  const labels = deathPhase ? items.map(item => item.replace(/^(à la suite d'un |à la suite d'une |à la suite d'|à la suite de la |à la suite du |après |dans un |dans une |dans |de )/, "").slice(0, 14) + "…") : items.map(shortLife);
  setWheel(items, labels);
}

function renderTurn() {
  const player = state.players[state.index];
  const deathPhase = state.phase === "death";
  $("turn-title").textContent = `Au tour de ${player.name}`;
  $("turn-count").textContent = `${String(state.index + 1).padStart(2, "0")} / ${String(state.players.length).padStart(2, "0")}`;
  $("turn-dots").replaceChildren(...state.players.map((p, i) => {
    const dot = document.createElement("span"); dot.className = `turn-dot ${i < state.index ? "done" : i === state.index ? "active" : ""}`;
    dot.title = p.name; return dot;
  }));
  $("wheel-type").textContent = deathPhase ? "ROUE N° 2 · LA FIN" : "ROUE N° 1 · LE TEMPS";
  $("phase-kicker").textContent = deathPhase ? "02 — LA FIN" : "01 — LA DURÉE";
  $("phase-title").textContent = deathPhase ? "Comment se termine ton histoire ?" : "Combien de temps vas-tu vivre ?";
  $("phase-description").textContent = deathPhase ? `${DEATHS.length} fins possibles, inspirées de situations réelles.` : "De 1 jour à 100 ans, en jours, semaines, mois ou années.";
  $("result-card").hidden = true; $("spin-button").hidden = false; $("spin-button").disabled = false;
  $("spin-button").innerHTML = 'Lancer la roue <span aria-hidden="true">↗</span>';
  $("continue-button").hidden = true; $("spin-hint").hidden = false;
  state.shown = false; prepareWheel();
}

function reveal() {
  state.spinning = false; state.shown = true;
  const player = state.players[state.index];
  const value = state.items[state.selected];
  if (state.phase === "life") player.life = value;
  else player.death = value;
  $("result-label").textContent = state.phase === "life" ? "TON TEMPS RESTANT" : "TA FIN";
  $("result-value").textContent = state.phase === "life" ? lifeText(value) : value;
  $("result-detail").textContent = state.phase === "life" ? "La suite ? Découvrons comment ton histoire se termine." : "Un scénario fictif tiré au hasard parmi des centaines de possibilités.";
  $("result-card").hidden = false;
  $("spin-button").hidden = true; $("continue-button").hidden = false;
  $("continue-button").textContent = state.phase === "life" ? "Découvrir ma fin →" : state.index + 1 === state.players.length ? "Voir les résultats →" : "Joueur suivant →";
  $("spin-hint").hidden = true;
  $("continue-button").focus();
}

$("spin-button").addEventListener("click", () => {
  if (state.spinning || state.shown) return;
  state.spinning = true;
  $("spin-button").disabled = true; $("spin-button").textContent = "La roue tourne…";
  const wheel = $("wheel");
  const step = 360 / SEGMENTS;
  // Chaque secteur commence en haut ; on amène son centre exactement sous la flèche.
  const target = (360 - (state.selected * step + step / 2)) % 360;
  const current = ((state.angle % 360) + 360) % 360;
  const delta = (target - current + 360) % 360;
  const duration = reducedMotion() ? 40 : 4700;
  state.angle += (reducedMotion() ? 0 : 360 * 6) + delta;
  requestAnimationFrame(() => requestAnimationFrame(() => {
    wheel.style.transition = `transform ${duration}ms cubic-bezier(.14,.74,.12,1)`;
    wheel.style.transform = `rotate(${state.angle}deg)`;
  }));
  window.setTimeout(reveal, duration + 100);
});

$("continue-button").addEventListener("click", () => {
  if (state.spinning || !state.shown) return;
  if (state.phase === "life") state.phase = "death";
  else if (state.index + 1 < state.players.length) { state.index++; state.phase = "life"; }
  else { showFinal(); return; }
  renderTurn();
  $("game").scrollIntoView({behavior: reducedMotion() ? "instant" : "smooth", block: "start"});
});

function showFinal() {
  $("game").hidden = true; $("final").hidden = false;
  const list = $("results-list"); list.replaceChildren();
  state.players.forEach((player, i) => {
    const row = document.createElement("div"); row.className = "summary-row";
    const number = document.createElement("span"); number.className = "summary-number"; number.textContent = String(i + 1).padStart(2, "0");
    const content = document.createElement("div");
    const name = document.createElement("div"); name.className = "summary-name"; name.textContent = player.name;
    const detail = document.createElement("div"); detail.className = "summary-detail"; detail.textContent = `${lifeText(player.life)} à vivre · ${player.death}`;
    content.append(name, detail); row.append(number, content); list.append(row);
  });
  $("final").scrollIntoView({behavior: reducedMotion() ? "instant" : "smooth", block: "start"});
}

function restart() {
  if (state.spinning) return;
  state.players = []; state.index = 0; state.phase = "life"; state.angle = 0; state.shown = false;
  $("final").hidden = true; $("game").hidden = true; $("setup").hidden = false;
  renderPlayers(); $("setup").scrollIntoView({behavior: reducedMotion() ? "instant" : "smooth", block: "start"});
}
$("start-button").addEventListener("click", () => {
  if (state.players.length < 2) return;
  state.index = 0; state.phase = "life"; state.angle = 0;
  $("setup").hidden = true; $("game").hidden = false;
  renderTurn(); $("game").scrollIntoView({behavior: reducedMotion() ? "instant" : "smooth", block: "start"});
});
$("restart-button").addEventListener("click", restart);
$("again-button").addEventListener("click", restart);
renderPlayers();

"use strict";

// Toutes les fins sont fictives et volontairement non graphiques.
const DEATHS = [
  "de vieillesse, entouré·e de tes proches", "après une sieste beaucoup trop longue", "en riant à une blague vraiment nulle", "en essayant de battre un record de longévité", "le jour de ton centième anniversaire", "après une vie d'aventures incroyables", "au beau milieu d'une partie de bingo", "en regardant ton film préféré pour la 84e fois", "en cherchant tes lunettes alors qu'elles étaient sur ton nez", "après avoir enfin fini ta liste de choses à faire",
  "en glissant sur une peau de banane", "en trébuchant sur ton propre lacet", "en poursuivant un pigeon trop insolent", "en tentant d'apprivoiser une oie", "dans une guerre de boules de neige épique", "en perdant un duel contre un flamant rose", "en défiant un canard au bras de fer", "à cause d'un chat qui voulait toute la place sur le canapé", "en saluant un lama qui n'aimait pas les salutations", "en prenant un hérisson pour une brosse à cheveux",
  "en faisant un moonwalk sur un sol fraîchement ciré", "après une danse de victoire prématurée", "en essayant de reproduire une cascade de film", "en voulant impressionner quelqu'un avec un salto", "en courant après le bus qui ne s'arrêtait jamais", "en essayant de sauter une flaque géante", "en participant à un championnat de chaise musicale", "en essayant le parkour dans ton salon", "en ratant l'arrivée d'un marathon imaginaire", "en glissant sur une piste de danse",
  "en inventant une machine à faire les crêpes toute seule", "à cause d'un grille-pain expérimental", "en testant un gadget acheté à 2 h du matin", "après avoir appuyé sur le gros bouton rouge", "en construisant une fusée avec des cartons", "en voulant réparer une horloge géante", "dans un ascenseur qui menait à un endroit improbable", "en bricolant un robot trop susceptible", "en voulant brancher 34 guirlandes en même temps", "après avoir inventé la première trottinette volante",
  "en goûtant la sauce la plus piquante du monde", "lors d'un concours de mangeurs de cornichons", "après avoir confondu le sel et le sucre", "en cherchant le meilleur kebab de l'univers", "en tombant dans une montagne de pop-corn", "en voulant goûter une pizza de trois mètres", "à cause d'une fondue au fromage incontrôlable", "en prenant un bonbon mystérieux dans une boîte étrange", "lors d'un duel de chefs pâtissiers", "après avoir voulu cuisiner 1000 pancakes",
  "en gagnant une partie de cache-cache trop convaincante", "en cherchant la sortie d'un labyrinthe de maïs", "en tentant de battre le boss final sans sauvegarder", "dans une compétition de pierre-feuille-ciseaux", "après avoir crié « encore une partie » 47 fois", "en voulant terminer un puzzle de 50 000 pièces", "en tentant d'attraper un Pokémon imaginaire", "en essayant d'être plus rapide qu'une borne d'arcade", "en lançant le dé le plus malchanceux du monde", "à cause d'un jeu de société beaucoup trop compétitif",
  "en voulant prendre le selfie parfait", "en lisant les conditions d'utilisation en entier", "en tombant sur une mise à jour infinie", "à cause d'un autocorrecteur trop puissant", "après avoir ouvert 846 onglets sur ton navigateur", "en essayant de résoudre un CAPTCHA impossible", "en lançant une visioconférence avec le micro allumé", "à cause d'un chargeur introuvable au pire moment", "en cherchant le Wi-Fi au sommet d'une montagne", "en voulant devenir une légende d'Internet",
  "en remportant la coupe du monde de sieste", "sur le chemin du retour d'une quête secondaire", "en découvrant une île qui n'existait sur aucune carte", "en cherchant un trésor sous ton paillasson", "en visitant une maison hantée par un aspirateur", "en ouvrant une porte marquée « surtout pas »", "en voulant parler à un fantôme poli", "après avoir répondu à une énigme avec trop d'assurance", "en cherchant une licorne dans une forêt", "en entrant dans une dimension remplie de coussins",
  "en sauvant un gâteau d'anniversaire géant", "en étant élu·e maire d'un village de pingouins", "en voulant devenir maître du monde pendant la pause déjeuner", "en croisant ton sosie à la mauvaise seconde", "en participant à une parade de dinosaures gonflables", "en essayant de faire entrer un canapé dans un ascenseur", "en ouvrant un parapluie à l'intérieur d'une tornade de confettis", "en voulant battre un record de câlins", "à cause d'un tapis roulant réglé sur « fusée »", "en voulant porter toutes les courses en un voyage",
  "en tombant amoureux·se d'une statue qui bougeait", "en assistant à un concert secret sur la Lune", "en cherchant la dernière frite au fond du sachet", "en voulant dompter un cheval à bascule", "en te perdant dans un magasin de meubles", "en essayant de traverser un champ de ballons", "en suivant un arc-en-ciel jusqu'à sa fin", "en offrant des fleurs à une plante carnivore timide", "en te déclarant champion·ne de la météo", "en faisant la course contre ton ombre",
  "en tentant de faire rire un garde royal", "à cause d'un chapeau beaucoup trop grand", "en gagnant une partie de « le sol est de la lave »", "en poursuivant un billet emporté par le vent", "en t'endormant dans une valise prête à partir", "en voulant photographier un nuage en forme de toi", "en te trompant de bateau lors d'une croisière imaginaire", "en essayant d'empiler 200 livres sur ta tête", "en défiant un escalator à la course", "en donnant un discours trop long aux mouettes",
  "en faisant une révérence à une porte automatique", "en remportant le tournoi du meilleur imitateur de poule", "en jouant du kazoo pendant un orage", "en voulant cueillir une étoile filante", "en tentant de caresser un nuage", "en te perdant dans une fête foraine infinie", "en acceptant une invitation d'extraterrestres très polis", "en apprenant à un robot à faire des blagues", "en faisant du surf sur une vague de mousse", "en te prenant pour un personnage de dessin animé",
  "en confondant un trampoline et ton lit", "en cherchant le bout d'un escalier en colimaçon", "à cause d'une bataille de coussins historique", "en poursuivant une bulle de savon géante", "en essayant de jongler avec des pastèques", "en dansant avec une mascotte qui ne savait pas s'arrêter", "en voulant devenir champion·ne de lancer de chaussettes", "en essayant de démêler des écouteurs légendaires", "en faisant une entrée théâtrale dans la mauvaise salle", "en tentant de gagner contre un distributeur de peluches",
  "en lançant un débat sur le meilleur parfum de glace", "en faisant un vœu trop précis à une étoile", "en choisissant « difficulté maximale » dans la vraie vie", "en voulant lire un panneau placé trop loin", "en participant à une course de caddies", "en cherchant le bouton « annuler » de la réalité", "en devenant le roi ou la reine des chaussettes perdues", "en sautant de joie pour un colis de chaussons", "en essayant d'apprendre le tango à un mannequin", "en voulant savoir ce qu'il y a au bout d'un escalier magique",
  "en tournant une autre roue du destin", "après avoir remporté le jackpot de l'absurde", "en racontant cette histoire une fois de trop", "en refusant d'admettre que la roue avait raison", "en découvrant que tout était une simulation", "en voulant négocier avec le destin", "en cherchant la sortie du générique de fin", "après avoir prononcé « ça ne peut pas m'arriver »", "en essayant de relancer cette roue pour une meilleure réponse", "en riant de ta propre fin improbable"
];

const $ = id => document.getElementById(id);
const state = { players: [], index: 0, phase: "life", spinning: false, shown: false, items: [], angle: 0, selected: null };
const SEGMENTS = 16;
const MAX_DAYS = 36525;
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const randomInt = max => Math.floor(Math.random() * max);
const randomDays = () => randomInt(MAX_DAYS) + 1;
const plural = (n, word) => `${n} ${word}${n > 1 && !word.endsWith("s") ? "s" : ""}`;

function lifeText(days) {
  if (days < 30) return plural(days, "jour");
  if (days < 365) return plural(Math.floor(days / 30), "mois") + (days % 30 ? ` et ${plural(days % 30, "jour")}` : "");
  const years = Math.floor(days / 365.25);
  const remaining = Math.round(days - years * 365.25);
  if (remaining < 30) return plural(years, "an");
  return `${plural(years, "an")} et ${plural(Math.floor(remaining / 30), "mois")}`;
}
function shortLife(days) {
  if (days < 365) return days < 30 ? `${days} j` : `${Math.floor(days / 30)} mois`;
  return `${Math.floor(days / 365.25)} ans`;
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
  state.players.push({ name, days: null, death: null }); input.value = ""; input.focus(); renderPlayers();
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
  const chosen = deathPhase ? DEATHS[randomInt(DEATHS.length)] : randomDays();
  const items = deathPhase ? Array.from({length: SEGMENTS}, () => DEATHS[randomInt(DEATHS.length)]) : Array.from({length: SEGMENTS}, randomDays);
  const winnerIndex = randomInt(SEGMENTS);
  items[winnerIndex] = chosen;
  state.items = items; state.selected = winnerIndex;
  const labels = deathPhase ? items.map(item => item.replace(/^(en |à cause d'|après |de )/, "").slice(0, 12) + "…") : items.map(shortLife);
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
  $("phase-description").textContent = deathPhase ? "Une fin parmi plus de 100 possibilités. Certaines sont… particulières." : "De 1 jour à 100 ans. La roue décide pour toi.";
  $("result-card").hidden = true; $("spin-button").hidden = false; $("spin-button").disabled = false;
  $("spin-button").innerHTML = 'Lancer la roue <span aria-hidden="true">↗</span>';
  $("continue-button").hidden = true; $("spin-hint").hidden = false;
  state.shown = false; prepareWheel();
}

function reveal() {
  state.spinning = false; state.shown = true;
  const player = state.players[state.index];
  const value = state.items[state.selected];
  if (state.phase === "life") player.days = value;
  else player.death = value;
  $("result-label").textContent = state.phase === "life" ? "TON TEMPS RESTANT" : "TA FIN IMPROBABLE";
  $("result-value").textContent = state.phase === "life" ? lifeText(value) : value;
  $("result-detail").textContent = state.phase === "life" ? "La suite ? Découvrons comment ton histoire se termine." : "Le destin a un drôle de sens de l'humour.";
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
    const detail = document.createElement("div"); detail.className = "summary-detail"; detail.textContent = `${lifeText(player.days)} à vivre · ${player.death}`;
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

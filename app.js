let vehicles = [
  { id: "EV-1", wo: "WO-1234", type: "EV sedan", category: "EV", origin: "Goteborg", gate: "Gate A", target: "A", icon: "EV" },
  { id: "PH-1", wo: "WO-1235", type: "PHEV SUV", category: "PHEV", origin: "Umea", gate: "Gate B", target: "B", icon: "PH" },
  { id: "IC-1", wo: "WO-1236", type: "ICE sedan", category: "ICE", origin: "Malmo", gate: "Gate C", target: "C", icon: "IC" },
  { id: "EV-2", wo: "WO-1237", type: "EV van", category: "EV", origin: "Oslo", gate: "Gate A", target: "A", icon: "EV" },
  { id: "PH-2", wo: "WO-1238", type: "PHEV wagon", category: "PHEV", origin: "Skovde", gate: "Gate B", target: "B", icon: "PH" },
  { id: "IC-2", wo: "WO-1239", type: "ICE coupe", category: "ICE", origin: "Stockholm", gate: "Gate C", target: "C", icon: "IC" },
  { id: "EV-3", wo: "WO-1240", type: "Compact EV", category: "EV", origin: "Lund", gate: "Gate A", target: "A", icon: "EV" },
  { id: "PH-3", wo: "WO-1241", type: "PHEV crossover", category: "PHEV", origin: "Vasteras", gate: "Gate B", target: "B", icon: "PH" },
  { id: "IC-3", wo: "WO-1242", type: "ICE hatchback", category: "ICE", origin: "Trollhattan", gate: "Gate C", target: "C", icon: "IC" },
  { id: "EV-4", wo: "WO-1243", type: "EV pickup", category: "EV", origin: "Kiruna", gate: "Gate A", target: "A", icon: "EV" },
  { id: "HH-1", wo: "WO-1244", type: "Tractor", category: "High & Heavy", origin: "Oslo", gate: "Gate D", target: "D", icon: "HH" },
  { id: "HH-2", wo: "WO-1245", type: "Harvester", category: "High & Heavy", origin: "Vasteras", gate: "Gate D", target: "D", icon: "HH" },
  { id: "HH-3", wo: "WO-1246", type: "Mining loader", category: "High & Heavy", origin: "Kiruna", gate: "Gate D", target: "D", icon: "HH" },
  { id: "HH-4", wo: "WO-1247", type: "Excavator", category: "High & Heavy", origin: "Umea", gate: "Gate D", target: "D", icon: "HH" },
  { id: "HH-5", wo: "WO-1248", type: "Wheel loader", category: "High & Heavy", origin: "Lulea", gate: "Gate D", target: "D", icon: "HH" },
  { id: "HH-6", wo: "WO-1249", type: "Bulldozer", category: "High & Heavy", origin: "Boras", gate: "Gate D", target: "D", icon: "HH" },
  { id: "HH-7", wo: "WO-1250", type: "Crane truck", category: "High & Heavy", origin: "Malmo", gate: "Gate D", target: "D", icon: "HH" },
  { id: "HH-8", wo: "WO-1251", type: "Forestry machine", category: "High & Heavy", origin: "Sundsvall", gate: "Gate D", target: "D", icon: "HH" },
  { id: "HH-9", wo: "WO-1252", type: "Road grader", category: "High & Heavy", origin: "Orebro", gate: "Gate D", target: "D", icon: "HH" },
  { id: "HH-10", wo: "WO-1253", type: "Tracked excavator", category: "High & Heavy", origin: "Gavle", gate: "Gate D", target: "D", icon: "HH" }
];

const ROUND_VEHICLE_LIMIT = 20;
const DECK_COUNT = 5;
const DECK_CAPACITY = 5;
const VEHICLE_TRUCK_CAPACITY = 7;
const HH_TRUCK_CAPACITY = 4;

const state = {
  flow: "export",
  phase: "truckUnload",
  importStep: null,
  current: 0,
  processingIndex: 0,
  importLoadingIndex: 0,
  loadingIndex: 0,
  selectedZone: null,
  selectedDeck: null,
  score: 0,
  mistakes: 0,
  loaded: 0,
  importDelivered: 0,
  seconds: 300,
  timer: null,
  scanned: false,
  locations: {},
  truckLoads: {
    VEHICLE_TRUCK: [],
    HH_TRUCK: []
  },
  truckNumbers: {
    VEHICLE_TRUCK: 1,
    HH_TRUCK: 1
  },
  deckLoads: Array.from({ length: DECK_COUNT }, () => [])
};

const timerEl = document.querySelector("#timer");
const startBtn = document.querySelector("#startBtn");
const restartBtn = document.querySelector("#restartBtn");
const scoreEl = document.querySelector("#score");
const handledEl = document.querySelector("#handled");
const ordersEl = document.querySelector("#orders");
const ordersLabelEl = document.querySelector("#ordersLabel");
const accuracyEl = document.querySelector("#accuracy");
const vehicleIdEl = document.querySelector("#vehicleId");
const vehicleMetaEl = document.querySelector("#vehicleMeta");
const scanBtn = document.querySelector("#scanBtn");
const queueCountEl = document.querySelector("#queueCount");
const shipLoadEl = document.querySelector("#shipLoad");
const shipCardEl = document.querySelector(".ship-card");
const deckSlotsEl = document.querySelector("#deckSlots");
const loadBtn = document.querySelector("#loadBtn");
const processCards = document.querySelectorAll(".process-card");
const processBtns = document.querySelectorAll(".processBtn");
const executeBtns = document.querySelectorAll(".executeBtn");
const returnCenterBtns = document.querySelectorAll(".returnCenterBtn");
const loadingAreaBtn = document.querySelector("#loadingAreaBtn");
const vehicleTruckBtn = document.querySelector("#vehicleTruckBtn");
const hhTruckBtn = document.querySelector("#hhTruckBtn");
const handoverLabelEl = document.querySelector("#handoverLabel");
const handoverTitleEl = document.querySelector("#handoverTitle");
const handoverTextEl = document.querySelector("#handoverText");
const vehicleTruckLabelEl = document.querySelector("#vehicleTruckLabel");
const vehicleTruckTitleEl = document.querySelector("#vehicleTruckTitle");
const vehicleTruckTextEl = document.querySelector("#vehicleTruckText");
const hhTruckLabelEl = document.querySelector("#hhTruckLabel");
const hhTruckTitleEl = document.querySelector("#hhTruckTitle");
const hhTruckTextEl = document.querySelector("#hhTruckText");
const vehicleTruckVisualEl = document.querySelector("#vehicleTruckVisual");
const hhTruckVisualEl = document.querySelector("#hhTruckVisual");
const workbenchEl = document.querySelector(".workbench");
const workOrdersEl = document.querySelector("#workOrders");
const workbenchLabelEl = document.querySelector("#workbenchLabel");
const workbenchTitleEl = document.querySelector("#workbenchTitle");
const workbenchHelpEl = document.querySelector("#workbenchHelp");
const logEl = document.querySelector("#log");
const missionTitleEl = document.querySelector("#missionTitle");
const missionTextEl = document.querySelector("#missionText");
const actionHintEl = document.querySelector("#actionHint");
const stepScanEl = document.querySelector("#stepScan");
const stepPlaceEl = document.querySelector("#stepPlace");
const stepFinishEl = document.querySelector("#stepFinish");
const stepScanTitleEl = document.querySelector("#stepScanTitle");
const stepScanTextEl = document.querySelector("#stepScanText");
const stepPlaceTitleEl = document.querySelector("#stepPlaceTitle");
const stepPlaceTextEl = document.querySelector("#stepPlaceText");
const stepFinishTitleEl = document.querySelector("#stepFinishTitle");
const stepFinishTextEl = document.querySelector("#stepFinishText");
const chainFinalEl = document.querySelector("#chainFinal");
const shipHelpEl = document.querySelector("#shipHelp");
const completionFlashEl = document.querySelector("#completionFlash");
const completionSoundEl = document.querySelector("#completionSound");
const completionTitleEl = document.querySelector("#completionTitle");
const completionTextEl = document.querySelector("#completionText");

function assignWorkOrders() {
  const used = new Set();
  vehicles = vehicles.map((item) => {
    let number = 0;
    do {
      number = Math.floor(Math.random() * 9001) + 999;
    } while (used.has(number));
    used.add(number);
    return { ...item, wo: `WO-${number}` };
  });
}

function activeVehicle() {
  const index =
    state.flow === "export" && state.phase === "loading"
      ? state.loadingIndex
      : state.flow === "import" && state.phase === "processing"
        ? state.processingIndex
        : state.flow === "import" && state.phase === "importLoading"
          ? state.importLoadingIndex
          : state.current;
  return vehicles[Math.min(index, ROUND_VEHICLE_LIMIT - 1)];
}

function vehiclesLeft() {
  if (state.phase === "complete") return 0;
  if (state.phase === "vesselUnload") return Math.max(0, ROUND_VEHICLE_LIMIT - state.current);
  if (state.phase === "loading") return Math.max(0, ROUND_VEHICLE_LIMIT - state.loaded);
  if (state.phase === "processing") return Math.max(0, ROUND_VEHICLE_LIMIT - state.processingIndex);
  if (state.phase === "importLoading") return Math.max(0, ROUND_VEHICLE_LIMIT - state.importDelivered);
  return Math.max(0, ROUND_VEHICLE_LIMIT - state.current);
}

function truckKindFor(item) {
  return centerFor(item) === "EPC" ? "HH_TRUCK" : "VEHICLE_TRUCK";
}

function truckCapacity(kind) {
  return kind === "HH_TRUCK" ? HH_TRUCK_CAPACITY : VEHICLE_TRUCK_CAPACITY;
}

function truckLabel(kind, action = state.flow === "export" ? "Unload" : "pickup") {
  const suffix = kind === "HH_TRUCK" ? "H&H" : "Vehicle";
  return action === "Unload" ? `Truck Unload - ${suffix}` : `Truck pickup - ${suffix}`;
}

function isRoundComplete() {
  return state.phase === "complete";
}

function formatTime(total) {
  const minutes = Math.floor(total / 60).toString().padStart(2, "0");
  const seconds = (total % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function addLog(message) {
  const line = document.createElement("p");
  line.textContent = message;
  logEl.prepend(line);
  while (logEl.children.length > 4) logEl.lastElementChild.remove();
}

function resetRound() {
  if (state.timer) {
    clearInterval(state.timer);
    state.timer = null;
  }

  state.phase = state.flow === "export" ? "truckUnload" : "vesselUnload";
  state.importStep = null;
  state.current = 0;
  state.processingIndex = 0;
  state.importLoadingIndex = 0;
  state.loadingIndex = 0;
  state.selectedZone = null;
  state.selectedDeck = null;
  state.score = 0;
  state.mistakes = 0;
  state.loaded = state.flow === "import" ? ROUND_VEHICLE_LIMIT : 0;
  state.importDelivered = 0;
  state.seconds = 300;
  state.scanned = false;
  state.locations = {};
  state.truckLoads = {
    VEHICLE_TRUCK: [],
    HH_TRUCK: []
  };
  state.truckNumbers = {
    VEHICLE_TRUCK: 1,
    HH_TRUCK: 1
  };
  state.deckLoads = state.flow === "import" ? makeImportDeckLoads() : Array.from({ length: DECK_COUNT }, () => []);
  assignWorkOrders();
  startBtn.textContent = "Start";
  completionFlashEl.classList.remove("show");
  logEl.innerHTML = "";
  addLog("New round ready. Start with the first FPOR work order.");
  render();
}

function makeImportDeckLoads() {
  return Array.from({ length: DECK_COUNT }, (_, deckIndex) =>
    vehicles
      .filter((_, vehicleIndex) => vehicleIndex % DECK_COUNT === deckIndex)
      .map((item) => item.id)
  );
}

function finishRound() {
  if (state.timer) {
    clearInterval(state.timer);
    state.timer = null;
  }

  state.phase = "complete";
  state.importStep = null;
  state.scanned = false;
  state.selectedZone = null;
  state.selectedDeck = null;
  startBtn.textContent = "New round";
  completionSoundEl.textContent = state.flow === "import" ? "COMPLETE" : "TOOT TOOT";
  completionTitleEl.textContent = state.flow === "import"
    ? "Import complete - you are a Rock Star!"
    : "Export complete - you are a Rock Star!";
  completionTextEl.textContent = state.flow === "import"
    ? `Score: ${state.score}. Import units are loaded on the outbound trucks.`
    : `Score: ${state.score}. Vessel loaded and ready to sail.`;
  addLog(state.flow === "import"
    ? `Import complete - you are a Rock Star! Score: ${state.score}.`
    : `Export complete - you are a Rock Star! Score: ${state.score}.`);
  if (state.flow === "export") playHorn();
  completionFlashEl.classList.add("show");
  window.setTimeout(() => completionFlashEl.classList.remove("show"), 3600);
  render();
}

function centerFor(item) {
  return item.category === "High & Heavy" ? "EPC" : "VPC";
}

function formatCount(count) {
  return `${count} ${count === 1 ? "vehicle" : "vehicles"}`;
}

function updateAreaCounts() {
  const fporCounts = { A: 0, B: 0, C: 0, D: 0 };
  const processCounts = { VPC: 0, EPC: 0, LOADING: 0, VEHICLE_TRUCK: 0, HH_TRUCK: 0 };

  vehicles.forEach((item) => {
    const location = state.locations[item.id];
    if (location === `FPOR-${item.target}`) fporCounts[item.target] += 1;
    if (location === "UNLOADING") processCounts.LOADING += 1;
    else if (processCounts[location] !== undefined) processCounts[location] += 1;
  });

  document.querySelectorAll("[data-count-zone]").forEach((node) => {
    node.textContent = formatCount(fporCounts[node.dataset.countZone] || 0);
  });

  document.querySelectorAll("[data-process-count]").forEach((node) => {
    node.textContent = formatCount(processCounts[node.dataset.processCount] || 0);
  });
}

function playHorn() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const ctx = new AudioContext();
  [0, 0.38].forEach((delay) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(185, ctx.currentTime + delay);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + delay + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + 0.28);
    osc.connect(gain).connect(ctx.destination);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + 0.3);
  });
}

function renderDeck() {
  deckSlotsEl.innerHTML = "";

  state.deckLoads
    .map((loads, deckIndex) => ({ loads, deckIndex }))
    .reverse()
    .forEach(({ loads, deckIndex }) => {
    const floor = document.createElement("button");
    const full = loads.length >= DECK_CAPACITY;
    const selected = state.selectedDeck === deckIndex;
    floor.type = "button";
    floor.className = `deck-floor${selected ? " selected" : ""}${full ? " full" : ""}`;
    floor.dataset.deck = String(deckIndex);
    floor.innerHTML = `
      <span class="deck-title">Deck ${deckIndex + 1}</span>
      <span class="deck-count">${loads.length}/${DECK_CAPACITY}</span>
      <span class="deck-cells">
        ${Array.from({ length: DECK_CAPACITY }, (_, slotIndex) => {
          const vehicleId = loads[slotIndex];
          return `<span class="deck-cell${vehicleId ? " filled" : ""}">${vehicleId || slotIndex + 1}</span>`;
        }).join("")}
      </span>
    `;
    floor.addEventListener("click", () => selectDeck(deckIndex));
    deckSlotsEl.append(floor);
  });
}

function renderTruckVisuals() {
  renderTruckVisual("VEHICLE_TRUCK", vehicleTruckVisualEl);
  renderTruckVisual("HH_TRUCK", hhTruckVisualEl);
}

function renderTruckVisual(kind, container) {
  const capacity = truckCapacity(kind);
  const items = state.flow === "export" ? exportTruckItems(kind) : state.truckLoads[kind];
  const label = kind === "HH_TRUCK" ? "H&H" : "Vehicle";
  const truckNumber = state.flow === "export" ? exportTruckNumber(kind) : state.truckNumbers[kind];
  const verb = state.flow === "export" ? "Unload" : "Load";

  container.innerHTML = `
    <span class="truck-label">${label} truck ${truckNumber}</span>
    <span class="truck-count">${items.length}/${capacity}</span>
    ${truckScene(kind, items)}
    <span class="truck-slots">
      ${Array.from({ length: capacity }, (_, index) => {
        const vehicleId = items[index];
        return `<span class="truck-slot${vehicleId ? " filled" : ""}" title="${vehicleId ? `${verb} ${vehicleId}` : `Slot ${index + 1}`}">${vehicleId || index + 1}</span>`;
      }).join("")}
    </span>
  `;
}

function truckScene(kind, items) {
  return kind === "HH_TRUCK" ? hhTruckScene(items) : vehicleTruckScene(items);
}

function vehicleTruckScene(items) {
  const carSlots = Array.from({ length: VEHICLE_TRUCK_CAPACITY }, (_, index) => {
    const occupied = Boolean(items[index]);
    const positions = [
      [162, 22],
      [246, 22],
      [330, 22],
      [414, 22],
      [204, 75],
      [300, 75],
      [396, 75]
    ];
    const [x, y] = positions[index];
    const color = occupied ? (index % 3 === 0 ? "#f4f7f8" : index % 3 === 1 ? "#79d4df" : "#f4c29a") : "#ffffff";
    const windowColor = occupied ? "#008fc1" : "#cde9ec";
    const stroke = occupied ? "#26323d" : "#8aa0a8";
    return `
      <g class="carrier-car${occupied ? " occupied" : ""}">
        <path d="M${x} ${y + 21}h8l9-13h30l12 13h8v16h-67z" fill="${color}" stroke="${stroke}" stroke-width="2"/>
        <path d="M${x + 19} ${y + 10}h25l9 11h-34z" fill="${windowColor}" stroke="${stroke}" stroke-width="1.5"/>
        <line x1="${x + 39}" y1="${y + 11}" x2="${x + 39}" y2="${y + 35}" stroke="${stroke}" stroke-width="1.5"/>
        <circle cx="${x + 15}" cy="${y + 39}" r="5" fill="#26323d"/>
        <circle cx="${x + 54}" cy="${y + 39}" r="5" fill="#26323d"/>
      </g>`;
  }).join("");

  return `
    <svg class="truck-scene vehicle-carrier-scene" viewBox="0 0 560 150" aria-hidden="true">
      <rect width="560" height="150" rx="8" fill="#cde9ec"/>
      <rect y="106" width="560" height="44" fill="#e8eef0"/>
      <path d="M26 80l21-26h58v58h31v15H26z" fill="#f8fafb" stroke="#26323d" stroke-width="3" stroke-linejoin="round"/>
      <path d="M38 64h36v39H38z" fill="#008fc1" stroke="#26323d" stroke-width="2"/>
      <path d="M80 60h25v52H80z" fill="#ffffff" stroke="#26323d" stroke-width="2"/>
      <path d="M102 112h42v15h-42z" fill="#f8fafb" stroke="#26323d" stroke-width="3"/>
      <path d="M138 109h22v10h-22z" fill="#26323d"/>
      <path d="M150 42h378v13h-378z" fill="#ff2f65" stroke="#b3163c" stroke-width="3"/>
      <path d="M150 94h378v13h-378z" fill="#ff2f65" stroke="#b3163c" stroke-width="3"/>
      <path d="M150 42h14v65h-14z" fill="#ff2f65" stroke="#b3163c" stroke-width="3"/>
      <path d="M294 42h14v65h-14z" fill="#ff2f65" stroke="#b3163c" stroke-width="3"/>
      <path d="M448 42h14v65h-14z" fill="#ff2f65" stroke="#b3163c" stroke-width="3"/>
      <path d="M150 126h378" stroke="#ff2f65" stroke-width="9" stroke-linecap="round"/>
      <path d="M302 107h226v20h-246z" fill="#ff2f65" stroke="#b3163c" stroke-width="3" stroke-linejoin="round"/>
      ${carSlots}
      <circle cx="58" cy="126" r="12" fill="#26323d"/>
      <circle cx="58" cy="126" r="5" fill="#ffffff"/>
      <circle cx="121" cy="126" r="12" fill="#26323d"/>
      <circle cx="121" cy="126" r="5" fill="#ffffff"/>
      <circle cx="420" cy="126" r="12" fill="#26323d"/>
      <circle cx="420" cy="126" r="5" fill="#ffffff"/>
      <circle cx="481" cy="126" r="12" fill="#26323d"/>
      <circle cx="481" cy="126" r="5" fill="#ffffff"/>
    </svg>`;
}

function hhTruckScene(items) {
  const machines = Array.from({ length: HH_TRUCK_CAPACITY }, (_, index) => {
    const occupied = Boolean(items[index]);
    const x = 178 + index * 78;
    const opacity = occupied ? "1" : "0.18";
    return `
      <g opacity="${opacity}">
        <rect x="${x}" y="76" width="48" height="22" rx="5" fill="#f4c20d" stroke="#26323d" stroke-width="2"/>
        <rect x="${x + 7}" y="67" width="24" height="13" rx="2" fill="#f4c20d" stroke="#26323d" stroke-width="2"/>
        <path d="M${x + 24} 68l25-22 27 7" fill="none" stroke="#26323d" stroke-width="5" stroke-linecap="round"/>
        <path d="M${x + 75} 53l17 9-18 8z" fill="#26323d"/>
        <rect x="${x + 1}" y="96" width="48" height="7" rx="3" fill="#26323d"/>
        <circle cx="${x + 13}" cy="104" r="5" fill="#26323d"/>
        <circle cx="${x + 36}" cy="104" r="5" fill="#26323d"/>
      </g>`;
  }).join("");

  return `
    <svg class="truck-scene hh-carrier-scene" viewBox="0 0 560 150" aria-hidden="true">
      <rect width="560" height="150" rx="8" fill="#d6e6e9"/>
      <rect y="105" width="560" height="45" fill="#e8eef0"/>
      <path d="M26 76h78v37h36v14H26z" fill="#f8fafb" stroke="#26323d" stroke-width="3" stroke-linejoin="round"/>
      <path d="M38 84h30v28H38z" fill="#008fc1" stroke="#26323d" stroke-width="2"/>
      <path d="M104 113h46v14h-46z" fill="#f8fafb" stroke="#26323d" stroke-width="3"/>
      <path d="M138 111h25v9h-25z" fill="#26323d"/>
      <path d="M158 96h338" stroke="#b3163c" stroke-width="12" stroke-linecap="round"/>
      <path d="M160 84h304v15h-304z" fill="#ff2f65" stroke="#b3163c" stroke-width="3"/>
      <path d="M462 84l52 17h-52z" fill="#ff2f65" stroke="#b3163c" stroke-width="3"/>
      <path d="M156 126h358" stroke="#ff2f65" stroke-width="8" stroke-linecap="round"/>
      ${machines}
      <circle cx="55" cy="126" r="12" fill="#26323d"/>
      <circle cx="55" cy="126" r="5" fill="#ffffff"/>
      <circle cx="120" cy="126" r="12" fill="#26323d"/>
      <circle cx="120" cy="126" r="5" fill="#ffffff"/>
      <circle cx="404" cy="126" r="12" fill="#26323d"/>
      <circle cx="404" cy="126" r="5" fill="#ffffff"/>
      <circle cx="466" cy="126" r="12" fill="#26323d"/>
      <circle cx="466" cy="126" r="5" fill="#ffffff"/>
    </svg>`;
}

function exportTruckItems(kind) {
  const eligible = vehicles.filter((item) => truckKindFor(item) === kind);
  const active = activeVehicle();
  const activeIndex = Math.max(0, eligible.findIndex((item) => item.id === active.id));
  const capacity = truckCapacity(kind);
  const batchStart = Math.floor(activeIndex / capacity) * capacity;

  return eligible
    .slice(batchStart, batchStart + capacity)
    .filter((item) => !state.locations[item.id])
    .map((item) => item.id);
}

function exportTruckNumber(kind) {
  const eligible = vehicles.filter((item) => truckKindFor(item) === kind);
  const activeIndex = Math.max(0, eligible.findIndex((item) => item.id === activeVehicle().id));
  return Math.floor(activeIndex / truckCapacity(kind)) + 1;
}

function renderOrders() {
  workOrdersEl.innerHTML = "";

  vehicles.forEach((item, index) => {
    const importDone = state.flow === "import" && index < state.importDelivered;
    const exportLoadedDone = state.flow === "export" && (index < state.loadingIndex || state.phase === "complete");
    const fporDone = !["vesselUnload", "fpor", "truckUnload"].includes(state.phase) || index < state.current;
    const loadedDone = importDone || exportLoadedDone;
    const active =
      (state.phase === "truckUnload" && index === state.current) ||
      (state.phase === "vesselUnload" && index === state.current) ||
      (state.phase === "fpor" && index === state.current) ||
      (state.phase === "loading" && index === state.loadingIndex) ||
      (state.phase === "processing" && index === state.processingIndex) ||
      (state.phase === "importLoading" && index === state.importLoadingIndex);
    const status = loadedDone
      ? (state.flow === "import" ? "Complete" : "Loaded")
      : state.phase === "vesselUnload" && active
        ? (state.scanned ? "Unload to FPOR" : "Scan off vessel")
      : state.phase === "truckUnload" && active
        ? "Truck unload"
      : state.phase === "processing" && active
        ? importStatus()
        : state.phase === "importLoading" && active
          ? importStatus()
        : fporDone
          ? (active ? "Load WO" : "At FPOR")
          : active
            ? (state.scanned ? "Park at FPOR" : "Scan")
            : "Queued";

    const center = centerFor(item);
    const detail = state.flow === "import"
      ? `${item.category} · FPOR Zone ${item.target} · ${center}`
      : `${item.category} · FPOR Zone ${item.target} · ${item.type}`;

    const order = document.createElement("article");
    order.className = loadedDone ? "order done" : active ? "order active-order" : "order";
    order.innerHTML = `
      <span class="order-icon">${item.icon}</span>
      <span><strong>${item.wo} · ${item.id}</strong><small>${detail}</small></span>
      <span>${status}</span>
    `;
    workOrdersEl.append(order);
  });
}

function importStatus() {
  if (state.importStep === "toCenter") return state.scanned ? "Move to center" : "Scan from FPOR";
  if (state.importStep === "processing") return "Process";
  if (state.importStep === "returnFpor") return "Return FPOR";
  if (state.importStep === "loadingArea") return state.scanned ? "Move to Loading Area" : "Scan from FPOR";
  if (state.importStep === "truck") return "Truck load";
  return "At FPOR";
}

function importActionText(item) {
  const center = centerFor(item);
  if (state.importStep === "toCenter") {
    return state.scanned
      ? `${item.wo}: move ${item.id} to ${center}.`
      : `${item.wo}: scan ${item.id} out from FPOR Zone ${item.target}.`;
  }
  if (state.importStep === "processing") return `${item.wo}: complete processing at ${center}.`;
  if (state.importStep === "returnFpor") return `${item.wo}: return ${item.id} from ${center} to FPOR Zone ${item.target}.`;
  if (state.importStep === "loadingArea") {
    return state.scanned
      ? `${item.wo}: move ${item.id} to Loading Area.`
      : `${item.wo}: scan ${item.id} out from FPOR Zone ${item.target}.`;
  }
  if (state.importStep === "truck") return `${item.wo}: load ${item.id} on the correct ${centerFor(item) === "EPC" ? "Truck pickup - H&H" : "Truck pickup - Vehicle"}.`;
  return `${item.wo}: scan ${item.id} and park it in FPOR Zone ${item.target}.`;
}

function render() {
  const item = activeVehicle();
  const complete = isRoundComplete();
  const truckUnload = state.flow === "export" && state.phase === "truckUnload";
  const vesselUnload = state.flow === "import" && state.phase === "vesselUnload";
  const loading = state.flow === "export" && state.phase === "loading";
  const processing = state.flow === "import" && state.phase === "processing";
  const importLoading = state.flow === "import" && state.phase === "importLoading";
  const fpor = state.phase === "fpor";
  const selectedDeckLoad = state.selectedDeck === null ? null : state.deckLoads[state.selectedDeck].length;
  const deckReady = loading && state.selectedDeck !== null && selectedDeckLoad < DECK_CAPACITY;
  const expectedCenter = centerFor(item);

  vehicleIdEl.textContent = complete ? "DONE" : item.id;
  vehicleMetaEl.textContent = complete
    ? (state.flow === "import" ? "All 20 import units processed" : "All 20 vehicles loaded")
    : `${item.wo} · ${item.category} · FPOR Zone ${item.target}`;
  timerEl.textContent = formatTime(state.seconds);
  scoreEl.textContent = state.score;
  handledEl.textContent = vehiclesLeft();
  ordersEl.textContent = state.flow === "import"
    ? `${state.importDelivered}/${ROUND_VEHICLE_LIMIT}`
    : `${state.loaded}/${ROUND_VEHICLE_LIMIT}`;
  ordersLabelEl.textContent = state.flow === "import" ? "Import WOs" : (loading ? "Loaded" : truckUnload ? "Truck unload" : "At FPOR");
  queueCountEl.textContent = fpor
    ? `${vehiclesLeft()} to FPOR`
    : vesselUnload
      ? `${vehiclesLeft()} on vessel`
      : state.flow === "import"
        ? `${state.importDelivered}/20 delivered`
      : truckUnload
        ? `${vehiclesLeft()} to unload`
        : `${state.current}/20 at FPOR`;
  shipLoadEl.textContent = state.flow === "import" ? `${state.loaded}/${ROUND_VEHICLE_LIMIT}` : `${state.loaded}/${ROUND_VEHICLE_LIMIT}`;

  const attempts = state.current + state.loaded + state.mistakes;
  const successes = state.current + state.loaded;
  const accuracy = attempts === 0 ? 100 : Math.round((successes / attempts) * 100);
  accuracyEl.textContent = `${accuracy}%`;

  document.querySelectorAll(".zone").forEach((zone) => {
    zone.classList.toggle("selected", zone.dataset.zone === state.selectedZone);
    zone.classList.toggle("recommended", (fpor || vesselUnload) && state.scanned && zone.dataset.zone === item.target);
    zone.classList.toggle("from-here", state.flow === "import" && !state.scanned &&
      ((processing && state.importStep === "toCenter") || (importLoading && state.importStep === "loadingArea")) &&
      zone.dataset.zone === item.target);
    const hint = zone.querySelector(".zone-hint");
    if (hint) hint.textContent = zone.classList.contains("from-here") ? "From here" : "Park here";
  });

  document.querySelectorAll(".chain-step").forEach((step, index) => {
    const activeIndex = complete ? 3 : importLoading ? 3 : processing ? 2 : loading ? 3 : fpor ? 1 : vesselUnload ? 0 : 0;
    step.classList.toggle("active", index === activeIndex);
  });

  stepScanEl.classList.toggle("active", (fpor && !state.scanned) || truckUnload || (vesselUnload && !state.scanned) || (processing && state.importStep === "toCenter" && !state.scanned));
  stepPlaceEl.classList.toggle("active", (fpor && state.scanned) || (vesselUnload && state.scanned));
  stepFinishEl.classList.toggle("active", loading || processing || importLoading);

  missionTitleEl.textContent = state.flow === "import"
    ? "Discharge, process, return and hand over import units"
    : loading
      ? "Load all FPOR vehicles onto the vessel"
      : truckUnload
        ? "Unload trucks into the terminal"
        : "Stage every vehicle at the correct FPOR";
  missionTextEl.textContent = state.flow === "import"
    ? importLoading
      ? "All units are processed and back at FPOR. Scan from FPOR, move each one to Loading Area, then load the correct truck pickup."
      : vesselUnload || fpor
        ? "Import starts with Toronto pre-loaded. Scan each unit off the vessel, unload it, and park it at the correct FPOR."
        : "Move cars to VPC or heavy equipment to EPC, complete processing, and return everything to FPOR."
    : loading
      ? "All vehicles are at FPOR. Follow each loading WO: fetch the vehicle, drive to ramp, choose a deck with capacity, then load."
      : truckUnload
        ? "Export WOs start with truck unload. Use Truck Unload - Vehicle or Truck Unload - H&H to place the unit in the terminal handover area before FPOR."
        : "Step 1 uses work orders to scan each vehicle and park it at the correct First Place of Rest: EV, PHEV, ICE, or High & Heavy.";
  stepScanTitleEl.textContent = truckUnload ? "Truck unload" : vesselUnload ? "Scan off vessel" : "Scan";
  stepScanTextEl.textContent = truckUnload ? "Choose right truck" : vesselUnload ? "Discharge WO" : "Open the WO";
  stepPlaceTitleEl.textContent = vesselUnload ? "Unload to FPOR" : "Park at FPOR";
  stepPlaceTextEl.textContent = complete ? "All FPOR done" : `Zone ${item.target} for ${item.category}`;
  stepFinishTitleEl.textContent = state.flow === "import" ? "Process" : "Load deck";
  stepFinishTextEl.textContent = state.flow === "import" ? "VPC/EPC + trucks" : "Choose one of 5 decks";
  chainFinalEl.textContent = state.flow === "import" ? "Loading Area" : "Vessel";

  handoverLabelEl.textContent = "Outbound handover";
  handoverTitleEl.textContent = "Loading Area";
  handoverTextEl.textContent = state.flow === "import"
    ? "Loading Area before truck pickup completion."
    : "Outbound handover area used after truck unload before FPOR staging.";
  vehicleTruckLabelEl.textContent = state.flow === "export" ? "Truck Unload - Vehicle" : "Truck pickup - Vehicle";
  vehicleTruckTitleEl.textContent = vehicleTruckLabelEl.textContent;
  vehicleTruckTextEl.textContent = state.flow === "export"
    ? "Unloads EV, PHEV and ICE units into the terminal."
    : "Collects EV, PHEV and ICE units only.";
  hhTruckLabelEl.textContent = state.flow === "export" ? "Truck Unload - H&H" : "Truck pickup - H&H";
  hhTruckTitleEl.textContent = hhTruckLabelEl.textContent;
  hhTruckTextEl.textContent = state.flow === "export"
    ? "Unloads High & Heavy equipment into the terminal."
    : "Collects High & Heavy equipment only.";

  shipHelpEl.textContent = loading
    ? deckReady
      ? `${item.wo}: Deck ${state.selectedDeck + 1} has capacity. Load ${item.id}.`
      : `${item.wo}: choose a deck with fewer than 5 vehicles.`
    : state.flow === "import"
      ? "Import uses FPOR, VPC/EPC, Loading Area and truck pickup. Vessel deck loading is export only."
      : "Loading starts after all 20 vehicles are parked at FPOR.";

  workbenchLabelEl.textContent = importLoading
    ? "Active import loading work order"
    : processing
    ? "Active import processing work order"
    : loading
      ? "Active loading work order"
      : "Active FPOR work order";
  workbenchTitleEl.textContent = complete ? "All work orders complete" : item.wo;
  workbenchHelpEl.textContent = complete
    ? (state.flow === "import" ? "All import units are processed and loaded on truck pickup." : "TOOT TOOT. Vessel loaded and ready.")
    : importLoading
      ? importActionText(item)
      : processing
      ? importActionText(item)
      : loading
      ? `${item.wo}: fetch ${item.id} from FPOR Zone ${item.target}, drive to ramp, choose a deck, then load.`
      : state.flow === "import"
        ? `${item.wo}: discharge ${item.id}, scan it and park it in FPOR Zone ${item.target}.`
        : `${item.wo}: scan ${item.id} and park it in FPOR Zone ${item.target}.`;

  workbenchEl.classList.toggle("ready", loading || processing || importLoading || (fpor && state.scanned));
  shipCardEl.classList.toggle("ready-loading", loading);
  processCards.forEach((card) => {
    const process = card.dataset.process;
    const ready =
      (truckUnload && (process === truckKindFor(item) || process === "LOADING")) ||
      (processing || importLoading) &&
      ((state.importStep === "toCenter" && process === expectedCenter) ||
        (state.importStep === "processing" && process === expectedCenter) ||
        (state.importStep === "returnFpor" && process === expectedCenter) ||
        (state.importStep === "loadingArea" && state.scanned && process === "LOADING") ||
        (state.importStep === "truck" && process === (expectedCenter === "EPC" ? "HH_TRUCK" : "VEHICLE_TRUCK")));
    card.classList.toggle("ready", ready);
    card.classList.toggle("inactive", state.flow === "export" && (process === "VPC" || process === "EPC"));
  });
  processBtns.forEach((button) => {
    button.disabled = !(processing && state.importStep === "toCenter" && state.scanned && button.dataset.center === expectedCenter);
  });
  executeBtns.forEach((button) => {
    button.disabled = !(processing && state.importStep === "processing" && button.dataset.center === expectedCenter);
  });
  returnCenterBtns.forEach((button) => {
    button.disabled = !(processing && state.importStep === "returnFpor" && button.dataset.center === expectedCenter);
  });
  loadingAreaBtn.disabled = !(importLoading && state.importStep === "loadingArea" && state.scanned);
  loadingAreaBtn.textContent = "Move to Loading Area";
  vehicleTruckBtn.textContent = state.flow === "export" ? "Unload Vehicle Truck" : "Load Vehicle";
  hhTruckBtn.textContent = state.flow === "export" ? "Unload H&H Truck" : "Load H&H";
  vehicleTruckBtn.disabled = !(truckUnload || (importLoading && state.importStep === "truck"));
  hhTruckBtn.disabled = !(truckUnload || (importLoading && state.importStep === "truck"));
  scanBtn.disabled = complete || (!fpor && !vesselUnload && !(processing && state.importStep === "toCenter") && !(importLoading && state.importStep === "loadingArea")) || state.scanned;
  loadBtn.disabled = complete || !deckReady;
  loadBtn.textContent = loading ? `Load ${item.id}` : "Load vehicle";
  document.querySelector("#completeBtn").disabled = processing;
  document.querySelector("#completeBtn").textContent = processing
    ? "Use VPC/EPC buttons"
    : loading
      ? "Use deck + Load"
      : "Follow WO";

  if (complete) {
    actionHintEl.textContent = "All clear. Press Restart for a new 20-unit round.";
  } else if (truckUnload) {
    actionHintEl.textContent = `${item.wo}: use ${truckLabel(truckKindFor(item), "Unload")} for ${item.id}`;
  } else if (vesselUnload && !state.scanned) {
    actionHintEl.textContent = `${item.wo}: scan ${item.id} off Toronto`;
  } else if (vesselUnload) {
    actionHintEl.textContent = `${item.wo}: unload ${item.id} to FPOR Zone ${item.target}`;
  } else if (processing || importLoading) {
    actionHintEl.textContent = importActionText(item);
  } else if (fpor && !state.scanned) {
    actionHintEl.textContent = state.flow === "import"
      ? `${item.wo}: discharge and scan ${item.id}`
      : `${item.wo}: scan ${item.id}`;
  } else if (fpor) {
    actionHintEl.textContent = `${item.wo}: park ${item.category} in FPOR Zone ${item.target}`;
  } else if (state.selectedDeck === null) {
    actionHintEl.textContent = `${item.wo}: choose a vessel deck with free capacity`;
  } else if (!deckReady) {
    actionHintEl.textContent = `Deck ${state.selectedDeck + 1} is full. Choose another deck.`;
  } else {
    actionHintEl.textContent = `${item.wo}: load ${item.id} on Deck ${state.selectedDeck + 1}`;
  }

  renderDeck();
  renderTruckVisuals();
  renderOrders();
  updateAreaCounts();
}

function tick() {
  state.seconds -= 1;
  if (state.seconds <= 0) {
    state.seconds = 0;
    if (state.timer) {
      clearInterval(state.timer);
      state.timer = null;
    }
    startBtn.textContent = "New round";
    addLog(`Round ended with ${state.score} points.`);
  }
  render();
}

function startRound() {
  if (state.timer) {
    clearInterval(state.timer);
    state.timer = null;
    startBtn.textContent = "Start";
    addLog("Round paused.");
    return;
  }

  if (state.seconds === 0 || state.phase === "complete") resetRound();

  state.timer = setInterval(tick, 1000);
  startBtn.textContent = "Pause";
  addLog("Shift started.");
  render();
}

function scanVehicle() {
  const processingScan = state.flow === "import" && state.phase === "processing" && state.importStep === "toCenter";
  const loadingAreaScan = state.flow === "import" && state.phase === "importLoading" && state.importStep === "loadingArea";
  if ((!["fpor", "vesselUnload"].includes(state.phase) && !processingScan && !loadingAreaScan) || state.scanned) return;

  const item = activeVehicle();
  state.scanned = true;
  state.score += 10;
  addLog(processingScan || loadingAreaScan
    ? `${item.wo}: ${item.id} scanned out from FPOR Zone ${item.target}. Next: ${loadingAreaScan ? "Loading Area" : centerFor(item)}.`
    : `${item.wo}: ${item.id} scanned. Next: FPOR Zone ${item.target}.`);
  render();
}

function placeVehicle(zoneName) {
  if (!["fpor", "vesselUnload"].includes(state.phase)) return;

  const item = activeVehicle();
  const zone = document.querySelector(`[data-zone="${zoneName}"]`);
  const correct = zoneName === item.target;
  state.selectedZone = zoneName;

  document.querySelectorAll(".zone").forEach((node) => {
    node.classList.remove("good", "bad");
  });

  if (!state.scanned) {
    state.mistakes += 1;
    state.score = Math.max(0, state.score - 8);
    zone.classList.add("bad");
    addLog(`${item.wo}: scan ${item.id} before parking.`);
    render();
    return;
  }

  if (!correct) {
    state.mistakes += 1;
    state.score = Math.max(0, state.score - 12);
    zone.classList.add("bad");
    addLog(`${item.wo}: ${item.id} belongs in FPOR Zone ${item.target}.`);
    render();
    return;
  }

  zone.classList.add("good");
  state.score += 35;
  state.locations[item.id] = `FPOR-${zoneName}`;
  removeFromDeck(item.id);
  addLog(`${item.wo}: ${item.id} parked at FPOR Zone ${zoneName}.`);
  state.scanned = false;
  state.selectedZone = null;

  if (state.flow === "import") {
    state.current += 1;
    state.loaded = Math.max(0, state.loaded - 1);
    if (state.current >= ROUND_VEHICLE_LIMIT) {
      state.phase = "processing";
      state.processingIndex = 0;
      state.importStep = "toCenter";
      addLog("All import units are at FPOR. VPC/EPC processing work orders started.");
    } else {
      state.phase = "vesselUnload";
    }
    render();
    return;
  }

  state.current += 1;
  if (state.current >= ROUND_VEHICLE_LIMIT) {
    state.phase = "loading";
    state.loadingIndex = 0;
    state.selectedDeck = null;
    addLog("All vehicles are at FPOR. Vessel loading work orders started.");
  } else {
    state.phase = "truckUnload";
  }

  render();
}

function removeFromDeck(vehicleId) {
  state.deckLoads = state.deckLoads.map((loads) => loads.filter((id) => id !== vehicleId));
}

function selectDeck(deckIndex) {
  if (state.phase !== "loading") return;

  state.selectedDeck = deckIndex;
  if (state.deckLoads[deckIndex].length >= DECK_CAPACITY) {
    addLog(`Deck ${deckIndex + 1} is full. Choose a deck with free capacity.`);
  } else {
    addLog(`Deck ${deckIndex + 1} selected for loading.`);
  }
  render();
}

function loadVehicle() {
  if (state.phase !== "loading") return;

  const item = activeVehicle();
  if (state.selectedDeck === null) {
    addLog(`${item.wo}: choose a deck before loading.`);
    render();
    return;
  }

  if (state.deckLoads[state.selectedDeck].length >= DECK_CAPACITY) {
    state.mistakes += 1;
    state.score = Math.max(0, state.score - 10);
    addLog(`Deck ${state.selectedDeck + 1} is full. Max 5 vehicles per deck.`);
    render();
    return;
  }

  state.deckLoads[state.selectedDeck].push(item.id);
  state.locations[item.id] = `DECK-${state.selectedDeck + 1}`;
  state.score += 45;
  state.loaded += 1;
  addLog(`${item.wo}: ${item.id} loaded on Deck ${state.selectedDeck + 1}.`);
  state.loadingIndex += 1;
  state.selectedDeck = null;

  if (state.loaded >= ROUND_VEHICLE_LIMIT) {
    finishRound();
    return;
  }

  render();
}

function completeOrder(center = null) {
  if (state.flow === "import" && state.phase === "processing" && state.importStep === "processing") {
    const item = activeVehicle();
    const expectedCenter = centerFor(item);
    if (center && center !== expectedCenter) {
      state.mistakes += 1;
      state.score = Math.max(0, state.score - 12);
      addLog(`${item.wo}: ${item.category} must execute WO in ${expectedCenter}, not ${center}.`);
      render();
      return;
    }
    state.importStep = "returnFpor";
    state.score += 35;
    addLog(`${item.wo}: processing complete at ${centerFor(item)}. Return to FPOR.`);
    render();
    return;
  }

  addLog("Follow the active WO: use Scan, FPOR zones, processing centers, deck selection, and Load vehicle.");
}

function moveToProcessingCenter(center) {
  if (state.flow !== "import" || state.phase !== "processing" || state.importStep !== "toCenter") return;

  const item = activeVehicle();
  const expectedCenter = centerFor(item);
  if (!state.scanned) {
    state.mistakes += 1;
    state.score = Math.max(0, state.score - 8);
    addLog(`${item.wo}: scan ${item.id} out from FPOR Zone ${item.target} before moving to ${expectedCenter}.`);
    render();
    return;
  }

  if (center !== expectedCenter) {
    state.mistakes += 1;
    state.score = Math.max(0, state.score - 12);
    addLog(`${item.wo}: ${item.category} must go to ${expectedCenter}, not ${center}.`);
    render();
    return;
  }

  state.importStep = "processing";
  state.locations[item.id] = center;
  state.scanned = false;
  state.score += 25;
  addLog(`${item.wo}: ${item.id} moved to ${center}. Execute the WO.`);
  render();
}

function returnToFpor(center = null) {
  if (state.flow !== "import" || state.phase !== "processing" || state.importStep !== "returnFpor") return;

  const item = activeVehicle();
  const expectedCenter = centerFor(item);
  if (center && center !== expectedCenter) {
    state.mistakes += 1;
    state.score = Math.max(0, state.score - 12);
    addLog(`${item.wo}: ${item.category} must return from ${expectedCenter}, not ${center}.`);
    render();
    return;
  }
  state.locations[item.id] = `FPOR-${item.target}`;
  state.score += 20;
  addLog(`${item.wo}: ${item.id} returned to FPOR Zone ${item.target}.`);
  state.processingIndex += 1;

  if (state.processingIndex >= ROUND_VEHICLE_LIMIT) {
    state.phase = "importLoading";
    state.importLoadingIndex = 0;
    state.importStep = "loadingArea";
    addLog("All units are processed and back at FPOR. Truck loading work orders started.");
    render();
    return;
  }

  state.importStep = "toCenter";
  render();
}

function moveToLoadingArea() {
  if (state.flow !== "import" || state.phase !== "importLoading" || state.importStep !== "loadingArea") return;

  const item = activeVehicle();
  if (!state.scanned) {
    state.mistakes += 1;
    state.score = Math.max(0, state.score - 8);
    addLog(`${item.wo}: scan ${item.id} out from FPOR Zone ${item.target} before moving to Loading Area.`);
    render();
    return;
  }

  state.score += 30;
  state.locations[item.id] = "LOADING";
  state.scanned = false;
  state.importStep = "truck";
  addLog(`${item.wo}: ${item.id} moved to Loading Area. Load the correct truck pickup.`);
  render();
}

function loadOutboundTruck(kind) {
  if (state.flow !== "import" || state.phase !== "importLoading" || state.importStep !== "truck") return;

  const item = activeVehicle();
  const expectedKind = centerFor(item) === "EPC" ? "HH_TRUCK" : "VEHICLE_TRUCK";
  if (kind !== expectedKind) {
    state.mistakes += 1;
    state.score = Math.max(0, state.score - 12);
    addLog(`${item.wo}: ${item.category} must load on ${expectedKind === "HH_TRUCK" ? "Truck pickup - H&H" : "Truck pickup - Vehicle"}.`);
    render();
    return;
  }

  if (state.truckLoads[kind].length >= truckCapacity(kind)) {
    state.truckLoads[kind] = [];
    state.truckNumbers[kind] += 1;
    addLog(`${truckLabel(kind)} ${state.truckNumbers[kind] - 1} is full. New truck ready.`);
  }

  state.locations[item.id] = kind;
  state.truckLoads[kind].push(item.id);
  state.importDelivered += 1;
  state.loaded += 1;
  state.importLoadingIndex += 1;
  state.importStep = "loadingArea";
  state.score += 40;
  addLog(`${item.wo}: ${item.id} loaded on ${truckLabel(kind)} slot ${state.truckLoads[kind].length}/${truckCapacity(kind)}.`);

  if (state.importDelivered >= ROUND_VEHICLE_LIMIT) {
    finishRound();
    return;
  }

  render();
}

function unloadExportTruck(kind) {
  if (state.flow !== "export" || state.phase !== "truckUnload") return;

  const item = activeVehicle();
  const expectedKind = truckKindFor(item);
  if (kind !== expectedKind) {
    state.mistakes += 1;
    state.score = Math.max(0, state.score - 12);
    addLog(`${item.wo}: ${item.category} must unload from ${truckLabel(expectedKind, "Unload")}.`);
    render();
    return;
  }

  state.locations[item.id] = "UNLOADING";
  state.phase = "fpor";
  state.score += 20;
  addLog(`${item.wo}: ${item.id} unloaded to Loading Area. Next: scan and park at FPOR.`);
  render();
}

function handleVehicleTruck() {
  if (state.flow === "export") unloadExportTruck("VEHICLE_TRUCK");
  else loadOutboundTruck("VEHICLE_TRUCK");
}

function handleHhTruck() {
  if (state.flow === "export") unloadExportTruck("HH_TRUCK");
  else loadOutboundTruck("HH_TRUCK");
}

document.querySelectorAll(".mode-switch button").forEach((button) => {
  button.addEventListener("click", () => {
    state.flow = button.dataset.flow;
    document.querySelectorAll(".mode-switch button").forEach((node) => {
      node.classList.toggle("active", node === button);
    });
    resetRound();
    addLog(`${button.textContent} flow selected.`);
  });
});

document.querySelectorAll(".zone").forEach((zone) => {
  zone.addEventListener("click", () => placeVehicle(zone.dataset.zone));
});

startBtn.addEventListener("click", startRound);
restartBtn.addEventListener("click", resetRound);
scanBtn.addEventListener("click", scanVehicle);
document.querySelector("#completeBtn").addEventListener("click", completeOrder);
loadBtn.addEventListener("click", loadVehicle);
processBtns.forEach((button) => {
  button.addEventListener("click", () => moveToProcessingCenter(button.dataset.center));
});
executeBtns.forEach((button) => {
  button.addEventListener("click", () => completeOrder(button.dataset.center));
});
returnCenterBtns.forEach((button) => {
  button.addEventListener("click", () => returnToFpor(button.dataset.center));
});
loadingAreaBtn.addEventListener("click", moveToLoadingArea);
vehicleTruckBtn.addEventListener("click", handleVehicleTruck);
hhTruckBtn.addEventListener("click", handleHhTruck);

assignWorkOrders();
render();
addLog("Terminal is ready.");

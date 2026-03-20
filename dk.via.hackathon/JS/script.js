const rooms = [
  {
    id: "library",
    name: "Grand Library",
    short: "Library",
    type: "Study Zone",
    floor: "Ground floor",
    building: "Learning Commons",
    position: { top: 12, left: 24 },
    description: "Quiet study rooms, research help desks, and group work areas close to the main courtyard.",
    interests: 9,
    activities: [
      {
        title: "Research Skills Drop-In",
        time: "Monday, 10:00 - 12:00",
        type: "Workshop",
        description: "Librarians guide students through citation tools, academic search methods, and source evaluation."
      },
      {
        title: "Evening Study Circle",
        time: "Wednesday, 18:30 - 20:00",
        type: "Peer Study",
        description: "An open study group for first-year students preparing for upcoming coursework deadlines."
      }
    ]
  },
  {
    id: "auditorium",
    name: "Innovation Auditorium",
    short: "Auditorium",
    type: "Presentation Hall",
    floor: "Level 1",
    building: "Tech Forum",
    position: { top: 31, left: 68 },
    description: "Large event hall used for talks, guest lectures, startup showcases, and campus briefings.",
    interests: 14,
    activities: [
      {
        title: "Campus Founder Talks",
        time: "Thursday, 16:00 - 18:00",
        type: "Speaker Event",
        description: "Student founders and alumni discuss building projects, finding funding, and launching ideas."
      }
    ]
  },
  {
    id: "lab-a",
    name: "Engineering Lab A",
    short: "Lab A",
    type: "Practical Lab",
    floor: "Level 2",
    building: "Applied Sciences",
    position: { top: 58, left: 32 },
    description: "Hands-on workspace for prototyping, experiments, electronics sessions, and team project builds.",
    interests: 11,
    activities: [
      {
        title: "Robotics Build Session",
        time: "Tuesday, 15:30 - 18:00",
        type: "Club Session",
        description: "Student teams test sensors, calibrate drive systems, and prepare for the inter-campus challenge."
      }
    ]
  },
  {
    id: "studio",
    name: "Media Studio",
    short: "Studio",
    type: "Creative Space",
    floor: "Level 1",
    building: "Arts Wing",
    position: { top: 83, left: 73 },
    description: "Flexible studio for design critiques, digital production workshops, and media collaboration.",
    interests: 6,
    activities: [
      {
        title: "Portfolio Review Hour",
        time: "Friday, 11:00 - 12:30",
        type: "Mentoring",
        description: "Design tutors review student portfolios and give actionable feedback before internship applications."
      }
    ]
  }
];

const mapLegend = document.getElementById("mapLegend");
const areaTooltip = document.getElementById("areaTooltip");
const activityButtons = document.getElementById("activityButtons");
const activityDetailPanel = document.getElementById("activityDetailPanel");
const activityDetailTitle = document.getElementById("activityDetailTitle");
const activityDetailSubtitle = document.getElementById("activityDetailSubtitle");
const activityDetailBody = document.getElementById("activityDetailBody");
const roomDetailPanel = document.getElementById("roomDetailPanel");
const activitiesPanel = document.getElementById("activitiesPanel");
const selectedRoomName = document.getElementById("selectedRoomName");
const selectedRoomDescription = document.getElementById("selectedRoomDescription");
const roomMeta = document.getElementById("roomMeta");
const selectedRoomActivities = document.getElementById("selectedRoomActivities");
const showInterestButton = document.getElementById("showInterestButton");
const focusFormButton = document.getElementById("focusFormButton");
const interestMessage = document.getElementById("interestMessage");
const roomCount = document.getElementById("roomCount");
const activityCount = document.getElementById("activityCount");
const interestCount = document.getElementById("interestCount");
const jumpToMap = document.getElementById("jumpToMap");
const jumpToForm = document.getElementById("jumpToForm");
const activityFormSection = document.getElementById("activityFormSection");
const activityForm = document.getElementById("activityForm");

let selectedRoomId = null;
let selectedActivityLabel = null;

const areaMessages = {
  "Auditorium 1": "This is Auditorium 1. Drama club rehearsals, debates, and student performances happen here.",
  "Oasis": "This is Oasis. Students gather here for board games, chess club, and relaxed social events.",
  "Makerspace": "This is the Makerspace. Robotics club, hackathon builds, and engineering projects happen here.",
  "Musical Room": "This is the Musical Room. Choir practice, band rehearsal, and open mic sessions happen here.",
  "Dramatorium": "This is the Dramatorium. Theatre workshops, acting classes, and improv nights happen here.",
  "Atrium": "This is the Atrium. Campus fairs, club showcases, and welcome events happen here.",
  "Canteen Bar": "This is the Canteen Bar. Student socials, coffee meetups, and networking breaks happen here.",
  "Outdoors": "This is the Outdoors area. Football meetups, fitness sessions, and outdoor events happen here.",
  "School Kitchen": "This is the School Kitchen. Cooking workshops, baking sessions, and food society activities happen here.",
  "Hub C": "This is Hub C. Coding club, study groups, and startup brainstorming sessions happen here.",
  "Hub A": "This is Hub A. Group assignments, language exchange, and peer mentoring happen here.",
  "Hub B": "This is Hub B. Design team meetings, tutoring, and student collaboration happen here.",
  "Library": "This is the Library. Quiet study, book club sessions, and research workshops happen here.",
  "C02.17": "This is room C02.17. Seminar classes, revision sessions, and guest talks happen here.",
  "C02.15": "This is room C02.15. Presentation practice, tutorials, and case-study discussions happen here.",
  "A02.01": "This is room A02.01. Business workshops, lectures, and teamwork sessions happen here.",
  "B02.07": "This is room B02.07. Student society meetings and collaborative class activities happen here.",
  "C03.17": "This is room C03.17. Academic seminars and project presentations happen here.",
  "XR Lab": "This is the XR Lab. Virtual reality demos, immersive design, and simulation workshops happen here.",
  "C03.12": "This is room C03.12. Media studies classes and creative project reviews happen here.",
  "C03.11": "This is room C03.11. Lecture sessions, tutorials, and exam preparation happen here.",
  "Workshop Room": "This is the Workshop Room. Practical training, prototyping, and hands-on classes happen here.",
  "B03.12": "This is room B03.12. Support classes, mentoring sessions, and group study happen here.",
  "A03.08": "This is room A03.08. Strategy games club and student project meetings happen here.",
  "A03.01a": "This is room A03.01a. Language classes and conversation practice happen here.",
  "A03.02": "This is room A03.02. Tutorials, workshops, and collaborative coursework happen here.",
  "A03.17": "This is room A03.17. Research discussions and advanced seminars happen here.",
  "A03.04": "This is room A03.04. Writing labs, tutoring, and academic coaching happen here.",
  "B03.01": "This is room B03.01. Student leadership meetings and planning sessions happen here.",
  "B03.08": "This is room B03.08. Revision classes and club committee meetings happen here.",
  "B03.06": "This is room B03.06. Presentation coaching and teamwork workshops happen here.",
  "B03.10": "This is room B03.10. Classroom teaching and peer learning sessions happen here.",
  "C04.16": "This is room C04.16. Chess club matches and strategy workshops happen here.",
  "C04.14": "This is room C04.14. Drama script reading and rehearsal prep happen here.",
  "C04.13a": "This is room C04.13a. Debate society meetings and speaking practice happen here.",
  "C04.18": "This is room C04.18. Film club screenings and media discussions happen here.",
  "A04.02": "This is room A04.02. Basketball tactics meetings and sports society planning happen here.",
  "A04.05": "This is room A04.05. Entrepreneurship club workshops and pitch practice happen here.",
  "A04.07": "This is room A04.07. Student mentoring and academic support sessions happen here.",
  "A04.01a": "This is room A04.01a. Coding workshops and software team meetings happen here.",
  "B04.08b": "This is room B04.08b. Art club sessions and illustration practice happen here.",
  "B04.07": "This is room B04.07. Basketball club briefings and team meetings happen here.",
  "B04.05": "This is room B04.05. Football analysis meetings and society planning happen here.",
  "B04.01": "This is room B04.01. Student council meetings and campus project discussions happen here."
};

const activityExtras = {
  "Auditorium 1": {
    club: "Drama Club",
    schedule: "Tuesday and Thursday, 18:00",
    details: "Students use this hall for stage blocking, public speaking practice, live readings, and end-of-term performances. It is one of the main spaces for larger student-led productions."
  },
  "Oasis": {
    club: "Chess and Board Games",
    schedule: "Wednesday, 16:00",
    details: "Oasis is used for casual campus socials, strategic board games, and drop-in club meetings. It works well for low-pressure activities where students can join at any time."
  },
  "Makerspace": {
    club: "Robotics and Build Lab",
    schedule: "Friday, 15:00",
    details: "Teams prototype hardware, test components, and work on hackathon or design-challenge projects here. The room is ideal for practical experimentation and team problem solving."
  },
  "Musical Room": {
    club: "Choir and Band Practice",
    schedule: "Monday, 17:30",
    details: "Students rehearse vocals, instrumental pieces, and collaborative performances in this room. It is also used for smaller auditions and sound checks."
  },
  "Dramatorium": {
    club: "Theatre Workshop",
    schedule: "Thursday, 17:00",
    details: "This space supports acting drills, improvisation, movement practice, and rehearsal coaching. It is best suited to active sessions that need open floor space."
  },
  "Atrium": {
    club: "Campus Events",
    schedule: "Varies by week",
    details: "The atrium is where major student fairs, awareness campaigns, and inter-club showcases are staged. It is the most visible place for attracting drop-in interest from across campus."
  },
  "Canteen Bar": {
    club: "Student Social Lounge",
    schedule: "Daily social period",
    details: "Students use this zone for informal networking, coffee chats, and quick community meetups. It works well for relaxed events that do not need a formal booking."
  },
  "Outdoors": {
    club: "Football and Fitness",
    schedule: "Afternoons and weekends",
    details: "This open area is suited to outdoor training, student sports meetups, and fresh-air events. Clubs often use it for warm-ups, mini matches, and welcome-week activities."
  },
  "School Kitchen": {
    club: "Cooking Society",
    schedule: "Wednesday, 18:00",
    details: "The kitchen supports practical cooking workshops, recipe-sharing sessions, and food preparation for campus events. It is useful for hands-on, small-group activity formats."
  }
};

const markerPositionOverrides = {
  "Hub C": { x: 445, y: 275 },
  "Hub A": { x: 495, y: 540 },
  "Hub B": { x: 255, y: 540 },
  "Library": { x: 215, y: 650 },
  "C02.17": { x: 345, y: 340 },
  "C02.15": { x: 390, y: 265 },
  "A02.01": { x: 575, y: 688 },
  "B02.07": { x: 177, y: 495 },
  "C03.17": { x: 430, y: 238 },
  "XR Lab": { x: 333, y: 176 },
  "C03.12": { x: 446, y: 112 },
  "C03.11": { x: 506, y: 96 },
  "Workshop Room": { x: 552, y: 332 },
  "B03.12": { x: 214, y: 438 },
  "A03.08": { x: 570, y: 652 },
  "A03.01a": { x: 666, y: 514 },
  "A03.02": { x: 667, y: 648 },
  "A03.17": { x: 470, y: 723 },
  "A03.04": { x: 586, y: 757 },
  "B03.01": { x: 291, y: 596 },
  "B03.08": { x: 123, y: 588 },
  "B03.06": { x: 122, y: 720 },
  "B03.10": { x: 123, y: 397 },
  "C04.16": { x: 340, y: 279 },
  "C04.14": { x: 339, y: 165 },
  "C04.13a": { x: 455, y: 100 },
  "C04.18": { x: 447, y: 343 },
  "A04.02": { x: 674, y: 648 },
  "A04.05": { x: 548, y: 764 },
  "A04.07": { x: 469, y: 722 },
  "A04.01a": { x: 675, y: 513 },
  "B04.08b": { x: 132, y: 390 },
  "B04.07": { x: 133, y: 584 },
  "B04.05": { x: 122, y: 722 },
  "B04.01": { x: 304, y: 596 }
};

function getActivityInfo(label) {
  const message = areaMessages[label] || `This is ${label}.`;
  const extra = activityExtras[label] || {
    club: "Student Activity",
    schedule: "Weekly session",
    details: `${label} supports student-led workshops, club meetings, and collaborative learning sessions. The space can host small groups, guided practice, and community-building activities throughout the semester.`
  };

  return {
    label,
    message,
    ...extra
  };
}

function totalActivities() {
  return rooms.reduce((sum, room) => sum + room.activities.length, 0);
}

function totalInterests() {
  return rooms.reduce((sum, room) => sum + room.interests, 0);
}

function getSelectedRoom() {
  return rooms.find((room) => room.id === selectedRoomId) || null;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function updateSummary() {
  roomCount.textContent = rooms.length;
  activityCount.textContent = totalActivities();
  interestCount.textContent = totalInterests();
}

function renderLegend() {
  mapLegend.innerHTML = rooms
    .map((room) => `<span class="pill">${room.short}: ${room.activities.length} activities</span>`)
    .join("");
}

function renderSelectedRoom() {
  const room = getSelectedRoom();

  if (!room) {
    roomDetailPanel.classList.add("is-hidden");
    activitiesPanel.classList.add("is-hidden");
    roomMeta.innerHTML = "";
    selectedRoomActivities.innerHTML = "";
    showInterestButton.disabled = true;
    focusFormButton.disabled = true;
    interestMessage.textContent = "";
    return;
  }

  roomDetailPanel.classList.remove("is-hidden");
  activitiesPanel.classList.remove("is-hidden");
  selectedRoomName.textContent = room.name;
  selectedRoomDescription.textContent = room.description;
  roomMeta.innerHTML = `
    <span>${escapeHtml(room.building)}</span>
    <span>${escapeHtml(room.floor)}</span>
    <span>${escapeHtml(room.type)}</span>
  `;
  interestMessage.textContent = `${room.interests} people have shown interest in this room so far.`;
  showInterestButton.disabled = false;
  focusFormButton.disabled = false;

  if (!room.activities.length) {
    selectedRoomActivities.innerHTML = '<div class="empty-state">This room has no activities yet. Add the first one using the form below.</div>';
    return;
  }

  selectedRoomActivities.innerHTML = room.activities
    .map((activity) => `
      <article class="activity-card">
        <header>
          <div>
            <h3>${escapeHtml(activity.title)}</h3>
            <p>${escapeHtml(activity.time)}</p>
          </div>
          <span class="tag">${escapeHtml(activity.type)}</span>
        </header>
        <p>${escapeHtml(activity.description)}</p>
      </article>
    `)
    .join("");
}

function render() {
  updateSummary();
  renderLegend();
  renderSelectedRoom();
}

function renderActivityButtons() {
  const labels = [...new Set([...document.querySelectorAll("area")].map((area) => area.dataset.label || area.getAttribute("alt")).filter(Boolean))];

  activityButtons.innerHTML = labels
    .map((label) => `
      <button class="activity-chip${selectedActivityLabel === label ? " active" : ""}" type="button" data-activity-label="${escapeHtml(label)}">
        ${escapeHtml(label)}
      </button>
    `)
    .join("");

  activityButtons.querySelectorAll("[data-activity-label]").forEach((button) => {
    button.addEventListener("click", () => {
      selectActivity(button.dataset.activityLabel, true);
    });
  });
}

function renderActivityDetail(label) {
  if (!label) {
    activityDetailPanel.classList.add("is-hidden");
    activityDetailTitle.textContent = "";
    activityDetailSubtitle.textContent = "";
    activityDetailBody.innerHTML = "";
    return;
  }

  const info = getActivityInfo(label);
  activityDetailPanel.classList.remove("is-hidden");
  activityDetailTitle.textContent = info.label;
  activityDetailSubtitle.textContent = info.message;
  activityDetailBody.innerHTML = `
    <article class="activity-detail-card">
      <div class="activity-detail-meta">
        <span>${escapeHtml(info.club)}</span>
        <span>${escapeHtml(info.schedule)}</span>
      </div>
      <h3>About this activity</h3>
      <p>${escapeHtml(info.details)}</p>
    </article>
  `;
}

function selectActivity(label, scrollToDetail = false) {
  selectedActivityLabel = label;
  renderActivityButtons();
  renderActivityDetail(label);

  if (scrollToDetail) {
    activityDetailPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function getAreaCenter(coords, shape) {
  const values = coords.split(",").map((value) => Number(value.trim()));
  if (!values.length || values.some((value) => Number.isNaN(value))) {
    return null;
  }

  if (shape === "circle") {
    return { x: values[0], y: values[1] };
  }

  if (shape === "rect") {
    return {
      x: (values[0] + values[2]) / 2,
      y: (values[1] + values[3]) / 2
    };
  }

  let minX = values[0];
  let maxX = values[0];
  let minY = values[1];
  let maxY = values[1];

  for (let index = 0; index < values.length; index += 2) {
    const x = values[index];
    const y = values[index + 1];
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }

  return {
    x: (minX + maxX) / 2,
    y: (minY + maxY) / 2
  };
}

function scaleAreaMap(image) {
  if (!image.useMap || !image.naturalWidth || !image.naturalHeight || !image.clientWidth || !image.clientHeight) {
    return;
  }

  const mapName = image.useMap.replace("#", "");
  const map = document.querySelector(`map[name="${mapName}"]`);
  const markerLayer = image.parentElement.querySelector(".map-marker-layer");

  if (!map || !markerLayer) {
    return;
  }

  const scaleX = image.clientWidth / image.naturalWidth;
  const scaleY = image.clientHeight / image.naturalHeight;

  markerLayer.innerHTML = "";

  map.querySelectorAll("area").forEach((area, index) => {
    if (!area.dataset.originalCoords) {
      area.dataset.originalCoords = area.coords;
    }

    const originalCoords = area.dataset.originalCoords
      .split(",")
      .map((value) => Number(value.trim()));

    const scaledCoords = originalCoords.map((value, coordIndex) => {
      return Math.round(value * (coordIndex % 2 === 0 ? scaleX : scaleY));
    });

    area.coords = scaledCoords.join(",");

    const defaultCenter = getAreaCenter(area.dataset.originalCoords, area.shape.toLowerCase());
    const label = area.dataset.label || area.alt || area.title || `Area ${index + 1}`;
    const markerCenter = markerPositionOverrides[label] || defaultCenter;
    if (!markerCenter) {
      return;
    }

    const marker = document.createElement("span");
    marker.className = "map-marker";
    marker.textContent = label;
    marker.dataset.label = label;
    marker.dataset.message = area.dataset.message || `This is ${marker.dataset.label}.`;
    marker.style.left = `${markerCenter.x * scaleX}px`;
    marker.style.top = `${markerCenter.y * scaleY}px`;
    marker.dataset.areaIndex = index.toString();
    marker.addEventListener("mouseenter", showMarkerTooltip);
    marker.addEventListener("mousemove", moveAreaTooltip);
    marker.addEventListener("mouseleave", () => {
      marker.classList.remove("is-active");
      hideAreaTooltip();
    });
    markerLayer.appendChild(marker);
    area.dataset.markerIndex = index.toString();
  });
}

function scaleAllImageMaps() {
  document.querySelectorAll(".map-image").forEach((image) => {
    scaleAreaMap(image);
  });
}

function setMarkerState(area, isActive) {
  const markerLayer = area.closest("map")?.previousElementSibling;
  if (!markerLayer || !area.dataset.markerIndex) {
    return;
  }

  const marker = markerLayer.querySelector(`[data-area-index="${area.dataset.markerIndex}"]`);
  if (!marker) {
    return;
  }

  marker.classList.toggle("is-active", isActive);
}

function showAreaTooltip(event) {
  const label = event.target.dataset.label || event.target.getAttribute("alt");
  if (!label) {
    return;
  }

  const message = event.target.dataset.message || `This is ${label}.`;
  areaTooltip.innerHTML = `<strong>${escapeHtml(label)}</strong>${escapeHtml(message)}`;
  areaTooltip.classList.add("visible");
  areaTooltip.setAttribute("aria-hidden", "false");
  positionTooltip(event);
  setMarkerState(event.target, true);
}

function showMarkerTooltip(event) {
  const label = event.target.dataset.label;
  const message = event.target.dataset.message || `This is ${label}.`;
  if (!label) {
    return;
  }

  areaTooltip.innerHTML = `<strong>${escapeHtml(label)}</strong>${escapeHtml(message)}`;
  areaTooltip.classList.add("visible");
  areaTooltip.setAttribute("aria-hidden", "false");
  positionTooltip(event);
  event.target.classList.add("is-active");
}

function positionTooltip(event) {
  const offsetX = -8;
  const offsetY = -10;
  const clientX = event.clientX ?? 0;
  const clientY = event.clientY ?? 0;
  const tooltipWidth = areaTooltip.offsetWidth;
  const tooltipHeight = areaTooltip.offsetHeight;
  const viewportRight = window.innerWidth;
  const viewportBottom = window.innerHeight;

  let left = clientX + offsetX;
  let top = clientY + offsetY;

  if (left < 8) {
    left = clientX + 8;
  }

  if (top < 8) {
    top = clientY + 8;
  }

  if (left + tooltipWidth > viewportRight - 8) {
    left = clientX - tooltipWidth - 8;
  }

  if (top + tooltipHeight > viewportBottom - 8) {
    top = clientY - tooltipHeight - 8;
  }

  areaTooltip.style.left = `${left}px`;
  areaTooltip.style.top = `${top}px`;
}

function moveAreaTooltip(event) {
  if (!areaTooltip.classList.contains("visible")) {
    return;
  }

  positionTooltip(event);
}

function hideAreaTooltip() {
  areaTooltip.classList.remove("visible");
  areaTooltip.setAttribute("aria-hidden", "true");
}

document.querySelectorAll("area").forEach((area) => {
  const title = area.getAttribute("title");
  if (title) {
    area.dataset.label = title;
    area.removeAttribute("title");
  }

  const label = area.dataset.label || area.getAttribute("alt");
  if (label && areaMessages[label]) {
    area.dataset.message = areaMessages[label];
  }

  area.addEventListener("mouseenter", showAreaTooltip);
  area.addEventListener("mousemove", moveAreaTooltip);
  area.addEventListener("mouseleave", () => {
    setMarkerState(area, false);
    hideAreaTooltip();
  });
  area.addEventListener("focus", showAreaTooltip);
  area.addEventListener("blur", () => {
    setMarkerState(area, false);
    hideAreaTooltip();
  });
  area.addEventListener("click", (event) => {
    event.preventDefault();
    selectActivity(label, true);
  });
});

window.addEventListener("resize", scaleAllImageMaps);

document.querySelectorAll(".map-image").forEach((image) => {
  image.addEventListener("load", scaleAllImageMaps);
});

jumpToMap.addEventListener("click", () => {
  document.getElementById("mapSection").scrollIntoView({ behavior: "smooth", block: "start" });
});

jumpToForm.addEventListener("click", () => {
  activityFormSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

focusFormButton.addEventListener("click", () => {
  activityFormSection.scrollIntoView({ behavior: "smooth", block: "start" });
  document.getElementById("activityTitle").focus();
});

showInterestButton.addEventListener("click", () => {
  const room = getSelectedRoom();
  if (!room) {
    return;
  }

  room.interests += 1;
  interestMessage.textContent = `Interest recorded for ${room.name}. ${room.interests} people have shown interest in this room so far.`;
  updateSummary();
});

activityForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const room = getSelectedRoom();
  if (!room) {
    alert("Select a room on the map before adding an activity.");
    return;
  }

  const formData = new FormData(activityForm);
  const title = formData.get("activityTitle").toString().trim();
  const time = formData.get("activityTime").toString().trim();
  const type = formData.get("activityType").toString().trim();
  const description = formData.get("activityDescription").toString().trim();

  if (!title || !time || !type || !description) {
    interestMessage.textContent = "Complete all activity fields before submitting.";
    roomDetailPanel.classList.remove("is-hidden");
    return;
  }

  room.activities.unshift({
    title,
    time,
    type,
    description
  });

  activityForm.reset();
  render();
  interestMessage.textContent = `New activity added to ${room.name}.`;
  document.getElementById("mapSection").scrollIntoView({ behavior: "smooth", block: "start" });
});

render();
renderActivityButtons();
scaleAllImageMaps();

const activityExtras = {
  "Auditorium 1":  { club: "Debate club",             schedule: "Tuesday & Thursday, 18:00", details: "Place for students to come together and debate about stuff, like whether milk or cereal goes first in the bowl." },
  "Oasis":         { club: "Chess club",   schedule: "Wednesday, 16:00",          details: "Chess club for people to come together and mate." },
  "Makerspace":    { club: "3D printing and vinyl-cutting",  schedule: "Tuesday, 12:00",             details: "Students can cook up interesting stuff with their imagination." },
  "Musical Room":  { club: "Mongolian throat singing", schedule: "Monday, 00:00",             details: "Students can practice the ancient art of mongolian throat singing at midnight." },
  "Dramatorium":   { club: "Drama Club",        schedule: "Thursday, 17:00",           details: "For the drama kings and queens of the world to shine bright like a diamond." },
  "Atrium":        { club: "Hot dog eating contest",           schedule: "Wednesday 12:00",            details: "Who can eat the most hotdogs at VIA? Come find out this wednesday!" },
  "Canteen Bar":   { club: "Friday Bar",   schedule: "Friday, of course",       details: "Drink your academic stress away with other stressed out students this friday :)" },
  "Outdoors":      { club: "Football",    schedule: "Afternoons and weekends",   details: "Kick around a footbal and have a great time in the summer." },
  "School Kitchen":{ club: "Cooking club",         schedule: "Tuesday, 18:00",          details: "Come learn how to make yummy food." },
  "Hub C":         { club: "Coding Club",             schedule: "Monday, 16:00",             details: "For software students struggling with programming work, come by Hub-C to get help from fellow students." },
  "Hub A":         { club: "Architecture enthusiasts club",        schedule: "Monday, 15:00",                    details: "For architecture students struggling to build a house, come by Hub.B to get help from proffesional minecraft players." },
  "Hub B":         { club: "Pokemon enthusiasts club",        schedule: "Friday 17:00",                    details: "Geek out over pokemons with fellow pokemon enthusiasts! " },
  "Library":       { club: "Who can read a book backwards the fastest?",      schedule: "Thursday, 13:00",                details: "Competition to see who can read a book backwards the fastest." },
  "Workshop Room": { club: "Practical Sessions",      schedule: "Weekly",                    details: "This room supports hands-on workshops, guided practicals, and small-group skill-building sessions." },
  "XR Lab":        { club: "XR and Immersive Tech",   schedule: "Thursday, 15:00",           details: "Students can find out about cool futuristic tech stuff wow." },
};

const areaTooltip         = document.getElementById("areaTooltip");
const activityDetailPanel = document.getElementById("activityDetailPanel");
const activityDetailTitle = document.getElementById("activityDetailTitle");
const activityDetailSubtitle = document.getElementById("activityDetailSubtitle");
const activityDetailBody  = document.getElementById("activityDetailBody");

function showActivityDetail(label) {
  const extra = activityExtras[label] || {
    club: " ",
    schedule: " ",
  };
  activityDetailTitle.textContent    = label;
  activityDetailSubtitle.textContent = extra.details;
  activityDetailBody.innerHTML = `
    <article class="activity-detail-card">
      <div class="activity-detail-meta">
        <span>${extra.club}</span>
        <span>${extra.schedule}</span>
      </div>
    </article>`;
  activityDetailPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function getAreaCenter(coords, shape) {
  const values = coords.split(",").map(Number);
  if (shape === "circle") return { x: values[0], y: values[1] };
  if (shape === "rect")   return { x: (values[0] + values[2]) / 2, y: (values[1] + values[3]) / 2 };
  let minX = values[0], maxX = values[0], minY = values[1], maxY = values[1];
  for (let i = 0; i < values.length; i += 2) {
    minX = Math.min(minX, values[i]);   maxX = Math.max(maxX, values[i]);
    minY = Math.min(minY, values[i+1]); maxY = Math.max(maxY, values[i+1]);
  }
  return { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
}
function scaleAreaMap(image) {
  const map = document.querySelector(`map[name="${image.useMap.replace("#", "")}"]`);
  const markerLayer = image.parentElement.querySelector(".map-marker-layer");
  const scaleX = image.clientWidth  / image.naturalWidth;
  const scaleY = image.clientHeight / image.naturalHeight;
  markerLayer.innerHTML = "";

  map.querySelectorAll("area").forEach((area, index) => {
    const label  = area.alt || `Area ${index + 1}`;
    const center = getAreaCenter(area.coords, area.shape.toLowerCase());
    const marker = document.createElement("span");
    marker.className   = "map-marker";
    marker.textContent = label;
    marker.style.left  = `${center.x * scaleX}px`;
    marker.style.top   = `${center.y * scaleY}px`;
    marker.addEventListener("click",  () => showActivityDetail(label));

    markerLayer.appendChild(marker);
  });
}
function scaleAllImageMaps() {
  document.querySelectorAll(".map-image").forEach(scaleAreaMap);
}
window.addEventListener("resize", scaleAllImageMaps);
document.querySelectorAll(".map-image").forEach(img => img.addEventListener("load", scaleAllImageMaps));
scaleAllImageMaps();
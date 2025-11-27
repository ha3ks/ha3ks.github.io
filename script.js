// Auto-refresh interval in ms
const REFRESH_INTERVAL = 60000; // 1 minute
// Calendar state + cached posts
let postsCache = [];
let calendarYear = null;
let calendarMonth = null; // 0-based
const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// Try reading prebuilt `commits.json` (created by GitHub Actions). Fallback to GitHub API if missing.
async function loadCommitsData() {
  try {
    // Prefer the static file generated at build time
    const res = await fetch('/commits.json');
    if (res.ok) {
      const j = await res.json();
      return j; // expected keys: commits_last_7_days, last_commit_date
    }
  } catch (e) {
    // ignore and fallback
  }

  // Fallback: try GitHub API (unauthenticated — may be rate-limited)
  try {
    const res = await fetch("https://api.github.com/repos/ha3ks/ha3ks.github.io/commits?per_page=100");
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data)) return null;
    const now = Date.now();
    let count = 0;
    let lastDate = null;
    data.forEach(c => {
      try {
        const d = new Date(c.commit.author.date);
        if (!isNaN(d)) {
          if (!lastDate || d > lastDate) lastDate = d;
          if ((now - d.getTime()) < 7*24*60*60*1000) count++;
        }
      } catch (e) {}
    });
    return { commits_last_7_days: count, last_commit_date: lastDate ? lastDate.toISOString() : null };
  } catch (e) {
    console.warn('fetch commits fallback failed', e);
    return null;
  }
}

async function updateDashboard() {
  // FETCH POSTS (use absolute paths to avoid relative-path issues on GitHub Pages)
  try {
    const postsRes = await fetch("/posts.json");
    const data = await postsRes.json();
    const posts = data.posts;

    // Update stat panels
    document.getElementById("totalPosts").textContent = posts.length;
    const allTags = [...new Set(posts.flatMap(p=>p.tags))];
    document.getElementById("categoryCount").textContent = allTags.length;

    // Update posts list
    const list = document.getElementById("postsList");
    list.innerHTML = "";
    // Limit to 5 latest posts
    posts.slice(0,5).forEach(post=>{
      const li = document.createElement("li");
      li.innerHTML = `<a href="${post.url}" class="post-link">${post.title}</a>
                      <span class="post-date">${post.date}</span>`;
      list.appendChild(li);
    });

    // Calendar: cache posts and render current calendar view
    postsCache = posts;
    // initialize calendar month/year on first load
    if (calendarYear === null || calendarMonth === null) {
      const t = new Date();
      calendarYear = t.getFullYear();
      calendarMonth = t.getMonth();
    }
    renderCalendar();
  } catch (e) {
    console.warn('posts.json fetch or dashboard update failed', e);
  }

  // FETCH GITHUB ACTIVITY (commits in last 7 days)
  try {
    const data = await loadCommitsData();
    const el = document.getElementById('githubCommits');
    if (el) {
      if (data && typeof data.commits_last_7_days === 'number') {
        el.textContent = String(data.commits_last_7_days);
        if (data.last_commit_date) {
          lastCommitDateCached = new Date(data.last_commit_date);
        }
      } else {
        el.textContent = 'N/A';
      }
    }
  } catch (e) {
    console.warn('commits.json fetch or update failed', e);
  }

  // DONUT CHART (based on tags.json)
  await updateDonutChart();
}

// Initial load
(async () => { await updateDashboard(); })();

// Auto-refresh
setInterval(() => { updateDashboard(); }, REFRESH_INTERVAL);

  // DONUT CHART (based on tags.json) — only update on dashboard refresh
  async function updateDonutChart() {
    try {
      const res = await fetch("/tags.json");
      const data = await res.json();
      const tags = data.tags;
      const labels = Object.keys(tags);
      const counts = Object.values(tags);
      const donutEl = document.getElementById("donutChart");
      if (donutEl && donutEl.getContext) {
        if (window.donutChart) {
          try { window.donutChart.destroy(); } catch (e) { /* ignore */ }
        }
        window.donutChart = new Chart(donutEl.getContext("2d"), {
          type: 'doughnut',
          data: {
            labels: labels,
            datasets: [{
              data: counts,
              backgroundColor: [
                "#73d98c",
                "#3399ff",
                "#f2cc0c",
                "#eb4d5c",
                "#9b59b6",
                "#e67e22"
              ]
            }]
          },
          options: { plugins: { legend: { labels: { color: "#ccc" } } } }
        });
      }
    } catch (e) {
      console.warn('tags.json donut render failed', e);
    }
  }

  // Call donut chart update on dashboard refresh
  async function updateDashboard() {
    // ...existing code...
    // At the end of updateDashboard, update donut chart
    await updateDonutChart();
  }

// LINE CHART (example only)
const lineChartEl = document.getElementById("lineChart");
if (lineChartEl) {
  try {
    new Chart(lineChartEl, {
  type: 'line',
  data: {
    labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    datasets: [{
      label: "Example",
      data: [3, 5, 2, 8, 4, 6, 7],
      borderColor: "#3399ff",
      backgroundColor: "rgba(51,153,255,0.2)",
      tension: 0.4
    }]
  },
  options: {
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: "#ccc" }},
      y: { ticks: { color: "#ccc" }}
    }
  }
    });
  } catch (e) { console.warn('line chart render failed', e); }
}

// --- UPTIME COUNTER (moved from index.html) ---
// cached last commit date used by uptime counter
let lastCommitDateCached = null;

async function fetchLastCommitDate() {
  // try to use cached value first
  if (lastCommitDateCached) return lastCommitDateCached;

  // otherwise attempt to load commits data
  const data = await loadCommitsData();
  if (data && data.last_commit_date) {
    lastCommitDateCached = new Date(data.last_commit_date);
    return lastCommitDateCached;
  }
  return new Date();
}

function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

async function startUptimeCounter() {
  const uptimeEl = document.getElementById("uptime");
  if (!uptimeEl) return; // nothing to do if element not present

  const lastCommitDate = await fetchLastCommitDate();

  function update() {
    const now = new Date();
    const diff = now - lastCommitDate;
    uptimeEl.textContent = formatDuration(diff);
  }

  update();
  setInterval(update, 1000);
}

// Start uptime counter (non-blocking)
startUptimeCounter();

// -------------------
// Calendar rendering + navigation
// -------------------
// Robust ISO date parser for YYYY-MM-DD and full ISO timestamps
function parseISODate(s) {
  if (!s) return null;
  // If it's already a Date-ish string, try Date first
  const maybe = new Date(s);
  if (!isNaN(maybe)) return maybe;
  // Fallback: parse YYYY-MM-DD manually
  const m = s.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return null;
}
function renderCalendar() {
  const calendar = document.getElementById("calendar");
  const label = document.getElementById("calendarLabel");
  if (!calendar || !label) return;

  // compute current view month/year
  const year = calendarYear;
  const month = calendarMonth;

  // update label
  label.textContent = `${MONTH_NAMES[month]} ${year}`;

  calendar.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Find post days for this month/year (robust parsing)
  const postDates = postsCache
    .map(p => parseISODate(p.date))
    .filter(d => d && d.getFullYear() === year && d.getMonth() === month)
    .map(d => d.getDate());

  // Add blank days for weekday offset
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.className = "calendar-day";
    calendar.appendChild(empty);
  }

  // Add actual days
  const today = new Date();
  for (let d = 1; d <= daysInMonth; d++) {
    const dayEl = document.createElement("div");
    dayEl.className = "calendar-day";
    dayEl.textContent = d;

    // Mark today (only if same month/year)
    if (d === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      dayEl.classList.add("today");
    }

    // Mark days that have posts
    if (postDates.includes(d)) dayEl.classList.add("posted");

    calendar.appendChild(dayEl);
  }
}

// Navigation handlers
function changeCalendarMonth(delta) {
  calendarMonth += delta;
  if (calendarMonth < 0) { calendarMonth = 11; calendarYear -= 1; }
  if (calendarMonth > 11) { calendarMonth = 0; calendarYear += 1; }
  renderCalendar();
}

document.addEventListener('DOMContentLoaded', () => {
  const prev = document.getElementById('calPrev');
  const next = document.getElementById('calNext');
  if (prev) prev.addEventListener('click', () => changeCalendarMonth(-1));
  if (next) next.addEventListener('click', () => changeCalendarMonth(1));
});

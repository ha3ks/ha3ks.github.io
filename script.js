// Auto-refresh interval in ms
const REFRESH_INTERVAL = 60000; // 1 minute
// Calendar state + cached posts
let postsCache = [];
let calendarYear = null;
let calendarMonth = null; // 0-based
const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// Generate vibrant colors dynamically for any number of tags
function generateColors(count) {
  const colors = [];
  const baseHues = [140, 210, 50, 0, 270, 25]; // Green, Blue, Yellow, Red, Purple, Orange
  for (let i = 0; i < count; i++) {
    const hue = baseHues[i % baseHues.length] + Math.floor(i / baseHues.length) * 30;
    const saturation = 65 + (i % 3) * 10;
    const lightness = 55 + (i % 2) * 5;
    colors.push(`hsl(${hue % 360}, ${saturation}%, ${lightness}%)`);
  }
  return colors;
}

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

function updateDashboard() {

  // FETCH POSTS (use absolute paths to avoid relative-path issues on GitHub Pages)
  fetch("/posts.json")
    .then(r=>r.json())
    .then(data=>{
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

      // Donut chart by tag (guarded)
      try {
        const tagCounts = {};
        posts.forEach(p => p.tags.forEach(t => tagCounts[t] = (tagCounts[t] || 0) + 1));
        const donutEl = document.getElementById("donutChart");
        if (donutEl && donutEl.getContext) {
          const ctx = donutEl.getContext("2d");
          if (window.donutChart) {
            try { window.donutChart.destroy(); } catch (e) { /* ignore */ }
          }
          const tagLabels = Object.keys(tagCounts);
          const tagValues = Object.values(tagCounts);
          window.donutChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: tagLabels,
              datasets: [{
                data: tagValues,
                backgroundColor: generateColors(tagLabels.length)
              }]
            },
            options: { 
              plugins: { 
                legend: { 
                  display: false 
                },
                tooltip: {
                  enabled: true
                }
              } 
            }
          });
        }
      } catch (e) {
        console.warn('Donut chart render failed', e);
      }

      // Calendar: cache posts and render current calendar view
      postsCache = posts;
      // initialize calendar month/year on first load
      if (calendarYear === null || calendarMonth === null) {
        const t = new Date();
        calendarYear = t.getFullYear();
        calendarMonth = t.getMonth();
      }
      renderCalendar();
    });

  // FETCH GITHUB ACTIVITY (commits in last 7 days)
  // Load commits data and update UI
    loadCommitsData().then(data => {
      const el = document.getElementById('githubCommits');
      if (!el) return;
      if (data && typeof data.commits_last_7_days === 'number') {
        el.textContent = String(data.commits_last_7_days);
        if (data.last_commit_date) {
          lastCommitDateCached = new Date(data.last_commit_date);
        }
      } else {
        el.textContent = 'N/A';
      }
    });
}

// Initial load
updateDashboard();

// Auto-refresh
setInterval(updateDashboard, REFRESH_INTERVAL);

  // DONUT CHART (based on tags.json) — use absolute path
fetch("/tags.json")
  .then(r => r.json())
  .then(data => {
    try {
      const tags = data.tags;
      const labels = Object.keys(tags);
      const counts = Object.values(tags);
      const donutEl = document.getElementById("donutChart");
      if (donutEl && donutEl.getContext) {
        new Chart(donutEl.getContext("2d"), {
          type: 'doughnut',
          data: {
            labels: labels,
            datasets: [{
              data: counts,
              backgroundColor: generateColors(labels.length)
            }]
          },
          options: { 
            plugins: { 
              legend: { 
                display: false 
              },
              tooltip: {
                enabled: true
              }
            } 
          }
        });
      }
    } catch (e) {
      console.warn('tags.json donut render failed', e);
    }
  }).catch(e => console.warn('tags.json fetch failed', e));

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
let totalCommitsCount = 0;
const REPO_CREATION_DATE = new Date('2024-11-21'); // Adjust this to your actual repo creation date
const DOWNTIME_PER_COMMIT = 0.5; // Each commit represents 0.5% downtime
const RECOVERY_RATE_PER_DAY = 0.5; // Recover 0.5% per day

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

async function fetchTotalCommits() {
  try {
    const res = await fetch("https://api.github.com/repos/ha3ks/ha3ks.github.io/commits?per_page=1");
    if (!res.ok) return 0;
    const linkHeader = res.headers.get('Link');
    if (linkHeader) {
      const match = linkHeader.match(/page=(\d+)>; rel="last"/);
      if (match) return parseInt(match[1]);
    }
    const data = await res.json();
    return Array.isArray(data) ? data.length : 0;
  } catch (e) {
    console.warn('fetch total commits failed', e);
    return 0;
  }
}

function calculateUptimePercentage(lastCommitDate, totalCommits) {
  const now = new Date();
  const daysSinceLastCommit = (now - lastCommitDate) / (1000 * 60 * 60 * 24);
  const repoAgeDays = (now - REPO_CREATION_DATE) / (1000 * 60 * 60 * 24);
  
  // Base downtime from all commits
  const commitDowntime = totalCommits * DOWNTIME_PER_COMMIT;
  
  // Recovery since last commit
  const recovery = daysSinceLastCommit * RECOVERY_RATE_PER_DAY;
  
  // Calculate percentage (start at 100%, subtract commit downtime, add recovery)
  let percentage = 100 - commitDowntime + recovery;
  
  // Cap between 0 and 100
  percentage = Math.max(0, Math.min(100, percentage));
  
  return percentage;
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
  const uptimeBarEl = document.getElementById("uptimeBar");
  const uptimePercentageEl = document.getElementById("uptimePercentage");
  if (!uptimeEl) return; // nothing to do if element not present

  const lastCommitDate = await fetchLastCommitDate();
  totalCommitsCount = await fetchTotalCommits();

  function update() {
    const now = new Date();
    const diff = now - lastCommitDate;
    uptimeEl.textContent = formatDuration(diff);
    
    // Update percentage bar
    if (uptimeBarEl && uptimePercentageEl) {
      const percentage = calculateUptimePercentage(lastCommitDate, totalCommitsCount);
      uptimeBarEl.style.width = percentage + '%';
      uptimePercentageEl.textContent = percentage.toFixed(2) + '%';
      
      // Change color based on percentage
      if (percentage >= 95) {
        uptimePercentageEl.style.color = '#73d98c'; // green
      } else if (percentage >= 80) {
        uptimePercentageEl.style.color = '#f2cc0c'; // yellow
      } else {
        uptimePercentageEl.style.color = '#eb4d5c'; // red
      }
    }
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

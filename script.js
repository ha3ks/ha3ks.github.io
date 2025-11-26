// Auto-refresh interval in ms
const REFRESH_INTERVAL = 60000; // 1 minute

function updateDashboard() {

  // FETCH POSTS
  fetch("posts.json")
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

      // Donut chart by tag
      const tagCounts = {};
      posts.forEach(p=>p.tags.forEach(t=>tagCounts[t]= (tagCounts[t]||0)+1 ));
      const ctx = document.getElementById("donutChart").getContext("2d");
      if(window.donutChart) window.donutChart.destroy();
      window.donutChart = new Chart(ctx,{
        type:'doughnut',
        data:{
          labels:Object.keys(tagCounts),
          datasets:[{
            data:Object.values(tagCounts),
            backgroundColor:["#73d98c","#3399ff","#f2cc0c","#eb4d5c","#9b59b6","#e67e22"]
          }]
        },
        options:{plugins:{legend:{labels:{color:"#ccc"}}}}
      });

      // Calendar Panel
      const calendar = document.getElementById("calendar");
      calendar.innerHTML = "";
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();
      const firstDay = new Date(year, month,1).getDay();
      const daysInMonth = new Date(year, month+1,0).getDate();
      const postDates = posts.map(p=>new Date(p.date).getDate());
      for(let i=0;i<firstDay;i++) { const empty = document.createElement("div"); empty.className="day"; calendar.appendChild(empty);}
      for(let d=1;d<=daysInMonth;d++){
        const day = document.createElement("div"); day.className="day"; day.textContent=d;
        if(postDates.includes(d)) day.classList.add("post");
        calendar.appendChild(day);
      }
    });

  // FETCH GITHUB ACTIVITY (commits in last 7 days)
  fetch("https://api.github.com/repos/ha3ks/ha3ks.github.io/commits?per_page=100")
    .then(r=>r.json())
    .then(commits=>{
      const now = new Date();
      const lastWeek = commits.filter(c=>{
        const commitDate = new Date(c.commit.author.date);
        return (now-commitDate)<7*24*60*60*1000;
      });
      document.getElementById("githubCommits").textContent = lastWeek.length;
    });
}

// Initial load
updateDashboard();

// Auto-refresh
setInterval(updateDashboard, REFRESH_INTERVAL);

// DONUT CHART (based on tags.json)
fetch("tags.json")
  .then(r => r.json())
  .then(data => {
    const tags = data.tags;
    const labels = Object.keys(tags);
    const counts = Object.values(tags);

    new Chart(document.getElementById("donutChart"), {
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
      options: {
        plugins: {
          legend: { labels: { color: "#ccc" } }
        }
      }
    });
  });

// LINE CHART (example only)
new Chart(document.getElementById("lineChart"), {
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

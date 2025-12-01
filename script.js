const loader = document.createElement("div");
loader.innerHTML = `<div class="spinner"></div><p>Loading Portfolio...</p>`;
Object.assign(loader.style, {
  position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
  background: "#1e1e1e", display: "flex", flexDirection: "column",
  justifyContent: "center", alignItems: "center", zIndex: 9999,
  color: "#FFBF00", fontSize: "1.2rem"
});
document.body.appendChild(loader);

const spinStyle = document.createElement("style");
spinStyle.innerHTML = `
.spinner {
  width: 45px; height: 45px;
  border: 4px solid #444;
  border-top: 4px solid #FFBF00;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 12px;
}
@keyframes spin {100% {transform: rotate(360deg);}}
`;
document.head.appendChild(spinStyle);

window.addEventListener("load", () => {
  loader.style.opacity = "0";
  setTimeout(() => loader.remove(), 500);
});




/* SMOOTH SCROLL + ACTIVE NAV */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", throttle(highlightNav, 120));

function highlightNav() {
  let fromTop = window.scrollY + 120;
  sections.forEach(sec => {
    if (fromTop >= sec.offsetTop && fromTop < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${sec.id}`);
      });
    }
  });
}









/*SCROLL APPEAR ANIMATION   */
const observerOptions = { threshold: 0.15};
const sectionObserver = new IntersectionObserver(revealSection, observerOptions);

sections.forEach(sec => {
  sec.style.opacity = "0";
  sec.style.transform = "translateY(25px)";
  sec.style.transition = "0.8s ease-out";
  sectionObserver.observe(sec);
});

function revealSection(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}







/* PROJECT SEARCH + FILTER */
const projectCards = document.querySelectorAll(".project");
const filterBox = document.createElement("div");

filterBox.innerHTML = `
<input type="text" placeholder="Search Projects..." id="projectSearch">
<div id="projectFilters">
  <button data-filter="all">All</button>
  <button data-filter="html">HTML/CSS</button>
  <button data-filter="javascript">JavaScript</button>
  <button data-filter="react">React.js</button>
</div>`;

Object.assign(filterBox.style, {
  marginBottom: "22px", display: "grid", gap: "12px"
});

document.querySelector("#portfolio .line").after(filterBox);

document.querySelectorAll("#projectFilters button").forEach(btn =>
 btn.addEventListener("click", () => filterProjects(btn.dataset.filter))
);

document.querySelector("#projectSearch").addEventListener("keyup", e =>
 searchProjects(e.target.value.toLowerCase())
);

function filterProjects(tag) {
 projectCards.forEach(card => {
   card.style.display = tag === "all" || tag === "all" ? "block" :
   card.innerText.toLowerCase().includes(tag) ? "block" : "none";
 });
}

function searchProjects(keyword) {
 projectCards.forEach(card => {
   card.style.display = card.innerText.toLowerCase().includes(keyword) ? "block" : "none";
 });
}




/*MODAL FOR REALISTIC PROJECT PREVIEW */
const modal = document.createElement("div");
modal.id = "projectModal";
modal.innerHTML = `
  <div class="modal-box">
    <span id="closeModal">✖</span>
    <img id="modalImg">
    <h2 id="modalTitle"></h2>
    <p id="modalDesc"></p>
    <a id="modalDemo" target="_blank">Live Demo 🚀</a>
  </div>`;

Object.assign(modal.style, {
  display:"none", position:"fixed", top:0, left:0, width:"100%", height:"100%",
  background:"rgba(0,0,0,0.7)", justifyContent:"center", alignItems:"center", zIndex:999
});
document.body.appendChild(modal);

const modalCSS = document.createElement("style");
modalCSS.innerHTML = `
.modal-box {
  background:#111; width:90%; max-width:420px; border-radius:18px; padding:20px;
  animation:pop 0.4s ease-out; color:#fff; position:relative;
}
#closeModal{position:absolute; top:12px; right:12px; cursor:pointer; color:#FFBF00;}
#modalImg{width:100%; border-radius:12px; margin-bottom:12px;}
#modalDemo{display:block; background:#FFBF00; padding:8px 12px; border-radius:6px;
  text-decoration:none; color:#000; font-weight:bold; text-align:center; margin-top:12px;}
@keyframes pop {from{transform:scale(0.7); opacity:0;} to{transform:scale(1); opacity:1;}}
`;
document.head.appendChild(modalCSS);

document.querySelector("#closeModal").onclick = () => modal.style.display = "none";

projectCards.forEach(card => {
  card.addEventListener("click", () => {
      modal.style.display="flex";
      document.querySelector("#modalImg").src = card.querySelector("img").src;
      document.querySelector("#modalTitle").innerText = card.querySelector("h3").innerText;
      document.querySelector("#modalDesc").innerText = card.querySelector("p").innerText;
      document.querySelector("#modalDemo").href = "#";
  });
});





/*SKILL ICON CLICK RIPPLE EFFECT*/
document.querySelectorAll(".skill-item").forEach(item => {
  item.addEventListener("click", e => {
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    Object.assign(ripple.style, {
      position:"absolute", width:"22px", height:"22px",
      background:"#FFBF00", borderRadius:"50%", transform:"scale(0)",
      animation:"ripple 0.5s linear", pointerEvents:"none",
      left:`${e.offsetX}px`, top:`${e.offsetY}px`
    });
    item.appendChild(ripple);
    setTimeout(()=> ripple.remove(), 500);
  });
});

const rippleCSS = document.createElement("style");
rippleCSS.innerHTML = `@keyframes ripple {100% {transform:scale(6); opacity:0;}}`;
document.head.appendChild(rippleCSS);




/* 3D HOVER TILT FOR SKILLS  */
document.querySelectorAll(".skill-item img").forEach(icon => {
  icon.parentElement.style.position = "relative";

  icon.addEventListener("mousemove", e => {
    const r = icon.getBoundingClientRect();
    let x = e.clientX - r.left;
    let y = e.clientY - r.top;
    let rotX = (y/r.height - 0.5)*26;
    let rotY = (x/r.width - 0.5)*-26;
    icon.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.1)`;
  });

  icon.addEventListener("mouseleave",()=> icon.style.transform="scale(1)");
});




/* VISIT COUNTER (LOCAL STORAGE)*/
let visits = localStorage.getItem("portfolioVisits") || 0;
visits++;
localStorage.setItem("portfolioVisits", visits);
console.log("Portfolio visits:", visits);





/*CURSOR TRAIL*/
const cursor = document.createElement("div");
cursor.id = "trailCursor";
cursor.style.position="fixed";
cursor.style.width="8px";
cursor.style.height="8px";
cursor.style.borderRadius="50%";
cursor.style.pointerEvents="none";
cursor.style.transition="0.08s";
document.body.appendChild(cursor);

document.addEventListener("mousemove", e => {
  cursor.style.left=e.clientX+"px";
  cursor.style.top=e.clientY+"px";
});

/* --------- 10. TOAST NOTIFICATIONS --------- */
function toast(msg) {
   let t = document.createElement("div");
   t.innerText = msg;
   Object.assign(t.style, {
     position:"fixed", top:"20px", right:"20px", background:"#111", color:"#FFBF00",
     padding:"12px 16px", borderRadius:"8px", border:"1px solid #555", fontWeight:"600"
   });
   document.body.appendChild(t);
   setTimeout(()=>t.style.opacity="0", 1200);
   setTimeout(()=>t.remove(), 1600);
}

toast("Welcome to Aditya Portfolio ✨");

/* --------- UTILITY: THROTTLE FUNCTION --------- */
function throttle(fn, t) {
  let flag=true;
  return function() {
    if(flag){fn(); flag=false; setTimeout(()=>flag=true, t);}
  };
}

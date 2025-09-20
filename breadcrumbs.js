document.addEventListener("DOMContentLoaded", () => {
  const breadcrumb = document.querySelector(".breadcrumb");

  if (breadcrumb) {
    const path = window.location.pathname.split("/").pop();
    const pageTitle = document.querySelector("meta[name='page-title']")?.content || path;

    let trail = `<a href="/index.html">Home</a>`;

    if (path !== "index.html" && path !== "") {
      trail += ` <span class="sep">›</span> <span>${pageTitle}</span>`;
    }

    breadcrumb.innerHTML = trail;
  }
});

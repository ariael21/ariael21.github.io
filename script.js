"use strict";

// The complete page, media controls, and citation remain available without JS.
const copyButton = document.querySelector("#copy-citation");
const citation = document.querySelector("#bibtex");
const copyStatus = document.querySelector("#copy-status");
if (copyButton && citation) {
  copyButton.hidden = false;
  copyButton.addEventListener("click", async () => {
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(citation.textContent.trim());
      copyStatus.textContent = "Citation copied.";
      copyButton.textContent = "Copied!";
      window.setTimeout(() => { copyButton.textContent = "Copy BibTeX"; }, 2200);
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(citation);
      selection.removeAllRanges();
      selection.addRange(range);
      copyStatus.textContent = "Citation selected. Press Ctrl+C (Windows/Linux) or ⌘C (Mac) to copy.";
    }
  });
}

const sectionLinks = [...document.querySelectorAll(".nav-links a")];
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const link of sectionLinks) {
        if (link.hash === `#${entry.target.id}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      }
    }
  }, { rootMargin: "-15% 0px -55% 0px", threshold: 0 });
  sectionLinks.forEach((link) => {
    const section = document.querySelector(link.hash);
    if (section) sectionObserver.observe(section);
  });
  const hero = document.querySelector("#top");
  if (hero) sectionObserver.observe(hero);
}

function scrapeCandidates() {
  const cards = document.querySelectorAll("ul[role='list'] > li");
  const results = [];

  cards.forEach(card => {
    try {
      const nameEl = card.querySelector("span span span");
      const titleEl = card.querySelector("div.t-12");
      const linkEl = card.querySelector("a[href*='/in/']");

      if (!nameEl || !titleEl || !linkEl) return;

      results.push({
        name: nameEl.innerText.trim(),
        title: titleEl.innerText.trim(),
        profile_url: linkEl.href.trim(),
        email_status: "pending",
        follow_up: "",
        thank_you: ""
      });
    } catch (e) {
      console.warn("Skip candidate due to error:", e);
    }
  });

  console.log("Scraped candidates:", results);
  alert(`${results.length} candidates scraped.`);
  chrome.storage.local.set({ scrapedCandidates: results });
}

scrapeCandidates();
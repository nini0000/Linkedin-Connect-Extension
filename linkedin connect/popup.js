document.addEventListener("DOMContentLoaded", function () {
  // Scrape Now
  document.getElementById("scrapeBtn").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["content.js"]
      });
    });
  });

  // Download CSV
  document.getElementById("downloadBtn").addEventListener("click", () => {
    chrome.storage.local.get("scrapedCandidates", (data) => {
      const candidates = data.scrapedCandidates || [];
      if (candidates.length === 0) {
        alert("No candidates scraped yet.");
        return;
      }

      const headers = Object.keys(candidates[0]);
      const rows = candidates.map(obj => headers.map(key => `"${obj[key] || ""}"`).join(","));
      const csv = [headers.join(","), ...rows].join("\n");

      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "linkedin_candidates.csv";
      a.click();
      URL.revokeObjectURL(url);
    });
  });
});

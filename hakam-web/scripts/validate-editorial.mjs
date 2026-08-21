import { weeklyUpdates } from '../src/data/weeklyUpdates.js';

const failures = [];
const slugs = new Set();

for (const update of weeklyUpdates) {
  const id = update.slug || '(missing slug)';
  if (!update.slug) failures.push(id + ": missing slug");
  if (slugs.has(update.slug)) failures.push(id + ": duplicate slug");
  slugs.add(update.slug);

  if (!["draft", "published"].includes(update.status)) failures.push(id + ": status must be draft or published");
  for (const field of ["title", "summary", "whyItMatters", "trendNote", "finalThought"]) {
    if (typeof update[field] !== "string" || update[field].trim().length < 20) failures.push(id + ": " + field + " must be at least 20 characters");
  }
  if (!Array.isArray(update.whatChanged) || update.whatChanged.length === 0) failures.push(id + ": add at least one whatChanged item");
  if (!update.codeBefore || !update.codeAfter) failures.push(id + ": both codeBefore and codeAfter are required");
  if (!Array.isArray(update.references) || update.references.length === 0) {
    failures.push(id + ": add at least one primary reference");
  } else {
    for (const reference of update.references) {
      if (!reference.label || !/^https:\/\//.test(reference.url || "")) failures.push(id + ": every reference needs a label and an https URL");
    }
  }
  if (update.status === "published" && !/^\d{4}-\d{2}-\d{2}$/.test(update.date || "")) failures.push(id + ": published entries need date YYYY-MM-DD");
}

if (failures.length) {
  console.error("Editorial quality gate failed:");
  for (const failure of failures) console.error("- " + failure);
  process.exitCode = 1;
} else {
  console.log("Editorial quality gate passed for " + weeklyUpdates.length + " weekly entries.");
}

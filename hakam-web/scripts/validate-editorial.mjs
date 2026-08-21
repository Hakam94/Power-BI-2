import { weeklyUpdates } from '../src/data/weeklyUpdates.js';

const failures = [];
const slugs = new Set();

function hasText(value) { return typeof value === "string" && value.trim().length >= 20; }
function validReferences(references) {
  return Array.isArray(references) && references.length > 0 && references.every((reference) => reference.label && String(reference.url || "").startsWith("https://"));
}

for (const update of weeklyUpdates) {
  const id = update.slug || '(missing slug)';
  if (!update.slug) failures.push(id + ": missing slug");
  if (slugs.has(update.slug)) failures.push(id + ": duplicate slug");
  slugs.add(update.slug);
  if (!["draft", "published"].includes(update.status)) failures.push(id + ": status must be draft or published");
  if (!hasText(update.title) || !hasText(update.summary)) failures.push(id + ": title and summary need meaningful text");
  const dateLooksValid = typeof update.date === "string" && update.date.length === 10 && update.date[4] === "-" && update.date[7] === "-";
  if (update.status === "published" && !dateLooksValid) failures.push(id + ": published entries need date YYYY-MM-DD");

  const isRoundup = Array.isArray(update.toolSections) && update.toolSections.length > 0;
  if (isRoundup) {
    const sectionsAreUsable = update.toolSections.every((section) => hasText(section.headline) && Array.isArray(section.whatChanged) && section.whatChanged.length > 0 && hasText(section.whyItMatters));
    if (!sectionsAreUsable) failures.push(id + ": every tool section needs a headline, change summary, and analyst impact");
    const sectionSources = update.toolSections.flatMap((section) => Array.isArray(section.references) ? section.references : []);
    if (!validReferences(update.references) && !validReferences(sectionSources)) failures.push(id + ": add at least one primary reference at article or section level");
  } else {
    if (!Array.isArray(update.whatChanged) || update.whatChanged.length === 0 || !hasText(update.whyItMatters)) failures.push(id + ": add what changed and why it matters for analysts");
    if ((update.codeBefore && !update.codeAfter) || (!update.codeBefore && update.codeAfter)) failures.push(id + ": before/after code examples must be supplied together");
    if (!validReferences(update.references)) failures.push(id + ": add at least one primary reference");
  }
}

if (failures.length) {
  console.error("Editorial quality gate failed:");
  for (const failure of failures) console.error("- " + failure);
  process.exitCode = 1;
} else {
  console.log("Editorial quality gate passed for " + weeklyUpdates.length + " weekly entries.");
}

import fs from "fs";
import path from "path";

const STATE_FILE = path.join("/tmp", "macmagia-processed-payments.json");
const MAX_ENTRIES = 1000;

function readEntries(): string[] {
  try {
    const raw = fs.readFileSync(STATE_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeEntries(entries: string[]): void {
  try {
    const trimmed = entries.slice(-MAX_ENTRIES);
    fs.writeFileSync(STATE_FILE, JSON.stringify(trimmed));
  } catch {
    // ignore disk errors — idempotency is best-effort
  }
}

export function isProcessed(key: string): boolean {
  return readEntries().includes(key);
}

export function markProcessed(key: string): void {
  const entries = readEntries();
  if (!entries.includes(key)) {
    entries.push(key);
    writeEntries(entries);
  }
}

export function unmarkProcessed(key: string): void {
  const entries = readEntries().filter((entry) => entry !== key);
  writeEntries(entries);
}

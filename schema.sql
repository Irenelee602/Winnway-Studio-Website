CREATE TABLE IF NOT EXISTS cellar_items (
  wine_id TEXT PRIMARY KEY,
  location TEXT NOT NULL DEFAULT '',
  note TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS cellar_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  wine_id TEXT NOT NULL,
  entry_date TEXT NOT NULL,
  entry_type TEXT NOT NULL CHECK(entry_type IN ('in','out')),
  quantity INTEGER NOT NULL CHECK(quantity > 0),
  reason TEXT NOT NULL DEFAULT '',
  person_name TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_cellar_entries_wine ON cellar_entries(wine_id, id DESC);
CREATE TABLE IF NOT EXISTS site_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);

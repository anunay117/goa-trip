CREATE TABLE IF NOT EXISTS expenses (
  id        TEXT PRIMARY KEY,
  ts        INTEGER NOT NULL,
  paid_by   TEXT NOT NULL,
  amount    REAL NOT NULL,
  category  TEXT NOT NULL,
  note      TEXT NOT NULL DEFAULT '',
  split     TEXT NOT NULL,
  added_by  TEXT NOT NULL DEFAULT '',
  deleted   INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_expenses_ts ON expenses(ts);

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

-- Phones that turned on notifications (Web Push subscriptions).
CREATE TABLE IF NOT EXISTS subs (
  endpoint  TEXT PRIMARY KEY,
  p256dh    TEXT NOT NULL,
  auth      TEXT NOT NULL,
  name      TEXT NOT NULL DEFAULT '',
  created   INTEGER NOT NULL
);

-- Settle-up payments between two people. A payment counts in balances only once the receiver confirms it.
CREATE TABLE IF NOT EXISTS settlements (
  id          TEXT PRIMARY KEY,
  ts          INTEGER NOT NULL,
  from_name   TEXT NOT NULL,
  to_name     TEXT NOT NULL,
  amount      REAL NOT NULL,
  method      TEXT NOT NULL DEFAULT '',
  note        TEXT NOT NULL DEFAULT '',
  status      TEXT NOT NULL DEFAULT 'pending',   -- pending | confirmed | rejected
  created_by  TEXT NOT NULL DEFAULT '',
  decided_at  INTEGER,
  deleted     INTEGER NOT NULL DEFAULT 0
);

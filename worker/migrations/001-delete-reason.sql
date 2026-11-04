-- 2026-11-04: record why, by whom and when an expense was deleted (deletes stay soft: deleted = 1).
ALTER TABLE expenses ADD COLUMN delete_reason TEXT NOT NULL DEFAULT '';
ALTER TABLE expenses ADD COLUMN deleted_by TEXT NOT NULL DEFAULT '';
ALTER TABLE expenses ADD COLUMN deleted_at INTEGER;

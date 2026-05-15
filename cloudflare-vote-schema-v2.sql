ALTER TABLE votes RENAME TO votes_old;

CREATE TABLE IF NOT EXISTS votes (
  poll_id TEXT NOT NULL,
  voter_hash TEXT NOT NULL,
  item_id TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (poll_id, voter_hash)
);

CREATE INDEX IF NOT EXISTS idx_votes_poll_item ON votes(poll_id, item_id);

INSERT INTO votes (poll_id, voter_hash, item_id, created_at, updated_at)
SELECT 'maps', voter_hash, map_id, created_at, created_at
FROM votes_old;

DROP TABLE votes_old;

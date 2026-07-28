-- Ejecutar en el SQL Editor de Supabase (Editor → New query → Run)
-- Añade soporte para respuestas anidadas en novedad_comments.

ALTER TABLE novedad_comments
  ADD COLUMN IF NOT EXISTS parent_id uuid REFERENCES novedad_comments(id);

CREATE INDEX IF NOT EXISTS idx_novedad_comments_parent_id
  ON novedad_comments(parent_id);

DROP POLICY IF EXISTS "Anyone can upload screenshots" ON storage.objects;
CREATE POLICY "Anyone can upload screenshots" ON storage.objects
FOR INSERT TO anon, authenticated
WITH CHECK (
  bucket_id = 'payment-screenshots'
  AND name ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|jpeg|png|webp|gif|heic)$'
  AND (owner_id IS NULL OR owner_id = (select auth.uid()::text))
);
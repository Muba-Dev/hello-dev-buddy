/** Shown while a lazily loaded route chunk is being fetched. */
const PageFallback = () => (
  <div
    className="container flex min-h-[40vh] items-center justify-center py-16"
    role="status"
    aria-live="polite"
  >
    <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
      Loading…
    </p>
  </div>
);

export default PageFallback;

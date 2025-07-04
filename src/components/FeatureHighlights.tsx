
export function FeatureHighlights() {
  const features = [
    "Filter by company, role, type",
    "Real interview questions",
    "Write and share your own journey",
  ];

  return (
    <section className="grid sm:grid-cols-3 gap-6 text-center">
      {features.map((f, i) => (
        <div key={i} className="p-6 bg-muted rounded-md">
          <p className="font-medium">{f}</p>
        </div>
      ))}
    </section>
  );
}

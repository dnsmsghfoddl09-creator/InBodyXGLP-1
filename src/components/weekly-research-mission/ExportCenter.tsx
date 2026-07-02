export function ExportCenter() {
  const actions = [
    { label: "Export to PowerPoint", icon: "📊" },
    { label: "Export to Word", icon: "📄" },
    { label: "Export PDF", icon: "📑" },
    { label: "Share with Team", icon: "↗" },
  ];

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:p-6">
      <h3 className="text-sm font-semibold text-gray-900">Export Center</h3>
      <p className="mt-1 text-xs text-gray-500">Download or share mission deliverables</p>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <span>{action.icon}</span>
            {action.label}
          </button>
        ))}
      </div>
    </section>
  );
}

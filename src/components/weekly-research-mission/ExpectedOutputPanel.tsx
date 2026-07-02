import {
  EXPECTED_OUTPUT_OPTIONS,
  type ExpectedOutputId,
} from "@/data/weekly-research-mission";

type ExpectedOutputPanelProps = {
  selected: ExpectedOutputId[];
};

export function ExpectedOutputPanel({ selected }: ExpectedOutputPanelProps) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:p-6">
      <h3 className="text-sm font-semibold text-gray-900">Expected Output</h3>
      <p className="mt-1 text-xs text-gray-500">Deliverables for this week&apos;s mission</p>

      <ul className="mt-4 space-y-2">
        {EXPECTED_OUTPUT_OPTIONS.map((opt) => {
          const checked = selected.includes(opt.id);
          return (
            <li
              key={opt.id}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm ${
                checked
                  ? "border-blue-100 bg-blue-50/50 text-gray-900"
                  : "border-gray-100 bg-gray-50/30 text-gray-400"
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded border text-xs ${
                  checked ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300 bg-white"
                }`}
              >
                {checked ? "✓" : ""}
              </span>
              {opt.label}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

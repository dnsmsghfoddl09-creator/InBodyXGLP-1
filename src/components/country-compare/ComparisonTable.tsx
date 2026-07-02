import { countryProvider, type CountryCompareProfile } from "@/lib/intelligence";

type ComparisonTableProps = {
  profiles: CountryCompareProfile[];
};

export function ComparisonTable({ profiles }: ComparisonTableProps) {
  return (
    <div className="space-y-6">
      {countryProvider.compareCategories.map((category) => (
        <section
          key={category.id}
          className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
        >
          <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50/50 px-5 py-3">
            <span>{category.icon}</span>
            <h3 className="text-sm font-semibold text-gray-900">{category.title}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="sticky left-0 z-10 bg-white px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Metric
                  </th>
                  {profiles.map((p) => (
                    <th key={p.id} className="px-4 py-3 text-left font-semibold text-gray-900">
                      <span className="mr-1.5">{p.flag}</span>
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {category.fields.map((field, idx) => (
                  <tr
                    key={field.field}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/40"}
                  >
                    <td className="sticky left-0 z-10 bg-inherit px-5 py-3 text-xs font-medium text-gray-500">
                      {field.label}
                    </td>
                    {profiles.map((p) => {
                      const section = p[category.section] as Record<string, string>;
                      return (
                        <td key={p.id} className="px-4 py-3 leading-relaxed text-gray-800">
                          {section[field.field]}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}

import { countryProvider, type CountryCompareProfile } from "@/lib/intelligence";

const COLORS = ["#2563eb", "#059669", "#d97706", "#dc2626", "#7c3aed"];
const CX = 160;
const CY = 160;
const R = 100;

type RadarChartProps = {
  profiles: CountryCompareProfile[];
};

function polarPoint(angle: number, radius: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
}

export function RadarChart({ profiles }: RadarChartProps) {
  const n = countryProvider.radarDimensions.length;
  const angleStep = 360 / n;
  const RADAR_DIMENSIONS = countryProvider.radarDimensions;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:p-6">
      <h3 className="mb-4 text-sm font-semibold text-gray-900">Dimension Comparison — Radar Chart</h3>
      <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-between">
        <svg viewBox="0 0 320 320" className="h-64 w-64 shrink-0 lg:h-80 lg:w-80">
          {[0.25, 0.5, 0.75, 1].map((scale) => (
            <polygon
              key={scale}
              points={RADAR_DIMENSIONS.map((_, i) => {
                const p = polarPoint(i * angleStep, R * scale);
                return `${p.x},${p.y}`;
              }).join(" ")}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}
          {RADAR_DIMENSIONS.map((dim, i) => {
            const p = polarPoint(i * angleStep, R);
            return (
              <g key={dim.key}>
                <line x1={CX} y1={CY} x2={p.x} y2={p.y} stroke="#e5e7eb" strokeWidth="1" />
                <text
                  x={polarPoint(i * angleStep, R + 18).x}
                  y={polarPoint(i * angleStep, R + 18).y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-gray-500 text-[9px]"
                >
                  {dim.label}
                </text>
              </g>
            );
          })}
          {profiles.map((profile, pi) => {
            const points = RADAR_DIMENSIONS.map((dim, i) => {
              const score = profile.dimensionScores[dim.key] / 100;
              const p = polarPoint(i * angleStep, R * score);
              return `${p.x},${p.y}`;
            }).join(" ");
            return (
              <polygon
                key={profile.id}
                points={points}
                fill={COLORS[pi % COLORS.length]}
                fillOpacity="0.15"
                stroke={COLORS[pi % COLORS.length]}
                strokeWidth="2"
              />
            );
          })}
        </svg>
        <ul className="flex flex-wrap gap-3 lg:flex-col">
          {profiles.map((p, i) => (
            <li key={p.id} className="flex items-center gap-2 text-sm">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <span>{p.flag}</span>
              <span className="font-medium text-gray-900">{p.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

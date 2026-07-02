"use client";

import { useState } from "react";
import { COUNTRY_LIST, type CountryId } from "@/data/countries";
import {
  CONFERENCE_OPTIONS,
  EXPECTED_OUTPUT_OPTIONS,
  RESEARCH_THEMES,
  createMissionFromForm,
  type ExpectedOutputId,
  type MissionPriority,
  type ResearchMission,
  type ResearchTheme,
} from "@/data/weekly-research-mission";

type MissionBuilderProps = {
  onCreateMission: (mission: ResearchMission) => void;
};

export function MissionBuilder({ onCreateMission }: MissionBuilderProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState<ResearchTheme>(RESEARCH_THEMES[0]);
  const [countryIds, setCountryIds] = useState<CountryId[]>(["japan", "thailand", "indonesia"]);
  const [priority, setPriority] = useState<MissionPriority>(2);
  const [conference, setConference] = useState<string>(CONFERENCE_OPTIONS[1]);
  const [deadline, setDeadline] = useState("");
  const [expectedOutputs, setExpectedOutputs] = useState<ExpectedOutputId[]>([
    "executive-summary",
    "comparison-table",
  ]);

  function toggleCountry(id: CountryId) {
    setCountryIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 8 ? [...prev, id] : prev,
    );
  }

  function toggleOutput(id: ExpectedOutputId) {
    setExpectedOutputs((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || countryIds.length === 0) return;

    onCreateMission(
      createMissionFromForm({
        title: title.trim(),
        description: description.trim() || `Weekly research mission: ${theme}`,
        theme,
        countryIds,
        priority,
        conference,
        deadline: deadline || "TBD",
        expectedOutputs,
      }),
    );
    setOpen(false);
  }

  return (
    <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 lg:px-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Mission Builder</h3>
          <p className="mt-0.5 text-xs text-gray-500">Create a new weekly strategic research mission</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="inline-flex h-9 items-center rounded-xl bg-blue-600 px-4 text-xs font-medium text-white transition-colors hover:bg-blue-700"
        >
          {open ? "Collapse" : "+ New Mission"}
        </button>
      </div>

      {open && (
        <form onSubmit={handleSubmit} className="space-y-6 p-5 lg:p-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <Field label="Mission Title">
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. APAC GLP-1 Insurance & Reimbursement Landscape"
                className={inputClass}
              />
            </Field>
            <Field label="Research Theme">
              <select value={theme} onChange={(e) => setTheme(e.target.value as ResearchTheme)} className={inputClass}>
                {RESEARCH_THEMES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Description">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Describe the strategic objective and scope of this week's research…"
              className={inputClass}
            />
          </Field>

          <div className="grid gap-4 lg:grid-cols-3">
            <Field label="Priority">
              <select
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value) as MissionPriority)}
                className={inputClass}
              >
                {([1, 2, 3, 4, 5] as MissionPriority[]).map((p) => (
                  <option key={p} value={p}>
                    P{p} — {p === 1 ? "Critical" : p === 2 ? "High" : p === 3 ? "Medium" : p === 4 ? "Low" : "Monitor"}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Conference">
              <select value={conference} onChange={(e) => setConference(e.target.value)} className={inputClass}>
                {CONFERENCE_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Deadline">
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Countries">
            <div className="flex flex-wrap gap-2">
              {COUNTRY_LIST.map((c) => {
                const selected = countryIds.includes(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggleCountry(c.id)}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                      selected
                        ? "border-blue-200 bg-blue-50 text-blue-700"
                        : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {c.flag} {c.name}
                  </button>
                );
              })}
            </div>
          </Field>

          <Field label="Expected Output">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {EXPECTED_OUTPUT_OPTIONS.map((opt) => {
                const checked = expectedOutputs.includes(opt.id);
                return (
                  <label
                    key={opt.id}
                    className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                      checked ? "border-blue-200 bg-blue-50/50" : "border-gray-100 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleOutput(opt.id)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    {opt.label}
                  </label>
                );
              })}
            </div>
          </Field>

          <div className="flex justify-end gap-2 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 items-center rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex h-10 items-center rounded-xl bg-blue-600 px-5 text-sm font-medium text-white hover:bg-blue-700"
            >
              Launch Mission
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-400">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50/80 px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100";

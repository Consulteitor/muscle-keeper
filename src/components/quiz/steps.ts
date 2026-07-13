export type StepKind = "single" | "multi" | "number";

export interface StepConfig {
  field: string;
  kind: StepKind;
  options?: string[];
  min?: number;
  max?: number;
}

export const STEPS: StepConfig[] = [
  { field: "sex", kind: "single", options: ["female", "male"] },
  { field: "birthYear", kind: "number", min: 1920, max: new Date().getFullYear() - 12 },
  { field: "heightCm", kind: "number", min: 120, max: 230 },
  { field: "currentWeightKg", kind: "number", min: 35, max: 300 },
  { field: "startingWeightKg", kind: "number", min: 35, max: 300 },
  { field: "targetWeightKg", kind: "number", min: 35, max: 300 },
  {
    field: "medication",
    kind: "single",
    options: [
      "semaglutide_ozempic",
      "semaglutide_wegovy",
      "semaglutide_rybelsus",
      "tirzepatide_mounjaro",
      "tirzepatide_zepbound",
      "liraglutide_saxenda",
      "dulaglutide_trulicity",
      "other_unsure",
    ],
  },
  {
    field: "treatmentDuration",
    kind: "single",
    options: ["under_4_weeks", "1_3_months", "3_6_months", "6_12_months", "over_1_year"],
  },
  {
    field: "baselineStrengthFrequency",
    kind: "single",
    options: ["none", "one_two", "three_plus", "unsure"],
  },
  { field: "availableDays", kind: "single", options: ["0", "1-2", "3-4", "5+"] },
  {
    field: "symptoms",
    kind: "multi",
    options: ["nausea", "fatigue", "dizziness", "low_appetite"],
  },
  { field: "proteinRations", kind: "single", options: ["0-1", "2-3", "4-5", "6+"] },
];

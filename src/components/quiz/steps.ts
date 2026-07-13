export type StepKind = "single" | "multi" | "number";
export type StepCategory = "aboutYou" | "treatment" | "habits";

export interface StepConfig {
  field: string;
  kind: StepKind;
  category: StepCategory;
  options?: string[];
  min?: number;
  max?: number;
}

export const STEPS: StepConfig[] = [
  { field: "sex", kind: "single", category: "aboutYou", options: ["female", "male"] },
  {
    field: "birthYear",
    kind: "number",
    category: "aboutYou",
    min: 1920,
    max: new Date().getFullYear() - 12,
  },
  { field: "heightCm", kind: "number", category: "aboutYou", min: 120, max: 230 },
  { field: "currentWeightKg", kind: "number", category: "aboutYou", min: 35, max: 300 },
  { field: "startingWeightKg", kind: "number", category: "treatment", min: 35, max: 300 },
  { field: "targetWeightKg", kind: "number", category: "treatment", min: 35, max: 300 },
  {
    field: "medication",
    kind: "single",
    category: "treatment",
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
    category: "treatment",
    options: ["under_4_weeks", "1_3_months", "3_6_months", "6_12_months", "over_1_year"],
  },
  {
    field: "baselineStrengthFrequency",
    kind: "single",
    category: "habits",
    options: ["none", "one_two", "three_plus", "unsure"],
  },
  {
    field: "availableDays",
    kind: "single",
    category: "habits",
    options: ["0", "1-2", "3-4", "5+"],
  },
  {
    field: "symptoms",
    kind: "multi",
    category: "habits",
    options: ["nausea", "fatigue", "dizziness", "low_appetite"],
  },
  {
    field: "proteinRations",
    kind: "single",
    category: "habits",
    options: ["0-1", "2", "3", "4+"],
  },
];

/** Índexs (0-based) de pas després dels quals mostrar una pantalla de transició breu. */
export const TRANSITION_AFTER_INDEX: Record<number, "afterPersonal" | "beforeHabits"> = {
  3: "afterPersonal",
  7: "beforeHabits",
};

export type Sex = "female" | "male";

export type MedicationDrug =
  | "semaglutide_ozempic"
  | "semaglutide_wegovy"
  | "semaglutide_rybelsus"
  | "tirzepatide_mounjaro"
  | "tirzepatide_zepbound"
  | "liraglutide_saxenda"
  | "dulaglutide_trulicity"
  | "other_unsure";

export type TreatmentDuration =
  | "under_4_weeks"
  | "1_3_months"
  | "3_6_months"
  | "6_12_months"
  | "over_1_year";

export type StrengthFrequency = "none" | "one_two" | "three_plus" | "unsure";

export type AvailableDays = "0" | "1-2" | "3-4" | "5+";

export type Symptom = "nausea" | "fatigue" | "dizziness" | "low_appetite";

export type ProteinRations = "0-1" | "2-3" | "4-5" | "6+";

export interface QuizAnswers {
  sex: Sex;
  birthYear: number;
  heightCm: number;
  currentWeightKg: number;
  startingWeightKg: number;
  targetWeightKg: number;
  medication: MedicationDrug;
  treatmentDuration: TreatmentDuration;
  baselineStrengthFrequency: StrengthFrequency;
  availableDays: AvailableDays;
  symptoms: Symptom[];
  proteinRations: ProteinRations;
}

export type RiskLevel = "baix" | "mitja" | "alt";

export interface DiagnosticResult {
  weightLostKg: number;
  pctWeightLost: number;
  estimatedLeanLostKg: number;
  leanLossRatio: number;
  proteinFloorG: number;
  baselineProteinG: number;
  proteinGapG: number;
  riskLevel: RiskLevel;
  projected6mLeanLossKg: number;
  bmrDropKcal: number;
  weeksOnTreatment: number;
}

const TREATMENT_WEEKS_MIDPOINT: Record<TreatmentDuration, number> = {
  under_4_weeks: 2,
  "1_3_months": 8,
  "3_6_months": 18,
  "6_12_months": 39,
  over_1_year: 60,
};

const BASE_LEAN_LOSS_RATIO: Record<StrengthFrequency, number> = {
  none: 0.35,
  one_two: 0.28,
  three_plus: 0.2,
  unsure: 0.3,
};

const PROTEIN_RATIONS_MIDPOINT: Record<ProteinRations, number> = {
  "0-1": 0.5,
  "2-3": 2.5,
  "4-5": 4.5,
  "6+": 6.5,
};

const GRAMS_PER_RATION = 20;
const PROTEIN_FLOOR_G_PER_KG = 1.6;
const KCAL_PER_KG_LEAN_MASS = 13;

/**
 * Estimació orientativa basada en patrons generals descrits a la literatura sobre
 * pèrdua de massa magra amb GLP-1 (no és un càlcul clínic ni un diagnòstic mèdic).
 */
export function computeDiagnostic(answers: QuizAnswers): DiagnosticResult {
  const age = new Date().getFullYear() - answers.birthYear;

  const weightLostKg = Math.max(
    0,
    answers.startingWeightKg - answers.currentWeightKg,
  );
  const pctWeightLost =
    answers.startingWeightKg > 0
      ? weightLostKg / answers.startingWeightKg
      : 0;

  let leanLossRatio = BASE_LEAN_LOSS_RATIO[answers.baselineStrengthFrequency];
  if (age >= 50) leanLossRatio += 0.03;
  leanLossRatio = Math.min(leanLossRatio, 0.45);

  const estimatedLeanLostKg = weightLostKg * leanLossRatio;

  const proteinFloorG = Math.round(
    answers.currentWeightKg * PROTEIN_FLOOR_G_PER_KG,
  );
  const baselineProteinG = Math.round(
    PROTEIN_RATIONS_MIDPOINT[answers.proteinRations] * GRAMS_PER_RATION,
  );
  const proteinGapG = Math.max(0, proteinFloorG - baselineProteinG);

  const weeksOnTreatment = TREATMENT_WEEKS_MIDPOINT[answers.treatmentDuration];
  const weeklyLeanLossKg =
    weeksOnTreatment > 0 ? estimatedLeanLostKg / weeksOnTreatment : 0;
  const projected6mLeanLossKg = Math.min(
    weeklyLeanLossKg * 26,
    answers.currentWeightKg * 0.2,
  );

  const bmrDropKcal = Math.round(estimatedLeanLostKg * KCAL_PER_KG_LEAN_MASS);

  const riskLevel = computeRiskLevel({
    leanLossRatio,
    availableDays: answers.availableDays,
    proteinGapG,
  });

  return {
    weightLostKg: round1(weightLostKg),
    pctWeightLost: round1(pctWeightLost * 100),
    estimatedLeanLostKg: round1(estimatedLeanLostKg),
    leanLossRatio: round1(leanLossRatio * 100),
    proteinFloorG,
    baselineProteinG,
    proteinGapG,
    riskLevel,
    projected6mLeanLossKg: round1(projected6mLeanLossKg),
    bmrDropKcal,
    weeksOnTreatment,
  };
}

function computeRiskLevel({
  leanLossRatio,
  availableDays,
  proteinGapG,
}: {
  leanLossRatio: number;
  availableDays: AvailableDays;
  proteinGapG: number;
}): RiskLevel {
  const noTrainingDays = availableDays === "0";

  if (leanLossRatio >= 0.32 || (noTrainingDays && proteinGapG > 30)) {
    return "alt";
  }
  if (leanLossRatio >= 0.25 || proteinGapG > 15) {
    return "mitja";
  }
  return "baix";
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

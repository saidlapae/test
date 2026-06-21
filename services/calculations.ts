import { getCriteria } from "./criteria";
import { getAlternatives } from "./alternatives";
import {
  calculateSAW,
  type Criteria,
  type Alternative,
  type Result,
} from "@/utils/saw";

export async function getCalculationData(): Promise<{
  criteria: Criteria[];
  alternatives: Alternative[];
  results: Result[];
}> {
  const criteria = (await getCriteria()) as Criteria[];
  const alternatives = (await getAlternatives()) as Alternative[];
  const results = calculateSAW(criteria, alternatives);
  return { criteria, alternatives, results };
}

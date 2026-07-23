import { rendererDomains } from "@nakafa/aksara-contracts/renderer/contract";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect } from "effect";

/** Converts exact reviewed component names into version-one requirements. */
function requirements(names: readonly string[]) {
  return names.map((name) => ({ name, version: 1 }));
}

const base = requirements([
  "AgentContext",
  "BlockMath",
  "InlineMath",
  "MathContainer",
  "Mermaid",
]);
const snbtGeneral = requirements([
  "Set10Question2RecruitmentChart",
  "Set2Question15SalesChart",
  "Set2Question5SalesChart",
  "Set3Question14SpiceSalesChart",
  "Set4Question14PriceChart",
  "Set5Question18GrowthChart",
  "Set5Question6SalesChart",
  "Set7Question9VisitorChart",
  "Set8Question17ProfitChart",
  "Set8Question1SalesChart",
  "Set9Question9GraduationChart",
]);
const snbtMath = requirements([
  "NumberLine",
  "Set2Question19Graph",
  "Set2Question6Graph",
  "Set3Question18Graph",
  "Set3Question18GraphSolution",
  "Set3Question19Graph",
  "Set4Question18Graph",
  "Set4Question19Graph",
  "Set4Question4Graph",
  "Set4Question5Graph",
  "Set6Question18Graph",
  "Set6Question19Graph",
  "Set6Question5Graph",
  "Set7Question18Graph",
  "Set7Question19Graph",
  "Set7Question4Graph",
]);
const snbtQuant = requirements([
  "LineEquation",
  "NumberLine",
  "Set10Question1Graph",
  "Set10Question2Graph",
  "Set10Question8Graph",
  "Set3Question13Illustration",
  "Set5Question12Graph",
  "Set5Question9Graph",
  "Set6Question12Graph",
  "Set6Question19Graph",
  "Set7Question13Graph",
  "Set7Question14Graph",
  "Set7Question1Graph",
  "Set8Question20Graph",
  "Set9Question1Graph",
  "Set9Question2Graph",
  "Set9Question3Graph",
  "UnitCircle",
]);
const tkaMath = requirements([
  "HistogramChart",
  "LineEquation",
  "NumberLine",
  "Set1Question19Graph",
  "Set1Question30Illustration",
]);

export const questionRendererManifest = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: base,
      supportedComponents: base,
    },
    domains: rendererDomains({
      "snbt-general": snbtGeneral,
      "snbt-math": snbtMath,
      "snbt-quant": snbtQuant,
      "tka-math": tkaMath,
    }),
  })
);

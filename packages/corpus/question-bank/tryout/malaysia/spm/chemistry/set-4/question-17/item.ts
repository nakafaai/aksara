import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$[\\text{H}^+]$$ is 0.10 mol dm⁻³, because ethanoic acid is monoprotic",
        },
        {
          correct: false,
          label:
            "About 2.9% of the molecules ionise, the same number as the pH",
        },
        { correct: false, label: "About 0.013% of the molecules ionise" },
        {
          correct: true,
          label:
            "$$[\\text{H}^+]$$ is about $$1.3 \\\\times 10^{-3}$$ mol dm⁻³, so only about 1.3% of the molecules ionise",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$[\\text{H}^+]$$ ialah 0.10 mol dm⁻³, kerana asid etanoik monoprotik",
        },
        {
          correct: false,
          label: "Kira-kira 2.9% molekul mengion, sama dengan nilai pH",
        },
        { correct: false, label: "Kira-kira 0.013% molekul mengion" },
        {
          correct: true,
          label:
            "$$[\\text{H}^+]$$ ialah kira-kira $$1.3 \\\\times 10^{-3}$$ mol dm⁻³, jadi hanya kira-kira 1.3% molekul mengion",
        },
      ],
    },
  },
};

export default item;

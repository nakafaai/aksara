import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Ethanoic acid, giving $$0.55\\text{ g}$$ of methyl ethanoate",
        },
        {
          correct: true,
          label:
            "Propanoic acid, giving $$0.66\\text{ g}$$ of methyl propanoate",
        },
        {
          correct: false,
          label:
            "Propanoic acid, giving $$0.66\\text{ g}$$ of propyl methanoate",
        },
        {
          correct: false,
          label:
            "Propanoic acid, giving $$0.88\\text{ g}$$ of methyl propanoate",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Asid etanoik, menghasilkan $$0.55\\text{ g}$$ metil etanoat",
        },
        {
          correct: true,
          label:
            "Asid propanoik, menghasilkan $$0.66\\text{ g}$$ metil propanoat",
        },
        {
          correct: false,
          label:
            "Asid propanoik, menghasilkan $$0.66\\text{ g}$$ propil metanoat",
        },
        {
          correct: false,
          label:
            "Asid propanoik, menghasilkan $$0.88\\text{ g}$$ metil propanoat",
        },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "hawthorne-effect",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "The lighting tests support the effect far less than its fame suggests, yet being studied may still change behaviour and needs a named cause.",
        },
        {
          correct: false,
          label:
            "The reanalysed lighting records showed that being studied does not change behaviour, so the label should be dropped from research.",
        },
        {
          correct: false,
          label:
            "The effect is real but was credited to the wrong study, since it showed up in the relay room rather than in the lighting tests.",
        },
        {
          correct: false,
          label:
            "The 2014 review confirmed that being studied changes behaviour in predictable ways, so the doubts about the lighting tests matter little.",
        },
        {
          correct: false,
          label:
            "The studies at the plant were flawed from the start, because the electrical industry paid for tests that were meant to show that brighter lighting raised output.",
        },
      ],
    },
  },
};

export default item;

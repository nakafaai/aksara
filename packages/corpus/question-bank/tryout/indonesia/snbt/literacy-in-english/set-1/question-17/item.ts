import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "strengthen-weaken",
  },
  stimulus: "longitude-clock",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "The Board had earlier accepted a rival's method after a single voyage, without asking for an account of how it worked or for copies.",
        },
        {
          correct: false,
          label:
            "Kendall's copy of H4 took years to build and cost far more than a set of lunar tables and a good instrument.",
        },
        {
          correct: false,
          label:
            "H4 kept time less well on its second trial than it had on the voyage to Jamaica in 1761.",
        },
        {
          correct: false,
          label:
            "Cook's crew also took lunar sightings on the voyage that carried Kendall's copy of the watch.",
        },
        {
          correct: false,
          label:
            "Harrison had refused for years to explain to the Board exactly how his sea clocks worked.",
        },
      ],
    },
  },
};

export default item;

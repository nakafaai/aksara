import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "measles-coverage",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "It relies on clinic records, which may count doses that were given to children living outside the province.",
        },
        {
          correct: false,
          label:
            "It measures the province against a target that is set too high for a disease as easily spread as measles.",
        },
        {
          correct: false,
          label:
            "It ignores that measles is spread mainly by adults, who are not counted in the coverage figures for children and so are missing from the newspaper's comparison altogether.",
        },
        {
          correct: true,
          label:
            "It treats the provincial average as if it described every community, though most cases came from places where coverage was far lower.",
        },
        {
          correct: false,
          label:
            "It assumes that two doses protect a child completely, though the passage gives no figure for how well the vaccine works.",
        },
      ],
    },
  },
};

export default item;

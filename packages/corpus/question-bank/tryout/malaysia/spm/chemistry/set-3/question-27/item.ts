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
          label:
            "$$\\text{C}_4\\text{H}_8$$, three alkene isomers, and $$150\\text{ cm}^3$$ of hydrogen",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_8\\text{H}_{16}$$, three alkene isomers, and $$150\\text{ cm}^3$$ of hydrogen",
        },
        {
          correct: true,
          label:
            "$$\\text{C}_4\\text{H}_8$$, three alkene isomers, and $$300\\text{ cm}^3$$ of hydrogen",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_4\\text{H}_8$$, two alkene isomers, and $$300\\text{ cm}^3$$ of hydrogen",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$\\text{C}_4\\text{H}_8$$, tiga isomer alkena, dan $$150\\text{ cm}^3$$ hidrogen",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_8\\text{H}_{16}$$, tiga isomer alkena, dan $$150\\text{ cm}^3$$ hidrogen",
        },
        {
          correct: true,
          label:
            "$$\\text{C}_4\\text{H}_8$$, tiga isomer alkena, dan $$300\\text{ cm}^3$$ hidrogen",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_4\\text{H}_8$$, dua isomer alkena, dan $$300\\text{ cm}^3$$ hidrogen",
        },
      ],
    },
  },
};

export default item;

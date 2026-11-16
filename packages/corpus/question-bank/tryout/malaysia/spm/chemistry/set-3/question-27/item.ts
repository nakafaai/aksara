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
            "$$\\text{C}_4\\text{H}_{10}$$, which burns with less soot than ethene",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_8\\text{H}_{16}$$, which decolourises bromine water",
        },
        {
          correct: true,
          label: "$$\\text{C}_4\\text{H}_8$$, which decolourises bromine water",
        },
        {
          correct: false,
          label: "$$\\text{C}_4\\text{H}_8$$, which is a saturated hydrocarbon",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$\\text{C}_4\\text{H}_{10}$$, yang terbakar dengan kurang jelaga berbanding etena",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_8\\text{H}_{16}$$, yang menyahwarnakan air bromin",
        },
        {
          correct: true,
          label: "$$\\text{C}_4\\text{H}_8$$, yang menyahwarnakan air bromin",
        },
        {
          correct: false,
          label: "$$\\text{C}_4\\text{H}_8$$, yang merupakan hidrokarbon tepu",
        },
      ],
    },
  },
};

export default item;

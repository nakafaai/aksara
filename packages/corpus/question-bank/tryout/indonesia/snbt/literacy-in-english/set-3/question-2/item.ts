import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "evidence-status",
  },
  stimulus: "mpemba-effect",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Mpemba and Osborne's 1969 paper was the first written claim that warm water can freeze faster than cold water.",
        },
        {
          column: 1,
          label:
            "A cup of water that reaches zero degrees first may still be the last of two cups to freeze solid.",
        },
        {
          column: 2,
          label:
            "The 2016 study ruled out evaporation as a cause of the Mpemba effect.",
        },
        {
          column: 1,
          label:
            "Two experimenters who placed their thermometers differently could reach opposite conclusions about the same pair of cups.",
        },
        {
          column: 1,
          label:
            "Supercooling can make a cooler cup freeze later than a warmer one even when the cooler cup reaches zero degrees first.",
        },
      ],
    },
  },
};

export default item;

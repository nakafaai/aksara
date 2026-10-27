import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "synthesis",
  },
  stimulus: "power-cut",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "He is calm from the start, so he goes straight to the kitchen for candles.",
        },
        {
          correct: false,
          label:
            "He is afraid of the storm, so he stays on the sofa until his parents come home.",
        },
        {
          correct: true,
          label:
            "His fear keeps him on the sofa, but her need for help gets him moving.",
        },
        {
          correct: false,
          label:
            "He forgets his fear once the power returns, and then he looks for her stick.",
        },
        {
          correct: false,
          label:
            "His grandmother is frightened too, so she asks him to stay where he is.",
        },
      ],
    },
  },
};

export default item;

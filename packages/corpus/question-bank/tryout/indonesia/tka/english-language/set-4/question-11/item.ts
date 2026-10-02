import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "synthesis",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "He is calm from the start, so he goes straight to the kitchen for candles.",
        },
        {
          isCorrect: false,
          label:
            "He is afraid of the storm, so he stays on the sofa until his parents come home.",
        },
        {
          isCorrect: true,
          label:
            "His fear keeps him on the sofa, but her need for help gets him moving.",
        },
        {
          isCorrect: false,
          label:
            "He forgets his fear once the power returns, and then he looks for her stick.",
        },
        {
          isCorrect: false,
          label:
            "His grandmother is frightened too, so she asks him to stay where he is.",
        },
      ],
    },
  },
  stimulusKey: "power-cut",
};

export default item;

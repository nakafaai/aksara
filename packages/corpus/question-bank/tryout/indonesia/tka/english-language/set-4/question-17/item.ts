import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "cause-effect",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "It will be larger and fainter than at a greater distance.",
        },
        {
          isCorrect: true,
          label: "It will be smaller and brighter than at a greater distance.",
        },
        {
          isCorrect: false,
          label:
            "It will not appear until the screen is at least one meter away.",
        },
        {
          isCorrect: false,
          label: "It will show the edge of the Moon more clearly than before.",
        },
        {
          isCorrect: false,
          label: "It will turn into a dark curve instead of a bright circle.",
        },
      ],
    },
  },
  stimulusKey: "pinhole-projector",
};

export default item;

import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "analytical-exposition",
    topic: "fact-opinion",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The proposed trial would last one term.",
        },
        {
          isCorrect: false,
          label: "The school would compare five named outcomes.",
        },
        {
          isCorrect: false,
          label:
            "The proposal includes a route back if the costs outweigh the benefits.",
        },
        {
          isCorrect: false,
          label: "One example concerns collecting a younger sibling.",
        },
        {
          isCorrect: true,
          label:
            "A reversible trial is the fairest timetable policy for every school.",
        },
      ],
    },
  },
  stimulusKey: "later-start",
};

export default item;

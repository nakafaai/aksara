import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "analytical-exposition",
    topic: "fact-opinion",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "The proposed trial would last one term.",
        },
        {
          correct: false,
          label: "The school would compare five named outcomes.",
        },
        {
          correct: false,
          label:
            "The proposal includes a route back if the costs outweigh the benefits.",
        },
        {
          correct: false,
          label: "One example concerns collecting a younger sibling.",
        },
        {
          correct: true,
          label:
            "A reversible trial is the fairest timetable policy for every school.",
        },
      ],
    },
  },
  stimulus: "later-start",
};

export default item;

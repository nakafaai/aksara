import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "sequence",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "It comes after the group has slowed down, to show that the change is complete.",
        },
        {
          isCorrect: false,
          label:
            "It comes together with the big gong at the end of each long cycle.",
        },
        {
          isCorrect: false,
          label:
            "It comes only at the anniversary concert, after weeks of rehearsals.",
        },
        {
          isCorrect: false,
          label: "It comes while the writer is still counting the beats.",
        },
        {
          isCorrect: true,
          label:
            "It comes just before the change, so the players know to slow down.",
        },
      ],
    },
  },
  stimulusKey: "gamelan-rehearsal",
};

export default item;

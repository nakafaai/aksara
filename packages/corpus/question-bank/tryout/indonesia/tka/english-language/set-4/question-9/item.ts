import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "sequence",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "It comes after the group has slowed down, to show that the change is complete.",
        },
        {
          correct: false,
          label:
            "It comes together with the big gong at the end of each long cycle.",
        },
        {
          correct: false,
          label:
            "It comes only at the anniversary concert, after weeks of rehearsals.",
        },
        {
          correct: false,
          label: "It comes while the writer is still counting the beats.",
        },
        {
          correct: true,
          label:
            "It comes just before the change, so the players know to slow down.",
        },
      ],
    },
  },
  stimulus: "gamelan-rehearsal",
};

export default item;

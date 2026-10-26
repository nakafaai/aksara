import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "summary",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "A student who kept rushing learned to follow the drummer and then played in time.",
        },
        {
          correct: false,
          label:
            "A student practiced a gamelan melody at home and learned to play it from memory.",
        },
        {
          correct: false,
          label:
            "A teacher took a student's mallet away because the student refused to rehearse with the group.",
        },
        {
          correct: false,
          label:
            "A school gamelan club won its first competition after a month of difficult rehearsals.",
        },
        {
          correct: false,
          label:
            "A drummer taught the club to count the beats in their heads during every piece.",
        },
      ],
    },
  },
  stimulus: "gamelan-rehearsal",
};

export default item;

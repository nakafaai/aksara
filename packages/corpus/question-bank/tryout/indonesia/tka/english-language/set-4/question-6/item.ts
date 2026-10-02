import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "summary",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "A student who kept rushing learned to follow the drummer and then played in time.",
        },
        {
          isCorrect: false,
          label:
            "A student practiced a gamelan melody at home and learned to play it from memory.",
        },
        {
          isCorrect: false,
          label:
            "A teacher took a student's mallet away because the student refused to rehearse with the group.",
        },
        {
          isCorrect: false,
          label:
            "A school gamelan club won its first competition after a month of difficult rehearsals.",
        },
        {
          isCorrect: false,
          label:
            "A drummer taught the club to count the beats in their heads during every piece.",
        },
      ],
    },
  },
  stimulusKey: "gamelan-rehearsal",
};

export default item;

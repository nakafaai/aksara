import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "clever-hans",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Children who know they were taught with a new method take a written test that a computer marks.",
        },
        {
          correct: false,
          label:
            "A computer reads each question aloud and records each child's answer, while a researcher who knows the groups watches from behind a one-way mirror.",
        },
        {
          correct: true,
          label:
            "An examiner who knows which children were taught with a new method gives each child a spoken test and decides on the spot whether each answer is good enough.",
        },
        {
          correct: false,
          label:
            "A stranger who does not know which children were taught with a new method gives each child a spoken test and records every answer.",
        },
        {
          correct: false,
          label:
            "A teacher who knows which children were taught with a new method hands out a written test and leaves the room while they work.",
        },
      ],
    },
  },
};

export default item;

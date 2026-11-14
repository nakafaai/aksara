import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "descriptive",
    topic: "text-fit",
  },
  stimulus: "observatory",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            '"Since the observatory moved to a darker hill in 1998, the building has been the town library, and almost every floor now does something its builders never planned."',
        },
        {
          correct: true,
          label:
            '"The town\'s new sports hall, finished last year, also has tall windows."',
        },
        {
          correct: false,
          label:
            '"Visitors may read them only at the table by the door, under a lamp that gives off almost no heat."',
        },
        {
          correct: false,
          label:
            '"Its wide doors, made for moving heavy equipment, now let prams and wheelchairs straight in."',
        },
        {
          correct: false,
          label:
            '"On those evenings, no books are carried up, because the night air off the hill is damp."',
        },
      ],
    },
  },
};

export default item;

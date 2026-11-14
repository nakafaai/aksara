import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "selection",
  },
  stimulus: "sains",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Bening, Elvira, Fauzan, dan Haikal",
        },
        {
          correct: false,
          label: "Cempaka, Elvira, Fauzan, dan Gendis",
        },
        {
          correct: false,
          label: "Arka, Danu, Elvira, dan Fauzan",
        },
        {
          correct: false,
          label: "Arka, Bening, Danu, dan Gendis",
        },
        {
          correct: false,
          label: "Bening, Danu, Fauzan, dan Haikal",
        },
      ],
    },
  },
};

export default item;

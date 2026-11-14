import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "sequence",
  },
  stimulus: "flood-kitchen",
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "Volunteers carried mud out of houses." },
        { correct: false, label: "Pak Yusuf gave each volunteer a job." },
        {
          correct: false,
          label: "The writer packed food into boxes for the first time.",
        },
        {
          correct: false,
          label: "Everyone washed their hands with soap before starting.",
        },
        {
          correct: false,
          label: "A motorbike team delivered boxes to families at home.",
        },
      ],
    },
  },
};

export default item;

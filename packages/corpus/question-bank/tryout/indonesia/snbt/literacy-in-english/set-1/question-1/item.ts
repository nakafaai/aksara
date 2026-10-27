import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "the conditions under which technology can support education.",
        },
        {
          correct: false,
          label: "the rapid growth of internet access worldwide.",
        },
        {
          correct: false,
          label: "the replacement of teachers by digital tools.",
        },
        {
          correct: false,
          label: "the superiority of online learning over classrooms.",
        },
        {
          correct: false,
          label: "the features of one educational device.",
        },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "library-loans",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "E-books would overtake print books, because tripling twice is a rise of $$600\\%$$.",
        },
        {
          correct: false,
          label:
            "E-books and print books would be lent about equally, because each format would change by the same number of loans as this year.",
        },
        {
          correct: false,
          label:
            "Print books would still be lent more often, by about $$135{,}000$$ loans.",
        },
        {
          correct: false,
          label:
            "Total loans would fall, because print loans make up most of the total.",
        },
        {
          correct: true,
          label:
            "Print books would still be lent more often than e-books, by about $$64{,}800$$ loans.",
        },
      ],
    },
  },
};

export default item;

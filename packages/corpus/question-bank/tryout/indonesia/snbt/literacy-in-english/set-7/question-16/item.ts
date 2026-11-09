import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "carnegie-libraries",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Name the library after Andrew Carnegie and display his portrait inside.",
        },
        {
          correct: false,
          label:
            "Agree to buy all of the library's books from Carnegie's own company.",
        },
        {
          correct: false,
          label: "Show that it already had more readers than any nearby town.",
        },
        {
          correct: true,
          label:
            "Provide the land and promise to pay yearly for running the library.",
        },
        {
          correct: false,
          label:
            "Promise to open the library to working boys only on Saturdays.",
        },
      ],
    },
  },
};

export default item;

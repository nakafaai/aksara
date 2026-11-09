import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "outline",
  },
  stimulus: "book-cover",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "a story about a student who loses a textbook, then a lesson",
        },
        {
          correct: true,
          label:
            "the purpose, the materials, numbered steps, and a tip with the writer's opinion",
        },
        {
          correct: false,
          label: "the materials, a tip, the numbered steps, then the purpose",
        },
        {
          correct: false,
          label: "a description of different kinds of plastic covers",
        },
        {
          correct: false,
          label: "reasons for covering books, then a conclusion",
        },
      ],
    },
  },
};

export default item;

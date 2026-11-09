import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "jikji-printing",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "the National Library of France kept it hidden from Korean researchers.",
        },
        {
          correct: true,
          label:
            "no one at the library had yet recognised when and how it had been printed.",
        },
        {
          correct: false,
          label:
            "it was written in a language that French librarians could not read.",
        },
        {
          correct: false,
          label: "it arrived in Paris only shortly before the 1970s.",
        },
        {
          correct: false,
          label:
            "the French diplomat who acquired it refused to show it to anyone.",
        },
      ],
    },
  },
};

export default item;

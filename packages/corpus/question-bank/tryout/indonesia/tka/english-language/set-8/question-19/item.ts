import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "outline",
  },
  stimulus: "fried-rice",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "ingredients, steps, and the history of fried rice",
        },
        {
          correct: true,
          label:
            "a title, advice about the rice, a list of ingredients, numbered steps, and a safety note",
        },
        {
          correct: false,
          label: "an opinion about fried rice supported by several reasons",
        },
        {
          correct: false,
          label: "a story about a family dinner that ends with a lesson",
        },
        {
          correct: false,
          label:
            "the steps first, then the ingredients, then serving suggestions",
        },
      ],
    },
  },
};

export default item;

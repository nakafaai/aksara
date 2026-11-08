import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "jikji-printing",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Because *Jikji* was nearly destroyed while it was kept in Paris",
        },
        {
          correct: false,
          label:
            "Because only books that UNESCO lists can be called the oldest",
        },
        {
          correct: false,
          label: "Because Gutenberg's Bible has not survived in complete form",
        },
        {
          correct: true,
          label:
            "Because earlier books printed with metal type may have existed, but no copy of them is known today",
        },
        {
          correct: false,
          label:
            "Because the first volume of *Jikji* was printed with wooden type",
        },
      ],
    },
  },
};

export default item;

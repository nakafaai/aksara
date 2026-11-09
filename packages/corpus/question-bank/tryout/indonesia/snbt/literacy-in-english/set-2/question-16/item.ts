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
            "Because *Jikji* was nearly destroyed by damp while it was kept in Paris",
        },
        {
          correct: false,
          label:
            "Because only books that UNESCO lists can officially be called the oldest",
        },
        {
          correct: false,
          label:
            "Because Gutenberg's Bible has not survived in complete form anywhere",
        },
        {
          correct: true,
          label:
            "Because earlier metal-type books may have existed, but none is known to survive",
        },
        {
          correct: false,
          label:
            "Because the first volume of *Jikji* was printed with carved wooden blocks",
        },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "prediction",
  },
  stimulus: "fish-tank",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Add $$3$$ more fish now; all $$9$$ could be in during week $$2$$.",
        },
        {
          correct: false,
          label:
            "Change a quarter of the water and add no more fish this week; all $$9$$ could be in during week $$2$$.",
        },
        {
          correct: false,
          label:
            "Change all of the water and start cycling again; all $$9$$ could be in during week $$4$$.",
        },
        {
          correct: true,
          label:
            "Change a quarter of the water and add no more fish this week; all $$9$$ could be in during week $$3$$.",
        },
        {
          correct: false,
          label:
            "Add no more fish this week without changing any water; all $$9$$ could be in during week $$3$$.",
        },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "mantis-shrimp",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Under the model described in paragraph 2, the shrimp's colour receptors should have let it separate similar colours more finely than a person can.",
        },
        {
          column: 2,
          label:
            "The shrimp's failure at gaps of $$12$$ to $$25$$ nanometres shows that it perceives fewer distinct colours than a person does.",
        },
        {
          column: 1,
          label:
            "If the shrimp's colour receptors covered the whole eye instead of a narrow strip, scanning would matter less for building up a colour picture.",
        },
        {
          column: 1,
          label:
            "The honeybee results suggest that the number of receptor types does not by itself decide how finely an animal can separate colours.",
        },
      ],
    },
  },
};

export default item;

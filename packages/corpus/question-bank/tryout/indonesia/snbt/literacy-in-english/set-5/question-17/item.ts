import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "great-stink",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "John Snow's conclusion about cholera was widely accepted in 1854.",
        },
        {
          column: 1,
          label:
            "The new sewers carried waste to outfalls downstream of central London.",
        },
        {
          column: 1,
          label:
            "Some of the new sewers were built inside embankments that also carried roads.",
        },
        {
          column: 2,
          label:
            "Since the new system was finished, the sewers have never overflowed into the Thames.",
        },
      ],
    },
  },
};

export default item;

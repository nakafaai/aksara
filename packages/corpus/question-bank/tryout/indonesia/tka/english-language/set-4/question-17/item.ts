import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "classification",
  },
  stimulus: "fish-tank",
  versions: {
    en: {
      columns: [
        "Ready for fish",
        "Keep cycling",
        "Change a quarter of the water first",
      ],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Tank P: ammonia $$0, 0, 0$$; nitrite $$0, 0, 0$$; nitrate $$20$$ on the last test.",
        },
        {
          column: 2,
          label:
            "Tank Q: ammonia $$0, 0, 0$$; nitrite $$0.5, 0, 0$$; nitrate $$15$$ on the last test.",
        },
        {
          column: 3,
          label:
            "Tank R: ammonia $$0, 0, 0$$; nitrite $$0, 0, 0$$; nitrate $$60$$ on the last test.",
        },
        {
          column: 2,
          label:
            "Tank S: ammonia $$0, 0, 0$$; nitrite $$0, 0, 0$$; nitrate $$0$$ on the last test.",
        },
        {
          column: 1,
          label:
            "Tank T: ammonia $$0.25, 0, 0, 0$$; nitrite $$0, 0, 0, 0$$; nitrate $$35$$ on the last test.",
        },
      ],
    },
  },
};

export default item;

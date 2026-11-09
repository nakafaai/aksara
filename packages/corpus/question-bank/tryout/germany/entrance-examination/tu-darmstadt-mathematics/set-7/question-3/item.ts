import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Er bleibt gleich.",
        },
        {
          correct: false,
          label: "Er nimmt um $$6\\text{ cm}^2$$ ab.",
        },
        {
          correct: false,
          label: "Er nimmt um $$9\\text{ cm}^2$$ zu.",
        },
        {
          correct: true,
          label: "Er nimmt um $$9\\text{ cm}^2$$ ab.",
        },
        {
          correct: false,
          label: "Er nimmt um $$(6a-9)\\text{ cm}^2$$ ab.",
        },
        {
          correct: false,
          label: "Die Änderung hängt von $$a$$ ab.",
        },
      ],
    },
  },
};

export default item;

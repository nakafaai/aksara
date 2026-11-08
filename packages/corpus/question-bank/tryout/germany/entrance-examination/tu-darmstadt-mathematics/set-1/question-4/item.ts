import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Er ist um $$5\\,\\%$$ gestiegen.",
        },
        {
          correct: false,
          label: "Er ist um $$5\\,\\%$$ gesunken.",
        },
        {
          correct: false,
          label: "Er ist um $$45\\,\\%$$ gestiegen.",
        },
        {
          correct: true,
          label: "Er ist gleich geblieben.",
        },
        {
          correct: false,
          label: "Er ist um $$10\\,\\%$$ gesunken.",
        },
        {
          correct: false,
          label: "Er ist um $$20\\,\\%$$ gesunken.",
        },
      ],
    },
  },
};

export default item;

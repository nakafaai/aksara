import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Sie ist um $$21\\,\\%$$ gestiegen.",
        },
        {
          correct: false,
          label: "Sie ist um $$1\\,\\%$$ gestiegen.",
        },
        {
          correct: false,
          label: "Sie ist gleich geblieben.",
        },
        {
          correct: true,
          label: "Sie ist um $$1\\,\\%$$ gesunken.",
        },
        {
          correct: false,
          label: "Sie ist um $$0{,}1\\,\\%$$ gesunken.",
        },
        {
          correct: false,
          label: "Sie ist um $$10\\,\\%$$ gesunken.",
        },
      ],
    },
  },
};

export default item;

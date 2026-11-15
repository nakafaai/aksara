import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Sie ist um $$5\\,\\%$$ gesunken.",
        },
        {
          correct: false,
          label: "Sie ist um $$6{,}25\\,\\%$$ gesunken.",
        },
        {
          correct: false,
          label: "Sie ist um $$20\\,\\%$$ gestiegen.",
        },
        {
          correct: false,
          label: "Sie ist um $$12{,}5\\,\\%$$ gesunken.",
        },
        {
          correct: false,
          label: "Sie ist um $$50\\,\\%$$ gestiegen.",
        },
        {
          correct: true,
          label: "Sie ist um $$12{,}5\\,\\%$$ gestiegen.",
        },
      ],
    },
  },
};

export default item;

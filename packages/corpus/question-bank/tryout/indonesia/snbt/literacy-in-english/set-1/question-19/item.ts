import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "marine businesses earn profits in every country",
        },
        {
          correct: false,
          label: "oceans benefit people only by producing rainfall",
        },
        {
          correct: false,
          label:
            "ocean exploration should expand so people can extract more resources",
        },
        {
          correct: true,
          label:
            "coastal ecosystems provide communities with several forms of value",
        },
        {
          correct: false,
          label: "every person depends on exactly the same marine resource",
        },
      ],
    },
  },
};

export default item;

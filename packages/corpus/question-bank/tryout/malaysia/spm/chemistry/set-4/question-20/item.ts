import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "manufactured-substances-in-industry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$10.9\\text{ g}$$ of black solid, and zinc is $$13.0\\%$$ of the brass",
        },
        {
          correct: false,
          label:
            "$$9.02\\text{ g}$$ of black solid, and zinc is $$27.9\\%$$ of the brass",
        },
        {
          correct: true,
          label:
            "$$9.25\\text{ g}$$ of black solid, and zinc is $$26.0\\%$$ of the brass",
        },
        {
          correct: false,
          label:
            "$$12.5\\text{ g}$$ of black solid, and zinc is $$26.0\\%$$ of the brass",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$10.9\\text{ g}$$ pepejal hitam, dan zink ialah $$13.0\\%$$ daripada loyang",
        },
        {
          correct: false,
          label:
            "$$9.02\\text{ g}$$ pepejal hitam, dan zink ialah $$27.9\\%$$ daripada loyang",
        },
        {
          correct: true,
          label:
            "$$9.25\\text{ g}$$ pepejal hitam, dan zink ialah $$26.0\\%$$ daripada loyang",
        },
        {
          correct: false,
          label:
            "$$12.5\\text{ g}$$ pepejal hitam, dan zink ialah $$26.0\\%$$ daripada loyang",
        },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "school-transport",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$20\\,\\%$$",
        },
        {
          correct: true,
          label: "$$25\\,\\%$$",
        },
        {
          correct: false,
          label: "$$40\\,\\%$$",
        },
        {
          correct: false,
          label: "$$50\\,\\%$$",
        },
        {
          correct: false,
          label: "$$75\\,\\%$$",
        },
      ],
    },
  },
};

export default item;

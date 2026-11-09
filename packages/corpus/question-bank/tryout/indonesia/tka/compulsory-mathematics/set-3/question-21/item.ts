import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "travel-time",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$25\\,\\%$$",
        },
        {
          correct: false,
          label: "$$37{,}5\\,\\%$$",
        },
        {
          correct: false,
          label: "$$62{,}5\\,\\%$$",
        },
        {
          correct: false,
          label: "$$77{,}5\\,\\%$$",
        },
        {
          correct: true,
          label: "$$87{,}5\\,\\%$$",
        },
      ],
    },
  },
};

export default item;

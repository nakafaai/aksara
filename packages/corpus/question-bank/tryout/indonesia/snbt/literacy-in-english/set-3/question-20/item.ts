import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "point-of-view",
  },
  stimulus: "clinic-interpreter",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "That her father wanted help with the long words.",
        },
        {
          correct: true,
          label: "That her father had not needed her at the clinic at all.",
        },
        {
          correct: false,
          label: "That her father speaks the doctor's language well.",
        },
        {
          correct: false,
          label: "That the doctor spoke to her rather than to her father.",
        },
        {
          correct: false,
          label: "That her father enjoys arguing with the tax office.",
        },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "culvert",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3{,}465\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$38{,}5\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$138{,}6\\text{ kg}$$",
        },
        {
          correct: true,
          label: "$$346{,}5\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$962{,}5\\text{ kg}$$",
        },
      ],
    },
  },
};

export default item;

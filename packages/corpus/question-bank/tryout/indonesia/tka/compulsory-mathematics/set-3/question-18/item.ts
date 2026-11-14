import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$19{,}25\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$385\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$3{.}080\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$3{.}696\\text{ kg}$$",
        },
        {
          correct: true,
          label: "$$7{.}700\\text{ kg}$$",
        },
      ],
    },
  },
};

export default item;

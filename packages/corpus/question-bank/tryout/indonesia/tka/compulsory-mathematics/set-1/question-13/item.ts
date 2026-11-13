import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$156\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$65\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$54\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$84{,}5\\text{ cm}^2$$",
        },
        {
          correct: true,
          label: "$$78\\text{ cm}^2$$",
        },
      ],
    },
  },
};

export default item;

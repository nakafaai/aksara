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
          label: "$$(12\\sqrt{3}+8\\pi)$$ cm",
        },
        {
          correct: false,
          label: "$$(6\\sqrt{3}+12\\pi)$$ cm",
        },
        {
          correct: false,
          label: "$$(4\\sqrt{11}+12\\pi)$$ cm",
        },
        {
          correct: false,
          label: "$$(12\\sqrt{3}+10\\pi)$$ cm",
        },
        {
          correct: true,
          label: "$$(12\\sqrt{3}+12\\pi)$$ cm",
        },
      ],
    },
  },
};

export default item;

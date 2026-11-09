import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "karst",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "menguap ke udara",
        },
        {
          correct: false,
          label: "mengalir di atas permukaan",
        },
        {
          correct: true,
          label: "masuk ke dalam celah-celah",
        },
        {
          correct: false,
          label: "membeku menjadi es",
        },
        {
          correct: false,
          label: "menggenang di permukaan tanah",
        },
      ],
    },
  },
};

export default item;

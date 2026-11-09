import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "emotional-response",
  },
  stimulus: "mango-tree",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "kesal karena Pak Darmo menyalahkan Ayu atas mangga yang jatuh",
        },
        {
          correct: true,
          label:
            "terharu karena pohon itu menyimpan kenangan dan kebiasaan berbagi istrinya",
        },
        { correct: false, label: "takut karena Pak Darmo akan memarahi Ayu" },
        { correct: false, label: "geli karena cerita itu lucu" },
        {
          correct: false,
          label: "curiga karena Pak Darmo berbohong tentang pohon itu",
        },
      ],
    },
  },
};

export default item;

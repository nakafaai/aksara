import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "fiction-evidence",
  },
  stimulus: "old-uniform",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Warna putih seragam itu tidak lagi secerah seragam teman-temannya.",
        },
        {
          correct: true,
          label:
            "Damar tidak jadi meminta seragam baru seperti rencananya semula.",
        },
        {
          correct: false,
          label: "Damar berusaha menutupi noda tinta di dekat saku.",
        },
        {
          correct: false,
          label: "Pak Sunu membaca nama di kerah dengan pelan.",
        },
        {
          correct: false,
          label: "Ibunya menjahit ulang kancing yang longgar.",
        },
      ],
    },
  },
};

export default item;

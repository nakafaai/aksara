import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "word-relation",
    topic: "antonym",
  },
  stimulus: "mikoriza",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Persediaan es batu di warung itu *menipis* menjelang sore.",
        },
        {
          correct: false,
          label: "Tabungan keluarga itu *menipis* karena biaya berobat.",
        },
        {
          correct: true,
          label:
            "Bagian kertas yang terlalu sering dihapus itu *menipis* hingga hampir sobek.",
        },
        {
          correct: false,
          label: "Penonton di tribune mulai *menipis* setelah hujan turun.",
        },
        {
          correct: false,
          label: "Harapan tim itu untuk lolos ke babak final makin *menipis*.",
        },
      ],
    },
  },
};

export default item;

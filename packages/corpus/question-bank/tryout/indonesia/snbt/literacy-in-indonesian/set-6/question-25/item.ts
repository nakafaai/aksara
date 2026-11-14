import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "strengthen-weaken",
  },
  stimulus: "pranata-mangsa",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Banyak petani muda tidak lagi mengenal nama-nama mangsa.",
        },
        {
          correct: false,
          label:
            "Prakiraan resmi juga kadang meleset dalam menebak awal musim hujan.",
        },
        {
          correct: true,
          label:
            "Sebagian tumbuhan yang dijadikan tanda dalam pranata mangsa ternyata bertunas menurut panjang siang, yang tidak berubah dari tahun ke tahun, bukan menurut hujan.",
        },
        {
          correct: false,
          label: "Pranata mangsa juga memuat tanda dari perilaku burung.",
        },
        {
          correct: false,
          label:
            "Di beberapa desa, kelompok tani mencatat tanda alam selama bertahun-tahun.",
        },
      ],
    },
  },
};

export default item;

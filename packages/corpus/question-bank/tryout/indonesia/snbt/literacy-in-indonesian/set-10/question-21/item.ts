import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "artefact-return",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Sebagian museum daerah belum punya ruang berpengatur suhu dan kelembapan.",
        },
        {
          correct: false,
          label:
            "Benda-benda itu dirampas oleh tentara kolonial pada akhir abad ke-19.",
        },
        {
          correct: false,
          label:
            "Masyarakat setempat menyambut kepulangan arca dengan upacara adat.",
        },
        {
          correct: false,
          label:
            "Jumlah pengunjung museum di Belanda menurun tajam dalam lima tahun terakhir.",
        },
        {
          correct: false,
          label:
            "Arca dari masa Singasari dipahat dari batu andesit yang sangat keras.",
        },
      ],
    },
  },
};

export default item;

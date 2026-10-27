import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Percakapan tanpa tujuan di dalam suatu kelompok",
        },
        {
          correct: false,
          label: "Kerja sama yang menghapus seluruh perbedaan",
        },
        {
          correct: true,
          label:
            "Persetujuan yang dicapai melalui penyesuaian atau jalan damai",
        },
        {
          correct: false,
          label: "Pemungutan suara untuk menentukan pihak yang menang",
        },
        {
          correct: false,
          label: "Penyerahan penuh satu pihak kepada pihak lain",
        },
      ],
    },
  },
};

export default item;

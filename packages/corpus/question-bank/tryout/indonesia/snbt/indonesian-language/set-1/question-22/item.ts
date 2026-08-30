import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Persetujuan yang dicapai melalui penyesuaian atau jalan damai",
        },
        {
          isCorrect: false,
          label: "Percakapan tanpa tujuan di dalam suatu kelompok",
        },
        {
          isCorrect: false,
          label: "Kerja sama yang menghapus seluruh perbedaan",
        },
        {
          isCorrect: false,
          label: "Pemungutan suara untuk menentukan pihak yang menang",
        },
        {
          isCorrect: false,
          label: "Penyerahan penuh satu pihak kepada pihak lain",
        },
      ],
    },
  },
};

export default item;

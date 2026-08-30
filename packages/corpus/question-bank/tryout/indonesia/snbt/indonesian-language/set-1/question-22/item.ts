import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Persetujuan yang dicapai melalui penyesuaian atau jalan damai",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Percakapan tanpa tujuan di dalam suatu kelompok",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kerja sama yang menghapus seluruh perbedaan",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Pemungutan suara untuk menentukan pihak yang menang",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Penyerahan penuh satu pihak kepada pihak lain",
            },
          ],
        },
      ],
    },
  },
};

export default item;

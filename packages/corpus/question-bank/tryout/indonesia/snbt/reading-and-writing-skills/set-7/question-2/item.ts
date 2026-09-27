import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "menghapus hasil yang tidak sesuai dengan harapan",
        },
        {
          isCorrect: false,
          label: "menolak seluruh data karena masa uji singkat",
        },
        {
          isCorrect: false,
          label: "meringkas laporan agar jumlah katanya lebih sedikit",
        },
        {
          isCorrect: false,
          label: "menunda pengukuran sampai perubahan diterapkan tetap",
        },
        {
          isCorrect: true,
          label: "menahan jangkauan klaim pada kondisi uji yang tersedia",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;

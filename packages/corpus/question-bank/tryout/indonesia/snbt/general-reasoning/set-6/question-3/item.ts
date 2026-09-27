import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kedua kegiatan dibatalkan karena hujan",
        },
        {
          isCorrect: false,
          label: "Kedua kegiatan dilaksanakan pada hari Minggu",
        },
        {
          isCorrect: false,
          label: "Hanya kegiatan membersihkan selokan yang dilaksanakan",
        },
        {
          isCorrect: true,
          label: "Barang daur ulang dikumpulkan pada hari Minggu",
        },
        {
          isCorrect: false,
          label: "Kerja bakti ditunda tanpa memilih kegiatan pengganti",
        },
      ],
    },
  },
};

export default item;

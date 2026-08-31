import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "loanwords",
  },
  responses: {
    id: {
      categories: ["Hasil", "Keterbatasan"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "Rata-rata bagian akhir lebih tinggi pada sesi berjeda",
        },
        {
          correctCategoryOrder: 2,
          label: "Semua peserta menjalani urutan kondisi yang sama",
        },
        {
          correctCategoryOrder: 2,
          label:
            "Peserta berasal dari kelompok yang tidak dipilih secara acak dari populasi sekolah",
        },
      ],
    },
  },
  stimulusKey: "study-breaks",
};

export default item;

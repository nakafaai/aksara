import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "terdapat beberapa penjelasan alternatif yang membatasi simpulan sebab-akibat",
        },
        {
          isCorrect: false,
          label: "jeda terbukti bermanfaat bagi semua orang",
        },
        {
          isCorrect: false,
          label: "dua paket soal pasti sama sulit",
        },
        {
          isCorrect: false,
          label: "penggunaan ponsel meningkatkan ketelitian",
        },
        {
          isCorrect: false,
          label: "jumlah peserta sudah mewakili seluruh siswa",
        },
      ],
    },
  },
  stimulusKey: "study-breaks",
};

export default item;

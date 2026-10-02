import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "memberi konsekuensi yang sama untuk setiap keterlambatan",
        },
        {
          isCorrect: false,
          label: "memilih konsekuensi terberat yang diizinkan aturan",
        },
        {
          isCorrect: false,
          label: "menentukan konsekuensi hanya dari besarnya pendapatan denda",
        },
        {
          isCorrect: false,
          label: "mengubah konsekuensi secara acak untuk setiap pengguna",
        },
        {
          isCorrect: true,
          label:
            "sebanding dengan tingkat kesalahan dan dampak yang ditimbulkan",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;

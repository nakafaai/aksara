import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "memeriksa satu sumber berulang kali sampai keterangannya tampak konsisten",
        },
        {
          isCorrect: false,
          label:
            "memilih kisah yang paling hidup tanpa menilai asal dan proses pembentukannya",
        },
        {
          isCorrect: false,
          label:
            "memberi bobot yang sama kepada semua sumber tanpa melihat konteksnya",
        },
        {
          isCorrect: false,
          label:
            "menyunting perbedaan kata sampai seluruh keterangan tampak seragam",
        },
        {
          isCorrect: true,
          label:
            "membandingkan beberapa sumber yang berdiri sendiri sebelum menetapkan kesimpulan",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;

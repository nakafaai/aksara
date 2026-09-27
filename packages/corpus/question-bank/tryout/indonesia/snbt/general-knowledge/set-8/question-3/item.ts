import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Catatan disusun dari kejadian paling awal hingga paling akhir agar urutan perubahan dapat ditelusuri.",
        },
        {
          isCorrect: false,
          label:
            "Data dikumpulkan menurut urutan langkah yang direncanakan dan diulang dengan aturan yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Nilai pengukuran berulang tetap berada dalam rentang sempit meskipun waktu pengambilan berbeda.",
        },
        {
          isCorrect: false,
          label:
            "Lonjakan muncul pada waktu yang tidak teratur tanpa pola selang yang tetap.",
        },
        {
          isCorrect: true,
          label:
            "Dua sensor merekam kejadian pada selang waktu yang sama, bukan secara bergantian.",
        },
      ],
    },
  },
};

export default item;

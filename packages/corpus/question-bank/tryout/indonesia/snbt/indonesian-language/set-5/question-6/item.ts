import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan menggunakan nilai rata-rata yang lebih tinggi untuk memperkirakan bahwa perubahan akan bekerja pada keadaan serupa.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menjelaskan rangkaian tertutup sebagai hasil utama, bukan sebagai bagian dari penelitian.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan membandingkan dua kondisi, tetapi menempatkan faktor kontrol sebagai rincian yang tidak memengaruhi penafsiran.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan lebih menekankan keterbatasan sampel daripada hubungan antara perubahan dan hasil.",
        },
        {
          isCorrect: true,
          label:
            "Rangkaian listrik dengan dua lampu menyederhanakan proses agar dapat diperiksa sambil tetap memiliki batas representasi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;

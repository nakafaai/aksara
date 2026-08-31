import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Model baki menunjukkan bahwa penutup serat berkaitan dengan lebih sedikit tanah terbawa pada kondisi terkontrol, tetapi faktor penting pada lereng nyata belum terwakili.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menggunakan nilai rata-rata yang lebih tinggi untuk memperkirakan bahwa perubahan akan bekerja pada keadaan serupa.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menjelaskan erosi sebagai hasil utama, bukan sebagai bagian dari penelitian.",
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
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;

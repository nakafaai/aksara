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
            "Model baki menunjukkan penutup serat selalu menghilangkan erosi karena massa tanah terbawa menjadi nol pada kedua ulangan.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan hanya mendefinisikan erosi tanpa membandingkan massa tanah dari baki terbuka dan berpenutup.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menganggap volume air dan sudut baki tidak perlu dibuat sama karena perbedaan massa tanah sudah cukup membuktikan pengaruh penutup.",
        },
        {
          isCorrect: false,
          label:
            "Model baki menentukan besar kehilangan tanah pada semua lereng karena dua ulangan telah mewakili seluruh kondisi lapangan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;

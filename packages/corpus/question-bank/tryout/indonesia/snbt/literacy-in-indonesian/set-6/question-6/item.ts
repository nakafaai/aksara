import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Model baki menunjukkan bahwa penutup serat berkaitan dengan lebih sedikit tanah terbawa pada kondisi terkontrol, tetapi faktor penting pada lereng nyata belum terwakili.",
        },
        {
          correct: false,
          label:
            "Model baki menunjukkan penutup serat selalu menghilangkan erosi karena massa tanah terbawa menjadi nol pada kedua ulangan.",
        },
        {
          correct: false,
          label:
            "Bacaan hanya mendefinisikan erosi tanpa membandingkan massa tanah dari baki terbuka dan berpenutup.",
        },
        {
          correct: false,
          label:
            "Bacaan menganggap volume air dan sudut baki tidak perlu dibuat sama karena perbedaan massa tanah sudah cukup membuktikan pengaruh penutup.",
        },
        {
          correct: false,
          label:
            "Model baki menentukan besar kehilangan tanah pada semua lereng karena dua ulangan telah mewakili seluruh kondisi lapangan.",
        },
      ],
    },
  },
};

export default item;

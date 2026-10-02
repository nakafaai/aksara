import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Partisipasi yang inklusif menuntut pengurangan hambatan nyata dan pemeriksaan keterwakilan, bukan sekadar undangan terbuka.",
        },
        {
          isCorrect: false,
          label:
            "Sebagian panitia mengusulkan agar semua warga cukup menyampaikan pendapat melalui formulir daring.",
        },
        {
          isCorrect: true,
          label:
            "Warga perbukitan harus pergi sebelum keputusan dan peserta Tuli tidak mendapat juru bahasa isyarat.",
        },
        {
          isCorrect: false,
          label:
            "Keputusan akhir akan mencatat pilihan, keberatan, dan pengaruh masukan.",
        },
        {
          isCorrect: false,
          label:
            "Musyawarah hanya sah jika setiap usulan warga akhirnya diterima.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;

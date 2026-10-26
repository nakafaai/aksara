import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Partisipasi yang inklusif menuntut pengurangan hambatan nyata dan pemeriksaan keterwakilan, bukan sekadar undangan terbuka.",
        },
        {
          correct: false,
          label:
            "Sebagian panitia mengusulkan agar semua warga cukup menyampaikan pendapat melalui formulir daring.",
        },
        {
          correct: true,
          label:
            "Warga perbukitan harus pergi sebelum keputusan dan peserta Tuli tidak mendapat juru bahasa isyarat.",
        },
        {
          correct: false,
          label:
            "Keputusan akhir akan mencatat pilihan, keberatan, dan pengaruh masukan.",
        },
        {
          correct: false,
          label:
            "Musyawarah hanya sah jika setiap usulan warga akhirnya diterima.",
        },
      ],
    },
  },
};

export default item;

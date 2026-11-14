import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "strengthening",
  },
  stimulus: "posyandu",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pada 2024, sebelum ada SMS, cakupan imunisasi dasar lengkap seluruh bayi di Sindangjaya adalah $$75\\%$$.",
        },
        {
          correct: false,
          label:
            "Anak sebelumnya dari orang tua yang tidak mendaftarkan nomor, yang diimunisasi sebelum ada SMS, juga hanya sekitar $$60\\%$$ yang mendapat imunisasi dasar lengkap.",
        },
        {
          correct: false,
          label:
            "Hampir semua orang tua penerima SMS mengaku membaca pesan itu pada hari pesan dikirim.",
        },
        {
          correct: false,
          label:
            "Orang tua yang mendaftarkan nomor dan orang tua yang tidak mendaftar rata-rata tinggal sama jauhnya dari posyandu.",
        },
        {
          correct: true,
          label:
            "Anak sebelumnya dari orang tua yang mendaftarkan nomor, yang diimunisasi sebelum ada SMS, hanya sekitar $$60\\%$$ yang mendapat imunisasi dasar lengkap.",
        },
      ],
    },
  },
};

export default item;

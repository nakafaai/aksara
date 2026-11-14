import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "interpretation",
  },
  stimulus: "ferry-mechanic",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Kalimat tentang mesin tua yang harus dipanaskan pelan-pelan dapat dibaca sebagai gambaran Pak Wiryo tentang dirinya sendiri.",
        },
        {
          column: 2,
          label:
            "Dengan melipat surat itu mengikuti bekas lipatannya, Pak Wiryo menunjukkan bahwa ia sudah menerima tanggal yang tertulis di dalamnya.",
        },
        {
          column: 1,
          label:
            "Permintaan Darto untuk belajar mendengarkan mesin memberi Pak Wiryo alasan baru untuk merasa masih diperlukan.",
        },
        {
          column: 2,
          label:
            "Pak Wiryo yakin bahwa Darto tidak akan pernah mampu menggantikannya di kamar mesin.",
        },
      ],
    },
  },
};

export default item;

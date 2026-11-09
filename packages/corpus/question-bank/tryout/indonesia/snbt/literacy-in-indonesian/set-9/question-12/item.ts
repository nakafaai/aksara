import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "figurative-language",
  },
  stimulus: "tea-picker",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "pucuk terbaik hanya dapat dipilih oleh tangan yang terampil dan teliti",
        },
        {
          correct: false,
          label:
            "mesin pemetik di kebun itu belum pernah dicoba di lereng timur",
        },
        {
          correct: false,
          label:
            "Laras harus menyimpan pucuk itu agar tidak dipetik oleh mesin",
        },
        {
          correct: false,
          label: "pucuk itu tumbuh di tempat yang tidak dapat dijangkau mesin",
        },
        {
          correct: false,
          label:
            "Mak Inah akan menolak dipindahkan ke bagian pengeringan mulai bulan depan",
        },
      ],
    },
  },
};

export default item;

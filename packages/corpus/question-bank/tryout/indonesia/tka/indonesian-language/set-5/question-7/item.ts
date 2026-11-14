import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "meaning-relations",
  },
  stimulus: "cracked-voice",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Gilang harus pindah sekolah agar dapat berlatih dengan tenang",
        },
        {
          correct: false,
          label:
            "suara Gilang akan kembali tinggi seperti semula setelah lomba",
        },
        {
          correct: true,
          label:
            "suara Gilang sedang berubah ke wilayah nada yang lebih rendah, bukan rusak",
        },
        {
          correct: false,
          label: "Gilang sebaiknya berlatih di rumah, tidak di ruang musik",
        },
        {
          correct: false,
          label: "suara Gilang rusak sehingga perlu diistirahatkan",
        },
      ],
    },
  },
};

export default item;

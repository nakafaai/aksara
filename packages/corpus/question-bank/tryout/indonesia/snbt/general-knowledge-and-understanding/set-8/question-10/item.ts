import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "word-relation",
    topic: "antonym",
  },
  stimulus: "lontar",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Tali ijuk itu masih *kuat* meskipun sudah bertahun-tahun dipakai menimba air.",
        },
        {
          correct: false,
          label: "Tiang kayu rumah panggung itu sudah *lapuk* dimakan rayap.",
        },
        {
          correct: false,
          label: "Lembaran daun lontar dipotong *tipis* sebelum ditulisi.",
        },
        {
          correct: false,
          label:
            "Meski kalah di final, ia tetap *tegar* di depan para pendukungnya.",
        },
        {
          correct: false,
          label: "Rumput di lapangan itu *kering* karena kemarau panjang.",
        },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "conflict",
  },
  stimulus: "boat-race",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "bersekolah setiap hari dan berlatih berlayar di teluk setiap sore",
        },
        {
          correct: false,
          label: "meminta izin kepada ayahnya dan meminjam perahu diam-diam",
        },
        {
          correct: true,
          label:
            "mengejar kemenangan dan menolong anak yang perahunya terbalik",
        },
        {
          correct: false,
          label: "memprotes panitia atau menerima hasil lomba begitu saja",
        },
        {
          correct: false,
          label: "tetap menjadi nelayan dan belajar menjahit layar",
        },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "inference",
  },
  stimulus: "senior-exercise",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Peserta tidak dapat lagi mengikuti senam.",
        },
        {
          correct: true,
          label:
            "Petugas puskesmas lebih sulit memantau tekanan darah peserta tanpa mendatangi rumah mereka.",
        },
        {
          correct: false,
          label: "Gerakan senam menjadi lebih cepat.",
        },
        {
          correct: false,
          label: "Peserta tidur lebih nyenyak.",
        },
        {
          correct: false,
          label: "Jumlah peserta senam bertambah dua kali lipat.",
        },
      ],
    },
  },
};

export default item;

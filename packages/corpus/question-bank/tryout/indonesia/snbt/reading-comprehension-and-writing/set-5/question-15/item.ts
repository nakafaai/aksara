import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "author-purpose",
  },
  stimulus: "quake-drill",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "mengajak pemerintah membangun gedung sekolah yang tahan gempa",
        },
        {
          correct: false,
          label: "menceritakan gempa besar yang pernah melanda sekolah itu",
        },
        {
          correct: true,
          label:
            "menjelaskan manfaat latihan gempa yang diulang berdasarkan pengalaman sebuah sekolah",
        },
        {
          correct: false,
          label: "membandingkan latihan gempa di beberapa sekolah",
        },
        {
          correct: false,
          label: "mengkritik siswa yang berlari di tangga",
        },
      ],
    },
  },
};

export default item;

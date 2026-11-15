import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-reasoning",
  },
  stimulus: "framing-effect",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Keuntungan pasti lebih disukai daripada keuntungan berisiko, sedangkan kerugian pasti terasa lebih berat daripada kerugian berisiko.",
        },
        {
          correct: false,
          label:
            "Orang selalu memilih program yang menyelamatkan paling banyak orang, berapa pun peluangnya.",
        },
        {
          correct: false,
          label:
            "Orang tidak memahami arti peluang sepertiga dan dua pertiga, sehingga mereka memilih program secara acak saja.",
        },
        {
          correct: false,
          label:
            "Kerugian yang pasti lebih disukai daripada kerugian yang berisiko, karena orang selalu ingin segera tahu hasil akhirnya.",
        },
        {
          correct: false,
          label:
            "Orang lebih percaya pada program yang disebut lebih dulu dalam soal, apa pun isinya.",
        },
      ],
    },
  },
};

export default item;

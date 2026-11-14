import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "continuation",
  },
  stimulus: "lost-vote",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Kirana dan pengurus OSIS memasang tempat sampah terpilah di kantin",
        },
        {
          correct: false,
          label: "Kirana mengundurkan diri dari kepengurusan OSIS yang baru",
        },
        {
          correct: false,
          label: "Kirana menempel kembali posternya untuk pemilihan ulang",
        },
        { correct: false, label: "Bagas mencabut tawarannya kepada Kirana" },
        {
          correct: false,
          label: "tim kampanye Kirana menolak berbicara dengannya",
        },
      ],
    },
  },
};

export default item;

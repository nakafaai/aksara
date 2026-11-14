import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "emotional-response",
  },
  stimulus: "lost-girl",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "kesal karena Mbak Sari terus memarahi Arif" },
        { correct: false, label: "takut karena ibu Nisa akan memarahi Arif" },
        {
          correct: true,
          label:
            "lega dan terharu karena kebaikan Arif akhirnya diketahui dan dihargai kakaknya",
        },
        {
          correct: false,
          label: "bingung karena Arif tidak pernah pergi ke pasar",
        },
        { correct: false, label: "sedih karena kue Mbak Sari gagal dibuat" },
      ],
    },
  },
};

export default item;

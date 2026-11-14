import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "emotional-response",
  },
  stimulus: "lost-vote",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "kesal karena Kirana mengotori kelas dengan poster bekas",
        },
        {
          correct: false,
          label: "geli karena poster itu bergambar wajah Kirana",
        },
        {
          correct: true,
          label:
            "terharu karena Kirana tetap menghargai usahanya meskipun kalah",
        },
        {
          correct: false,
          label:
            "takut karena Kirana akan membalas teman yang menyobek posternya",
        },
        {
          correct: false,
          label:
            "heran karena Kirana ingin menempel poster itu lagi untuk pemilihan ulang",
        },
      ],
    },
  },
};

export default item;

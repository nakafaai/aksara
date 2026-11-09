import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "emotional-response",
  },
  stimulus: "lost-cat",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "bingung karena Bu Wening marah kepada Puspa",
        },
        {
          correct: false,
          label: "kesal karena Bu Wening tidak berterima kasih kepada Nayla",
        },
        {
          correct: false,
          label: "takut karena anak-anak kucing itu akan dibuang",
        },
        {
          correct: false,
          label: "geli karena Bu Wening salah mengenali kucingnya",
        },
        {
          correct: true,
          label:
            "ikut terharu karena kesedihan Bu Wening berubah menjadi kebahagiaan yang tidak terduga",
        },
      ],
    },
  },
};

export default item;

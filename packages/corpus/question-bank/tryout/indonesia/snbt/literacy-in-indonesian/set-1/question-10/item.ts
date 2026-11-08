import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "ferry-ticket",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Tanda bahwa ia dengan sadar merelakan kepergian Laila meskipun keputusan itu berat baginya.",
        },
        {
          correct: false,
          label:
            "Ungkapan marah karena Laila tidak menghiraukan peringatannya tentang ombak.",
        },
        {
          correct: false,
          label:
            "Kebiasaan baru yang muncul karena permukaan stempelnya sudah licin dan aus.",
        },
        {
          correct: false,
          label:
            "Isyarat bahwa ia ingin segera melayani antrean penumpang yang mulai gelisah.",
        },
        {
          correct: false,
          label:
            "Tanda bahwa ia yakin Laila akan pulang ke pulau sebelum Lebaran.",
        },
      ],
    },
  },
};

export default item;

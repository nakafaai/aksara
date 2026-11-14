import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "setting-character-phenomenon",
  },
  stimulus: "lost-vote",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Tepuk tangan riuh terdengar dari barisan kelas dua belas.",
        },
        {
          correct: true,
          label: "Teman-teman tim kampanye Kirana diam di kelas.",
        },
        {
          correct: true,
          label:
            "Seseorang menyobek poster bergambar wajah Kirana dari dinding.",
        },
        {
          correct: false,
          label: "Bagas menghampiri Kirana di parkiran sepeda.",
        },
      ],
    },
  },
};

export default item;

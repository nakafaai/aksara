import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "affix-meaning",
  },
  stimulus: "bakau",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "*Pelari* itu mencapai garis akhir lebih dulu.",
        },
        {
          correct: true,
          label: "*Pengering* rambut di kamar itu tidak menyala.",
        },
        {
          correct: false,
          label: "Adik saya seorang *pemalu* di depan orang baru.",
        },
        {
          correct: false,
          label: "*Penduduk* desa itu sebagian besar bertani.",
        },
        {
          correct: false,
          label: "Ayahnya dahulu seorang *petinju*.",
        },
      ],
    },
  },
};

export default item;

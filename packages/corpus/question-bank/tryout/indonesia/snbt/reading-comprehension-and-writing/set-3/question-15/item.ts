import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "title",
  },
  stimulus: "suspension-bridge",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Insinyur Sukarelawan di Kampung Lebak Muncang",
        },
        {
          correct: false,
          label: "Bahaya Arus Sungai pada Musim Hujan",
        },
        {
          correct: true,
          label: "Jembatan Gotong Royong untuk Sekolah dan Pasar",
        },
        {
          correct: false,
          label: "Rakit Bambu Penyeberangan Warga",
        },
        {
          correct: false,
          label: "Kabel Baja dari Pemerintah Kabupaten",
        },
      ],
    },
  },
};

export default item;

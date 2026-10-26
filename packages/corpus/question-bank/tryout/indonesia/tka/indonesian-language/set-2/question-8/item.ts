import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "setting-character-phenomenon",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Ruang radio akan dipakai sebagai laboratorium bahasa.",
        },
        {
          correct: false,
          label:
            "Semua kaset lama langsung diputar sebelum kondisinya diperiksa.",
        },
        {
          correct: false,
          label:
            "Rekaman yang konteksnya belum jelas dipindahkan tanpa pencatatan awal.",
        },
        {
          correct: true,
          label: "Guru sejarah menawarkan penyimpanan kering.",
        },
      ],
    },
  },
  stimulus: "last-broadcast",
};

export default item;

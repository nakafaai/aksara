import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  stimulus: "braille-signs",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "pemindahan papan membuat peserta harus berjalan lebih jauh untuk menemukan jalur",
        },
        {
          correct: false,
          label: "waktu pencarian justru naik setelah papan dipindahkan",
        },
        {
          correct: false,
          label:
            "papan dipindahkan karena pedagang menaruh dagangan di atas ubin",
        },
        {
          correct: false,
          label: "letak papan tidak berhubungan dengan waktu pencarian",
        },
        {
          correct: true,
          label:
            "papan di ujung ubin lebih mudah ditemukan peserta sehingga waktu pencarian turun",
        },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "botanic-garden",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Bibit kelapa sawit yang ditanam di kebun itu didatangkan dari luar Nusantara.",
        },
        {
          column: 2,
          label:
            "Herbarium kebun itu menyimpan tumbuhan hidup yang terancam punah di hutan.",
        },
        {
          column: 1,
          label:
            "Sebagian peneliti yang datang ke laboratorium kebun itu tidak sedang mencari tanaman yang menguntungkan.",
        },
        {
          column: 2,
          label:
            "Kebun raya dapat menjaga keragaman genetik suatu jenis sebaik hutan tempat jenis itu hidup.",
        },
        {
          column: 2,
          label:
            "Semua sejarawan menyebut kebun raya pada masa kolonial sebagai laboratorium perkebunan.",
        },
      ],
    },
  },
};

export default item;

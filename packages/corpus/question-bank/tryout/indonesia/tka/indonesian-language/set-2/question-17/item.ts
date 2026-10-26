import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "main-supporting-ideas",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "menjual layangan kepada juri",
        },
        {
          correct: true,
          label: "menguji apakah perbaikan bekerja dalam angin nyata",
        },
        {
          correct: false,
          label: "menyembunyikan bilah bambu",
        },
        {
          correct: false,
          label: "mengganti lomba dengan pertunjukan musik",
        },
        {
          correct: false,
          label:
            "menunjukkan bahwa kertas baru merupakan faktor utama keberhasilan perbaikan",
        },
      ],
    },
  },
  stimulus: "kite-frame",
};

export default item;

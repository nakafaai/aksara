import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "figurative-language",
  },
  stimulus: "letter-poem",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "aku lirik tidak mampu membeli makanan karena gajinya kecil",
        },
        {
          correct: false,
          label: "penjual nasi di kota tidak ramah kepada para pembelinya",
        },
        {
          correct: false,
          label:
            "aku lirik terlalu sibuk bekerja di kantor sehingga lupa makan setiap hari",
        },
        {
          correct: true,
          label:
            "di kota, aku lirik kehilangan perhatian sederhana yang dulu ia terima",
        },
        {
          correct: false,
          label:
            "teman-teman aku lirik mungkin juga belum makan sepanjang hari",
        },
      ],
    },
  },
};

export default item;

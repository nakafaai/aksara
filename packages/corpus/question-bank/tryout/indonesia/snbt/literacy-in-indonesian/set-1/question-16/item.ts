import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "AFI menempatkannya sebagai legenda film perempuan dan beberapa filmnya masuk National Film Registry",
        },
        {
          correct: false,
          label: "Ia pernah bekerja di sebuah pabrik pada masa perang",
        },
        {
          correct: false,
          label: "Namanya berubah dari Norma Jeane menjadi Marilyn Monroe",
        },
        {
          correct: false,
          label: "Ia menikah pada usia enam belas tahun",
        },
        {
          correct: false,
          label: "Ia menjadi model setelah bertemu seorang fotografer",
        },
      ],
    },
  },
};

export default item;

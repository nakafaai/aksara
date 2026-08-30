import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Ia pernah bekerja di sebuah pabrik pada masa perang",
        },
        {
          isCorrect: false,
          label: "Namanya berubah dari Norma Jeane menjadi Marilyn Monroe",
        },
        {
          isCorrect: true,
          label:
            "AFI menempatkannya sebagai legenda film perempuan dan beberapa filmnya masuk National Film Registry",
        },
        {
          isCorrect: false,
          label: "Ia menikah pada usia enam belas tahun",
        },
        {
          isCorrect: false,
          label: "Ia menjadi model setelah bertemu seorang fotografer",
        },
      ],
    },
  },
};

export default item;

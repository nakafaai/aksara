import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "AFI menempatkannya sebagai legenda film perempuan dan beberapa filmnya masuk National Film Registry",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Ia pernah bekerja di sebuah pabrik pada masa perang",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Namanya berubah dari Norma Jeane menjadi Marilyn Monroe",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Ia menikah pada usia enam belas tahun" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Ia menjadi model setelah bertemu seorang fotografer",
            },
          ],
        },
      ],
    },
  },
};

export default item;

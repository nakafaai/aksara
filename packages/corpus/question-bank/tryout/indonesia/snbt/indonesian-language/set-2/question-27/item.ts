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
              text: "Tersusun dari orang atau unsur yang berasal dari berbagai tempat",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Memiliki penduduk yang berpengetahuan sangat luas",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Berada di wilayah pesisir yang mudah dicapai",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Telah berkembang menjadi kota yang sepenuhnya modern",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Menutup diri dari pengaruh budaya luar" },
          ],
        },
      ],
    },
  },
};

export default item;

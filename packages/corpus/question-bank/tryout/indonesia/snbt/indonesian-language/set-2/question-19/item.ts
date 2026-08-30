import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Luas, terang, dan terbuka langsung ke jalan",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sempit, lembap, dan seluruh dindingnya terbuat dari besi",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Sempit, tanpa pandangan ke luar, dan berjendela kecil berjeruji",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Mewah, berhias lukisan, dan memiliki banyak pintu",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Berada di bawah tanah dan hanya dapat dicapai melalui tangga",
            },
          ],
        },
      ],
    },
  },
};

export default item;

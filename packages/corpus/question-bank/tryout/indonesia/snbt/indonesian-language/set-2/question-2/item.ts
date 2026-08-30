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
              text: "Mencuci beras akan mengurangi jumlah beras",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Mencuci beras akan merusak bentuk beras" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Beras yang dicuci akan mengurangi cita rasa khas dari beras",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kualitas beras yang dicuci tidak sebaik yang tidak dicuci",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Pati bebas pada permukaan butiran beras berkurang",
            },
          ],
        },
      ],
    },
  },
};

export default item;

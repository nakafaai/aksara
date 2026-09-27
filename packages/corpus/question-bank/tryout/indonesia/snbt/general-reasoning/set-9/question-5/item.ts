import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Banjir dapat mencemari sumber air minum",
        },
        {
          isCorrect: false,
          label: "Genangan air dapat menjadi tempat berkembang biak nyamuk",
        },
        {
          isCorrect: false,
          label: "Banjir saja tidak membuktikan bahwa wabah pasti terjadi",
        },
        {
          isCorrect: true,
          label:
            "Genangan air tidak pernah menjadi tempat berkembang biak nyamuk",
        },
        {
          isCorrect: false,
          label:
            "Kondisi setempat dan tindakan pengendalian dapat memengaruhi risiko wabah",
        },
      ],
    },
  },
};

export default item;

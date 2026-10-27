import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Banjir dapat mencemari sumber air minum",
        },
        {
          correct: false,
          label: "Genangan air dapat menjadi tempat berkembang biak nyamuk",
        },
        {
          correct: false,
          label: "Banjir saja tidak membuktikan bahwa wabah pasti terjadi",
        },
        {
          correct: true,
          label:
            "Genangan air tidak pernah menjadi tempat berkembang biak nyamuk",
        },
        {
          correct: false,
          label:
            "Kondisi setempat dan tindakan pengendalian dapat memengaruhi risiko wabah",
        },
      ],
    },
  },
};

export default item;

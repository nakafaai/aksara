import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Nama ibu kandungnya",
        },
        {
          correct: false,
          label: "Tempat kelahirannya",
        },
        {
          correct: true,
          label: "Identitas ayah biologisnya",
        },
        {
          correct: false,
          label: "Tahun kelahirannya",
        },
        {
          correct: false,
          label: "Nama keluarga asuhnya",
        },
      ],
    },
  },
};

export default item;

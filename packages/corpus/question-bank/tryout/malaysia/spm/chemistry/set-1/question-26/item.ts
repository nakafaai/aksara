import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "A dark blue colour around the iron nail and a pink colour around the magnesium ribbon",
        },
        {
          correct: false,
          label:
            "A dark blue colour around the magnesium ribbon and a pink colour around the iron nail",
        },
        {
          correct: true,
          label: "A pink colour around the iron nail and no dark blue colour",
        },
        {
          correct: false,
          label:
            "No colour change at all because magnesium stops every reaction",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Warna biru tua di sekitar paku besi dan warna merah jambu di sekitar pita magnesium",
        },
        {
          correct: false,
          label:
            "Warna biru tua di sekitar pita magnesium dan warna merah jambu di sekitar paku besi",
        },
        {
          correct: true,
          label:
            "Warna merah jambu di sekitar paku besi dan tiada warna biru tua",
        },
        {
          correct: false,
          label:
            "Tiada sebarang perubahan warna kerana magnesium menghalang semua tindak balas",
        },
      ],
    },
  },
};

export default item;

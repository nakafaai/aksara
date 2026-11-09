import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "explicit-information",
  },
  stimulus: "larva-monitors",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "melapor langsung ke puskesmas",
        },
        {
          correct: false,
          label: "membuang wadah yang berisi jentik",
        },
        {
          correct: true,
          label:
            "menguras wadah itu dan mencatat temuannya di kartu pemantauan",
        },
        {
          correct: false,
          label: "menyemprotkan obat nyamuk ke seluruh rumah",
        },
        {
          correct: false,
          label: "mengumpulkan kartu pemantauan kepada kader kesehatan",
        },
      ],
    },
  },
};

export default item;

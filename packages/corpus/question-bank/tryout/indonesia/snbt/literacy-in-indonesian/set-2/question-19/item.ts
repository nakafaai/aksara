import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Luas, terang, dan terbuka langsung ke jalan",
        },
        {
          correct: false,
          label: "Sempit, lembap, dan seluruh dindingnya terbuat dari besi",
        },
        {
          correct: false,
          label: "Mewah, berhias lukisan, dan memiliki banyak pintu",
        },
        {
          correct: true,
          label:
            "Sempit, tanpa pandangan ke luar, dan berjendela kecil berjeruji",
        },
        {
          correct: false,
          label: "Berada di bawah tanah dan hanya dapat dicapai melalui tangga",
        },
      ],
    },
  },
};

export default item;

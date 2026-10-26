import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Hamparan diselimuti kristal es.",
        },
        {
          correct: false,
          label: "Mereka diselimuti kristal es.",
        },
        {
          correct: true,
          label: "Para pengunjung terpesona.",
        },
        {
          correct: false,
          label: "Terpesona kecantikan hamparan kristal es",
        },
        {
          correct: false,
          label: "Diselimuti kristal es bening.",
        },
      ],
    },
  },
};

export default item;

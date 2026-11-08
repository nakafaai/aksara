import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Translasi mempertahankan panjang setiap sisi segitiga.",
        },
        {
          correct: true,
          label: "Pencerminan terhadap suatu garis mempertahankan luas segitiga.",
        },
        {
          correct: false,
          label: "Dilatasi dengan faktor skala $$-2$$ menghasilkan segitiga yang luasnya $$2$$ kali luas semula.",
        },
        {
          correct: true,
          label: "Rotasi $$180^\\circ$$ dengan pusat $$O(0,0)$$ sama dengan dilatasi berpusat di $$O$$ dengan faktor skala $$-1$$.",
        },
        {
          correct: false,
          label: "Pencerminan terhadap sumbu $$x$$ dilanjutkan pencerminan terhadap sumbu $$y$$ sama dengan sebuah translasi.",
        },
      ],
    },
  },
};

export default item;

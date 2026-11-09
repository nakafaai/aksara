import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "main-idea",
  },
  stimulus: "coffee-picking",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Petani memetik buah kopi merah dan hijau sekaligus.",
        },
        {
          correct: false,
          label: "Rasa kopi dari Desa Lerengsari tidak merata.",
        },
        {
          correct: false,
          label: "Pembeli hanya mau membayar kopi dengan harga rendah.",
        },
        {
          correct: false,
          label: "Panen dengan cara petik merah berlangsung lebih lama.",
        },
        {
          correct: true,
          label:
            "Cara memetik kopi sekaligus membuat harga kopi rendah sehingga petani beralih ke petik merah.",
        },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "author-purpose",
  },
  stimulus: "coffee-picking",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "mengajak petani kopi di seluruh Indonesia menjual kopi kepada perusahaan",
        },
        {
          correct: true,
          label:
            "menjelaskan perubahan cara memetik kopi di sebuah desa dan hasilnya",
        },
        {
          correct: false,
          label: "membandingkan rasa kopi dari berbagai daerah",
        },
        {
          correct: false,
          label: "menguraikan cara mengolah biji kopi menjadi bubuk",
        },
        {
          correct: false,
          label: "mengkritik perusahaan kopi yang membeli dengan harga rendah",
        },
      ],
    },
  },
};

export default item;

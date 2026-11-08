import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "coffee-plots",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Pada ketinggian yang sama, kebun berpohon pelindung menghasilkan biji lebih sedikit daripada kebun tanpa pohon pelindung.",
        },
        {
          column: 2,
          label:
            "Kebun dengan hasil biji terbanyak juga memperoleh pendapatan terbesar.",
        },
        {
          column: 1,
          label:
            "Dengan perlakuan pohon pelindung yang sama, kebun di ketinggian 1.400 mdpl memiliki skor cita rasa lebih tinggi daripada kebun di 1.100 mdpl.",
        },
        {
          column: 2,
          label: "Kebun C memperoleh harga per kilogram tertinggi.",
        },
      ],
    },
  },
};

export default item;

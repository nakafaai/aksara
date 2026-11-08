import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "term-meaning",
  },
  stimulus: "batik",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Mencetak motif pada kain dengan mesin.",
        },
        {
          correct: false,
          label: "Mencampur dua pewarna agar muncul warna baru.",
        },
        {
          correct: true,
          label: "Menutup bagian kain tertentu agar tidak menyerap pewarna.",
        },
        {
          correct: false,
          label:
            "Mencuci kain dengan air mendidih sesudah dicelup agar warnanya lebih cerah.",
        },
        {
          correct: false,
          label: "Menggambar pola dengan pensil sebelum diwarnai.",
        },
      ],
    },
  },
};

export default item;

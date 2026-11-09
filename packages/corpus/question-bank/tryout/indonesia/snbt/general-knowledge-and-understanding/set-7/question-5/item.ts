import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "main-idea",
  },
  stimulus: "angklung",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Angklung berkembang dari pengiring upacara adat menjadi alat musik yang dimainkan secara luas.",
        },
        {
          correct: false,
          label:
            "Daeng Soetigna adalah satu-satunya orang yang pernah membuat angklung di Jawa Barat.",
        },
        {
          correct: false,
          label:
            "UNESCO melarang angklung dimainkan dalam pertunjukan musik modern di luar upacara adat di Jawa Barat.",
        },
        {
          correct: false,
          label:
            "Setiap pemain angklung harus menguasai semua nada agar sebuah lagu dapat dimainkan.",
        },
        {
          correct: false,
          label:
            "Angklung tidak lagi dipakai dalam upacara adat sejak tahun 1938 karena sudah diatonis.",
        },
      ],
    },
  },
};

export default item;

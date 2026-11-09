import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "application",
  },
  stimulus: "bahasa",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Bahasa dengan $$300$$ penutur yang masih dipakai orang tua untuk berbicara dengan anak-anaknya setiap hari.",
        },
        {
          correct: false,
          label:
            "Bahasa dengan $$2$$ juta penutur yang dipakai di rumah dan diajarkan di sekolah.",
        },
        {
          correct: false,
          label:
            "Bahasa dengan $$5{.}000$$ penutur yang dipakai anak-anak ketika bermain bersama.",
        },
        {
          correct: false,
          label:
            "Bahasa dengan $$800$$ penutur yang memiliki kamus lengkap dan dipakai keluarga muda di rumah.",
        },
        {
          correct: true,
          label:
            "Bahasa dengan $$50{.}000$$ penutur yang hanya dipakai oleh orang berusia di atas $$60$$ tahun.",
        },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "evaluation",
  },
  stimulus: "kamera",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "perbandingan pencurian di jalan ber-CCTV dan jalan tanpa CCTV yang sama-sama dijaga ronda",
        },
        {
          correct: false,
          label:
            "pendapat warga tentang rasa aman mereka pada malam hari setelah kamera dipasang di jalan-jalan utama",
        },
        {
          correct: false,
          label:
            "merek, resolusi, dan sudut pandang kamera yang dipasang di setiap titik jalan",
        },
        {
          correct: false,
          label:
            "banyak kasus pencurian di desa itu pada tahun 2020 sebelum ada kamera maupun ronda",
        },
        {
          correct: false,
          label:
            "jumlah petugas ronda yang bertugas setiap malam selama tahun 2026",
        },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "sampling",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Simpulan itu tepat karena pesan yang masuk lebih dari seribu.",
        },
        {
          correct: true,
          label:
            "Simpulan itu belum tentu tepat karena pengirim pesan memilih sendiri untuk ikut dan belum tentu mewakili warga kota.",
        },
        {
          correct: false,
          label:
            "Simpulan itu salah karena masih ada $$22\\%$$ pengirim pesan yang tidak setuju dengan larangan keluar rumah setelah pukul $$22.00$$.",
        },
        {
          correct: false,
          label: "Simpulan itu tepat karena $$78\\%$$ lebih dari separuh.",
        },
        {
          correct: false,
          label:
            "Simpulan itu salah karena remaja tidak diperbolehkan mengirim pesan.",
        },
      ],
    },
  },
};

export default item;

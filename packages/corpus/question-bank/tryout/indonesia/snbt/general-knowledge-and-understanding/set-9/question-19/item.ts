import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "main-idea",
  },
  stimulus: "bambu",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Bambu cepat tumbuh dan kuat, tetapi perlu diawetkan agar tahan terhadap kumbang bubuk.",
        },
        {
          correct: false,
          label:
            "Bambu lebih kuat daripada baja dalam semua keadaan sehingga dapat menggantikan logam.",
        },
        {
          correct: false,
          label:
            "Kayu jati lebih baik daripada bambu karena memerlukan waktu puluhan tahun untuk tumbuh.",
        },
        {
          correct: false,
          label:
            "Kumbang bubuk hanya menyerang bambu yang ditebang pada musim kemarau saat patinya rendah.",
        },
        {
          correct: false,
          label:
            "Batang bambu direndam di dalam air selama beberapa minggu agar tumbuh lebih tinggi lagi.",
        },
      ],
    },
  },
};

export default item;

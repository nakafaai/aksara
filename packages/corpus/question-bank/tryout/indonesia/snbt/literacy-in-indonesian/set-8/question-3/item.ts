import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "strengthen-weaken",
  },
  stimulus: "noise-hearing",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pekerja yang sudah bekerja lebih dari $$10$$ tahun rata-rata memiliki ambang dengar yang lebih buruk daripada pekerja baru.",
        },
        {
          correct: false,
          label:
            "Setelah cuti $$2$$ pekan, pekerja yang merasa sudah terbiasa kembali merasa terganggu oleh bising yang sama.",
        },
        {
          correct: false,
          label:
            "Pekerja yang memakai penyumbat telinga lebih jarang mengeluhkan bising daripada pekerja yang tidak memakainya.",
        },
        {
          correct: true,
          label:
            "Di antara pekerja dengan masa kerja sama, yang merasa terbiasa punya ambang dengar frekuensi tinggi lebih buruk daripada yang masih terganggu.",
        },
        {
          correct: false,
          label:
            "Pekerja penggilingan yang merasa terbiasa lebih sering melaporkan tinitus daripada pegawai kantor di pabrik yang sama.",
        },
      ],
    },
  },
};

export default item;

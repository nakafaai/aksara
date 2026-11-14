import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  stimulus: "countdown-lights",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "penghitung waktu mundur membuat semua pengendara lebih sabar",
        },
        {
          correct: false,
          label: "lampu lalu lintas sebaiknya dihapus dari persimpangan kota",
        },
        {
          correct: false,
          label:
            "pelanggaran lampu merah meningkat setelah penghitung dipasang",
        },
        {
          correct: false,
          label: "kamera pengawas lebih murah daripada penghitung waktu mundur",
        },
        {
          correct: true,
          label:
            "penghitung waktu mundur dapat mengurangi satu jenis pelanggaran, tetapi memicu perilaku berisiko lain sehingga perlu diuji lebih lanjut",
        },
      ],
    },
  },
};

export default item;

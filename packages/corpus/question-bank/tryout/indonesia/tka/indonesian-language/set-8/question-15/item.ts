import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "language-suitability",
  },
  stimulus: "blood-drive",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kegiatan ini membuktikan bahwa semua siswa kami bebas dari penyakit.",
        },
        {
          correct: false,
          label:
            "Sebanyak 186 kantong darah berhasil dikumpulkan dalam kegiatan ini.",
        },
        {
          correct: false,
          label: "Hanya 54 orang yang lolos pemeriksaan sebelum donor.",
        },
        {
          correct: true,
          label:
            "Dari 186 pendaftar, 132 orang lolos pemeriksaan dan menyumbangkan darah pada hari itu.",
        },
        {
          correct: false,
          label: "Warga sekolah kita adalah yang paling sehat di kota ini.",
        },
      ],
    },
  },
};

export default item;

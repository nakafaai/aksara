import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "urban-heat",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Bahan bangunan kota melepaskan panas simpanan perlahan, desa cepat mendingin.",
        },
        {
          correct: false,
          label:
            "Pada malam hari, kendaraan yang melintas di kota jauh lebih banyak daripada pada siang hari.",
        },
        {
          correct: false,
          label:
            "Satelit hanya dapat mengukur suhu kota dengan tepat pada malam hari.",
        },
        {
          correct: false,
          label:
            "Tumbuhan di desa menyerap panas dari kota ketika matahari sudah terbenam.",
        },
        {
          correct: false,
          label:
            "Angin malam biasanya bertiup dari kota menuju desa sehingga desa lebih sejuk.",
        },
      ],
    },
  },
};

export default item;

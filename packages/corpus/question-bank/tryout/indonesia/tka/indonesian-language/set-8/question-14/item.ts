import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  stimulus: "blood-drive",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "saran itu dibuat agar lebih sedikit orang mendaftar tahun depan",
        },
        {
          correct: true,
          label:
            "saran-saran itu menanggapi penyebab tidak lolos yang ditemukan, seperti kurang tidur dan hemoglobin rendah",
        },
        {
          correct: false,
          label: "saran itu tidak berhubungan dengan hasil pemeriksaan",
        },
        {
          correct: false,
          label:
            "saran itu meminta pendaftar yang tidak lolos dilarang ikut lagi",
        },
        {
          correct: false,
          label: "saran itu bertujuan menaikkan batas usia pendonor",
        },
      ],
    },
  },
};

export default item;

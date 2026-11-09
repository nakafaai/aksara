import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-comparison",
  },
  stimulus: "remote-work",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "seberapa jauh karyawan sebaiknya diizinkan bekerja dari rumah",
        },
        {
          correct: false,
          label: "perlu tidaknya perusahaan merekrut pekerja dari kota lain",
        },
        {
          correct: false,
          label:
            "apakah pekerja berpengalaman diuntungkan oleh kerja jarak jauh",
        },
        {
          correct: false,
          label: "perlu tidaknya rapat dadakan dihapus dari semua kantor",
        },
        {
          correct: false,
          label: "apakah laporan dan analisis data dapat dikerjakan di kantor",
        },
      ],
    },
  },
};

export default item;

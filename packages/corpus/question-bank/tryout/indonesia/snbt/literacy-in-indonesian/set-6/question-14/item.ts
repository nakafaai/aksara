import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "ride-hailing",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Ia menganggapnya belum cukup, karena usul itu membiarkan perusahaan tetap menetapkan tarif dan menilai pengemudi tanpa menanggung kewajiban pemberi kerja.",
        },
        {
          correct: false,
          label:
            "Ia menerimanya sepenuhnya, karena usul itu sudah memuat semua hak yang ia tuntut.",
        },
        {
          correct: false,
          label:
            "Ia menolaknya, karena menurutnya pengemudi tidak membutuhkan jaminan kecelakaan.",
        },
        {
          correct: false,
          label:
            "Ia menerimanya, asalkan pengemudi sambilan dilarang memakai aplikasi.",
        },
        {
          correct: false,
          label:
            "Ia menolaknya, karena jalur banding akan membuat perusahaan rugi.",
        },
      ],
    },
  },
};

export default item;

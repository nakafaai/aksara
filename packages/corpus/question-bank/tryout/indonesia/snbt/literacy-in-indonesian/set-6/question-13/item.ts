import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "strengthen-weaken",
  },
  stimulus: "ride-hailing",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Banyak pengemudi ojek daring yang mengemudi lebih dari $$10$$ jam sehari.",
        },
        {
          correct: true,
          label:
            "Sebuah kota mewajibkan upah minimum bagi pengemudi ojek daring, tetapi upah itu dihitung hanya untuk jam ketika pengemudi sedang membawa pesanan, dan jumlah pengemudi sambilan di kota itu tetap sama.",
        },
        {
          correct: false,
          label:
            "Sebagian pengemudi ojek daring juga bekerja sebagai guru atau karyawan.",
        },
        {
          correct: false,
          label:
            "Perusahaan aplikasi pernah menaikkan potongan tanpa pemberitahuan yang cukup.",
        },
        {
          correct: false,
          label:
            "Pengemudi sambilan rata-rata membawa lebih sedikit pesanan per hari daripada pengemudi penuh waktu.",
        },
      ],
    },
  },
};

export default item;

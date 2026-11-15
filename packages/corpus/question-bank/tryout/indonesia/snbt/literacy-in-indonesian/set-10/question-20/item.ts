import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "fuel-subsidy",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Menurut angka tabel, usulan bantuan tunai membuat rumah tangga terbawah menerima lebih banyak daripada dari subsidi.",
        },
        {
          correct: true,
          label:
            "Usulan bantuan tunai menyisakan sebagian besar anggaran subsidi untuk keperluan lain.",
        },
        {
          correct: false,
          label: "Kelompok teratas tidak terpengaruh oleh penghapusan subsidi.",
        },
        {
          correct: false,
          label:
            "Setiap rumah tangga yang menerima bantuan tunai pasti lebih untung daripada saat masih ada subsidi.",
        },
        {
          correct: true,
          label:
            "Porsi dari total subsidi saja tidak cukup untuk menilai siapa yang paling terbebani bila subsidi dihapus.",
        },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "comparison",
  },
  stimulus: "mountain-quota",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Jumlah pendaki dalam setahun tidak perlu turun setelah kuota berlaku.",
        },
        {
          correct: false,
          label:
            "Operator perjalanan dari kota ikut merusak ekosistem Gunung Sangkala.",
        },
        {
          correct: true,
          label:
            "Jumlah pendaki dalam satu hari perlu dibatasi agar gunung tidak rusak.",
        },
        {
          correct: false,
          label:
            "Pendapatan warga harus didahulukan daripada pemulihan padang edelweis.",
        },
        {
          correct: false,
          label:
            "Pendaki akhir pekan dapat beralih ke hari kerja tanpa banyak kesulitan.",
        },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Mendanai irigasi, lahan pertanian, alat dan mesin, pupuk, serta benih unggul.",
        },
        {
          correct: false,
          label:
            "Mengganti tanaman pangan dalam negeri dengan komoditas impor.",
        },
        {
          correct: false,
          label:
            "Menggunakan seluruh anggaran kementerian hanya untuk produksi padi.",
        },
        {
          correct: false,
          label:
            "Menghentikan seluruh impor pertanian melalui undang-undang baru.",
        },
        {
          correct: false,
          label: "Mengurangi luas lahan yang digarap di luar Jawa.",
        },
      ],
    },
  },
};

export default item;

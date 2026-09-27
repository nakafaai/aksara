import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Mendanai irigasi, lahan pertanian, alat dan mesin, pupuk, serta benih unggul.",
        },
        {
          isCorrect: false,
          label:
            "Mengganti tanaman pangan dalam negeri dengan komoditas impor.",
        },
        {
          isCorrect: false,
          label:
            "Menggunakan seluruh anggaran kementerian hanya untuk produksi padi.",
        },
        {
          isCorrect: false,
          label:
            "Menghentikan seluruh impor pertanian melalui undang-undang baru.",
        },
        {
          isCorrect: false,
          label: "Mengurangi luas lahan yang digarap di luar Jawa.",
        },
      ],
    },
  },
};

export default item;

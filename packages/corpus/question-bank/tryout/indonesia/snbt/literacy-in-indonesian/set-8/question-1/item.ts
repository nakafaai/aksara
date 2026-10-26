import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Percobaan membuktikan bahwa semua jenis tumbuhan kehilangan sebagian besar air hanya melalui permukaan bawah daun.",
        },
        {
          correct: false,
          label:
            "Percobaan menunjukkan bahwa petroleum jelly menambah massa daun sehingga pengukuran kehilangan air tidak dapat ditafsirkan sama sekali.",
        },
        {
          correct: true,
          label:
            "Pada daun kacang yang dipetik, pelapisan permukaan bawah berkaitan dengan kehilangan massa paling kecil, tetapi hasil satu jenis daun belum dapat digeneralisasi ke semua tumbuhan.",
        },
        {
          correct: false,
          label:
            "Pelapisan permukaan atas tidak memengaruhi transpirasi karena rata-rata $$0{,}74$$ gram sama dengan $$0{,}82$$ gram.",
        },
        {
          correct: false,
          label:
            "Perbedaan ketiga rata-rata hanya dapat dijelaskan oleh letak stomata karena seluruh sumber ketidakpastian sudah dikendalikan.",
        },
      ],
    },
  },
};

export default item;

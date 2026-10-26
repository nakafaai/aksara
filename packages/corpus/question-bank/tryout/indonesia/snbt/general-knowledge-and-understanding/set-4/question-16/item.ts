import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "penggambaran batas wilayah tanpa memeriksa nama yang dipakai masyarakat",
        },
        {
          correct: false,
          label: "pengukuran jarak perjalanan antara dua lokasi",
        },
        {
          correct: true,
          label:
            "kajian dan pencatatan nama tempat beserta asal serta konteks pemakaiannya",
        },
        {
          correct: false,
          label: "penyeragaman seluruh nama tempat menjadi satu bentuk resmi",
        },
        {
          correct: false,
          label: "daftar nama baru tanpa riwayat asal dan konteks pemakaiannya",
        },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "land-subsidence",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Ketinggian tanah akan pulih begitu muka air sumur naik kembali, sehingga hasil satu tahun belum menggambarkan keadaan akhir.",
        },
        {
          correct: false,
          label:
            "Angka GPS di pelabuhan ikut memuat kenaikan permukaan laut, sehingga penurunan tanah yang sebenarnya lebih kecil daripada $$4$$ cm.",
        },
        {
          correct: false,
          label:
            "Sumur rumah tangga menyedot lebih banyak air daripada sumur dalam, sehingga penurunan yang tersisa berasal dari sumur rumah tangga.",
        },
        {
          correct: true,
          label:
            "Lempung yang telah kehilangan tekanan air terus memampat bertahun-tahun, jadi penurunan yang berlanjut dengan laju lebih kecil sesuai dengan penutupan yang mulai bekerja.",
        },
        {
          correct: false,
          label:
            "Tanah di pantai timur hanya turun sekitar $$1$$ cm per tahun, sehingga penurunan rata-rata seluruh kota sudah membaik.",
        },
      ],
    },
  },
};

export default item;

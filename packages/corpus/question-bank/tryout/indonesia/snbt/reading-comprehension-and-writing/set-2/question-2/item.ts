import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "referent",
  },
  stimulus: "perahu",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "penandaan setiap peti dengan pita berwarna agar peti tidak tertukar",
        },
        {
          correct: true,
          label:
            "penyusunan isi peti yang berbeda untuk kampung hilir dan kampung hulu sesuai dengan buku yang paling banyak dipinjam di masing-masing wilayah",
        },
        {
          correct: false,
          label:
            "pencatatan setiap judul yang dipinjam di setiap kampung selama tiga bulan pertama",
        },
        {
          correct: false,
          label:
            "pengiriman lebih banyak komik sains ke semua kampung di sepanjang sungai",
        },
        {
          correct: false,
          label: "pengurangan jumlah buku yang dimuat ke perahu setiap Sabtu",
        },
      ],
    },
  },
};

export default item;

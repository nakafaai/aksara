import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "implicit-information",
  },
  stimulus: "night-bus-driver",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Bu Tarmi menghapus utang Warsito sebagai salam perpisahan yang tidak diucapkan.",
        },
        {
          correct: true,
          label:
            "Obrolan tentang harga cabai dipakai keduanya untuk menghindari kata perpisahan.",
        },
        {
          correct: false,
          label:
            "Bu Tarmi menghapus utang Warsito karena rumah makannya sedang merugi dan tidak butuh uang itu.",
        },
        {
          correct: false,
          label:
            "Bu Tarmi menyimpan halaman bon itu agar dapat menagih Warsito pada lain waktu.",
        },
        {
          correct: false,
          label:
            "Hubungan Bu Tarmi dan Warsito selama ini hanya urusan dagang antara penjual dan pelanggan.",
        },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "main-idea",
  },
  stimulus: "screen-printing",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Usaha sablon Pak Darto hanya menerima pesanan kaus untuk acara sekolah.",
        },
        {
          correct: false,
          label:
            "Toko-toko di Kota Sukasari tidak lagi memberikan kantong plastik.",
        },
        {
          correct: true,
          label:
            "Pak Darto mencari pasar baru bagi usaha sablonnya karena pesanan kaus tidak selalu ada.",
        },
        {
          correct: false,
          label: "Gambar khas kota berupa jembatan tua dan pasar terapung.",
        },
        {
          correct: false,
          label:
            "Mesin sablon Pak Darto sering menganggur selama berminggu-minggu.",
        },
      ],
    },
  },
};

export default item;

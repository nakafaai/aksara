import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "botanic-garden",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "menunjukkan bahwa kelapa sawit berasal dari Indonesia, lalu menyebar ke Afrika lewat kebun raya",
        },
        {
          correct: false,
          label:
            "menunjukkan bahwa kebun raya hanya melayani perkebunan, sehingga sebutan laboratorium perkebunan berlaku untuk seluruh sejarahnya",
        },
        {
          correct: true,
          label:
            "memberi contoh fungsi aklimatisasi yang melayani perkebunan, sekaligus menjadi dasar sebutan yang kemudian dibatasi oleh penulis",
        },
        {
          correct: false,
          label:
            "membuktikan bahwa empat bibit sawit itu masih hidup dan menjadi koleksi utama kebun raya saat ini",
        },
        {
          correct: false,
          label:
            "memberi contoh fungsi konservasi, karena bibit sawit diselamatkan dari kepunahan di Afrika Barat",
        },
      ],
    },
  },
};

export default item;

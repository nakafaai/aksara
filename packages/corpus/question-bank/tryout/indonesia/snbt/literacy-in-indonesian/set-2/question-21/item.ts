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
            "memberi contoh aklimatisasi yang melayani perkebunan, sekaligus membuktikan bahwa sebutan laboratorium perkebunan tepat untuk seluruh sejarah kebun itu",
        },
        {
          correct: false,
          label:
            "memberi contoh konservasi di luar habitat asli, karena bibit sawit dirawat di kebun sebelum keturunannya ditanam di Sumatra",
        },
        {
          correct: true,
          label:
            "memberi contoh aklimatisasi yang melayani perkebunan, sekaligus menjadi dasar sebutan yang kemudian dibatasi oleh penulis",
        },
        {
          correct: false,
          label:
            "memberi contoh aklimatisasi yang gagal, karena teks hanya menyebut keturunan bibit itu sering disebut menjadi sumber benih",
        },
        {
          correct: false,
          label:
            "memberi contoh kegiatan ilmiah kebun itu, karena sawit diteliti di laboratorium bersama tumbuhan yang tidak punya nilai dagang",
        },
      ],
    },
  },
};

export default item;

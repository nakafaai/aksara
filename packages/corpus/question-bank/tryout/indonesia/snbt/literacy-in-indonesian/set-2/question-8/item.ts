import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "text-structure",
  },
  stimulus: "weaver-daughter",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "menyiapkan akhir cerita, sehingga ketika Laras menghitung benang motif baru, pembaca menangkap bahwa Laras masih takut pada ketukan sisir tenun Ibu",
        },
        {
          correct: false,
          label:
            'menunjukkan keterampilan warisan Ibu, sehingga "Kau saja yang selesaikan" terbaca sebagai perintah untuk meneruskan motif pucuk rebung',
        },
        {
          correct: false,
          label:
            "menyiapkan akhir cerita, sehingga ketika Laras menghitung benang motif baru, pembaca menangkap bahwa motif itu ternyata miring karena satu benang salah",
        },
        {
          correct: false,
          label:
            "menunjukkan bahwa Laras membenci menenun sejak kecil, sehingga kepergiannya ke Bandung terbaca sebagai pelarian dari tradisi keluarga",
        },
        {
          correct: true,
          label:
            "menyiapkan akhir cerita, sehingga ketika Laras menghitung benang motif baru dan tidak menemukan satu pun yang salah, pembaca menangkap bahwa ketelitian warisan itu tetap hidup dalam bentuk baru",
        },
      ],
    },
  },
};

export default item;

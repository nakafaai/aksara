import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "bystander-effect",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Sebuah survei terhadap $$1{.}000$$ pengemudi menemukan bahwa pengemudi yang sering mengantuk lebih sering mengalami kecelakaan, lalu disimpulkan bahwa kantuk menyebabkan kecelakaan." },
        { correct: true, label: "Satu video viral pengemudi ojek ugal-ugalan, yang ternyata dipotong dan dibesar-besarkan, dijadikan bukti bahwa pengemudi ojek di kota itu tak peduli keselamatan." },
        { correct: false, label: "Sebuah percobaan menemukan bahwa siswa yang belajar dengan musik mengingat lebih sedikit, tetapi percobaan lain dengan musik yang berbeda tidak menemukan selisih." },
        { correct: false, label: "Data rekaman kamera di tiga kota menunjukkan bahwa sebagian besar pertengkaran di jalan akhirnya dilerai oleh orang-orang di sekitarnya." },
        { correct: false, label: "Seorang wali kota menolak hasil survei kepuasan warga terhadap layanannya karena survei itu dilakukan oleh lembaga yang tidak ia sukai." },
      ],
    },
  },
};

export default item;

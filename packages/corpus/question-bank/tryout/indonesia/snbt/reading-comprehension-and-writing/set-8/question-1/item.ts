import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "main-idea",
  },
  stimulus: "rattan-weaving",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Sebagian besar perajin rotan di Desa Tegalsari sudah berusia lanjut.",
        },
        {
          correct: false,
          label:
            "Anak muda Desa Tegalsari lebih suka bekerja di pabrik di kota.",
        },
        {
          correct: true,
          label:
            "Kelas menganyam yang diadakan karang taruna menghidupkan kembali kerajinan rotan di Desa Tegalsari.",
        },
        {
          correct: false,
          label: "Tas rotan buatan pemuda dijual melalui toko daring.",
        },
        {
          correct: false,
          label: "Pembeli dari kota besar mau membayar mahal untuk tas rotan.",
        },
      ],
    },
  },
};

export default item;

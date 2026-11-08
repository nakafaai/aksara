import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "main-idea",
  },
  stimulus: "mikroplastik",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Mikroplastik datang dari berbagai sumber dan dapat berpindah melalui rantai makanan, sehingga mulai dibatasi.",
        },
        {
          correct: false,
          label:
            "Butiran penggosok dalam produk pembersih wajah adalah satu-satunya sumber mikroplastik di sungai.",
        },
        {
          correct: false,
          label:
            "Mikroplastik sudah terbukti menjadi penyebab utama penyakit pada manusia yang sering makan ikan laut.",
        },
        {
          correct: false,
          label:
            "Instalasi pengolahan air limbah mampu menahan seluruh mikroplastik sebelum air dibuang ke sungai.",
        },
        {
          correct: false,
          label:
            "Mencuci pakaian dengan muatan penuh adalah cara terbaik untuk menghentikan seluruh pencemaran plastik di laut.",
        },
      ],
    },
  },
};

export default item;

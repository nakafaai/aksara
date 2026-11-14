import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "main-idea",
  },
  stimulus: "cabai",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Pasokan cabai yang mudah merosot bertemu dengan permintaan yang sulit turun sehingga perubahan harga cabai, dalam persentase, jauh lebih besar daripada perubahan pasokannya.",
        },
        {
          correct: false,
          label:
            "Pasokan cabai mudah merosot karena cabai segar tidak tahan disimpan dan panennya rentan terhadap hujan yang berlebihan.",
        },
        {
          correct: false,
          label:
            "Harga cabai naik sebanding dengan turunnya pasokan karena permintaan cabai hampir tidak berubah ketika harganya naik.",
        },
        {
          correct: false,
          label:
            "Cuaca buruk menjadi penyebab utama lonjakan harga cabai karena merusak panen di banyak sentra sekaligus.",
        },
        {
          correct: false,
          label:
            "Rumah tangga tetap membeli cabai dalam jumlah yang hampir sama walaupun harganya naik karena cabai sulit digantikan.",
        },
      ],
    },
  },
};

export default item;

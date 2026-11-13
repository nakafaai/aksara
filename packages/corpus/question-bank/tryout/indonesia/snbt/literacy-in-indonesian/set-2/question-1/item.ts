import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "paraphrase",
  },
  stimulus: "mercury-gold",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Merkuri paling berbahaya di tempat yang paling dekat dengan tambang, karena di sanalah merkuri pertama kali mengendap.",
        },
        {
          correct: true,
          label:
            "Kondisi tempat merkuri mengendap, seperti lumpur rawa yang miskin oksigen, ikut menentukan seberapa banyak merkuri berubah menjadi bentuk yang masuk ke rantai makanan.",
        },
        {
          correct: false,
          label:
            "Banyaknya merkuri di sungai tidak berpengaruh pada kadar ikan selama merkuri itu mengendap di lumpur dan tidak terlarut di air.",
        },
        {
          correct: false,
          label:
            "Kadar metilmerkuri dalam ikan lebih ditentukan oleh bagian tubuh ikan tempat merkuri menumpuk daripada oleh jumlah merkuri di air.",
        },
        {
          correct: false,
          label:
            "Merkuri yang mengendap di rawa hilir lebih banyak daripada merkuri yang terbawa air di dekat tambang, sehingga ikan hilir lebih tercemar.",
        },
      ],
    },
  },
};

export default item;

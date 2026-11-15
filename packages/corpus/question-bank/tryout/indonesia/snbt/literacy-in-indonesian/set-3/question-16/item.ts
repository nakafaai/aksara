import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "rainfall-harvest",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Penurunan produksi di ketiga kabupaten terutama disebabkan oleh turunnya hasil per hektare, bukan oleh menyusutnya luas panen.",
        },
        {
          correct: false,
          label:
            "Irigasi teknis yang luas membuat Sukamaju sama sekali tidak terdampak kemarau, sehingga produksinya tetap seperti tahun normal.",
        },
        {
          correct: true,
          label:
            "Penurunan produksi dalam persen makin besar saat irigasi teknis makin sempit, dan di Ciranda serta Banyulor terutama karena luas panen menyusut.",
        },
        {
          correct: false,
          label:
            "Hasil per hektare di ketiga kabupaten turun sekitar seperlima pada tahun El Nino.",
        },
        {
          correct: false,
          label:
            "Penurunan luas panen dalam ribu hektare paling besar terjadi di Banyulor, kabupaten dengan irigasi teknis paling sempit.",
        },
      ],
    },
  },
};

export default item;

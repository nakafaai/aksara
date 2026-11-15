import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "fuel-subsidy",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pendukung benar dan pengkritik keliru, karena setiap rumah tangga terbawah menerima subsidi Rp$$800$$ ribu, paling besar di antara semua kelompok.",
        },
        {
          correct: false,
          label:
            "Pengkritik benar dan pendukung keliru, karena setiap rumah tangga teratas menerima Rp$$4$$ juta, sedangkan bagi rumah tangga terbawah subsidi tidak berarti apa pun.",
        },
        {
          correct: false,
          label:
            "Kedua pihak keliru, karena subsidi per rumah tangga sama besar di semua kelompok, yaitu Rp$$2$$ juta setahun.",
        },
        {
          correct: true,
          label:
            "Kedua pihak memakai angka yang benar tetapi mengukur hal berbeda: subsidi sekitar $$4\\%$$ dari pengeluaran rumah tangga terbawah dan $$2{,}5\\%$$ bagi yang teratas, tetapi rupiahnya Rp$$800$$ ribu berbanding Rp$$4$$ juta.",
        },
        {
          correct: false,
          label:
            "Kedua pihak tidak dapat dinilai, karena tabel itu disederhanakan dan bukan data resmi.",
        },
      ],
    },
  },
};

export default item;

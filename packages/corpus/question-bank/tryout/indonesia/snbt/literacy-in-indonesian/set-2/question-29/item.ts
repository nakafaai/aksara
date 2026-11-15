import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "default-choice",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Pendukung menyetujui bahwa pilihan bawaan mengatur orang, sehingga mereka mengusulkan agar semua formulir dibiarkan kosong tanpa centang." },
        { correct: false, label: "Pendukung membantah bahwa pilihan bawaan berpengaruh, karena orang selalu bebas mengubah pilihannya." },
        { correct: false, label: "Pendukung menganggap soal etika tidak penting, karena pilihan bawaan terbukti menaikkan jumlah donor organ." },
        { correct: false, label: "Pendukung setuju bahwa formulir kosong adalah pilihan yang netral, tetapi menilainya terlalu sulit dibuat." },
        { correct: true, label: "Pendukung menilai pilihan bawaan tak terhindarkan, jadi yang dipersoalkan adalah pilihan bawaan mana dan siapa yang menanggung akibatnya." },
      ],
    },
  },
};

export default item;

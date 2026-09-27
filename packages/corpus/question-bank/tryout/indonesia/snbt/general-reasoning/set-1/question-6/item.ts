import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Kementerian menggunakan seluruh anggarannya untuk menjamin kenaikan permanen pada setiap tanaman pangan.",
        },
        {
          isCorrect: false,
          label:
            "Produksi jagung meningkat lebih sedikit daripada produksi padi pada periode yang dilaporkan.",
        },
        {
          isCorrect: true,
          label:
            "Kementerian memprioritaskan dukungan produksi, dan publikasi tahun $$2017$$ melaporkan kenaikan historis produksi padi dan jagung.",
        },
        {
          isCorrect: false,
          label:
            "Angka-angka tersebut membuktikan bahwa perubahan arah anggaran merupakan satu-satunya penyebab kenaikan produksi.",
        },
        {
          isCorrect: false,
          label: "Sisa anggaran kementerian tidak digunakan.",
        },
      ],
    },
  },
};

export default item;

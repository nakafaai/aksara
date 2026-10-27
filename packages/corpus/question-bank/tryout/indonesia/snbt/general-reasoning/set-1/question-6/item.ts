import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kementerian menggunakan seluruh anggarannya untuk menjamin kenaikan permanen pada setiap tanaman pangan.",
        },
        {
          correct: false,
          label:
            "Produksi jagung meningkat lebih sedikit daripada produksi padi pada periode yang dilaporkan.",
        },
        {
          correct: true,
          label:
            "Kementerian memprioritaskan dukungan produksi, dan publikasi tahun $$2017$$ melaporkan kenaikan historis produksi padi dan jagung.",
        },
        {
          correct: false,
          label:
            "Angka-angka tersebut membuktikan bahwa perubahan arah anggaran merupakan satu-satunya penyebab kenaikan produksi.",
        },
        {
          correct: false,
          label: "Sisa anggaran kementerian tidak digunakan.",
        },
      ],
    },
  },
};

export default item;

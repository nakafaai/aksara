import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  stimulus: "honesty-canteen",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Dimas membuktikan bahwa semua siswa sudah membayar barang yang diambil",
        },
        {
          correct: false,
          label: "Bu Ratna menolak kantin kejujuran dibuka kembali",
        },
        {
          correct: true,
          label:
            "turunnya selisih ditafsirkan secara berbeda oleh ketua koperasi dan guru pembina",
        },
        {
          correct: false,
          label:
            "siswa yang belum terbiasa membuat selisih bulan September naik",
        },
        {
          correct: false,
          label:
            "kesalahan saat mencatat stok menjadi satu-satunya penyebab selisih",
        },
      ],
    },
  },
};

export default item;

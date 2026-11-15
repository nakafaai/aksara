import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "railway-java",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "menunjukkan bahwa Tanggung adalah kota pelabuhan terbesar di Jawa Tengah pada masa itu, sehingga wajar menjadi ujung jalur pertama",
        },
        {
          correct: false,
          label:
            "menjelaskan bahwa jalur pertama itu gagal karena hanya mencapai kota kecil",
        },
        {
          correct: false,
          label:
            "membuktikan bahwa penduduk Tanggung paling diuntungkan oleh jalur pertama",
        },
        {
          correct: false,
          label:
            "menunjukkan bahwa pemerintah kolonial memilih Tanggung karena dekat dengan istana dan pusat pemerintahan di Jawa Tengah",
        },
        {
          correct: true,
          label:
            "menunjukkan bahwa jalur itu dirancang menuju daerah penghasil barang ekspor, sehingga arah relnya mengungkap siapa yang dilayani",
        },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "argument-evaluation",
  },
  stimulus: "debat",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Para juri lomba itu sejak lama lebih menghargai pidato yang menanggapi lawan daripada pidato yang dibacakan dari naskah.",
        },
        {
          correct: false,
          label:
            "Pada lomba tahun lalu, tim yang membawa naskah susunan pelatih paling jarang menanggapi argumen lawan.",
        },
        {
          correct: false,
          label:
            "Sebagian pembicara merasa waktu tiga puluh menit terlalu singkat untuk menyusun argumen yang lengkap.",
        },
        {
          correct: false,
          label:
            "Pada kedua lomba, persentase itu dihitung dari seluruh pidato di semua babak, bukan hanya dari babak final.",
        },
        {
          correct: true,
          label:
            "Tahun lalu persentase itu dihitung dari catatan bebas juri, sedangkan tahun ini setiap lembar nilai pidato memuat kolom wajib tentang tanggapan langsung terhadap lawan.",
        },
      ],
    },
  },
};

export default item;

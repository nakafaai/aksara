import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "point-of-view",
  },
  stimulus: "land-subsidence",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Penulis menolak kedua pandangan itu karena tanggul tidak ada gunanya selama tanah turun dan keberatan warga hanya dalih untuk mempertahankan sumur.",
        },
        {
          correct: false,
          label:
            "Penulis menerima hitungan pejabat tentang umur tanggul, tetapi menolak keberatan warga karena sumur rumah tangga adalah penyumbang penurunan terbesar.",
        },
        {
          correct: true,
          label:
            "Penulis menolak alasan pejabat tetapi tetap menganggap tanggul perlu, dan menerima keberatan warga sebagai syarat pelaksanaan, bukan alasan menunda.",
        },
        {
          correct: false,
          label:
            "Penulis membenarkan keberatan warga sehingga ia mengusulkan agar pembatasan sumur menunggu sampai air perpipaan menjangkau semua rumah.",
        },
        {
          correct: false,
          label:
            "Penulis setuju bahwa perubahan iklim adalah penyebab utama genangan, tetapi menilai tanggul kurang hemat dibandingkan perluasan air perpipaan.",
        },
      ],
    },
  },
};

export default item;

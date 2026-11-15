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
            "Penulis menolak alasan pejabat tetapi tetap menganggap tanggul perlu, dan karena keberatan warga sah, ia mengusulkan agar pembatasan sumur ditunda sampai pipa menjangkau semua rumah.",
        },
        {
          correct: false,
          label:
            "Penulis menolak alasan pejabat dan menganggap tanggul tidak perlu, tetapi menerima keberatan warga sebagai syarat pelaksanaan pembatasan sumur.",
        },
        {
          correct: true,
          label:
            "Penulis menolak alasan pejabat tetapi tetap menganggap tanggul perlu, dan menerima keberatan warga sebagai syarat pelaksanaan, bukan sebagai alasan untuk menunda.",
        },
        {
          correct: false,
          label:
            "Penulis menolak alasan pejabat tetapi tetap menganggap tanggul perlu, dan menolak keberatan warga karena sumur rumah tangga adalah penyumbang penurunan terbesar.",
        },
        {
          correct: false,
          label:
            "Penulis menerima hitungan pejabat bahwa tanggul aman berabad-abad, tetapi menolak keberatan warga karena tanah akan terus turun.",
        },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  stimulus: "reading-minutes",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "usulan itu menolak pelaksanaan program membaca lima belas menit",
        },
        {
          correct: false,
          label: "usulan itu membuktikan bahwa kepala sekolah berbohong",
        },
        {
          correct: true,
          label:
            "usulan itu bertujuan memperoleh data yang lebih tepat untuk menguji apakah siswa benar-benar gemar membaca",
        },
        {
          correct: false,
          label: "usulan itu meminta siswa diuji tentang isi buku yang dibaca",
        },
        {
          correct: false,
          label: "usulan itu tidak berhubungan dengan angka peminjaman buku",
        },
      ],
    },
  },
};

export default item;

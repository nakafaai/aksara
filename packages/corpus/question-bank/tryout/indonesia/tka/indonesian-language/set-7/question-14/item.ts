import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  stimulus: "reading-minutes",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "semua siswa membaca di rumah setidaknya dua kali seminggu",
        },
        {
          correct: false,
          label: "survei Bu Anisa membuktikan bahwa program membaca berhasil",
        },
        {
          correct: false,
          label: "Bu Anisa menyurvei seluruh siswa di sekolah itu",
        },
        {
          correct: false,
          label: "peminjaman buku turun setelah survei dilakukan",
        },
        {
          correct: true,
          label:
            "survei awal menunjukkan sebagian siswa membaca di rumah, tetapi hasilnya belum dapat dibandingkan dengan keadaan sebelum program",
        },
      ],
    },
  },
};

export default item;

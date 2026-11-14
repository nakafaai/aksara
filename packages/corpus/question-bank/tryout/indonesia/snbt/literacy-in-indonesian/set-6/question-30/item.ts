import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "flaw",
  },
  stimulus: "marshmallow-test",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Latihan menunggu kudapan setiap hari terlalu singkat untuk membentuk kebiasaan.",
        },
        {
          correct: false,
          label: "Marshmallow bukan kudapan yang sehat bagi anak.",
        },
        {
          correct: true,
          label:
            "Rencana itu menganggap hubungan dalam temuan awal sebagai sebab-akibat, padahal hubungan itu sebagian besar berjalan lewat keadaan keluarga yang tidak diubah oleh latihan.",
        },
        {
          correct: false,
          label:
            "Rencana itu hanya cocok untuk anak-anak dosen dan mahasiswa Stanford.",
        },
        {
          correct: false,
          label: "Sekolah itu tidak menyebut berapa menit anak harus menunggu.",
        },
      ],
    },
  },
};

export default item;

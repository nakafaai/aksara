import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  stimulus: "blood-drive",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "seluruh warga sekolah terbukti sehat berdasarkan kegiatan donor darah",
        },
        {
          correct: false,
          label:
            "petugas unit transfusi menolak kegiatan donor darah di sekolah",
        },
        { correct: false, label: "54 pendaftar menyumbangkan darah dua kali" },
        {
          correct: false,
          label: "ketua OSIS memeriksa tekanan darah setiap pendaftar",
        },
        {
          correct: true,
          label:
            "kesimpulan ketua OSIS perlu diperbaiki karena pemeriksaan sebelum donor bukan pemeriksaan kesehatan menyeluruh",
        },
      ],
    },
  },
};

export default item;

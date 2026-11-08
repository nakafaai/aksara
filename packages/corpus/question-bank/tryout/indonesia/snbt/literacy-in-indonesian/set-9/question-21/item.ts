import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "remote-work",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pekerja berpengalaman menyelesaikan laporan lebih cepat ketika bekerja dari rumah.",
        },
        {
          correct: false,
          label:
            "Perusahaan yang mengizinkan kerja dari rumah menerima lebih banyak lamaran kerja.",
        },
        {
          correct: true,
          label:
            "Karyawan baru yang selalu bekerja dari rumah lebih lambat menguasai pekerjaannya.",
        },
        {
          correct: false,
          label:
            "Biaya sewa kantor turun ketika separuh karyawan bekerja dari rumah.",
        },
        {
          correct: false,
          label:
            "Sebagian pekerja lebih suka bekerja di kafe daripada di rumah.",
        },
      ],
    },
  },
};

export default item;

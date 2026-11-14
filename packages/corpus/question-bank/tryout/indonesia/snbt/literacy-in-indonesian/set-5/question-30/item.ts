import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "flaw",
  },
  stimulus: "growth-mindset",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kesimpulan itu mengabaikan kenyataan bahwa efek intervensi sebenarnya besar bagi semua siswa.",
        },
        {
          correct: false,
          label:
            "Kesimpulan itu bertumpu pada meta-analisis yang jumlah studinya terlalu sedikit untuk dipercaya.",
        },
        {
          correct: true,
          label:
            "Kesimpulan itu menilai manfaat tanpa menimbang biaya, dan memperlakukan efek rata-rata seolah-olah berlaku bagi setiap kelompok siswa.",
        },
        {
          correct: false,
          label:
            "Kesimpulan itu keliru karena intervensi tersebut dapat menggantikan perbaikan pengajaran yang mahal.",
        },
        {
          correct: false,
          label:
            "Kesimpulan itu hanya berlaku bagi guru yang menerapkan pola pikir bertumbuh yang semu.",
        },
      ],
    },
  },
};

export default item;

import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "thomas-cup-1958",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "rencana membina klub setempat selama bertahun-tahun, karena menurut penulis pembinaan yang lama membuat pemain kehilangan semangat",
        },
        {
          correct: false,
          label:
            "rencana yang dibiayai iuran anggota dan pengusaha setempat, karena menurut penulis pembinaan seharusnya dibiayai pemerintah",
        },
        {
          correct: false,
          label:
            "rencana membentuk regu dari atlet terbaik saat ini lalu memberi mereka pelatihan motivasi sebulan, karena menurut penulis semangat tidak berperan dalam kemenangan 1958",
        },
        {
          correct: true,
          label:
            "rencana membentuk regu dari atlet terbaik saat ini lalu memberi mereka pelatihan motivasi sebulan, karena rencana itu hanya mengandalkan semangat dan melewatkan pembinaan klub yang lama",
        },
        {
          correct: false,
          label:
            "rencana menggelar kompetisi rutin antarklub, karena menurut penulis kompetisi hanya cocok untuk negara yang sudah lama merdeka",
        },
      ],
    },
  },
};

export default item;

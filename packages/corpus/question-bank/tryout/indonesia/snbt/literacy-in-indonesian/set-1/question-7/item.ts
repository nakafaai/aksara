import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "lighthouse-keeper",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Pak Darsa tidak terkesan oleh penjelasan Wulan tentang cara kerja sensor lampu baru.",
        },
        {
          correct: false,
          label:
            "Pak Darsa menolak membantu pemasangan lampu baru karena marah tugasnya diambil alih mesin.",
        },
        {
          correct: true,
          label:
            "Pak Darsa mewariskan kepada Wulan pengetahuan yang tidak dapat dibaca oleh sensor lampu.",
        },
        {
          correct: false,
          label:
            "Pak Darsa menyerahkan kunci kuningan karena kunci itu tidak lagi dapat membuka apa pun.",
        },
        {
          correct: true,
          label:
            "Pak Darsa membiarkan Wulan mencatat pengetahuannya, walaupun pada awalnya ia menjaga jarak.",
        },
      ],
    },
  },
};

export default item;

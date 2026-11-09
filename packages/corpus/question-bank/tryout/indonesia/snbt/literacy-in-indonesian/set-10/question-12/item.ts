import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "village-postman",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "tidak mengerti cara memakai ponsel yang dipinjam dari tetangganya",
        },
        {
          correct: false,
          label: "menganggap telepon video lebih mahal daripada surat",
        },
        {
          correct: false,
          label: "merasa anaknya tidak jujur ketika meneleponnya",
        },
        {
          correct: true,
          label: "menghargai surat karena dapat disimpan dan dibaca ulang",
        },
        {
          correct: false,
          label: "ingin Pak Darto berhenti mengantar tagihan ke dusun",
        },
      ],
    },
  },
};

export default item;

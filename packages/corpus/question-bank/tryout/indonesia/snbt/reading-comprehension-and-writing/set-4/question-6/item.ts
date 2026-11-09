import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "author-purpose",
  },
  stimulus: "cassava-flour",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "mengajak pembaca berhenti memakai tepung terigu",
        },
        {
          correct: false,
          label: "membandingkan harga tepung terigu dari tahun ke tahun",
        },
        {
          correct: false,
          label: "membuktikan bahwa kue dari tepung singkong lebih enak",
        },
        {
          correct: true,
          label:
            "menjelaskan cara membuat tepung singkong fermentasi dan alasan pembuat kue memakainya",
        },
        {
          correct: false,
          label:
            "melaporkan hasil penelitian tentang bakteri baik pada singkong",
        },
      ],
    },
  },
};

export default item;

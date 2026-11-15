import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "mercury-gold",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Keduanya membuat besar selisih antartitik belum pasti, tetapi tidak menyelamatkan simpulan pejabat yang hanya bertumpu pada kebersihan air.",
        },
        {
          correct: false,
          label:
            "Keduanya menggugurkan bantahan tim, karena ikan di hilir mungkin lebih besar dan ditangkap pada musim yang lebih kering daripada ikan di hulu.",
        },
        {
          correct: false,
          label:
            "Hanya keterbatasan ukuran tubuh yang perlu diperhatikan, karena teks menyebut musim tidak memengaruhi kadar metilmerkuri dalam ikan.",
        },
        {
          correct: false,
          label:
            "Keduanya tidak berpengaruh, karena tim sudah membandingkan ikan dari kelompok makan yang sama di kedua titik.",
        },
        {
          correct: false,
          label:
            "Keduanya membuat besar selisih antartitik belum pasti, sehingga simpulan pejabat bahwa warga tidak perlu khawatir menjadi benar.",
        },
      ],
    },
  },
};

export default item;

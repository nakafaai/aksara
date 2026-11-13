import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "point-of-view",
  },
  stimulus: "bat-echolocation",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Penulis menolak premisnya, sebab barbastel menunjukkan bahwa ngengat tidak mampu mendengar kelelawar dari jauh.",
        },
        {
          correct: false,
          label:
            "Penulis menerima premis dan kesimpulannya, lalu menjadikan Bertholdia trigona bukti bahwa ngengat selalu unggul.",
        },
        {
          correct: false,
          label:
            "Penulis menolak kesimpulannya, sebab barbastel mampu mendeteksi ngengat dari jarak yang lebih jauh daripada kelelawar lain.",
        },
        {
          correct: false,
          label:
            "Penulis tidak menilai pendapat itu dan hanya melaporkannya sebagai salah satu cara pandang tentang kelelawar.",
        },
        {
          correct: true,
          label:
            "Penulis menerima premisnya, tetapi membantah kesimpulannya dengan kelelawar yang rela memperpendek jarak deteksinya agar tidak terdengar.",
        },
      ],
    },
  },
};

export default item;

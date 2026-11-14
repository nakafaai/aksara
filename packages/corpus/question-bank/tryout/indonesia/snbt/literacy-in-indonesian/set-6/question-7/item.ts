import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "figurative-meaning",
  },
  stimulus: "kite-maker",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kakek menyalahkan pabrik yang membuat benang itu terlalu rapuh.",
        },
        {
          correct: false,
          label:
            "Kakek menilai benang itu masih cukup bagus sehingga tidak perlu dibuang.",
        },
        {
          correct: false,
          label:
            "Kakek menyindir cucunya yang hanya ikut-ikutan membeli layangan seperti anak-anak lain.",
        },
        {
          correct: true,
          label:
            "Kakek menunjukkan bahwa penyebab putusnya ada pada hal yang menarik benang itu dari kedua ujung, bukan pada benang, tanpa menyebut siapa yang salah.",
        },
        {
          correct: false,
          label:
            "Kakek menegaskan bahwa benang pada layangan buatannya tidak pernah putus.",
        },
      ],
    },
  },
};

export default item;

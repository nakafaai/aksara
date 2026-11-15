import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "text-structure",
  },
  stimulus: "weaver-daughter",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "menunjukkan bahwa Laras membenci menenun sejak kecil, sehingga kepergiannya adalah pelarian dari tradisi keluarga" },
        { correct: false, label: "menjelaskan asal-usul motif pucuk rebung, sehingga pembaca tahu mengapa motif itu hanya ditenun keluarga Laras" },
        { correct: false, label: "menunjukkan bahwa Ibu adalah guru yang keras dan tidak sabar, sehingga Laras merasa lega dapat meninggalkan rumah" },
        { correct: false, label: "menunjukkan bahwa Laras mahir menenun, sehingga ia menemukan satu benang yang salah pada motif baru di kain itu" },
        { correct: true, label: "menunjukkan keterampilan warisan Ibu, sehingga \"Kau saja yang selesaikan\" terbaca sebagai kepercayaan, bukan perintah" },
      ],
    },
  },
};

export default item;

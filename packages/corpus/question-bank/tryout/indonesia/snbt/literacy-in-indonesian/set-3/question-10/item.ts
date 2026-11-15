import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "theme",
  },
  stimulus: "night-bus-driver",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Warsito meneruskan nasihat sopir lama dalam bentuk baru: secepat dan semudah apa pun jalannya, penumpang tetap harus diperlakukan sebagai manusia.",
        },
        {
          correct: false,
          label:
            "Warsito memperingatkan Ardi bahwa jalan tol berbahaya, sehingga Ardi sebaiknya tidak bekerja di kantor travel.",
        },
        {
          correct: false,
          label:
            "Warsito meneruskan nasihat sopir lama dalam bentuk baru: Ardi harus selalu tiba tepat waktu agar gajinya tidak dipotong.",
        },
        {
          correct: false,
          label:
            "Warsito menyesal karena trayeknya ditutup, sehingga ia menyalahkan jalan tol yang membuat bus malam tidak lagi diminati.",
        },
        {
          correct: false,
          label:
            "Warsito ingin Ardi kembali bekerja bersamanya di bus malam, karena jalan tol membuat pekerjaan sopir menjadi membosankan.",
        },
      ],
    },
  },
};

export default item;

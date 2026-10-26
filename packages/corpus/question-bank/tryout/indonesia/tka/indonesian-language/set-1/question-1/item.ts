import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "loanwords",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "karena benih bergerak dari lemari ke kebun lalu sebagian hasilnya kembali, sehingga terjadi putaran pertukaran",
        },
        {
          correct: false,
          label:
            "karena semua benih harus tetap berada di lemari sampai masa simpannya berakhir",
        },
        {
          correct: false,
          label:
            "karena setiap benih diuji di laboratorium sebelum boleh berpindah tangan",
        },
        {
          correct: false,
          label:
            "karena pengelola mengganti semua varietas lama dengan varietas yang lebih cepat tumbuh",
        },
        {
          correct: false,
          label:
            "karena kartu riwayat menjamin hasil panen yang sama di setiap kebun",
        },
      ],
    },
  },
  stimulus: "seed-library",
};

export default item;

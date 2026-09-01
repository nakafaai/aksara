import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "loanwords",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "karena benih bergerak dari lemari ke kebun lalu sebagian hasilnya kembali, sehingga terjadi putaran pertukaran",
        },
        {
          isCorrect: false,
          label:
            "karena semua benih harus tetap berada di lemari sampai masa simpannya berakhir",
        },
        {
          isCorrect: false,
          label:
            "karena setiap benih diuji di laboratorium sebelum boleh berpindah tangan",
        },
        {
          isCorrect: false,
          label:
            "karena pengelola mengganti semua varietas lama dengan varietas yang lebih cepat tumbuh",
        },
        {
          isCorrect: false,
          label:
            "karena kartu riwayat menjamin hasil panen yang sama di setiap kebun",
        },
      ],
    },
  },
  stimulusKey: "seed-library",
};

export default item;

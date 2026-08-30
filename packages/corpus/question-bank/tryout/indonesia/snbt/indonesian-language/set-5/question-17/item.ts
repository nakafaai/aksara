import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam kelas reparasi pakaian.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam kelas reparasi pakaian memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan kelas reparasi pakaian.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut sejarah lisan sebagai bukti bahwa uji tidak perlu diulang.",
        },
        {
          isCorrect: true,
          label:
            "Kedua sumber sama-sama menunjukkan bahwa keduanya menunjukkan perubahan kebutuhan reparasi dari waktu ke waktu.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;

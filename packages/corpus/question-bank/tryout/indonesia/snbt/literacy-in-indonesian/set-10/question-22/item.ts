import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pertanyaan itu memindahkan seluruh tanggung jawab desain kepada anak sehingga Tari tidak perlu menilai hasil perubahan.",
        },
        {
          isCorrect: false,
          label:
            "Pertanyaan itu memastikan jawaban pertama setiap anak pasti berlaku pada seluruh situasi berikutnya.",
        },
        {
          isCorrect: true,
          label:
            "Pertanyaan itu mengganti tebakan Tari dengan pilihan yang dinyatakan peserta, lalu memberi dasar untuk menguji apakah perubahan benar-benar membantu.",
        },
        {
          isCorrect: false,
          label:
            "Pertanyaan itu hanya memperlambat permainan karena hambatan sudah dapat diketahui dari penampilan setiap anak.",
        },
        {
          isCorrect: false,
          label:
            "Pertanyaan itu membuktikan Tari telah memahami seluruh sudut pandang peserta sebelum permainan dimulai.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;

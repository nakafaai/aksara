import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-5",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pertanyaan itu memindahkan seluruh tanggung jawab desain kepada anak sehingga Tari tidak perlu menilai hasil perubahan.",
        },
        {
          correct: false,
          label:
            "Pertanyaan itu memastikan jawaban pertama setiap anak pasti berlaku pada seluruh situasi berikutnya.",
        },
        {
          correct: true,
          label:
            "Pertanyaan itu mengganti tebakan Tari dengan pilihan yang dinyatakan peserta, lalu memberi dasar untuk menguji apakah perubahan benar-benar membantu.",
        },
        {
          correct: false,
          label:
            "Pertanyaan itu hanya memperlambat permainan karena hambatan sudah dapat diketahui dari penampilan setiap anak.",
        },
        {
          correct: false,
          label:
            "Pertanyaan itu membuktikan Tari telah memahami seluruh sudut pandang peserta sebelum permainan dimulai.",
        },
      ],
    },
  },
};

export default item;

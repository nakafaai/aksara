import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Atribusi berlapis mempertahankan beberapa sebutan sekaligus menjelaskan asal dan konteks masing-masing.",
        },
        {
          isCorrect: false,
          label:
            "Setiap objek harus ditampilkan tanpa judul utama agar semua nama benar-benar setara.",
        },
        {
          isCorrect: false,
          label:
            "Nama yang paling sering dikutip pasti merupakan nama yang diberikan pembuat kain.",
        },
        {
          isCorrect: false,
          label: "Salah satu nama dalam buku lama dibuat oleh kurator.",
        },
        {
          isCorrect: false,
          label:
            "Atribusi berlapis menghapus informasi tentang pemberi nama agar setiap sebutan terlihat netral.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;

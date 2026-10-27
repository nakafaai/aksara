import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Atribusi berlapis mempertahankan beberapa sebutan sekaligus menjelaskan asal dan konteks masing-masing.",
        },
        {
          correct: false,
          label:
            "Setiap objek harus ditampilkan tanpa judul utama agar semua nama benar-benar setara.",
        },
        {
          correct: false,
          label:
            "Nama yang paling sering dikutip pasti merupakan nama yang diberikan pembuat kain.",
        },
        {
          correct: false,
          label: "Salah satu nama dalam buku lama dibuat oleh kurator.",
        },
        {
          correct: false,
          label:
            "Atribusi berlapis menghapus informasi tentang pemberi nama agar setiap sebutan terlihat netral.",
        },
      ],
    },
  },
};

export default item;

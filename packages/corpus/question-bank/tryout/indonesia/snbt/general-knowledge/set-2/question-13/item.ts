import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Während es regnet, werden die Straßen nass.",
        },
        {
          isCorrect: false,
          label: "Wenn das Abendessen fertig ist, können die Kinder essen.",
        },
        {
          isCorrect: false,
          label: "Vor Sonnenaufgang singen die Vögel laut.",
        },
        {
          isCorrect: false,
          label: "Wenn die Glocke läutet, wird der Schulflur laut.",
        },
        {
          isCorrect: true,
          label:
            "Nachdem der Unterricht endet, sollte jeder Schüler die Aufgabe umgehend abgeben.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "While rain falls, the streets become wet.",
        },
        {
          isCorrect: false,
          label: "If dinner is ready, the children can eat.",
        },
        {
          isCorrect: false,
          label: "Before sunrise, birds sing loudly.",
        },
        {
          isCorrect: false,
          label: "When the bell rings, the school corridor becomes noisy.",
        },
        {
          isCorrect: true,
          label:
            "After the lesson ends, each student should submit the assignment promptly.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Ketika hujan turun, jalan menjadi basah.",
        },
        {
          isCorrect: false,
          label: "Jika makan malam sudah siap, anak-anak dapat makan.",
        },
        {
          isCorrect: false,
          label: "Sebelum matahari terbit, burung berkicau nyaring.",
        },
        {
          isCorrect: false,
          label: "Ketika bel berbunyi, lorong sekolah menjadi ramai.",
        },
        {
          isCorrect: true,
          label:
            "Setelah pelajaran berakhir, setiap siswa harus segera menyerahkan tugas.",
        },
      ],
    },
  },
};

export default item;

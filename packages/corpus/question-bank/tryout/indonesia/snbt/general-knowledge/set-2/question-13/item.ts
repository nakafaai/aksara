import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Während es regnet, werden die Straßen nass.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Wenn das Abendessen fertig ist, können die Kinder essen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Vor Sonnenaufgang singen die Vögel laut." },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Nachdem der Unterricht endet, sollte jeder Schüler die Aufgabe umgehend abgeben.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Wenn die Glocke läutet, wird der Schulflur laut.",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "While rain falls, the streets become wet." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "If dinner is ready, the children can eat." },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Before sunrise, birds sing loudly." }],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "After the lesson ends, each student should submit the assignment promptly.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "When the bell rings, the school corridor becomes noisy.",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Ketika hujan turun, jalan menjadi basah." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Jika makan malam sudah siap, anak-anak dapat makan.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sebelum matahari terbit, burung berkicau nyaring.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Setelah pelajaran berakhir, setiap siswa harus segera menyerahkan tugas.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Ketika bel berbunyi, lorong sekolah menjadi ramai.",
            },
          ],
        },
      ],
    },
  },
};

export default item;

import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Während es regnet, werden die Straßen nass.",
      value: false,
    },
    {
      label: "Wenn das Abendessen fertig ist, können die Kinder essen.",
      value: false,
    },
    {
      label: "Vor Sonnenaufgang singen die Vögel laut.",
      value: false,
    },
    {
      label:
        "Nachdem der Unterricht endet, sollte jeder Schüler die Aufgabe umgehend abgeben.",
      value: true,
    },
    {
      label: "Wenn die Glocke läutet, wird der Schulflur laut.",
      value: false,
    },
  ],
  en: [
    {
      label: "While rain falls, the streets become wet.",
      value: false,
    },
    {
      label: "If dinner is ready, the children can eat.",
      value: false,
    },
    {
      label: "Before sunrise, birds sing loudly.",
      value: false,
    },
    {
      label:
        "After the lesson ends, each student should submit the assignment promptly.",
      value: true,
    },
    {
      label: "When the bell rings, the school corridor becomes noisy.",
      value: false,
    },
  ],
  id: [
    {
      label: "Ketika hujan turun, jalan menjadi basah.",
      value: false,
    },
    {
      label: "Jika makan malam sudah siap, anak-anak dapat makan.",
      value: false,
    },
    {
      label: "Sebelum matahari terbit, burung berkicau nyaring.",
      value: false,
    },
    {
      label:
        "Setelah pelajaran berakhir, setiap siswa harus segera menyerahkan tugas.",
      value: true,
    },
    {
      label: "Ketika bel berbunyi, lorong sekolah menjadi ramai.",
      value: false,
    },
  ],
};

export default choices;

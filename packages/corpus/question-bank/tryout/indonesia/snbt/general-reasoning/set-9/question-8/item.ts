import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Studienanfänger der Universität " },
            { display: "block", kind: "math", math: "P" },
            {
              kind: "text",
              text: " gehören zur Gruppe der Schulabgänger ohne Abschluss",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Jeder Studienanfänger der Universität " },
            { display: "block", kind: "math", math: "P" },
            { kind: "text", text: " hat die Schule abgeschlossen" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kein Schüler ohne Abschluss beginnt im selben Jahrgang an der Universität ",
            },
            { display: "block", kind: "math", math: "P" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Jeder Schüler ohne Abschluss nimmt am Vermittlungsprogramm der Schule teil",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die beiden Gruppen Schulabschluss und Abgang ohne Abschluss überschneiden sich nicht",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Students entering University " },
            { display: "block", kind: "math", math: "P" },
            { kind: "text", text: " belong to the withdrawal category" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Every student entering University " },
            { display: "block", kind: "math", math: "P" },
            { kind: "text", text: " completed school" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "No withdrawn student enters University " },
            { display: "block", kind: "math", math: "P" },
            { kind: "text", text: " in the same intake" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Every withdrawn student joins the school's job-placement program",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The completed-school and withdrawal categories do not overlap",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Siswa yang masuk Universitas " },
            { display: "block", kind: "math", math: "P" },
            { kind: "text", text: " termasuk kategori mengundurkan diri" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Setiap siswa yang masuk Universitas " },
            { display: "block", kind: "math", math: "P" },
            { kind: "text", text: " telah lulus sekolah" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Tidak ada siswa yang mengundurkan diri lalu masuk Universitas ",
            },
            { display: "block", kind: "math", math: "P" },
            { kind: "text", text: " pada angkatan yang sama" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Setiap siswa yang mengundurkan diri mengikuti program penempatan kerja sekolah",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kategori lulus dan kategori mengundurkan diri tidak saling tumpang tindih",
            },
          ],
        },
      ],
    },
  },
};

export default item;

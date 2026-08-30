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
              text: "Neue Studierende suchen nach privaten Universitäten mit umfassender Ausstattung",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Eine gute Dozentenqualität kann die Zahl neuer Studierender erhöhen",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Neue Studierende entscheiden sich für private Universitäten mit geringen Kosten",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Eine gute Universität verfügt über gute Dozenten und angemessene Einrichtungen",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Neue Studierende werden sich dennoch für eine gute Privatuniversität entscheiden, auch wenn diese teuer ist",
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
            {
              kind: "text",
              text: "New students look for private universities with complete facilities",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Good lecturer quality can increase the number of new students enrolling",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "New students choose private universities with low costs",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "A good university has good lecturers and adequate facilities",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "New students will still choose a good private university even if it is expensive",
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
            {
              kind: "text",
              text: "Mahasiswa baru mencari perguruan tinggi swasta dengan fasilitas yang lengkap",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kualitas dosen yang baik dapat meningkatkan banyaknya mahasiswa baru yang mendaftar",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Mahasiswa baru memilih perguruan tinggi swasta yang biayanya murah",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Perguruan tinggi yang baik memiliki dosen yang baik dan fasilitas yang memadai",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Mahasiswa baru akan tetap memilih perguruan tinggi swasta yang baik meskipun biayanya mahal",
            },
          ],
        },
      ],
    },
  },
};

export default item;

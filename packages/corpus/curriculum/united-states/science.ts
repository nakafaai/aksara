import { courseNode, materialNode, unitNode } from "#corpus/curriculum/schema";

export const usHighSchoolScienceCourseNode = courseNode({
  children: [
    unitNode({
      children: [
        materialNode({
          key: "us-high-school-science-physical-measurement",
          level: "lesson",
          materialKeys: ["lesson.physics.measurement"],
          order: 10,
        }),
        materialNode({
          key: "us-high-school-science-physical-motion",
          level: "lesson",
          materialKeys: ["lesson.physics.kinematics"],
          order: 20,
        }),
        materialNode({
          key: "us-high-school-science-physical-energy",
          level: "lesson",
          materialKeys: ["lesson.physics.renewable-energy"],
          order: 30,
        }),
        materialNode({
          key: "us-high-school-science-physical-matter",
          level: "lesson",
          materialKeys: ["lesson.chemistry.structure-matter"],
          order: 40,
        }),
        materialNode({
          key: "us-high-school-science-physical-reactions",
          level: "lesson",
          materialKeys: ["lesson.chemistry.basic-chemistry-laws"],
          order: 50,
        }),
      ],
      key: "high-school-science-physical-sciences",
      materialCard: {
        de: {
          description: "Verbinde Bewegung, Energie, Stoffe und Reaktionen.",
          title: "Physikalische Wissenschaften",
        },
        en: {
          description: "Connect motion, energy, matter, and reactions.",
          title: "Physical Sciences",
        },
        id: {
          description: "Hubungkan gerak, energi, materi, dan reaksi.",
          title: "Ilmu fisika dan kimia",
        },
      },
      order: 10,
      translations: {
        de: {
          routeSlug: "physikalische-wissenschaften",
          title: "Physikalische Wissenschaften",
        },
        en: {
          routeSlug: "physical-sciences",
          title: "Physical Sciences",
        },
        id: {
          routeSlug: "ilmu-fisika-dan-kimia",
          title: "Ilmu fisika dan kimia",
        },
      },
    }),
    unitNode({
      children: [
        materialNode({
          key: "us-high-school-science-life-biodiversity",
          level: "lesson",
          materialKeys: ["lesson.biology.biodiversity"],
          order: 10,
        }),
        materialNode({
          key: "us-high-school-science-life-virus",
          level: "lesson",
          materialKeys: ["lesson.biology.virus-role"],
          order: 20,
        }),
      ],
      key: "high-school-science-life-sciences",
      materialCard: {
        de: {
          description: "Vergleiche Lebewesen, Viren und biologische Vielfalt.",
          title: "Lebenswissenschaften",
        },
        en: {
          description: "Compare living systems, viruses, and diversity.",
          title: "Life Sciences",
        },
        id: {
          description: "Bandingkan sistem hayati, virus, dan keragaman.",
          title: "Ilmu hayati",
        },
      },
      order: 20,
      translations: {
        de: {
          routeSlug: "lebenswissenschaften",
          title: "Lebenswissenschaften",
        },
        en: {
          routeSlug: "life-sciences",
          title: "Life Sciences",
        },
        id: {
          routeSlug: "ilmu-hayati",
          title: "Ilmu hayati",
        },
      },
    }),
    unitNode({
      children: [
        materialNode({
          key: "us-high-school-science-earth-climate",
          level: "lesson",
          materialKeys: ["lesson.biology.climate-change"],
          order: 10,
        }),
      ],
      key: "high-school-science-earth-space-sciences",
      materialCard: {
        de: {
          description: "Verfolge den Klimawandel in den Systemen der Erde.",
          title: "Geo- und Weltraumwissenschaften",
        },
        en: {
          description: "Trace climate change through Earth systems.",
          title: "Earth and Space Sciences",
        },
        id: {
          description: "Telusuri perubahan iklim lewat sistem bumi.",
          title: "Ilmu bumi dan antariksa",
        },
      },
      order: 30,
      translations: {
        de: {
          routeSlug: "geo-und-weltraumwissenschaften",
          title: "Geo- und Weltraumwissenschaften",
        },
        en: {
          routeSlug: "earth-and-space-sciences",
          title: "Earth and Space Sciences",
        },
        id: {
          routeSlug: "ilmu-bumi-dan-antariksa",
          title: "Ilmu bumi dan antariksa",
        },
      },
    }),
  ],
  iconKey: "science",
  key: "high-school-science",
  order: 20,
  translations: {
    de: { routeSlug: "naturwissenschaften", title: "Naturwissenschaften" },
    en: {
      routeSlug: "science",
      title: "Science",
    },
    id: {
      routeSlug: "sains",
      title: "Sains",
    },
  },
});

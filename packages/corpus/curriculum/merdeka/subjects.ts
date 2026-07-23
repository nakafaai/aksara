import { merdekaClass10BiologyTopicNodes } from "#corpus/curriculum/merdeka/topics/class-10/biology";
import { merdekaClass10ChemistryTopicNodes } from "#corpus/curriculum/merdeka/topics/class-10/chemistry";
import { merdekaClass10MathematicsTopicNodes } from "#corpus/curriculum/merdeka/topics/class-10/mathematics";
import { merdekaClass10PhysicsTopicNodes } from "#corpus/curriculum/merdeka/topics/class-10/physics";
import { merdekaClass11MathematicsTopicNodes } from "#corpus/curriculum/merdeka/topics/class-11/mathematics";
import { merdekaClass11PhysicsTopicNodes } from "#corpus/curriculum/merdeka/topics/class-11/physics";
import { merdekaClass12MathematicsTopicNodes } from "#corpus/curriculum/merdeka/topics/class-12/mathematics";
import { subjectNode } from "#corpus/curriculum/schema";

export const merdekaClass10SubjectNodes = [
  subjectNode({
    children: merdekaClass10BiologyTopicNodes,
    key: "class-10-biology",
    materialDomain: "biology",
    order: 10,
    translations: {
      en: {
        routeSlug: "biology",
        title: "Biology",
      },
      id: {
        routeSlug: "biologi",
        title: "Biologi",
      },
    },
  }),
  subjectNode({
    children: merdekaClass10ChemistryTopicNodes,
    key: "class-10-chemistry",
    materialDomain: "chemistry",
    order: 20,
    translations: {
      en: {
        routeSlug: "chemistry",
        title: "Chemistry",
      },
      id: {
        routeSlug: "kimia",
        title: "Kimia",
      },
    },
  }),
  subjectNode({
    children: merdekaClass10MathematicsTopicNodes,
    key: "class-10-mathematics",
    materialDomain: "mathematics",
    order: 30,
    translations: {
      en: {
        routeSlug: "mathematics",
        title: "Mathematics",
      },
      id: {
        routeSlug: "matematika",
        title: "Matematika",
      },
    },
  }),
  subjectNode({
    children: merdekaClass10PhysicsTopicNodes,
    key: "class-10-physics",
    materialDomain: "physics",
    order: 40,
    translations: {
      en: {
        routeSlug: "physics",
        title: "Physics",
      },
      id: {
        routeSlug: "fisika",
        title: "Fisika",
      },
    },
  }),
];

export const merdekaClass11SubjectNodes = [
  subjectNode({
    children: merdekaClass11MathematicsTopicNodes,
    key: "class-11-mathematics",
    materialDomain: "mathematics",
    order: 30,
    translations: {
      en: {
        routeSlug: "mathematics",
        title: "Mathematics",
      },
      id: {
        routeSlug: "matematika",
        title: "Matematika",
      },
    },
  }),
  subjectNode({
    children: merdekaClass11PhysicsTopicNodes,
    key: "class-11-physics",
    materialDomain: "physics",
    order: 40,
    translations: {
      en: {
        routeSlug: "physics",
        title: "Physics",
      },
      id: {
        routeSlug: "fisika",
        title: "Fisika",
      },
    },
  }),
];

export const merdekaClass12SubjectNodes = [
  subjectNode({
    children: merdekaClass12MathematicsTopicNodes,
    key: "class-12-mathematics",
    materialDomain: "mathematics",
    order: 30,
    translations: {
      en: {
        routeSlug: "mathematics",
        title: "Mathematics",
      },
      id: {
        routeSlug: "matematika",
        title: "Matematika",
      },
    },
  }),
];

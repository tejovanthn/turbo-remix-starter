import { Tree } from "./tree";

test("adding a single person", () => {
  const tree = new Tree();
  tree.add_person("Person");
  expect(tree.get_graph().nodes().length).toBe(1);
});

test("adding a spouse to a person", () => {
  const tree = new Tree();
  tree.add_person("Person 1").add_person("Person 2");
  tree.add_spouse("Person 1", "Person 2");
  expect(tree.get_graph().nodes().length).toBe(3);
});

test("adding a child to a relationship", () => {
  const tree = new Tree();
  tree.add_person("Parent 1").add_person("Parent 2").add_person("Child");
  tree.add_spouse("Parent 1", "Parent 2");
  tree.add_child("Parent 1", "Child");
  expect(tree.get_graph().nodes().length).toBe(4);
});

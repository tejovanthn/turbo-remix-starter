import Graph from "graphology";

const random_coordinates = () => {
  return { x: Math.random() * 500, y: Math.random() * 500 };
};

export class Tree {
  private graph;

  constructor() {
    this.graph = new Graph();
  }
  public get_graph() {
    return this.graph;
  }

  public add_person = (label: string) => {
    this.graph.addNode(label, { ...random_coordinates(), label, size: 50 });
    return this;
  };
  public add_spouse = (person1: string, person2: string) => {
    const target = `${person1} - ${person2} | spouse`;
    this.graph.addNode(target, { ...random_coordinates(), label: "", size: 1 });
    this.graph.addUndirectedEdgeWithKey(`${person1}/spouse`, person1, target, {
      label: "spouse",
    });
    this.graph.addUndirectedEdgeWithKey(`${person2}/spouse`, person2, target, {
      label: "spouse",
    });
    return this;
  };
  public add_child = (parent: string, child: string) => {
    const spouse_node = this.graph.findNeighbor(parent, (name) =>
      name.includes("| spouse")
    );
    this.graph.addUndirectedEdgeWithKey(
      `${parent} - ${child}/parent-child`,
      spouse_node,
      child,
      { label: "parent-child" }
    );
    return this;
  };
}

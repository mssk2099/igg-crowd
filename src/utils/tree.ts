import _ from 'lodash'

export function toTree<Node>(
  items: Node[],
  { key = 'id', parentKey = 'parent_id', childrenKey = 'children' }
): Node[] {
  function findChildren(parent: number) {
    return _.filter(items, item => item[parentKey] === parent)
  }

  function dfs(nodes: Node[]) {
    _.forEach(nodes, node => {
      const children = findChildren(node[key])
      if (children.length) {
        node[childrenKey] = children
        dfs(children)
      }
    })
  }

  const roots = findChildren(0)
  dfs(roots)

  return roots
}

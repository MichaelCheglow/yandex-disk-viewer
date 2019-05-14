export function get (object, path, def = undefined) {
  if (!object) return def
  const paths = path.split('.')
  let current = object
  let i

  for (i = 0; i < paths.length; ++i) {
    if ([undefined, null].includes(current[paths[i]])) {
      return def
    } else {
      current = current[paths[i]]
    }
  }

  return current
}

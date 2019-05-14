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

export function formatBytes (bytes, decimals = 1) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}
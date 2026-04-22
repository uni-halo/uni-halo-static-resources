// 远程静态资源访问

interface GetRemoteStaticUrlOptions {
  random: boolean
  index?: number
}

// 是否为开发环境(vite 项目下使用)
const isDevelopment = import.meta.env.DEV
// 默认使用第一个地址(gitee访问速度比较快)
const defaultRemoteStaticUrlIndex = 0

// 远程静态资源访问地址
export const remoteStaticUrls = [
  'https://gitee.com/uni-halo/uni-halo-static-resources/raw/main',
  'https://cdn.jsdelivr.net/gh/uni-halo/uni-halo-static-resources',
  'https://gcore.jsdelivr.net/gh/uni-halo/uni-halo-static-resources',
]

/**
 * 移除文件路径前缀 `/`
 * @param filePath 文件路径
 * @returns 移除前缀后的文件路径
 */
function removePrefix(filePath: string) {
  if (!filePath) {
    return ''
  }
  return filePath.replace(/^\/+/, '')
}

/**
 * 获取远程静态资源的 url
 * @param options 选项
 * @param options.random 是否随机选择一个 url
 * @returns 远程静态资源的 url
 */
export function getRemoteStaticUrl(options?: GetRemoteStaticUrlOptions) {
  // 开发环境下，强制使用 第一个地址
  if (isDevelopment) {
    return remoteStaticUrls[defaultRemoteStaticUrlIndex]
  }

  const { random = false, index = defaultRemoteStaticUrlIndex } = options ?? {}
  if (!random) {
    if (index >= remoteStaticUrls.length) {
      console.error('提示：远程静态资源访问地址引索超出范围，已默认使用第一个地址')
      return remoteStaticUrls[defaultRemoteStaticUrlIndex]
    }
    return remoteStaticUrls[index]
  }

  const randomIndex = Math.floor(Math.random() * remoteStaticUrls.length)
  return remoteStaticUrls[randomIndex]
}

/**
 * 获取远程静态视频的 url 如果没有传入视频路径，默认返回根目录
 * @param filePath 视频路径,不需要添加前缀 `/`
 * @param options 选项
 * @param options.random 是否随机选择一个 url
 * @returns 远程静态视频的 url
 */
export function getRemoteStaticVideoUrl(filePath?: string, options?: GetRemoteStaticUrlOptions) {
  return `${getRemoteStaticUrl(options)}/videos/${removePrefix(filePath)}`
}

/**
 * 获取远程静态音频效的 url 如果没有传入音频效路径，默认返回根目录
 * @param filePath 音频效路径,不需要添加前缀 `/`
 * @param options 选项
 * @param options.random 是否随机选择一个 url
 * @returns 远程静态音频效的 url
 */
export function getRemoteStaticSoundUrl(filePath?: string, options?: GetRemoteStaticUrlOptions) {
  return `${getRemoteStaticUrl(options)}/sounds/${removePrefix(filePath)}`
}

/**
 * 获取远程静态图片的 url 如果没有传入图片路径，默认返回根目录
 * @param filePath 图片路径,不需要添加前缀 `/`
 * @param options 选项
 * @param options.random 是否随机选择一个 url
 * @returns 远程静态图片的 url
 */
export function getRemoteStaticImageUrl(filePath?: string, options?: GetRemoteStaticUrlOptions) {
  return `${getRemoteStaticUrl(options)}/images/${removePrefix(filePath)}`
}

/**
 * 获取远程静态字体的 url 如果没有传入字体路径，默认返回根目录
 * @param filePath 字体路径,不需要添加前缀 `/`
 * @param options 选项
 * @param options.random 是否随机选择一个 url
 * @returns 远程静态字体的 url
 */
export function getRemoteStaticFontUrl(filePath?: string, options?: GetRemoteStaticUrlOptions) {
  return `${getRemoteStaticUrl(options)}/fonts/${removePrefix(filePath)}`
}
